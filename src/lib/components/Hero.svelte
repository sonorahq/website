<script>
	import { onMount } from 'svelte';
	import { detectPlatform } from '$lib/data/platforms.js';
	import { platform } from '$lib/platform.svelte.js';
	import AppMock from './mock/AppMock.svelte';
	import CopyButton from './CopyButton.svelte';
	import Mark from './Mark.svelte';
	import PlatformTabs from './PlatformTabs.svelte';

	const NARROW = '(max-width: 900px)';

	let small = $state(false);

	onMount(() => {
		platform.id = detectPlatform();

		const narrow = window.matchMedia(NARROW);
		small = narrow.matches;
		const follow = () => (small = narrow.matches);
		narrow.addEventListener('change', follow);
		return () => narrow.removeEventListener('change', follow);
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
			<a class="btn btn-secondary" href="https://github.com/sonorahq/sonora">
				<Mark name="github" size={16} />
				Source
			</a>
		</div>

		<div id="install" class="picker">
			<PlatformTabs />

			{#if platform.current.hero}
				<div class="command">
					<span class="mono prompt">{platform.current.prompt}</span>
					<span class="mono line">{platform.current.hero}</span>
					<CopyButton text={platform.current.hero} />
				</div>
			{:else}
				<p class="no-command">No package manager on Windows — grab the installer above.</p>
			{/if}
		</div>

		<p class="fine">Free and open source · macOS, Linux, Windows · No account required</p>
	</div>

	<figure class="shot">
		<div class="frame">
			{#if small}
				<img
					src="/app-artist.webp"
					width="1100"
					height="660"
					alt="An artist page in Sonora with the play queue open"
				/>
			{:else}
				<AppMock />
			{/if}
		</div>
		<figcaption>
			{#if small}
				Sonora on a desktop — open this page there to try the live rebuild.
			{:else}
				A first look — a working rebuild of the app, not a video. Try it.
			{/if}
		</figcaption>
	</figure>
</section>

<style>
	.hero {
		display: flex;
		align-items: flex-start;
		gap: 48px;
		padding-top: 72px;
		padding-bottom: 80px;
		min-height: min(calc(100vh - var(--header) - var(--band-height)), 760px);
		min-height: min(calc(100svh - var(--header) - var(--band-height)), 760px);
	}

	.pitch,
	.shot {
		align-self: stretch;
	}

	.pitch {
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 31.25%;
		min-width: 380px;
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
		scroll-margin-top: calc(var(--header) + 24px);
		display: flex;
		flex-direction: column;
		align-items: stretch;
		gap: 8px;
		margin-top: 26px;
	}

	.command {
		width: 100%;
		height: 46px;
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 0 7px 0 14px;
		border: 1px solid var(--border);
		border-radius: var(--radius-lg);
		background: var(--card);
		text-align: left;
	}

	.command:hover {
		border-color: var(--secondary-active);
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

	.no-command {
		height: 46px;
		display: flex;
		align-items: center;
		font-size: 13px;
		color: var(--muted-fg);
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
		justify-content: center;
		gap: 14px;
	}

	.frame {
		border: 1px solid var(--border);
		border-radius: 14px;
		overflow: hidden;
		background: var(--card);
		box-shadow: var(--shadow);
	}

	.frame img {
		display: block;
		width: 100%;
		height: auto;
	}

	figcaption {
		align-self: flex-end;
		font-size: 12px;
		color: var(--dim);
	}

	@media (max-width: 1303px) and (min-width: 901px) {
		.hero {
			min-height: 0;
			flex-direction: column;
			align-items: stretch;
			gap: 32px;
			padding-bottom: 64px;
		}

		.pitch {
			width: auto;
			min-width: 0;
			max-width: 680px;
			margin-inline: auto;
			text-align: center;
		}

		.cta,
		.picker {
			align-items: center;
			justify-content: center;
		}

		.command {
			text-align: left;
		}

		figcaption {
			align-self: center;
		}
	}

	@media (max-height: 920px) and (min-width: 1304px) {
		.hero {
			padding-top: 48px;
			padding-bottom: 56px;
		}
	}

	@media (max-width: 900px) {
		.hero {
			min-height: 0;
			flex-direction: column;
			align-items: stretch;
			gap: 24px;
			padding-top: 28px;
			padding-bottom: 48px;
			text-align: center;
		}

		.pitch {
			width: auto;
			min-width: 0;
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
