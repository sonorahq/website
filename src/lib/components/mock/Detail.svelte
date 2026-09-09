<script>
	import { TRAIL, album, clock, columns, total, tracks } from '$lib/mock/album.js';
	import { player } from '$lib/mock/player.svelte.js';
	import Control from './Control.svelte';
	import Icon from './Icon.svelte';
	import Like from './Like.svelte';

	const head = columns.map((column) => `${column.width}px`).join(' ');
	const body = columns
		.map((column, at) => `${column.width - (at + 1 === columns.length ? TRAIL : 0)}px`)
		.join(' ');
	const mine = $derived(tracks.some((track) => track.id === player.id));
	const holding = $derived(mine && player.playing);
	const meta = [album.artist, album.released, `${tracks.length} songs`, clock(total)];
</script>

<div class="screen">
	<header class="hero">
		<img class="cover" src={album.cover} width="140" height="140" alt="" />
		<div class="text">
			<span class="eyebrow">{album.eyebrow}</span>
			<h1>{album.title}</h1>
			<p class="meta">
				{#each meta as item, at (item)}
					<span class="part">
						{#if at > 0}<span>&bull;</span>{/if}
						<span>{item}</span>
					</span>
				{/each}
			</p>
			<div class="actions">
				<Control
					variant="filled"
					icon={holding ? 'pause' : 'play'}
					label={holding ? 'Pause' : 'Play'}
					onclick={() => {
						if (holding) player.pause();
						else if (mine) player.resume();
						else player.select(tracks[0].id);
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
			</div>
		</div>
	</header>

	<div class="table">
		<div class="head" style:grid-template-columns={head}>
			{#each columns as column (column.key)}
				<span class="cell">
					<span class="frame {column.align ?? ''}">{column.label}</span>
					{#if column.sortable}<Icon name="chevrons-up-down" size={12} />{/if}
				</span>
			{/each}
		</div>

		{#each tracks as track, row (track.id)}
			{@const active = track.id === player.id}
			<div
				class="row"
				class:active
				style:grid-template-columns={body}
				role="button"
				tabindex="0"
				onclick={() => player.select(track.id)}
				onkeydown={(event) => {
					if (event.key === 'Enter' || event.key === ' ') {
						event.preventDefault();
						player.select(track.id);
					}
				}}
			>
				<span class="cell center index">
					<span class="resting" class:muted={!(active && player.playing)}>
						{#if active}
							<Icon name={player.playing ? 'music-2' : 'pause'} size={10} />
						{:else}
							{row + 1}
						{/if}
					</span>
					<span class="hit"><Icon name="play" size={10} /></span>
				</span>
				<span class="cell title">
					<span class="name">{track.title}</span>
					<span class="like" class:kept={player.likes(track.id)}><Like id={track.id} small /></span>
				</span>
				<span class="cell muted">{album.artist}</span>
				<span class="cell muted">{track.plays}</span>
				<span class="cell right muted">{clock(track.length)}</span>
			</div>
		{/each}
	</div>
</div>

<style>
	.screen {
		flex: 1;
		min-width: 0;
		padding: 24px 0;
		overflow: hidden;
		background: var(--m-background);
	}

	.hero {
		display: flex;
		align-items: flex-end;
		gap: 17.5px;
		padding: 0 24px 21px;
	}

	.cover {
		flex: none;
		width: 140px;
		height: 140px;
		border-radius: 15px;
		object-fit: cover;
	}

	.text {
		display: flex;
		flex: 1;
		min-width: 0;
		height: 140px;
		flex-direction: column;
		justify-content: flex-end;
		gap: 7px;
		line-height: 1.25;
	}

	.eyebrow {
		font-size: 12px;
		font-weight: 600;
		text-transform: uppercase;
		color: var(--m-muted-foreground);
	}

	h1 {
		margin: 0;
		font-size: 30px;
		font-weight: 700;
		letter-spacing: normal;
	}

	.meta {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		min-width: 0;
		gap: 3.5px;
		margin: 0;
		font-size: 12px;
		color: var(--m-muted-foreground);
	}

	.part {
		display: flex;
		flex: none;
		align-items: center;
		gap: 3.5px;
	}

	.actions {
		display: flex;
		align-items: center;
		gap: 7px;
		padding-top: 3.5px;
	}

	.head,
	.row {
		display: grid;
		align-items: center;
		width: 100%;
		border: 0;
		border-bottom: 1px solid var(--m-table-row-border);
		background: none;
		color: inherit;
		font: inherit;
		text-align: left;
	}

	.head {
		height: 32px;
		background: var(--m-table-head);
		color: var(--m-table-head-foreground);
	}

	.row {
		height: 42px;
		cursor: pointer;
	}

	.row:hover {
		background: var(--m-table-hover);
	}

	.row.active {
		background: var(--m-muted);
	}

	.cell {
		display: flex;
		align-items: center;
		gap: 3.5px;
		min-width: 0;
		padding: 0 8px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.frame {
		flex: 1;
		display: flex;
		min-width: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.center,
	.frame.center {
		justify-content: center;
	}

	.right,
	.frame.right {
		justify-content: flex-end;
	}

	.muted {
		color: var(--m-muted-foreground);
	}

	.index {
		position: relative;
	}

	.title {
		gap: 5.25px;
	}

	.name {
		min-width: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.like {
		display: flex;
		visibility: hidden;
	}

	.row:hover .like,
	.like.kept {
		visibility: visible;
	}

	.resting,
	.hit {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 18px;
		height: 18px;
	}

	.hit {
		position: absolute;
		visibility: hidden;
	}

	.row:hover .resting {
		visibility: hidden;
	}

	.row:hover .hit {
		visibility: visible;
	}
</style>
