<script>
	import { albums, catalogue, clock, shelf } from '$lib/mock/album.js';
	import { artists, genres, playlists } from '$lib/mock/screens.js';
	import { player } from '$lib/mock/player.svelte.js';
	import { route } from '$lib/mock/route.svelte.js';
	import Card from '../Card.svelte';
	import Icon from './../Icon.svelte';

	const LANES = 2;

	let query = $state('');

	const asked = $derived(query.trim().length > 0);
	const needle = $derived(query.trim().toLowerCase());

	/** @param {string} text */
	const holds = (text) => text.toLowerCase().includes(needle);

	/**
	 * @typedef {{
	 *   kind: string,
	 *   id: string,
	 *   title: string,
	 *   meta: string,
	 *   cover: string,
	 *   fallback: string,
	 *   circle: boolean,
	 *   track?: import('$lib/mock/album.js').Track,
	 *   to?: { screen: string, id: string }
	 * }} Hit
	 */

	/** @type {Hit[]} */
	const hits = $derived.by(() => {
		if (!asked) return [];
		/** @type {Hit[]} */
		const songs = [...catalogue.values()]
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
		/** @type {Hit[]} */
		const people = artists
			.filter((artist) => holds(artist.name))
			.map((artist) => ({
				kind: 'Artist',
				id: `artist-${artist.id}`,
				title: artist.name,
				meta: `${artist.listeners} monthly listeners`,
				cover: '',
				fallback: 'user-round',
				circle: true,
				to: { screen: 'artist', id: artist.id }
			}));
		/** @type {Hit[]} */
		const records = albums
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
		/** @type {Hit[]} */
		const lists = playlists
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

	/** @param {Hit} hit */
	function open(hit) {
		if (hit.track) player.select(hit.track.id);
		else if (hit.to) route.go(hit.to);
	}

	/** @param {number} lane */
	const plates = (lane) => genres.filter((_, at) => at % LANES === lane);
</script>

<div class="page">
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
	{:else}
		<div class="scroll results">
			{#if best}
				<div class="lead">
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
					<span class="eyebrow pad">Results</span>
				</div>
			{/if}
			<div class="rows">
				{#each rest as hit (hit.id)}
					<Card
						circle={hit.circle}
						title={hit.title}
						meta="{hit.kind} · {hit.meta}"
						cover={hit.cover}
						fallback={hit.fallback}
						trailing={hit.track ? clock(hit.track.length) : ''}
						playing={!!hit.track && player.id === hit.track.id && player.playing}
						onplay={hit.track ? () => open(hit) : undefined}
						onpress={() => open(hit)}
					/>
				{/each}
				{#if !hits.length}
					<span class="vacant">No matches</span>
				{/if}
			</div>
		</div>
	{/if}
</div>

<style>
	.page {
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

	.results {
		display: flex;
		flex-direction: column;
		gap: 3.5px;
	}

	.lead {
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
