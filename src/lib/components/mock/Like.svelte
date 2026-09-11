<script lang="ts">
	import { player } from '$lib/mock/player.svelte';
	import Control from './Control.svelte';

	let { id, small = false }: { id: string; small?: boolean } = $props();

	const on = $derived(player.likes(id));
</script>

<Control
	icon={on ? 'heart-filled' : 'heart'}
	title={on ? 'Remove from library' : 'Add to library'}
	{small}
	tint={on ? 'primary' : 'muted'}
	onclick={(event: MouseEvent) => {
		event.stopPropagation();
		player.toggleLike(id);
	}}
/>
