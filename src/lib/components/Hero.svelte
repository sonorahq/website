<script>
	import { onMount } from 'svelte';
	import { detectPlatform } from '$lib/data/platforms.js';
	import { platform } from '$lib/platform.svelte.js';
	import CopyButton from './CopyButton.svelte';
	import PlatformTabs from './PlatformTabs.svelte';

	onMount(() => {
		platform.id = detectPlatform();
	});
</script>

<section class="hero page">
	<div class="pitch">
		<h1>Your whole library. One native app.</h1>
		<p class="sub">
			Spotify, YouTube Music, Subsonic and your local files in a single window. Written in Rust on
			GPU-accelerated GPUI — not a browser in a costume.
		</p>

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
			<a class="btn btn-secondary" href="https://github.com/sonorahq/sonora">Source</a>
		</div>

		<div class="picker">
			<PlatformTabs />

			<div class="command">
				<span class="mono prompt">{platform.current.prompt}</span>
				<span class="mono line">{platform.current.hero}</span>
				<CopyButton text={platform.current.hero} />
			</div>
		</div>

		<p class="fine">Free and open source · macOS, Linux, Windows · No account required</p>
	</div>

	<figure class="shot">
		<div class="frame">
			<img
				class="on-dark"
				src="/app-playlist.webp"
				width="1400"
				height="867"
				alt="Sonora playing an album with the lyrics panel open"
			/>
			<img
				class="on-light"
				src="/app-artist.webp"
				width="1100"
				height="660"
				alt="An artist page in Sonora with the play queue open"
			/>
		</div>
		<figcaption>Adaptive theming, switchable in Appearance</figcaption>
	</figure>
</section>

<style>
	.hero {
		display: flex;
		align-items: center;
		gap: 48px;
		padding-top: 72px;
		padding-bottom: 80px;
	}

	.pitch {
		width: 400px;
		flex-shrink: 0;
	}

	.sub {
		margin-top: 20px;
		font-size: 16px;
		line-height: 1.55;
		color: var(--muted-fg);
		text-wrap: pretty;
	}

	.cta {
		display: flex;
		gap: 10px;
		margin-top: 28px;
	}

	.picker {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 8px;
		margin-top: 26px;
	}

	.command {
		width: 100%;
		height: 46px;
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 0 6px 0 14px;
		border: 1px solid var(--border);
		border-radius: var(--radius-lg);
		background: var(--card);
		text-align: left;
	}

	.prompt {
		font-size: 12.5px;
		color: var(--dim);
	}

	.line {
		flex-grow: 1;
		font-size: 12.5px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.fine {
		margin-top: 18px;
		font-size: 12px;
		line-height: 1.5;
		color: var(--dim);
	}

	.shot {
		flex-grow: 1;
		min-width: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 14px;
	}

	.frame {
		border: 1px solid var(--border);
		border-radius: 14px;
		overflow: hidden;
		background: var(--card);
		box-shadow: var(--shadow);
	}

	figcaption {
		align-self: flex-end;
		font-size: 12px;
		color: var(--dim);
	}

	img {
		width: 100%;
		height: auto;
	}

	@media (max-width: 900px) {
		.hero {
			flex-direction: column;
			align-items: stretch;
			gap: 24px;
			padding-top: 28px;
			padding-bottom: 48px;
			text-align: center;
		}

		.pitch {
			width: auto;
		}

		.cta {
			flex-direction: column;
		}

		.picker {
			align-items: stretch;
		}

		figcaption {
			align-self: center;
		}
	}
</style>
