<script lang="ts">
	import { album as first, columns, records, runtime, shelf } from '$lib/mock/album';
	import { player } from '$lib/mock/player.svelte';
	import Control from './Control.svelte';
	import PageHero from './PageHero.svelte';
	import Table from './Table.svelte';

	let { id = 'airs' }: { id?: string } = $props();

	const album = $derived(shelf.get(id) ?? first);
	const rows = $derived(records.get(id) ?? []);
	const total = $derived(rows.reduce((sum, track) => sum + track.length, 0));
	const mine = $derived(rows.some((track) => track.id === player.id));
	const holding = $derived(mine && player.playing);
	const meta = $derived([album.artist, album.released, `${rows.length} songs`, runtime(total)]);
	const notices = $derived(album.label ? [`℗ ${album.label}`] : []);
</script>

<div class="screen">
	<div class="gutter">
		<PageHero title={album.title} eyebrow={album.eyebrow ?? 'Album'} cover={album.cover} {meta}>
			{#snippet actions()}
				<Control
					variant="filled"
					icon={holding ? 'pause' : 'play'}
					label={holding ? 'Pause' : mine ? 'Resume' : 'Play album'}
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

	<Table {columns} {rows} />

	{#if notices.length}
		<div class="notices">
			{#each notices as line (line)}
				<span>{line}</span>
			{/each}
		</div>
	{/if}
</div>

<style>
	.screen {
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

	.notices {
		display: flex;
		flex: none;
		flex-direction: column;
		gap: 3.5px;
		min-width: 0;
		padding: 7px 16px 0;
		font-size: 11px;
		color: var(--m-muted-foreground);
	}
</style>
