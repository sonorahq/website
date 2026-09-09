<script>
	import { player } from '$lib/mock/player.svelte.js';
	import Control from './Control.svelte';

	let { id, small = false } = $props();

	const on = $derived(player.likes(id));
</script>

<Control
	icon={on ? 'heart-filled' : 'heart'}
	title={on ? 'Remove from library' : 'Add to library'}
	{small}
	tint={on ? 'primary' : 'muted'}
	onclick={(/** @type {MouseEvent} */ event) => {
		event.stopPropagation();
		player.toggleLike(id);
	}}
/>
