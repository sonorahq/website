<script>
	import { album, tracks } from '$lib/mock/album.js';
	import { player } from '$lib/mock/player.svelte.js';
	import Control from './Control.svelte';
	import Icon from './Icon.svelte';

	let { tab } = $props();

	let radio = $state(true);

	const upcoming = $derived(
		tracks.slice(player.index + 1, player.index + 6).map((track, offset) => ({
			track,
			row: player.index + 1 + offset
		}))
	);
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
					muted={!radio}
					onclick={() => (radio = !radio)}
				/>
				<Control label="Clear" title="Clear" small muted />
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
				<img src={album.cover} width="36" height="36" alt="" />
				<span class="text">
					<span class="title">{player.track.title}</span>
					<span class="caption">{album.artist}</span>
				</span>
			</div>

			<span class="group">Up next</span>
			{#each upcoming as { track, row } (track.title)}
				<button type="button" class="card" onclick={() => player.select(row)}>
					<img src={album.cover} width="36" height="36" alt="" />
					<span class="text">
						<span class="title">{track.title}</span>
						<span class="caption">{album.artist}</span>
					</span>
				</button>
			{/each}
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
		letter-spacing: 0.02em;
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
		letter-spacing: 0.02em;
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

	img {
		flex: none;
		border-radius: var(--m-radius);
		object-fit: cover;
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
