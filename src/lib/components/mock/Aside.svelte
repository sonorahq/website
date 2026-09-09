<script>
	import { catalogue } from '$lib/mock/album.js';
	import { player } from '$lib/mock/player.svelte.js';
	import Control from './Control.svelte';
	import Cover from './Cover.svelte';
	import Icon from './Icon.svelte';

	let { tab } = $props();

	/** @param {string[]} ids */
	const look = (ids) => ids.map((id) => catalogue.get(id)).filter((track) => track !== undefined);

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
					tint={player.radio ? 'primary' : 'muted'}
					onclick={() => player.toggleRadio()}
				/>
				<Control
					label="Reset"
					title="Reset"
					small
					tint="muted"
					disabled={!player.reordered}
					onclick={() => player.resetQueue()}
				/>
				<Control
					label="Clear"
					title="Clear"
					small
					tint="muted"
					disabled={upcoming.length === 0}
					onclick={() => player.clearQueue()}
				/>
			</div>
		{/if}
	</header>

	{#if tab === 'lyrics'}
		<div class="vacancy">
			<Icon name="mic-off" size={70} />
			<p>No lyrics found, sorry!</p>
		</div>
	{:else}
		<div class="list">
			<span class="group">
				<span class="eyebrow">Now playing</span>
				{#if player.from}
					<span class="dot">&middot;</span>
					<span class="faint">From</span>
					<span class="source">{player.from.name}</span>
				{/if}
			</span>
			<div class="card chosen">
				<Cover src={player.track.cover} />
				<span class="text">
					<span class="title playing">{player.track.title}</span>
					<span class="caption">{player.track.artist}</span>
				</span>
			</div>

			{#if upcoming.length}
				<span class="group"><span class="eyebrow">Up next</span></span>
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
				<span class="group"><span class="eyebrow">Similar tracks</span></span>
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
		gap: 7px;
		height: 32px;
		padding: 0 7px;
		border-bottom: 1px solid var(--m-border);
	}

	.eyebrow {
		font-size: 12px;
		font-weight: 600;
		text-transform: uppercase;
		color: var(--m-muted-foreground);
	}

	.tools {
		display: flex;
		align-items: center;
		gap: 3.5px;
	}

	.vacancy {
		display: flex;
		flex: 1;
		flex-direction: column;
		align-items: center;
		justify-content: center;
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
		padding: 48px 7px 0;
		overflow: hidden;
	}

	.group {
		display: flex;
		flex: none;
		align-items: flex-end;
		gap: 3.5px;
		height: 52px;
		min-width: 0;
		padding: 0 7px 3.5px;
		overflow: hidden;
		font-size: 12px;
		font-weight: 600;
		color: var(--m-muted-foreground);
	}

	.group .eyebrow {
		text-transform: uppercase;
	}

	.dot,
	.faint {
		flex: none;
	}

	.source {
		min-width: 0;
		flex-shrink: 1;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		cursor: pointer;
	}

	.source:hover {
		color: var(--m-foreground);
		text-decoration: underline;
	}

	.card {
		display: flex;
		flex: none;
		align-items: center;
		gap: 10.5px;
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
		gap: 2px;
		line-height: 1.25;
	}

	.title,
	.caption {
		min-width: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.playing {
		color: var(--m-primary);
	}

	.caption {
		font-size: 12px;
		color: var(--m-muted-foreground);
	}
</style>
