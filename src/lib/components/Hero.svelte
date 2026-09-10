<script>
	import { onMount } from 'svelte';
	import { detectPlatform } from '$lib/data/platforms.js';
	import { platform } from '$lib/platform.svelte.js';
	import CopyButton from './CopyButton.svelte';
	import Mark from './Mark.svelte';
	import PlatformTabs from './PlatformTabs.svelte';

	onMount(() => {
		platform.id = detectPlatform();
	});
</script>

<section class="hero">
	<div class="page">
		<h1>Your whole library. One native app.</h1>

		<p class="sub">
			Spotify, YouTube Music, Subsonic and your local files in a single window. Written in Rust on
			GPU-accelerated GPUI — not a browser in a costume.
		</p>

		<div id="install" class="picker">
			<PlatformTabs />

			{#if platform.current.hero}
				<div class="command">
					<span class="mono prompt">{platform.current.prompt}</span>
					<span class="mono line">{platform.current.hero}</span>
					<CopyButton text={platform.current.hero} />
				</div>
			{:else}
				<p class="no-command">No package manager on Windows — grab the installer below.</p>
			{/if}
		</div>

		<div class="cta">
			<a class="btn btn-primary" href="https://github.com/sonorahq/sonora/releases/latest">
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
				{platform.current.download}
			</a>
			<a class="btn btn-secondary" href="https://github.com/sonorahq/sonora">
				<Mark name="github" size={16} />
				Source
			</a>
		</div>

		<p class="fine">Free and open source · macOS, Linux, Windows · No account required</p>
	</div>
</section>

<style>
	.hero {
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: center;
		min-height: calc(100vh - var(--header) - var(--fold-peek));
		min-height: calc(100svh - var(--header) - var(--fold-peek));
	}

	.hero .page > * {
		animation: rise 0.8s cubic-bezier(0.22, 0.61, 0.36, 1) backwards;
	}

	.hero .page > *:nth-child(2) {
		animation-delay: 0.07s;
	}

	.hero .page > *:nth-child(3) {
		animation-delay: 0.14s;
	}

	.hero .page > *:nth-child(4) {
		animation-delay: 0.21s;
	}

	.hero .page > *:nth-child(5) {
		animation-delay: 0.28s;
	}

	@keyframes rise {
		from {
			opacity: 0;
			transform: translateY(14px);
		}
	}

	.hero .page {
		position: relative;
		z-index: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		padding-top: 64px;
		padding-bottom: 64px;
	}

	h1 {
		max-width: 18ch;
		font-size: clamp(40px, 5vw, 68px);
		line-height: 1.03;
		letter-spacing: -0.035em;
		text-wrap: balance;
	}

	.sub {
		margin-top: 22px;
		max-width: 56ch;
		font-size: 17px;
		line-height: 1.55;
		color: var(--muted-fg);
		text-wrap: pretty;
	}

	.picker {
		scroll-margin-top: calc(var(--header) + 24px);
		display: flex;
		flex-direction: column;
		align-items: stretch;
		gap: 8px;
		width: min(520px, 100%);
		margin-top: 40px;
	}

	.command {
		width: 100%;
		height: 50px;
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 0 7px 0 14px;
		border: 1px solid var(--border);
		border-radius: 10px;
		background: var(--card);
		text-align: left;
	}

	.prompt {
		flex-shrink: 0;
		font-size: 12.5px;
		color: var(--dim);
	}

	.line {
		flex-grow: 1;
		font-size: 13px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.no-command {
		height: 50px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 13px;
		color: var(--muted-fg);
	}

	.cta {
		display: flex;
		justify-content: center;
		gap: 10px;
		margin-top: 28px;
	}

	.fine {
		margin-top: 22px;
		font-size: 12px;
		line-height: 1.5;
		color: var(--dim);
	}

	@media (prefers-reduced-motion: reduce) {
		.hero .page > * {
			animation: none;
		}
	}

	@media (max-height: 940px) and (min-width: 901px) {
		.hero .page {
			padding-top: 48px;
			padding-bottom: 48px;
		}
	}

	@media (max-width: 900px) {
		.hero {
			min-height: 0;
		}

		.hero .page {
			padding-top: 56px;
			padding-bottom: 56px;
		}

		h1 {
			font-size: clamp(34px, 9vw, 44px);
		}

		.sub {
			font-size: 16px;
		}

		.cta {
			flex-direction: column;
			align-self: stretch;
		}
	}
</style>
