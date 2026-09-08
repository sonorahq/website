<script>
	import { album, clock, columns, total, tracks } from '$lib/mock/album.js';
	import { player } from '$lib/mock/player.svelte.js';
	import Control from './Control.svelte';
	import Icon from './Icon.svelte';

	const template = columns.map((column) => column.width).join(' ');
	const meta = `${album.artist} • ${album.released} • ${tracks.length} songs • ${clock(total)}`;
</script>

<div class="screen">
	<header class="hero">
		<img class="cover" src={album.cover} width="140" height="140" alt="" />
		<div class="text">
			<span class="eyebrow">{album.eyebrow}</span>
			<h1>{album.title}</h1>
			<p class="meta">{meta}</p>
			<div class="actions">
				<Control
					variant="primary"
					icon={player.playing ? 'pause' : 'play'}
					label={player.playing ? 'Pause' : 'Play'}
					onclick={() => player.toggle()}
				/>
				<Control variant="outline" icon="heart" title="Add to library" />
				<Control variant="outline" icon="ellipsis" title="More" />
			</div>
		</div>
	</header>

	<div class="table" style:--m-template={template}>
		<div class="head">
			{#each columns as column (column.key)}
				<span class="cell">
					<span class="frame {column.align ?? ''}">{column.label}</span>
					{#if column.sortable}<Icon name="chevrons-up-down" size={12} />{/if}
				</span>
			{/each}
		</div>

		{#each tracks as track, row (track.title)}
			{@const active = row === player.index}
			<button type="button" class="row" class:active onclick={() => player.select(row)}>
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
				<span class="cell title">{track.title}</span>
				<span class="cell muted">{album.artist}</span>
				<span class="cell muted">{track.plays}</span>
				<span class="cell right muted">{clock(track.length)}</span>
			</button>
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
		gap: 20px;
		padding: 0 24px 24px;
	}

	.cover {
		flex: none;
		width: 140px;
		height: 140px;
		border-radius: 9px;
		object-fit: cover;
	}

	.text {
		display: flex;
		flex: 1;
		min-width: 0;
		height: 140px;
		flex-direction: column;
		justify-content: flex-end;
		gap: 8px;
		line-height: 1.25;
	}

	.eyebrow {
		font-size: 11.9px;
		font-weight: 600;
		letter-spacing: 0.02em;
		text-transform: uppercase;
		color: var(--m-muted-foreground);
	}

	h1 {
		margin: 0;
		font-size: 30px;
		font-weight: 700;
		letter-spacing: -0.02em;
	}

	.meta {
		margin: 0;
		font-size: 11.9px;
		color: var(--m-muted-foreground);
	}

	.actions {
		display: flex;
		align-items: center;
		gap: 8px;
		padding-top: 4px;
	}

	.head,
	.row {
		display: grid;
		grid-template-columns: var(--m-template);
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
		gap: 4px;
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

	.resting,
	.hit {
		display: flex;
		align-items: center;
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
