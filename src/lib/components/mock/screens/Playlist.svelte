<script>
	import { clock } from '$lib/mock/album.js';
	import { libraryColumns, playlists, favorites } from '$lib/mock/screens.js';
	import { player } from '$lib/mock/player.svelte.js';
	import Control from '../Control.svelte';
	import PageHero from '../PageHero.svelte';
	import Table from '../Table.svelte';

	let { id = 'quiet-hours' } = $props();

	const list = $derived(playlists.find((one) => one.id === id) ?? playlists[0]);
	const rows = favorites;
	const total = rows.reduce((sum, track) => sum + track.length, 0);
	const mine = $derived(rows.some((track) => track.id === player.id));
	const holding = $derived(mine && player.playing);
</script>

<div class="page">
	<div class="gutter">
		<PageHero
			title={list.name}
			eyebrow="Playlist"
			fallback="list-music"
			accent
			meta={[list.owner, `${rows.length} songs`, clock(total)]}
		>
			{#snippet actions()}
				<Control
					variant="filled"
					icon={holding ? 'pause' : 'play'}
					label={holding ? 'Pause' : mine ? 'Resume' : 'Play playlist'}
					onclick={() => {
						if (holding) player.pause();
						else if (mine) player.resume();
						else player.select(rows[0].id);
					}}
				/>
				<Control
					variant="outline"
					icon="shuffle"
					title="Shuffle"
					onclick={() => player.playShuffled()}
				/>
				<Control
					variant="outline"
					icon={player.saved ? 'heart-filled' : 'heart'}
					title={player.saved ? 'Remove from library' : 'Add to library'}
					tint={player.saved ? 'primary' : ''}
					onclick={() => player.toggleSaved()}
				/>
				<Control icon="ellipsis" title="More" />
			{/snippet}
		</PageHero>
	</div>
	<Table columns={libraryColumns} {rows} />
</div>

<style>
	.page {
		display: flex;
		flex: 1;
		min-width: 0;
		flex-direction: column;
		padding: 24px 0;
		background: var(--m-background);
		overflow-x: hidden;
		overflow-y: auto;
		scrollbar-width: thin;
		scrollbar-color: color-mix(in srgb, var(--m-muted-foreground) 45%, transparent) transparent;
	}

	.gutter {
		padding: 0 24px;
		flex: none;
	}
</style>
