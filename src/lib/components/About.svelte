<script lang="ts">
	import { reveal } from '$lib/reveal';
	import Glyph from './Glyph.svelte';

	/** The feature groups. Services and systems are left out, since the provider row and the download section already show them. */
	const cells = [
		{
			label: 'Sound',
			items: [
				{ glyph: 'sliders-horizontal', text: 'Parametric equalizer' },
				{ glyph: 'headphones', text: 'AutoEQ profiles' },
				{ glyph: 'speaker', text: 'Bit-perfect output' },
				{ glyph: 'audio-lines', text: 'Hi-res and lossless' }
			]
		},
		{
			label: 'Lyrics',
			items: [
				{ glyph: 'mic-vocal', text: 'Word-synced karaoke' },
				{ glyph: 'music-2', text: 'Background vocals' },
				{ glyph: 'languages', text: 'Romanization' },
				{ glyph: 'file-text', text: 'Your own LRC and TTML' }
			]
		},
		{
			label: 'Together',
			items: [
				{ glyph: 'users-round-collaboration', text: 'Sonora Sessions' },
				{ glyph: 'spotify', text: 'Spotify Jams' },
				{ glyph: 'monitor-speaker', text: 'Spotify Connect' },
				{ glyph: 'tv', text: 'Cast to TVs and speakers' }
			]
		},
		{
			label: 'Library',
			items: [
				{ glyph: 'download', text: 'Downloads' },
				{ glyph: 'wifi-off', text: 'Offline mode' },
				{ glyph: 'file-music', text: 'Local files' },
				{ glyph: 'pencil', text: 'Tag editor' },
				{ glyph: 'list-music', text: 'M3U import and export' }
			]
		},
		{
			label: 'Integrations',
			items: [
				{ glyph: 'discord', text: 'Discord' },
				{ glyph: 'lastfm', text: 'Last.fm' },
				{ glyph: 'listenbrainz', text: 'ListenBrainz' },
				{ glyph: 'librefm', text: 'Libre.fm' },
				{ glyph: 'maloja', text: 'Maloja' },
				{ glyph: 'tealfm', text: 'teal.fm' }
			]
		},
		{
			label: 'Make it yours',
			items: [
				{ glyph: 'palette', text: 'Themes' },
				{ glyph: 'type', text: 'Fonts' },
				{ glyph: 'grid', text: 'Icon packs' },
				{ glyph: 'blend', text: 'Transparency and blur' },
				{ glyph: 'keyboard', text: 'Custom shortcuts' },
				{ glyph: 'terminal', text: 'Command line' }
			]
		}
	];
</script>

<section id="about" class="section">
	<div class="page">
		<div class="section-head" use:reveal>
			<h2>Features</h2>
		</div>

		<div class="wire cells" use:reveal={{ stagger: true }}>
			{#each cells as cell (cell.label)}
				<article>
					<span class="kicker">{cell.label}</span>
					<ul>
						{#each cell.items as item (item.text)}
							<li>
								<Glyph name={item.glyph} size={16} />
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
		gap: 18px;
		padding: 28px 28px 30px;
	}

	article .kicker {
		color: var(--fg);
		font-size: 13px;
	}

	ul {
		margin: 0;
		padding: 0;
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	li {
		display: flex;
		align-items: center;
		gap: 12px;
		font-size: 15px;
		line-height: 1.3;
		color: var(--muted-fg);
	}

	li :global(svg) {
		color: var(--dim);
	}

	@media (max-width: 1100px) {
		.cells {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	@media (max-width: 900px) {
		.page {
			padding-bottom: 48px;
		}

		article {
			padding: 22px 18px 24px;
		}
	}

	@media (max-width: 560px) {
		.cells {
			grid-template-columns: minmax(0, 1fr);
		}
	}
</style>
