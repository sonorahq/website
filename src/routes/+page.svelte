<script>
	import { onMount } from 'svelte';
	import { platforms, languages, detectPlatform } from '$lib/platforms.js';
	import CopyButton from '$lib/CopyButton.svelte';

	let selected = $state('macos');

	let current = $derived(platforms.find((p) => p.id === selected));

	onMount(() => {
		selected = detectPlatform();
	});
</script>

<svelte:head>
	<title>Sonora — your whole library, one native app</title>
	<meta
		name="description"
		content="Sonora plays Spotify, YouTube Music, Subsonic and your local files from a single window. Written in Rust on GPU-accelerated GPUI."
	/>
</svelte:head>

<section class="hero page">
	<div class="pitch">
		<h1>Your whole library. One native app.</h1>
		<p class="sub">
			Spotify, YouTube Music, Subsonic and your local files in a single window. Written in Rust on
			GPU-accelerated GPUI — not a browser in a costume.
		</p>

		<div class="cta">
			<a class="btn btn-primary" href="https://github.com/sonorahq/sonora/releases/latest">
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
					<path d="M12 3v13" /><path d="M7 12l5 5 5-5" /><path d="M4 21h16" />
				</svg>
				{current.download}
			</a>
			<a class="btn btn-secondary" href="https://github.com/sonorahq/sonora">Source</a>
		</div>

		<div class="picker">
			<div class="tabs tabs-sm">
				{#each platforms as platform (platform.id)}
					<button
						class:on={selected === platform.id}
						onclick={() => (selected = platform.id)}
					>
						{platform.label}
					</button>
				{/each}
			</div>

			<div class="command">
				<span class="mono prompt">{current.prompt}</span>
				<span class="mono line">{current.hero}</span>
				<CopyButton text={current.hero} />
			</div>
		</div>

		<p class="fine">Free and open source · macOS, Linux, Windows · No account required</p>
	</div>

	<figure class="shot">
		<div class="frame">
			<img
				src="/app-playlist.webp"
				width="1400"
				height="867"
				alt="Sonora playing an album with the lyrics panel open"
			/>
		</div>
		<figcaption>Adaptive theming, switchable in Appearance</figcaption>
	</figure>
</section>

<section class="providers">
	<div class="page">
		<span class="eyebrow">One player, four sources</span>
		<div class="names">
			<span>Spotify</span>
			<span>YouTube Music</span>
			<span>Subsonic</span>
			<span>Local files</span>
		</div>
	</div>
</section>

<section id="install" class="section install">
	<div class="page">
		<h2>Install in one line.</h2>
		<p class="lead">
			Prebuilt binaries for every platform, plus a Nix flake and a Home Manager module.
		</p>

		<div class="tabs tabs-lg">
			{#each platforms as platform (platform.id)}
				<button class:on={selected === platform.id} onclick={() => (selected = platform.id)}>
					{platform.label}
				</button>
			{/each}
		</div>

		<div class="steps">
			{#each current.steps as step (step.caption)}
				<div class="step">
					<span class="caption">{step.caption}</span>
					<div class="block">
						<pre class="mono">{step.command}</pre>
						<CopyButton text={step.command} />
					</div>
				</div>
			{/each}

			<p class="note">
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
					<circle cx="12" cy="12" r="9" /><path d="M12 11v5" /><path d="M12 8h.01" />
				</svg>
				{current.note}
			</p>
		</div>
	</div>
</section>

<section id="features" class="section">
	<div class="page">
		<h2>Built like a desktop app,<br />because it is one.</h2>
		<p class="lead">
			GPUI renders the whole interface on the GPU. Playback, library and lyrics all run in the same
			Rust process.
		</p>

		<div class="cards">
			<article>
				<span class="icon">
					<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
						<path d="M3 12h4l2-5 3 10 2.5-7 1.5 2h5" />
					</svg>
				</span>
				<h3>Gapless playback</h3>
				<p>Tracks run into each other the way the record intended, across every provider.</p>
			</article>
			<article>
				<span class="icon">
					<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
						<path d="M4 15V9" /><path d="M8 18V6" /><path d="M12 14v-4" /><path d="M16 17V7" /><path d="M20 13v-2" />
					</svg>
				</span>
				<h3>Audio normalization</h3>
				<p>Levels stay even when a playlist jumps between a 2003 master and a 2024 one.</p>
			</article>
			<article>
				<span class="icon">
					<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
						<path d="M12 3v10" /><path d="M8 8a4 4 0 0 0 8 0" /><path d="M9 17.5A4 4 0 0 0 12 19a4 4 0 0 0 3-1.5" /><path d="M5 21h14" />
					</svg>
				</span>
				<h3>Synced and karaoke lyrics</h3>
				<p>Line-by-line and word-by-word timing, with romanization for non-Latin scripts.</p>
			</article>
			<article>
				<span class="icon">
					<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
						<path d="M4 6h11" /><path d="M4 11h11" /><path d="M4 16h7" /><circle cx="17" cy="17" r="3" /><path d="M20 17V8" />
					</svg>
				</span>
				<h3>One library, many sources</h3>
				<p>Follow, like and organise inside each provider without leaving the app.</p>
			</article>
			<article>
				<span class="icon">
					<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
						<circle cx="12" cy="12" r="9" />
						<path d="M12 3a9 9 0 0 0 0 18 3 3 0 0 0 0-6 3 3 0 0 1 0-6 3 3 0 0 0 0-6z" />
					</svg>
				</span>
				<h3>Custom themes</h3>
				<p>Eight built-in looks plus system, adaptive tinting, and every token overridable.</p>
			</article>
			<article>
				<span class="icon">
					<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
						<rect x="3" y="4" width="18" height="12" rx="2" /><path d="M8 20h8" /><path d="M12 16v4" />
					</svg>
				</span>
				<h3>Cross-platform, natively</h3>
				<p>One Rust binary on macOS, Linux and Windows. No Electron, no bundled browser.</p>
			</article>
		</div>
	</div>
</section>

<section id="themes" class="section">
	<div class="page">
		<h2>Eight looks, plus your own.</h2>
		<p class="lead">
			Dark, light, midnight, forest, ocean, rose, lavender, amber — or follow the system. Adaptive
			tinting takes its colour from the artwork, and every token underneath is overridable.
		</p>

		<div class="themes">
			<figure>
				<div class="inset">
					<img
						src="/app-lyrics.webp"
						width="1100"
						height="660"
						alt="Sonora in its light theme showing full-screen synced lyrics"
					/>
				</div>
				<figcaption>
					<span class="swatch" style="background: #d4d4d4; border-color: #404040"></span>
					Light, tinted by the record
				</figcaption>
			</figure>
			<figure>
				<div class="inset">
					<img
						src="/app-artist.webp"
						width="1100"
						height="660"
						alt="An artist page in Sonora with the play queue open"
					/>
				</div>
				<figcaption>
					<span class="swatch" style="background: #a855f7; border-color: #6b21a8"></span>
					Artists, releases, queue
				</figcaption>
			</figure>
		</div>
	</div>
</section>

<section class="section">
	<div class="page community">
		<div class="panel wide">
			<h2 class="left">Speaks 11 languages</h2>
			<p>
				Translated by the community and tracked in the repo, from English and Deutsch through 日本語,
				Русский and Português.
			</p>
			<div class="chips">
				{#each languages as code (code)}
					<span>{code}</span>
				{/each}
			</div>
		</div>
		<div class="panel">
			<h2 class="left">Come hang out</h2>
			<p>Discord is where most of it happens, bridged to Matrix.</p>
			<div class="panel-cta">
				<a class="btn btn-primary" href="https://discord.gg/a8N8Tx23rV">Join Discord</a>
				<a class="btn btn-secondary" href="https://matrix.to/#/#sonora:nolight.dev">Matrix space</a>
			</div>
		</div>
	</div>
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
		text-align: left;
		height: 46px;
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 0 6px 0 14px;
		border: 1px solid var(--border);
		border-radius: var(--radius-lg);
		background: var(--card);
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
		box-shadow: 0 50px 130px -30px rgb(0 0 0 / 0.95);
	}

	.shot figcaption {
		align-self: flex-end;
		font-size: 12px;
		color: var(--dim);
	}

	img {
		display: block;
		width: 100%;
		height: auto;
	}

	.tabs {
		display: flex;
		background: var(--popover);
		border: 1px solid var(--border);
		border-radius: 8px;
		padding: 3px;
		gap: 2px;
	}

	.tabs button {
		border-radius: var(--radius);
		font-weight: 500;
		color: var(--muted-fg);
	}

	.tabs button:hover {
		color: var(--fg);
	}

	.tabs button.on {
		background: var(--secondary-active);
		color: var(--fg);
	}

	.tabs-sm button {
		height: 28px;
		padding: 0 12px;
		font-size: 12px;
	}

	.tabs-lg {
		width: fit-content;
		margin: 44px auto 0;
		background: var(--secondary);
		border-color: transparent;
		padding: 4px;
	}

	.tabs-lg button {
		height: 36px;
		padding: 0 20px;
		font-size: 14px;
	}

	.providers {
		border-top: 1px solid var(--border);
		border-bottom: 1px solid var(--border);
		padding: 44px 0;
		text-align: center;
	}

	.eyebrow {
		font-size: 12px;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--dim);
	}

	.names {
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		gap: 16px 56px;
		margin-top: 26px;
		font-size: 17px;
		font-weight: 500;
		color: var(--muted-fg);
	}

	.install {
		background: #080808;
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

	.block {
		display: flex;
		align-items: flex-start;
		gap: 16px;
		padding: 16px 8px 16px 18px;
		border: 1px solid var(--border);
		border-radius: var(--radius-lg);
		background: var(--bg);
	}

	pre {
		margin: 0;
		flex-grow: 1;
		min-width: 0;
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

	.cards {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 20px;
		margin-top: 56px;
	}

	.cards article {
		display: flex;
		flex-direction: column;
		gap: 12px;
		min-height: 176px;
		padding: 24px;
		border: 1px solid var(--border);
		border-radius: var(--radius-lg);
		background: var(--card);
	}

	.icon {
		width: 32px;
		height: 32px;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 1px solid var(--border);
		border-radius: var(--radius);
		background: var(--secondary);
	}

	.cards h3 {
		margin: 4px 0 0;
		font-size: 15px;
		font-weight: 600;
		letter-spacing: -0.01em;
	}

	.cards p {
		font-size: 13px;
		line-height: 1.55;
		color: var(--muted-fg);
	}

	.themes {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 20px;
		margin-top: 56px;
	}

	.themes figure {
		margin: 0;
		padding: 18px;
		border: 1px solid var(--border);
		border-radius: 12px;
		background: var(--card);
	}

	.inset {
		border: 1px solid var(--border);
		border-radius: 8px;
		overflow: hidden;
		background: var(--bg);
	}

	.themes figcaption {
		display: flex;
		align-items: center;
		gap: 9px;
		padding: 18px 6px 6px;
		font-size: 15px;
		font-weight: 600;
		letter-spacing: -0.01em;
	}

	.swatch {
		width: 10px;
		height: 10px;
		border-radius: 5px;
		border: 1px solid;
	}

	.community {
		display: grid;
		grid-template-columns: 2fr 1fr;
		gap: 20px;
	}

	.panel {
		display: flex;
		flex-direction: column;
		gap: 14px;
		padding: 32px;
		border: 1px solid var(--border);
		border-radius: var(--radius-lg);
		background: var(--card);
	}

	h2.left {
		font-size: 24px;
		text-align: left;
		letter-spacing: -0.025em;
	}

	.panel p {
		font-size: 14px;
		line-height: 1.6;
		color: var(--muted-fg);
		max-width: 460px;
	}

	.chips {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		margin-top: 8px;
	}

	.chips span {
		height: 26px;
		display: flex;
		align-items: center;
		padding: 0 10px;
		border: 1px solid var(--border);
		border-radius: var(--radius);
		font-size: 12px;
		color: #a3a3a3;
	}

	.panel-cta {
		display: flex;
		flex-direction: column;
		gap: 8px;
		margin-top: auto;
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

		.tabs-sm {
			width: 100%;
		}

		.tabs-sm button {
			flex-grow: 1;
			height: 44px;
		}

		.shot figcaption {
			align-self: center;
		}

		.cards,
		.themes,
		.community {
			grid-template-columns: minmax(0, 1fr);
		}

		.tabs-lg {
			width: 100%;
		}

		.tabs-lg button {
			flex-grow: 1;
			height: 44px;
			padding: 0 8px;
		}
	}
</style>
