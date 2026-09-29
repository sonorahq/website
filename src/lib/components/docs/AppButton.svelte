<script lang="ts">
	import type { Snippet } from 'svelte';

	/** A label drawn like one of Sonora's settings buttons, so prose can point at a button the reader will recognize. It does nothing when clicked. */
	let { children }: { children: Snippet } = $props();
</script>

<span>{@render children()}</span>

<style>
	span {
		display: inline-flex;
		align-items: center;
		height: 26px;
		padding: 0 8.75px;
		border: 1px solid var(--border);
		border-radius: 10px;
		color: var(--fg);
		font-size: 12px;
		line-height: 1;
		white-space: nowrap;
		vertical-align: middle;
	}
</style>
