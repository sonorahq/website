<script>
	import { onDestroy } from 'svelte';
	import { player } from '$lib/mock/player.svelte.js';
	import Aside from './Aside.svelte';
	import Detail from './Detail.svelte';
	import PlayerBar from './PlayerBar.svelte';
	import Sidebar from './Sidebar.svelte';
	import TitleBar from './TitleBar.svelte';

	const WIDTH = 1180;
	const HEIGHT = 730;
	// Below this the interface stops being readable; the stage scrolls sideways instead.
	const FLOOR = 0.62;

	let left = $state(true);
	let right = $state(true);
	let room = $state(WIDTH);
	let tab = $state('queue');

	const scale = $derived(Math.max(room / WIDTH, FLOOR));

	onDestroy(() => player.release());
</script>

<div class="stage" bind:clientWidth={room} style:height="{HEIGHT * scale}px">
	<div class="sizer" style:width="{WIDTH * scale}px" style:height="{HEIGHT * scale}px">
		<div class="app" style:transform="scale({scale})">
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

	/* A transform leaves the layout box at full size, so the sizer is what the
	   stage actually scrolls over. */
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
		line-height: 1.25;
		letter-spacing: normal;
		color: var(--m-foreground);
		background: var(--m-background);
		user-select: none;

		--m-radius: 6px;

		/* Theme::dark() and Theme::light() from crates/ui/src/theme.rs, tinted by the
		   cover through the same wash the app runs in crates/ui/src/palette.rs. */
		--m-background: hsl(202.9 29.6% 3.9%);
		--m-foreground: hsl(202.9 7.1% 98%);
		--m-border: hsl(202.9 23.7% 14.9%);
		--m-muted: hsl(202.9 29.6% 14.9%);
		--m-muted-foreground: hsl(202.9 7.1% 45.1%);
		--m-secondary: hsl(202.9 29.6% 9%);
		--m-secondary-hover: hsl(202.9 29.6% 13.7%);
		--m-secondary-active: hsl(202.9 29.6% 18.8%);
		--m-primary: hsl(202.9 60% 72%);
		--m-primary-foreground: hsl(202.9 25% 8%);
		--m-primary-hover: hsl(202.9 60% 82%);
		--m-progress-bar: hsl(202.9 60% 72%);
		--m-sidebar: hsl(202.9 29.6% 3.9%);
		--m-sidebar-accent: hsl(202.9 29.6% 14.9%);
		--m-sidebar-border: hsl(202.9 23.7% 14.9%);
		--m-title-bar-border: hsl(202.9 23.7% 14.9%);
		--m-table-head: hsl(202.9 29.6% 9% / 0.8);
		--m-table-head-foreground: hsl(202.9 7.1% 32.2%);
		--m-table-row-border: hsl(202.9 23.7% 14.9% / 0.7);
		--m-table-hover: hsl(202.9 29.6% 14.9%);
		--m-table-active: hsl(202.9 60% 44% / 0.22);
		--m-background: light-dark(hsl(202.9 29.6% 98%), hsl(202.9 29.6% 3.9%));
		--m-foreground: light-dark(hsl(202.9 7.1% 9%), hsl(202.9 7.1% 98%));
		--m-border: light-dark(hsl(202.9 23.7% 83.1%), hsl(202.9 23.7% 14.9%));
		--m-muted: light-dark(hsl(202.9 29.6% 89.8%), hsl(202.9 29.6% 14.9%));
		--m-muted-foreground: light-dark(hsl(202.9 7.1% 45.1%), hsl(202.9 7.1% 45.1%));
		--m-secondary: light-dark(hsl(202.9 29.6% 96.1%), hsl(202.9 29.6% 9%));
		--m-secondary-hover: light-dark(hsl(202.9 29.6% 89.8%), hsl(202.9 29.6% 13.7%));
		--m-secondary-active: light-dark(hsl(202.9 29.6% 83.1%), hsl(202.9 29.6% 18.8%));
		--m-primary: light-dark(hsl(202.9 60% 42%), hsl(202.9 60% 72%));
		--m-primary-foreground: light-dark(hsl(202.9 25% 98%), hsl(202.9 25% 8%));
		--m-primary-hover: light-dark(hsl(202.9 60% 34%), hsl(202.9 60% 82%));
		--m-progress-bar: light-dark(hsl(202.9 60% 42%), hsl(202.9 60% 72%));
		--m-sidebar: light-dark(hsl(202.9 29.6% 96.1%), hsl(202.9 29.6% 3.9%));
		--m-sidebar-accent: light-dark(hsl(202.9 29.6% 89.8%), hsl(202.9 29.6% 14.9%));
		--m-sidebar-border: light-dark(hsl(202.9 23.7% 83.1%), hsl(202.9 23.7% 14.9%));
		--m-title-bar-border: light-dark(hsl(202.9 23.7% 83.1%), hsl(202.9 23.7% 14.9%));
		--m-table-head: light-dark(hsl(202.9 29.6% 96.1% / 0.9), hsl(202.9 29.6% 9% / 0.8));
		--m-table-head-foreground: light-dark(hsl(202.9 7.1% 45.1%), hsl(202.9 7.1% 32.2%));
		--m-table-row-border: light-dark(hsl(202.9 23.7% 83.1% / 0.7), hsl(202.9 23.7% 14.9% / 0.7));
		--m-table-hover: light-dark(hsl(202.9 29.6% 94.1%), hsl(202.9 29.6% 14.9%));
		--m-table-active: light-dark(hsl(202.9 60% 50% / 0.22), hsl(202.9 60% 44% / 0.22));
	}

	.body {
		display: flex;
		flex: 1;
		min-height: 0;
	}
</style>
