<script>
	import { platform } from '$lib/platform.svelte.js';
	import CopyButton from './CopyButton.svelte';
	import PlatformTabs from './PlatformTabs.svelte';
</script>

<section id="install" class="section install">
	<div class="page">
		<h2>Install in one line.</h2>
		<p class="lead">
			Prebuilt binaries for every platform, plus a Nix flake and a Home Manager module.
		</p>

		<PlatformTabs size="lg" />

		<div class="steps">
			{#each platform.current.steps as step (step.caption)}
				<div class="step">
					<span class="caption">{step.caption}</span>
					<div class="block">
						<pre class="mono">{step.command}</pre>
						<CopyButton text={step.command} />
					</div>
					{#if step.hint}
						<span class="hint">{step.hint}</span>
					{/if}
				</div>
			{/each}

			<p class="note">
				<svg
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					aria-hidden="true"
				>
					<circle cx="12" cy="12" r="9" />
					<path d="M12 11v5" />
					<path d="M12 8h.01" />
				</svg>
				{platform.current.note}
			</p>
		</div>
	</div>
</section>

<style>
	.install {
		background: var(--band);
	}

	.steps {
		width: 100%;
		max-width: 760px;
		margin: 32px auto 0;
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.step {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.caption {
		font-size: 13px;
		color: var(--muted-fg);
	}

	.hint {
		font-size: 12px;
		line-height: 1.5;
		color: var(--dim);
	}

	.block {
		display: flex;
		align-items: flex-start;
		gap: 16px;
		padding: 8px 8px 8px 18px;
		border: 1px solid var(--border);
		border-radius: var(--radius-lg);
		background: var(--bg);
	}

	pre {
		margin: 0;
		flex-grow: 1;
		min-width: 0;
		/* Matches the copy button, so a one-line command sits level with it instead
		   of hugging the top of the box. */
		min-height: 34px;
		display: flex;
		align-items: center;
		font-size: 13.5px;
		line-height: 1.5;
		white-space: pre-wrap;
		overflow-wrap: anywhere;
	}

	.note {
		display: flex;
		align-items: flex-start;
		gap: 12px;
		margin-top: 8px;
		padding: 14px 16px;
		border: 1px solid var(--border);
		border-radius: var(--radius-lg);
		background: var(--card);
		font-size: 13px;
		line-height: 1.5;
		color: var(--muted-fg);
	}

	.note svg {
		flex-shrink: 0;
		margin-top: 1px;
	}
</style>
