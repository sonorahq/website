<script lang="ts">
	import type { Hit } from '$lib/mock/screens';
	import { albums, catalogue, shelf } from '$lib/mock/album';
	import { artists, genres, playlists } from '$lib/mock/screens';
	import { player } from '$lib/mock/player.svelte';
	import { route } from '$lib/mock/route.svelte';
	import Card from '../Card.svelte';
	import HitRow from '../HitRow.svelte';
	import Icon from './../Icon.svelte';

	const LANES = 2;
	const WIDE = 740;

	const COLUMNS = [
		{ title: 'Songs', kinds: ['Song'] },
		{ title: 'Artists', kinds: ['Artist'] },
		{ title: 'Albums & playlists', kinds: ['Album', 'Playlist'] }
	];

	let { room = 729 }: { room?: number } = $props();

	let query = $state('');

	const wide = $derived(room >= WIDE);

	const asked = $derived(query.trim().length > 0);
	const needle = $derived(query.trim().toLowerCase());

	const holds = (text: string) => text.toLowerCase().includes(needle);

	const hits: Hit[] = $derived.by(() => {
		if (!asked) return [];
		const songs: Hit[] = [...catalogue.values()]
			.filter((track) => holds(track.title))
			.map((track) => ({
				kind: 'Song',
				id: `song-${track.id}`,
				title: track.title,
				meta: shelf.get(track.album)?.artist ?? track.artist,
				cover: track.cover,
				fallback: 'music',
				circle: false,
				track
			}));
		const people: Hit[] = artists
			.filter((artist) => holds(artist.name))
			.map((artist) => ({
				kind: 'Artist',
				id: `artist-${artist.id}`,
				title: artist.name,
				meta: `${artist.listeners} monthly listeners`,
				cover: artist.image,
				fallback: 'user-round',
				circle: true,
				to: { screen: 'artist', id: artist.id }
			}));
		const records: Hit[] = albums
			.filter((entry) => holds(entry.title))
			.map((entry) => ({
				kind: 'Album',
				id: `album-${entry.id}`,
				title: entry.title,
				meta: entry.artist,
				cover: entry.cover,
				fallback: 'music',
				circle: false,
				to: { screen: 'album', id: entry.id }
			}));
		const lists: Hit[] = playlists
			.filter((list) => holds(list.name))
			.map((list) => ({
				kind: 'Playlist',
				id: `playlist-${list.id}`,
				title: list.name,
				meta: list.owner,
				cover: '',
				fallback: 'list-music',
				circle: false,
				to: { screen: 'playlist', id: list.id }
			}));
		return [...songs, ...people, ...records, ...lists];
	});

	const best = $derived(hits[0]);
	const rest = $derived(hits.slice(1));

	function open(hit: Hit) {
		if (hit.track) player.select(hit.track.id);
		else if (hit.to) route.go(hit.to);
	}

	const plates = (lane: number) => genres.filter((_, at) => at % LANES === lane);
</script>

