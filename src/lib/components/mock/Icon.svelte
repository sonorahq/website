<script>
	import { icons } from '$lib/mock/icons.js';

	let { name, size = 16 } = $props();
</script>

<svg
	width={size}
	height={size}
	viewBox="0 0 24 24"
	fill="none"
	stroke="currentColor"
	stroke-width="2"
	stroke-linecap="round"
	stroke-linejoin="round"
	aria-hidden="true">{@html icons.get(name) ?? ''}</svg
>

<style>
	svg {
		flex: none;
	}
</style>
