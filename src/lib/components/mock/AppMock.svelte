<script>
	import { onDestroy } from 'svelte';
	import { shelf } from '$lib/mock/album.js';
	import { player } from '$lib/mock/player.svelte.js';
	import { palette } from '$lib/mock/theme.js';
	import Aside from './Aside.svelte';
	import Detail from './Detail.svelte';
	import PlayerBar from './PlayerBar.svelte';
	import Sidebar from './Sidebar.svelte';
	import TitleBar from './TitleBar.svelte';

	const WIDTH = 1180;
	const HEIGHT = 730;
	const FLOOR = 0.62;
	const FADE = 320;

	let left = $state(true);
	let right = $state(true);
	let room = $state(WIDTH);
	let tab = $state('queue');

	const scale = $derived(Math.min(Math.max(room / WIDTH, FLOOR), 1));

	const tint = $derived(shelf.get(player.track.album)?.tint ?? shelf.get('nocturnes')?.tint);
	const tokens = $derived(tint ? palette(tint) : {});
	const style = $derived(
		Object.entries(tokens)
			.map(([name, value]) => `${name}:${value}`)
			.join(';')
	);

	let fading = $state(false);
	let settle = 0;

	$effect(() => {
		void tint;
		fading = true;
		clearTimeout(settle);
		settle = setTimeout(() => (fading = false), FADE + 20);
		return () => clearTimeout(settle);
	});

	onDestroy(() => player.release());
</script>

<div class="stage" bind:clientWidth={room} style:height="{HEIGHT * scale}px">
	<div class="sizer" style:width="{WIDTH * scale}px" style:height="{HEIGHT * scale}px">
		<div class="app" class:fading {style} style:transform="scale({scale})">
			<TitleBar bind:left bind:right />
			<div class="body">
				{#if left}
					<Sidebar />
				{/if}
				<Detail />
				{#if right}
					<Aside {tab} />
				{/if}
			</div>
			<PlayerBar bind:tab />
		</div>
	</div>
</div>

<style>
	.stage {
		width: 100%;
		overflow-x: auto;
		overflow-y: hidden;
		overscroll-behavior-x: contain;
	}

	.sizer {
		margin: 0 auto;
		overflow: hidden;
	}

	.app {
		display: flex;
		width: 1180px;
		height: 730px;
		flex-direction: column;
		transform-origin: top left;
		overflow: hidden;
		font-size: 14px;
		line-height: 1.618;
		letter-spacing: normal;
		color: var(--m-foreground);
		background: var(--m-background);
		user-select: none;

		--m-radius: 10px;
	}

	.body {
		display: flex;
		flex: 1;
		min-height: 0;
	}

	.fading,
	.fading :global(*) {
		transition:
			background-color 320ms cubic-bezier(0.33, 1, 0.68, 1),
			border-color 320ms cubic-bezier(0.33, 1, 0.68, 1),
			color 320ms cubic-bezier(0.33, 1, 0.68, 1);
	}

	@media (prefers-reduced-motion: reduce) {
		.fading,
		.fading :global(*) {
			transition: none;
		}
	}
</style>
