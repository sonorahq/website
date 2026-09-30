<script lang="ts">
	import { website } from '$lib/data/links';
	import Mark from './Mark.svelte';

	/** `path` is the page's source file relative to the root of the website repository. */
	let { path }: { path: string } = $props();
</script>

<a class="edit" href="{website}/edit/main/{path}">
	<Mark name="github" size={14} />
	Edit this page on GitHub
</a>

<style>
	.edit {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		font-size: 13.5px;
		color: var(--muted-fg);
	}

	.edit:hover {
		color: var(--fg);
	}
</style>
