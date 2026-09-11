<script>
	import { reveal } from '$lib/reveal.js';

	const cells = [
		{ label: 'Providers', title: 'Spotify, YouTube Music, Subsonic, local files' },
		{ label: 'Playback', title: 'Gapless, normalization, shuffle, sleep timer' },
		{ label: 'Lyrics', title: 'Synced and karaoke, background vocals, romanization' },
		{ label: 'Appearance', title: 'Themes, fonts, icon packs, transparency, blur' },
		{ label: 'Integration', title: 'Discord Rich Presence, opens files from the system' },
		{ label: 'Platforms', title: 'macOS, Windows, Linux' }
	];
</script>

<section id="about" class="section">
	<span class="cross start"></span>
	<span class="cross end"></span>

	<div class="page">
		<div class="section-head" use:reveal>
			<span class="kicker">Features</span>
			<h2>What it does</h2>
		</div>

		<div class="wire cells" use:reveal={{ stagger: true }}>
			{#each cells as cell (cell.label)}
				<article>
					<span class="kicker">{cell.label}</span>
					<h3>{cell.title}</h3>
				</article>
			{/each}
		</div>
	</div>
</section>

<style>
	.page {
		padding-bottom: 72px;
	}

	.cells {
		grid-template-columns: repeat(3, minmax(0, 1fr));
	}

	article {
		display: flex;
		flex-direction: column;
		gap: 10px;
		padding: 22px 22px 24px;
	}

	h3 {
		font-size: 16px;
		line-height: 1.35;
		text-wrap: balance;
	}

	@media (max-width: 900px) {
		.page {
			padding-bottom: 48px;
		}

		.cells {
			grid-template-columns: minmax(0, 1fr);
		}

		article {
			padding: 18px 16px 20px;
		}
	}
</style>
