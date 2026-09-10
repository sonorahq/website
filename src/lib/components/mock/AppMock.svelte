<script>
	import { onDestroy } from 'svelte';
	import { shelf } from '$lib/mock/album.js';
	import { player } from '$lib/mock/player.svelte.js';
	import { reach } from '$lib/mock/packs.svelte.js';
	import { palette } from '$lib/mock/theme.js';
	import { route } from '$lib/mock/route.svelte.js';
	import { settings } from '$lib/mock/settings.svelte.js';
	import Aside from './Aside.svelte';
	import Detail from './Detail.svelte';
	import Artist from './screens/Artist.svelte';
	import History from './screens/History.svelte';
	import Home from './screens/Home.svelte';
	import Library from './screens/Library.svelte';
	import Playlist from './screens/Playlist.svelte';
	import Search from './screens/Search.svelte';
	import Settings from './screens/Settings.svelte';
	import PlayerBar from './PlayerBar.svelte';
	import Sidebar from './Sidebar.svelte';
	import TitleBar from './TitleBar.svelte';

	const WIDTH = 1180;
	const HEIGHT = 730;
	const FLOOR = 0.62;
	const FADE = 320;
	const DIM = new Set(['Dark', 'Midnight', 'Forest', 'Ocean', 'Rose', 'Lavender', 'Amber']);

	let left = $state(true);
	let right = $state(true);
	let room = $state(WIDTH);
	let tab = $state('queue');

	const at = $derived(route.now);

	const scale = $derived(Math.min(Math.max(room / WIDTH, FLOOR), 1));

	const tint = $derived(shelf.get(player.track.album)?.tint ?? shelf.get('nocturnes')?.tint);
	const tokens = $derived(palette(tint, settings.adaptive, settings.theme));
	const scheme = $derived(
		settings.theme === 'System' ? undefined : DIM.has(settings.theme) ? 'dark' : 'light'
	);
	const style = $derived(
		Object.entries(tokens)
			.map(([name, value]) => `${name}:${value}`)
			.join(';')
	);

	const still = $derived(settings.motion === 'Never');
	const content = $derived(WIDTH - (left ? 196 : 0) - (right ? 255 : 0));

	let fading = $state(false);
	let settle = 0;

	$effect(() => {
		reach(settings.icons);
	});

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
		<div
			class="app"
			class:fading={fading && !still}
			class:still
			{style}
			style:color-scheme={scheme}
			style:--m-radius="{settings.radius}px"
			style:transform="scale({scale})"
		>
			<TitleBar bind:left bind:right />
			<div class="body">
				{#if left}
					<Sidebar />
				{/if}
				{#if at.screen === 'home'}
					<Home />
				{:else if at.screen === 'search'}
					<Search room={content} />
				{:else if at.screen === 'library'}
					<Library shelf="library" tab={at.tab ?? 'Songs'} />
				{:else if at.screen === 'local'}
					<Library shelf="local" tab={at.tab ?? 'Songs'} />
				{:else if at.screen === 'history'}
					<History />
				{:else if at.screen === 'settings'}
					<Settings tab={at.tab ?? 'General'} />
				{:else if at.screen === 'artist'}
					<Artist id={at.id ?? 'chopin'} />
				{:else if at.screen === 'playlist'}
					<Playlist id={at.id ?? 'quiet-hours'} />
				{:else}
					<Detail id={at.id ?? 'airs'} />
				{/if}
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

	.still,
	.still :global(*) {
		transition: none !important;
		animation: none !important;
	}

	@media (prefers-reduced-motion: reduce) {
		.fading,
		.fading :global(*) {
			transition: none;
		}
	}
</style>
