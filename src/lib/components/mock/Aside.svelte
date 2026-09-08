<script>
	import { catalogue } from '$lib/mock/album.js';
	import { player } from '$lib/mock/player.svelte.js';
	import Control from './Control.svelte';
	import Cover from './Cover.svelte';
	import Icon from './Icon.svelte';

	let { tab } = $props();

	/** @param {string[]} ids */
	const look = (ids) => ids.map((id) => catalogue.get(id)).filter((track) => track !== undefined);

	// One now-playing card plus however many rows are left in the panel.
	const ROOM = 6;

	const upcoming = $derived(look(player.queued).slice(0, ROOM));
	const suggested = $derived(look(player.suggested).slice(0, ROOM - upcoming.length));
</script>

<aside class="aside">
	<header class="head">
		<span class="eyebrow">{tab === 'lyrics' ? 'Lyrics' : 'Queue'}</span>
		{#if tab === 'queue'}
			<div class="tools">
				<Control
					icon="radio"
					title="Autoplay similar tracks"
					small
					muted={!player.radio}
					selected={player.radio}
					onclick={() => player.toggleRadio()}
				/>
				<Control label="Clear" title="Clear" small muted onclick={() => player.clearQueue()} />
			</div>
		{/if}
	</header>

	{#if tab === 'lyrics'}
		<div class="vacancy">
			<Icon name="mic-off" size={70} />
			<p>Could not reach the lyrics service</p>
		</div>
	{:else}
		<div class="list">
			<span class="group">Now playing</span>
			<div class="card chosen">
				<Cover src={player.track.cover} />
				<span class="text">
					<span class="title">{player.track.title}</span>
					<span class="caption">{player.track.artist}</span>
				</span>
			</div>

			{#if upcoming.length}
				<span class="group">Up next</span>
				{#each upcoming as track (track.id)}
					<button type="button" class="card" onclick={() => player.select(track.id)}>
						<Cover src={track.cover} />
						<span class="text">
							<span class="title">{track.title}</span>
							<span class="caption">{track.artist}</span>
						</span>
					</button>
				{/each}
			{/if}

			{#if suggested.length}
				<span class="group">Similar tracks</span>
				{#each suggested as track (track.id)}
					<button type="button" class="card" onclick={() => player.select(track.id)}>
						<Cover src={track.cover} />
						<span class="text">
							<span class="title">{track.title}</span>
							<span class="caption">{track.artist}</span>
						</span>
					</button>
				{/each}
			{/if}
		</div>
	{/if}
</aside>

<style>
	.aside {
		display: flex;
		flex: none;
		flex-direction: column;
		width: 254px;
		overflow: hidden;
		background: var(--m-background);
		border-left: 1px solid var(--m-border);
	}

	.head {
		display: flex;
		flex: none;
		align-items: center;
		justify-content: space-between;
		gap: 8px;
		height: 32px;
		padding: 0 8px;
		border-bottom: 1px solid var(--m-border);
	}

	.eyebrow {
		font-size: 11.9px;
		font-weight: 600;
		text-transform: uppercase;
		color: var(--m-muted-foreground);
	}

	.tools {
		display: flex;
		align-items: center;
		gap: 4px;
	}

	.vacancy {
		display: flex;
		flex: 1;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 16px;
		text-align: center;
		color: var(--m-muted-foreground);
	}

	.vacancy :global(svg) {
		margin-top: 24px;
		opacity: 0.35;
	}

	.vacancy p {
		margin: 0;
		padding: 16px;
	}

	.list {
		display: flex;
		flex-direction: column;
		gap: 2px;
		padding: 8px;
		overflow: hidden;
	}

	.group {
		padding: 8px 8px 4px;
		font-size: 11.9px;
		font-weight: 600;
		text-transform: uppercase;
		color: var(--m-muted-foreground);
	}

	.card {
		display: flex;
		flex: none;
		align-items: center;
		gap: 12px;
		width: 100%;
		height: 52px;
		padding: 8px;
		border: 0;
		border-radius: var(--m-radius);
		background: none;
		color: var(--m-foreground);
		font: inherit;
		text-align: left;
		cursor: pointer;
	}

	.card:hover {
		background: var(--m-table-hover);
	}

	.chosen {
		background: var(--m-table-active);
	}

	.text {
		display: flex;
		flex: 1;
		min-width: 0;
		flex-direction: column;
		gap: 1px;
		line-height: 1.25;
	}

	.title,
	.caption {
		min-width: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.caption {
		font-size: 11.9px;
		color: var(--m-muted-foreground);
	}
</style>
