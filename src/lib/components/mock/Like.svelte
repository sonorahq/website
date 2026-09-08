<script>
	import { player } from '$lib/mock/player.svelte.js';
	import Control from './Control.svelte';

	let { id, small = false } = $props();

	const on = $derived(player.likes(id));
</script>

<span class="like" class:on>
	<Control
		icon={on ? 'heart-filled' : 'heart'}
		title={on ? 'Remove from library' : 'Add to library'}
		{small}
		muted={!on}
		onclick={(/** @type {MouseEvent} */ event) => {
			event.stopPropagation();
			player.toggleLike(id);
		}}
	/>
</span>

<style>
	.like {
		display: flex;
		flex: none;
	}

	.on {
		color: var(--m-primary);
	}

	.on :global(button) {
		color: inherit;
	}
</style>
