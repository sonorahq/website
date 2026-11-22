<script lang="ts">
	import { repo } from '$lib/data/links';
	import Logo from './Logo.svelte';
	import Mark from './Mark.svelte';

	let { version = null }: { version?: string | null } = $props();
</script>

<section id="top" class="hero">
	<div class="inner page">
		<span class="mark" data-enter><Logo size={52} /></span>

		<h1 data-enter style="--enter: 0.05s">Sonora</h1>

		<p class="sub" data-enter style="--enter: 0.1s">
			A music player for Spotify, Apple Music, YouTube Music, Tidal, Deezer, Jellyfin, Subsonic and
			your own files.
		</p>

		<div class="cta" data-enter style="--enter: 0.15s">
			<a class="btn btn-primary" href="#steps">Install</a>
			<a class="btn btn-secondary" href={repo}>
				<Mark name="github" size={16} />
				Source
			</a>
		</div>

		<p class="fine" data-enter style="--enter: 0.2s">
			{#if version}
				<a class="mono" href="/changelog#{version}">{version}</a>
				<span class="dot">·</span>
			{/if}
			macOS, Linux, Windows
			<span class="dot">·</span>
			GPL-3.0-or-later
		</p>
	</div>
</section>

<style>
	.hero {
		position: relative;
		display: flex;
		align-items: center;
		min-height: 100svh;
		margin-top: calc(var(--header) * -1);
		padding-top: var(--header);
	}

	.inner {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		padding-bottom: 14vh;
		text-align: center;
	}

	.mark {
		display: flex;
		border-radius: 14px;
		overflow: hidden;
		box-shadow: 0 10px 40px rgb(0 0 0 / 0.4);
	}

	h1 {
		margin-top: 32px;
		font-size: clamp(64px, 10vw, 132px);
		font-weight: 600;
		line-height: 1;
		letter-spacing: -0.05em;
	}

	.sub {
		max-width: 520px;
		margin-top: 24px;
		font-size: 17px;
		line-height: 1.55;
		color: var(--muted-fg);
		text-wrap: balance;
	}

	.cta {
		display: flex;
		gap: 10px;
		margin-top: 36px;
	}

	.fine {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		gap: 8px;
		margin-top: 22px;
		font-size: 13px;
		line-height: 1.5;
		color: var(--muted-fg);
	}

	.fine .mono {
		color: var(--fg);
	}

	.fine a.mono:hover {
		color: var(--fg);
	}

	.dot {
		color: var(--dim);
	}

	@media (max-width: 900px) {
		.hero {
			min-height: 88svh;
		}

		.inner {
			padding-bottom: 72px;
		}

		.sub {
			font-size: 15px;
		}

		.cta {
			flex-direction: column;
			align-self: stretch;
		}
	}
</style>