{#snippet spotlight()}
	<div class="best">
		<span class="eyebrow pad">Best match</span>
		<Card
			filled
			flat
			art={63}
			size={24}
			weight={700}
			circle={best.circle}
			eyebrow={best.kind}
			title={best.title}
			meta={best.meta}
			cover={best.cover}
			fallback={best.fallback}
			onpress={() => open(best)}
		/>
	</div>
{/snippet}

<div class="screen">
	<div class="gutter">
		<div class="field">
			<Icon name="search" />
			<input
				type="text"
				bind:value={query}
				placeholder="What do you want to listen to?"
				aria-label="Search"
			/>
			{#if asked}
				<button type="button" class="clear" aria-label="Clear" onclick={() => (query = '')}>
					<Icon name="x" size={14} />
				</button>
			{/if}
		</div>
	</div>

	{#if !asked}
		<div class="browse">
			<span class="gutter eyebrow">Browse all</span>
			<div class="scroll">
				<div class="lanes">
					{#each { length: LANES } as _, lane (lane)}
						<div class="lane">
							{#each plates(lane) as genre (genre.id)}
								<Card
									title={genre.name}
									weight={600}
									surface
									onpress={() => (query = genre.name)}
								/>
							{/each}
						</div>
					{/each}
				</div>
			</div>
		</div>
	{:else if wide}
		{#if best}
			<div class="gutter">{@render spotlight()}</div>
		{/if}
		<div class="columns">
			{#each COLUMNS as column, at (column.title)}
				{#if at > 0}
					<span class="split"></span>
				{/if}
				<div class="shell">
					<span class="head"><span class="eyebrow pad">{column.title}</span></span>
					<div class="scroll rail">
						<div class="rows">
							{#each hits.filter((hit) => column.kinds.includes(hit.kind)) as hit (hit.id)}
								<HitRow {hit} compact={column.kinds.length > 1} onopen={open} />
							{/each}
							{#if !hits.some((hit) => column.kinds.includes(hit.kind))}
								<span class="vacant">No matches</span>
							{/if}
						</div>
					</div>
				</div>
			{/each}
		</div>
	{:else}
		<div class="scroll results">
			{#if best}
				<div class="prelude">
					{@render spotlight()}
					<span class="eyebrow pad">Results</span>
				</div>
			{/if}
			<div class="rows">
				{#each rest as hit (hit.id)}
					<HitRow {hit} compact onopen={open} />
				{/each}
				{#if !hits.length}
					<span class="vacant">No matches</span>
				{/if}
			</div>
		</div>
	{/if}
</div>

<style>
	.screen {
		display: flex;
		flex: 1;
		min-width: 0;
		flex-direction: column;
		gap: 21px;
		padding-top: 24px;
		overflow: hidden;
		background: var(--m-background);
	}

	.gutter {
		padding: 0 24px;
	}

	.field {
		display: flex;
		align-items: center;
		gap: 7px;
		height: 40px;
		padding: 0 10.5px;
		border: 1px solid var(--m-border);
		border-radius: var(--m-radius);
		background: var(--m-secondary);
		color: var(--m-muted-foreground);
	}

	.field input {
		flex: 1;
		min-width: 0;
		border: 0;
		background: none;
		color: var(--m-foreground);
		font: inherit;
		outline: none;
	}

	.field input::placeholder {
		color: var(--m-muted-foreground);
	}

	.clear {
		display: flex;
		flex: none;
		align-items: center;
		justify-content: center;
		width: 24px;
		height: 26px;
		border: 0;
		border-radius: var(--m-radius);
		background: none;
		color: inherit;
		cursor: pointer;
	}

	.browse {
		display: flex;
		flex: 1;
		min-height: 0;
		flex-direction: column;
		gap: 10.5px;
	}

	.eyebrow {
		flex: none;
		font-size: 12px;
		font-weight: 600;
		text-transform: uppercase;
		color: var(--m-muted-foreground);
	}

	.eyebrow.pad {
		padding-bottom: 3.5px;
	}

	.scroll {
		flex: 1;
		min-height: 0;
		padding: 0 24px 24px;

		overflow-y: auto;
		scrollbar-width: thin;
		scrollbar-color: color-mix(in srgb, var(--m-muted-foreground) 45%, transparent) transparent;
	}

	.lanes {
		display: flex;
		gap: 7px;
		flex: none;
	}

	.lane {
		display: flex;
		flex: 1;
		min-width: 0;
		flex-direction: column;
		gap: 8px;
	}

	.columns {
		display: flex;
		width: 100%;
		flex: 1;
		min-height: 0;
		padding: 0 24px;
	}

	.split {
		flex: none;
		width: 1px;
		background: var(--m-border);
	}

	.shell {
		display: flex;
		flex: 1;
		min-width: 0;
		min-height: 0;
		flex-direction: column;
		gap: 3.5px;
	}

	.head {
		display: flex;
		flex: none;
		padding-left: 12px;
	}

	.scroll.rail {
		padding: 0 12px 24px;
	}

	.results {
		display: flex;
		flex-direction: column;
		gap: 3.5px;
	}

	.prelude {
		display: flex;
		flex-direction: column;
		gap: 21px;
		flex: none;
	}

	.best {
		display: flex;
		flex: none;
		flex-direction: column;
		gap: 7px;
	}

	.rows {
		display: flex;
		flex-direction: column;
		gap: 3.5px;
		flex: none;
	}

	.vacant {
		display: flex;
		width: 100%;
		align-items: center;
		justify-content: center;
		padding: 16px;
		color: var(--m-muted-foreground);
	}
</style>
