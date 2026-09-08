<script>
	import { clock } from '$lib/mock/album.js';
	import { player } from '$lib/mock/player.svelte.js';
	import Control from './Control.svelte';
	import Cover from './Cover.svelte';
	import Like from './Like.svelte';
	import Scrubber from './Scrubber.svelte';

	let { tab = $bindable() } = $props();

	const level = $derived(
		player.volume <= 0.0001
			? 'volume-x'
			: player.volume < 0.25
				? 'volume'
				: player.volume < 0.5
					? 'volume-1'
					: 'volume-2'
	);
</script>

<div class="bar">
	<div class="now">
		<Cover src={player.track.cover} size={42} />
		<span class="text">
			<span class="title">{player.track.title}</span>
			<span class="caption">{player.track.artist}</span>
		</span>
		<Like id={player.id} small />
	</div>

	<div class="center">
		<div class="transport">
			<Control
				icon="shuffle"
				title="Shuffle"
				small
				muted={!player.shuffle}
				onclick={() => player.toggleShuffle()}
			/>
			<Control icon="skip-back" title="Previous track" small onclick={() => player.previous()} />
			<Control
				icon={player.playing ? 'pause' : 'play'}
				title={player.playing ? 'Pause' : 'Play'}
				small
				onclick={() => player.toggle()}
			/>
			<Control icon="skip-forward" title="Next track" small onclick={() => player.next()} />
			<Control
				icon={player.repeat === 2 ? 'repeat-one' : 'repeat'}
				title="Repeat"
				small
				muted={player.repeat === 0}
				onclick={() => player.cycleRepeat()}
			/>
		</div>

		<div class="seek">
			<span class="clock">{clock(player.elapsed)}</span>
			<div class="rail">
				<Scrubber
					fraction={player.progress}
					label="Seek"
					onseek={(/** @type {number} */ to) => player.seek(to)}
				/>
			</div>
			<span class="clock">{clock(player.track.length)}</span>
		</div>
	</div>

	<div class="side">
		<Control
			icon="mic-vocal"
			title="Lyrics"
			small
			muted={tab !== 'lyrics'}
			selected={tab === 'lyrics'}
			onclick={() => (tab = 'lyrics')}
		/>
		<Control
			icon="list-music"
			title="Queue"
			small
			muted={tab !== 'queue'}
			selected={tab === 'queue'}
			onclick={() => (tab = 'queue')}
		/>
		<Control icon={level} title="Volume" small muted />
		<div class="volume">
			<Scrubber
				fraction={player.volume}
				label="Volume"
				onseek={(/** @type {number} */ to) => player.setVolume(to)}
			/>
		</div>
		<Control icon="maximize" title="Fullscreen" small muted />
	</div>
</div>

<style>
	.bar {
		display: flex;
		flex: none;
		align-items: center;
		gap: 16px;
		height: 76px;
		padding: 0 20px;
		background: var(--m-secondary);
		border-top: 1px solid var(--m-border);
	}

	.now {
		display: flex;
		flex: 1;
		min-width: 0;
		align-items: center;
		gap: 12px;
	}

	.text {
		display: flex;
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

	.center {
		display: flex;
		flex: 1;
		min-width: 0;
		max-width: 560px;
		flex-direction: column;
		align-items: center;
		gap: 4px;
	}

	.transport {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.seek {
		display: flex;
		width: 100%;
		align-items: center;
		gap: 8px;
	}

	.rail {
		flex: 1;
		min-width: 0;
	}

	.clock {
		flex: none;
		font-size: 10.8px;
		color: var(--m-muted-foreground);
	}

	.side {
		display: flex;
		flex: 1;
		min-width: 0;
		align-items: center;
		justify-content: flex-end;
		gap: 8px;
	}

	.volume {
		width: 110px;
		flex: none;
	}
</style>
