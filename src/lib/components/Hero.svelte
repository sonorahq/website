<script lang="ts">
	import { repo } from '$lib/data/links';
	import Logo from './Logo.svelte';
	import Mark from './Mark.svelte';
	import Visualizer from './Visualizer.svelte';

	let { version = null }: { version?: string | null } = $props();
</script>

<section id="top" class="hero">
	<div class="page">
		<div class="mark" data-enter>
			<Logo size={72} />
		</div>

		<h1 data-enter style="--enter: 0.05s">Sonora</h1>

		<div class="cta" data-enter style="--enter: 0.12s">
			<a class="btn btn-primary" href="#steps">
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
					<path d="M12 3v13" />
					<path d="M7 12l5 5 5-5" />
					<path d="M4 21h16" />
				</svg>
				Install
			</a>
			<a class="btn btn-secondary" href={repo}>
				<Mark name="github" size={16} />
				Source
			</a>
		</div>

		<p class="fine" data-enter style="--enter: 0.19s">
			{#if version}
				<a class="mono" href="/changelog#{version}">{version}</a>
				<span class="dot">·</span>
			{/if}
			Free and open source
			<span class="dot">·</span>
			macOS, Linux, Windows
			<span class="dot">·</span>
			GPL-3.0-or-later
		</p>
	</div>

	<div class="band" data-enter style="--enter: 0.26s">
		<Visualizer />
	</div>
</section>

<style>
	.hero {
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		scroll-margin-top: var(--header);
		min-height: calc(100vh - var(--header) - var(--fold-peek));
		min-height: calc(100svh - var(--header) - var(--fold-peek));
	}

	.hero .page {
		display: flex;
		flex: 1;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		padding-top: clamp(72px, 10vh, 120px);
		padding-bottom: 48px;
	}

	.mark {
		display: flex;
		border-radius: 18px;
		box-shadow: var(--shadow);
	}

	h1 {
		margin-top: 28px;
		font-size: clamp(48px, 7vw, 84px);
		line-height: 1;
		letter-spacing: -0.045em;
		font-weight: 600;
	}

	.cta {
		display: flex;
		justify-content: center;
		gap: 10px;
		margin-top: 40px;
	}

	.fine {
		display: flex;
		align-items: center;
		gap: 8px;
		flex-wrap: wrap;
		justify-content: center;
		margin-top: 28px;
		font-size: 12px;
		line-height: 1.5;
		color: var(--dim);
	}

	.fine .mono {
		color: var(--muted-fg);
	}

	.fine a.mono:hover {
		color: var(--fg);
	}

	.dot {
		color: var(--faint);
	}

	.band {
		padding: 0 var(--gutter);
	}

	@media (max-width: 900px) {
		.hero {
			min-height: 0;
		}

		.hero .page {
			padding-top: 64px;
			padding-bottom: 40px;
		}

		h1 {
			margin-top: 22px;
			font-size: clamp(44px, 14vw, 64px);
		}

		.cta {
			flex-direction: column;
			align-self: stretch;
			margin-top: 32px;
		}
	}
</style>
