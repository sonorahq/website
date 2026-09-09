<script>
	import { albumsOf, artists, popularOf } from '$lib/mock/screens.js';
	import { player } from '$lib/mock/player.svelte.js';
	import { route } from '$lib/mock/route.svelte.js';
	import Card from '../Card.svelte';
	import Control from '../Control.svelte';
	import PageHero from '../PageHero.svelte';

	let { id = 'chopin' } = $props();

	const CARD = 146;
	const GAP = 32;

	const artist = $derived(artists.find((one) => one.id === id) ?? artists[0]);
	const popular = $derived(popularOf(artist.id));
	const releases = $derived(albumsOf(artist.id));
	const mine = $derived(popular.some((track) => track.id === player.id));
	const holding = $derived(mine && player.playing);
</script>

<div class="page">
	<PageHero
		title={artist.name}
		eyebrow="Artist"
		fallback="user-round"
		circle
		meta={[`${artist.listeners} monthly listeners`]}
	>
		{#snippet actions()}
			<Control
				variant="filled"
				icon={holding ? 'pause' : 'play'}
				label={holding ? 'Pause' : 'Play'}
				onclick={() => {
					if (holding) player.pause();
					else if (mine) player.resume();
					else if (popular.length) player.select(popular[0].id);
				}}
			/>
			<Control variant="outline" icon="shuffle" title="Shuffle" />
			<Control variant="outline" icon="heart" title="Add to library" />
			<Control icon="ellipsis" title="More" />
		{/snippet}
	</PageHero>

	<h2>Popular</h2>
	<div class="rows">
		{#each popular as track (track.id)}
			<Card
				title={track.title}
				meta={track.artist}
				cover={track.cover}
				playing={player.id === track.id && player.playing}
				onplay={() => player.select(track.id)}
				onpress={() => player.select(track.id)}
			/>
		{/each}
	</div>

	<h2>Releases</h2>
	<div class="grid" style:gap="{GAP}px">
		{#each releases as entry (entry.id)}
			<Card
				tile={CARD}
				flat
				weight={600}
				title={entry.title}
				meta="{entry.released} · {entry.artist}"
				cover={entry.cover}
				onpress={() => route.go({ screen: 'album', id: entry.id })}
			/>
		{/each}
	</div>
</div>

<style>
	.page {
		display: flex;
		flex: 1;
		min-width: 0;
		flex-direction: column;
		padding: 24px;
		background: var(--m-background);
		overflow-y: auto;
		scrollbar-width: thin;
		scrollbar-color: color-mix(in srgb, var(--m-muted-foreground) 45%, transparent) transparent;
	}

	h2 {
		margin: 0;
		padding-bottom: 10.5px;
		font-size: 24px;
		font-weight: 700;
		letter-spacing: normal;
		text-align: left;
	}

	.rows {
		display: flex;
		flex-direction: column;
		gap: 3.5px;
		padding-bottom: 21px;
		flex: none;
	}

	.grid {
		display: flex;
		width: 100%;
		flex-wrap: wrap;
		row-gap: 21px;
		flex: none;
	}
</style>
