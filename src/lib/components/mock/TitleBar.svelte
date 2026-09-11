<script lang="ts">
	import { route } from '$lib/mock/route.svelte';
	import Control from './Control.svelte';

	let { left = $bindable(), right = $bindable() }: { left: boolean; right: boolean } = $props();

	const at = $derived(route.now);
	const listing = $derived(
		at.screen === 'album' ||
			at.screen === 'playlist' ||
			at.screen === 'history' ||
			((at.screen === 'library' || at.screen === 'local') && at.tab === 'Songs')
	);
	const carded = $derived((at.screen === 'library' || at.screen === 'local') && at.tab !== 'Songs');
	const filed = $derived(listing || carded);
</script>

<div class="bar">
	<div class="leading" style:width={left ? '195px' : undefined}>
		<Control
			icon={left ? 'panel-left-close' : 'panel-left-open'}
			title="Toggle sidebar"
			small
			onclick={() => (left = !left)}
		/>
	</div>

	<div class="middle">
		<div class="history">
			<Control
				icon="chevron-left"
				title="Back"
				size={28}
				disabled={!route.behind}
				onclick={() => route.back()}
			/>
			<Control
				icon="chevron-right"
				title="Forward"
				size={28}
				disabled={!route.ahead}
				onclick={() => route.forward()}
			/>
		</div>

		<div class="tools">
			{#if carded && at.tab === 'Playlists'}
				<Control icon="plus" title="New playlist" small />
			{/if}
			{#if listing}
				<Control icon="columns-3" title="Columns" small />
			{/if}
			{#if filed}
				<Control icon="funnel" title="Filters" small tint="muted" />
				<Control icon="arrow-up-down" title="Sort" small tint="muted" />
			{/if}
			{#if carded}
				<Control icon="list" title="List view" small />
			{/if}
			{#if filed}
				<Control icon="search" title="Search" small />
			{/if}
		</div>
	</div>

	<div class="trail">
		<Control
			icon={right ? 'panel-right-close' : 'panel-right-open'}
			title="Show or hide lyrics and queue"
			small
			selected={right}
			onclick={() => (right = !right)}
		/>
	</div>
</div>

<style>
	.bar {
		display: flex;
		flex: none;
		align-items: center;
		height: 36px;
		background: var(--m-background);
		border-bottom: 1px solid var(--m-title-bar-border);
	}

	.leading {
		display: flex;
		flex: none;
		align-items: center;
		gap: 3.5px;
		padding-left: 12px;
		padding-right: 10.5px;
	}

	.middle {
		display: flex;
		flex: 1;
		min-width: 0;
		align-items: center;
		gap: 3.5px;
		padding-right: 10.5px;
	}

	.history,
	.tools {
		display: flex;
		align-items: center;
		gap: 3.5px;
	}

	.tools {
		flex: 1;
		min-width: 0;
		justify-content: flex-end;
	}

	.trail {
		display: flex;
		flex: none;
		align-items: center;
		padding-right: 10.5px;
	}
</style>
