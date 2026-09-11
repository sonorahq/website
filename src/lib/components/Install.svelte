<script lang="ts">
	import { onMount } from 'svelte';
	import { detectPlatform, platforms } from '$lib/data/platforms';
	import { platform } from '$lib/platform.svelte';
	import { reveal } from '$lib/reveal';
	import CopyButton from './CopyButton.svelte';
	import Mark from './Mark.svelte';

	const current = $derived(platform.current);

	let list = $state<HTMLElement | null>(null);
	let ended = $state(false);

	function settle() {
		if (!list) return;
		ended = list.scrollLeft + list.clientWidth >= list.scrollWidth - 1;
	}

	onMount(() => {
		platform.id = detectPlatform();
		settle();
	});
</script>

<section id="steps" class="section">
	<span class="cross start"></span>
	<span class="cross end"></span>

	<div class="page">
		<div class="section-head" use:reveal>
			<span class="kicker">Install</span>
			<h2>Step by step</h2>
		</div>

		<div class="wire panel" use:reveal>
			<div class="rail" class:ended>
				<nav class="list" aria-label="Platforms" bind:this={list} onscroll={settle}>
					{#each platforms as entry (entry.id)}
						<button
							type="button"
							class="row"
							class:on={platform.id === entry.id}
							aria-pressed={platform.id === entry.id}
							onclick={() => (platform.id = entry.id)}
						>
							<Mark name={entry.mark} size={14} />
							<span class="label">{entry.label}</span>
							<span class="mono hint">{entry.hero ? entry.prompt : 'exe'}</span>
						</button>
					{/each}
				</nav>
			</div>

			<div class="steps">
				{#each current.steps as step, index (step.caption)}
					<div class="step">
						<span class="mono index">{String(index + 1).padStart(2, '0')}</span>
						<div class="body">
							<p class="caption">{step.caption}</p>
							{#if step.link}
								<a class="code link" href={step.link}>
									<span class="mono text">{step.command}</span>
									<svg
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										aria-hidden="true"
									>
										<path d="M12 3v13" />
										<path d="M7 12l5 5 5-5" />
										<path d="M4 21h16" />
									</svg>
								</a>
							{:else}
								<div class="code">
									<pre class="mono text">{step.command}</pre>
									<CopyButton text={step.command} />
								</div>
							{/if}
							{#if step.hint}
								<p class="hint-text">{step.hint}</p>
							{/if}
						</div>
					</div>
				{/each}

				<p class="note">{current.note}</p>
			</div>
		</div>
	</div>
</section>

<style>
	.page {
		padding-bottom: 72px;
	}

	.panel {
		grid-template-columns: 220px minmax(0, 1fr);
	}

	.rail {
		position: relative;
	}

	.list {
		display: flex;
		flex-direction: column;
	}

	.row {
		display: flex;
		align-items: center;
		gap: 10px;
		height: 44px;
		padding: 0 16px;
		border-bottom: 1px solid var(--line);
		color: var(--muted-fg);
		text-align: left;
	}

	.row:last-child {
		border-bottom: none;
	}

	.row:hover {
		background: var(--secondary);
		color: var(--fg);
	}

	.row.on {
		background: var(--secondary);
		color: var(--fg);
	}

	.label {
		flex-grow: 1;
	}

	.hint {
		font-size: 11px;
		color: var(--faint);
	}

	.steps {
		display: flex;
		flex-direction: column;
	}

	.step {
		display: grid;
		grid-template-columns: 56px minmax(0, 1fr);
		border-bottom: 1px solid var(--line);
	}

	.index {
		padding: 22px 0 0 18px;
		font-size: 11px;
		color: var(--faint);
	}

	.body {
		display: flex;
		flex-direction: column;
		gap: 12px;
		min-width: 0;
		padding: 20px 20px 20px 0;
	}

	.caption {
		font-size: 14px;
		font-weight: 500;
	}

	.code {
		display: flex;
		align-items: flex-start;
		gap: 10px;
		min-width: 0;
		padding: 0 6px 0 14px;
		border: 1px solid var(--border);
		border-radius: var(--radius);
		background: var(--card);
	}

	.text {
		flex-grow: 1;
		min-width: 0;
		margin: 0;
		padding: 13px 0;
		font-size: 13px;
		line-height: 1.5;
		overflow-x: auto;
		white-space: pre;
	}

	.code :global(button) {
		margin-top: 6px;
	}

	.link {
		align-items: center;
		padding-right: 14px;
		color: var(--fg);
	}

	.link:hover {
		background: var(--secondary);
	}

	.link svg {
		flex-shrink: 0;
		color: var(--dim);
	}

	.hint-text,
	.note {
		font-size: 13px;
		line-height: 1.55;
		color: var(--muted-fg);
	}

	.hint-text {
		max-width: 60ch;
	}

	.note {
		padding: 18px 20px;
		max-width: 68ch;
	}

	@media (max-width: 900px) {
		.page {
			padding-bottom: 48px;
		}

		.panel {
			grid-template-columns: minmax(0, 1fr);
		}

		.list {
			flex-direction: row;
			overflow-x: auto;
			scrollbar-width: none;
		}

		.list::-webkit-scrollbar {
			display: none;
		}

		.rail::after {
			content: '';
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			width: 56px;
			background: linear-gradient(to right, transparent, var(--bg));
			pointer-events: none;
			transition: opacity 0.18s ease;
		}

		.rail.ended::after {
			opacity: 0;
		}

		.row {
			flex: 1 0 auto;
			border-bottom: none;
			border-right: 1px solid var(--line);
		}

		.row:last-child {
			border-right: none;
		}

		.hint {
			display: none;
		}

		.step {
			grid-template-columns: 40px minmax(0, 1fr);
		}

		.index {
			padding-left: 12px;
		}

		.body {
			padding-right: 14px;
		}

		.note {
			padding: 16px 14px;
		}
	}
</style>
