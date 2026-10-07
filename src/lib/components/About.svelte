<script lang="ts">
	import { reveal } from '$lib/reveal';
	import Glyph from './Glyph.svelte';

	const cells = [
		{
			label: 'Providers',
			items: [
				{ glyph: 'spotify', text: 'Spotify' },
				{ glyph: 'applemusic', text: 'Apple Music' },
				{ glyph: 'youtubemusic', text: 'YouTube Music' },
				{ glyph: 'subsonic', text: 'Subsonic' },
				{ glyph: 'file-music', text: 'Local files' }
			]
		},
		{
			label: 'Playback',
			items: [
				{ glyph: 'audio-lines', text: 'Gapless' },
				{ glyph: 'volume-2', text: 'Normalization' },
				{ glyph: 'sliders-vertical', text: 'Equalizer' },
				{ glyph: 'shuffle', text: 'Shuffle' },
				{ glyph: 'moon', text: 'Sleep timer' }
			]
		},
		{
			label: 'Lyrics',
			items: [
				{ glyph: 'list-music', text: 'Synced' },
				{ glyph: 'mic-vocal', text: 'Karaoke' },
				{ glyph: 'music-2', text: 'Background vocals' },
				{ glyph: 'languages', text: 'Romanization' },
				{ glyph: 'file-text', text: 'Local lyrics' }
			]
		},
		{
			label: 'Appearance',
			items: [
				{ glyph: 'palette', text: 'Themes' },
				{ glyph: 'type', text: 'Fonts' },
				{ glyph: 'grid', text: 'Icon packs' },
				{ glyph: 'blend', text: 'Transparency' },
				{ glyph: 'blur', text: 'Blur' }
			]
		},
		{
			label: 'Integration',
			items: [
				{ glyph: 'discord', text: 'Discord Rich Presence' },
				{ glyph: 'lastfm', text: 'Last.fm' },
				{ glyph: 'librefm', text: 'Libre.fm' },
				{ glyph: 'listenbrainz', text: 'ListenBrainz' },
				{ glyph: 'maloja', text: 'Maloja' },
				{ glyph: 'folder-open', text: 'Opens files from the system' }
			]
		},
		{
			label: 'Platforms',
			items: [
				{ glyph: 'apple', text: 'macOS' },
				{ glyph: 'windows', text: 'Windows' },
				{ glyph: 'linux', text: 'Linux' }
			]
		}
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
					<ul>
						{#each cell.items as item (item.text)}
							<li>
								<Glyph name={item.glyph} />
								<span>{item.text}</span>
							</li>
						{/each}
					</ul>
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

	article .kicker {
		color: var(--fg);
	}

	ul {
		margin: 0;
		padding: 0;
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 9px;
	}

	li {
		display: flex;
		align-items: center;
		gap: 9px;
		font-size: 14px;
		line-height: 1.3;
		color: var(--muted-fg);
	}

	li :global(svg) {
		color: var(--dim);
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
