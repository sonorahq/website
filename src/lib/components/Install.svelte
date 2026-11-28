<script lang="ts">
	import { onMount } from 'svelte';
	import { detectPlatform, platforms, type Platform } from '$lib/data/platforms';
	import { reveal } from '$lib/reveal';
	import CopyButton from './CopyButton.svelte';
	import Mark from './Mark.svelte';

	let { version = null }: { version?: string | null } = $props();

	const all = $derived(platforms(version));

	let chosen = $state<Platform['id']>('windows');

	const current = $derived(all.find((entry) => entry.id === chosen) ?? all[0]);

	onMount(() => {
		chosen = detectPlatform();
	});

	/** Whether the link downloads a release asset rather than opening a page. A page opens in a new tab. */
	function isFile(href: string) {
		return href.includes('/releases/download/');
	}
</script>

{#snippet icon(href: string)}
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
		{#if isFile(href)}
			<path d="M12 4v12" />
			<path d="M7 11l5 5 5-5" />
			<path d="M5 20h14" />
		{:else}
			<path d="M7 17 17 7" />
			<path d="M8 7h9v9" />
		{/if}
	</svg>
{/snippet}

<section id="steps" class="section">
	<div class="page">
		<div class="section-head bar" use:reveal>
			<h2>Download</h2>

			<div class="tabs" role="tablist" aria-label="Systems">
				{#each all as entry (entry.id)}
					<button
						type="button"
						role="tab"
						class="tab"
						class:on={chosen === entry.id}
						aria-selected={chosen === entry.id}
						aria-controls="install-{entry.id}"
						onclick={() => (chosen = entry.id)}
					>
						<Mark name={entry.mark} size={16} />
						{entry.label}
					</button>
				{/each}
			</div>
		</div>

		{#key current.id}
			<div class="body" id="install-{current.id}" role="tabpanel">
				<div class="main">
					<span class="logo"><Mark name={current.mark} size={44} /></span>
					<h3>Sonora for {current.label}</h3>
					{#if current.main.detail || version}
						<p class="fine">
							{#if current.main.detail}<span>{current.main.detail}</span>{/if}
							{#if current.main.detail && version}<span class="dot">·</span>{/if}
							{#if version}<span class="mono">{version}</span>{/if}
						</p>
					{/if}
					<div class="actions">
						<a class="btn btn-primary big" href={current.main.href}>
							<svg
								width="18"
								height="18"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2.2"
								stroke-linecap="round"
								stroke-linejoin="round"
								aria-hidden="true"
							>
								<path d="M12 3v13" />
								<path d="M7 12l5 5 5-5" />
								<path d="M4 21h16" />
							</svg>
							{current.main.label}
						</a>
						{#if current.alternate}
							<a class="alternate" href={current.alternate.href}>{current.alternate.label}</a>
						{/if}
					</div>
				</div>

				<ul class="wire options">
					{#each current.options as option (option.title)}
						<li class="option" class:whole={option.href}>
							<span class="title">{option.title}</span>
							{#if option.command}
								<span class="command">
									<code class="mono">{option.command}</code>
									<CopyButton text={option.command} />
								</span>
							{:else if option.links}
								<span class="links">
									{#each option.links as link (link.label)}
										<a
											class="chip"
											href={link.href}
											target={isFile(link.href) ? null : '_blank'}
											rel={isFile(link.href) ? null : 'noopener'}
											>{link.label}{@render icon(link.href)}</a
										>
									{/each}
								</span>
							{:else if option.href}
								<a
									class="go"
									href={option.href}
									target={isFile(option.href) ? null : '_blank'}
									rel={isFile(option.href) ? null : 'noopener'}
									aria-label={option.title}>{@render icon(option.href)}</a
								>
							{/if}
						</li>
					{/each}
				</ul>
			</div>
		{/key}
	</div>
</section>

<style>
	.page {
		padding-bottom: 96px;
	}

	.bar {
		flex-direction: row;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 20px;
	}

	.tabs {
		display: flex;
		width: fit-content;
		padding: 4px;
		gap: 4px;
		border: 1px solid var(--border);
		border-radius: 999px;
		background: var(--card);
	}

	.tab {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		height: 38px;
		padding: 0 20px;
		border-radius: 999px;
		color: var(--muted-fg);
		font-weight: 500;
		transition:
			background-color 0.18s ease,
			color 0.18s ease;
	}

	.tab:hover {
		color: var(--fg);
	}

	.tab.on {
		background: var(--secondary);
		color: var(--fg);
	}

	.body {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
		gap: 64px;
		align-items: center;
		animation: swap-in 0.4s cubic-bezier(0.2, 0.7, 0.2, 1) both;
	}

	@keyframes swap-in {
		from {
			opacity: 0;
			transform: translateY(8px);
		}
	}

	.main {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}

	.logo {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 84px;
		height: 84px;
		border: 1px solid var(--border);
		border-radius: 20px;
		background: var(--card);
	}

	.main h3 {
		margin-top: 28px;
		font-size: clamp(28px, 3vw, 36px);
		line-height: 1.1;
		letter-spacing: -0.04em;
	}

	.fine {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		margin-top: 10px;
		font-size: 14px;
		color: var(--muted-fg);
	}

	.dot {
		color: var(--dim);
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 12px 24px;
		margin-top: 32px;
	}

	.big {
		height: 54px;
		padding: 0 30px;
		font-size: 16px;
	}

	.alternate {
		font-size: 14px;
		font-weight: 500;
		color: var(--muted-fg);
		text-decoration: underline;
		text-decoration-color: var(--faint);
		text-underline-offset: 3px;
	}

	.alternate:hover {
		color: var(--fg);
		text-decoration-color: currentColor;
	}

	.options {
		grid-template-columns: minmax(0, 1fr);
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.option {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
		min-height: 56px;
		padding: 8px 10px 8px 18px;
	}

	.title {
		flex: none;
		font-size: 14px;
		font-weight: 600;
	}

	/* a command sits at the end of its row, as wide as its text, so the copy button stays beside it */
	.command {
		display: flex;
		align-items: center;
		gap: 6px;
		min-width: 0;
		max-width: 72%;
		padding: 3px 3px 3px 12px;
		border: 1px solid var(--border);
		border-radius: var(--radius);
		background: var(--bg);
	}

	.command code {
		min-width: 0;
		padding: 6px 0;
		font-size: 12.5px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	/* the button sits 3px inside the box, so its corners are rounded 3px less */
	.command :global(button) {
		border-radius: calc(var(--radius) - 3px);
	}

	.links {
		display: flex;
		gap: 8px;
	}

	.chip,
	.go {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 6px;
		height: 34px;
		border: 1px solid var(--border);
		border-radius: 999px;
		color: var(--muted-fg);
		font-size: 13px;
		font-weight: 500;
		transition:
			background-color 0.18s ease,
			color 0.18s ease;
	}

	.chip {
		padding: 0 12px 0 14px;
	}

	.go {
		width: 34px;
	}

	.chip:hover,
	.go:hover {
		background: var(--secondary);
		color: var(--fg);
	}

	/* a row with a single link is that link's target as a whole */
	.go::after {
		content: '';
		position: absolute;
		inset: 0;
	}

	.whole:hover {
		background: var(--secondary);
	}

	@media (prefers-reduced-motion: reduce) {
		.body {
			animation: none;
		}
	}

	@media (max-width: 900px) {
		.page {
			padding-bottom: 56px;
		}

		.tab {
			padding: 0 14px;
		}

		.body {
			grid-template-columns: minmax(0, 1fr);
			gap: 36px;
		}

		.main {
			align-items: center;
			text-align: center;
		}

		.fine,
		.actions {
			justify-content: center;
		}

		.big {
			flex-basis: 100%;
		}

		.option {
			padding-left: 16px;
		}
	}
</style>
