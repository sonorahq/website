<script lang="ts">
	import { icons } from '$lib/mock/icons';
	import Mark from './Mark.svelte';

	let { name, size = 15 }: { name: string; size?: number } = $props();

	/* line glyphs the app mock does not carry */
	const extra = new Map([
		[
			'server',
			'<rect x="2" y="3" width="20" height="8" rx="2"/><rect x="2" y="13" width="20" height="8" rx="2"/><path d="M6 7h.01"/><path d="M6 17h.01"/>'
		],
		[
			'audio-lines',
			'<path d="M2 10v3"/><path d="M6 6v11"/><path d="M10 3v18"/><path d="M14 8v7"/><path d="M18 5v13"/><path d="M22 10v3"/>'
		],
		[
			'languages',
			'<path d="M3 6h11"/><path d="M8.5 4v2"/><path d="M11 6a9 9 0 0 1-7 9"/><path d="M6 11a9 9 0 0 0 6 4"/><path d="m12 20 4.5-9 4.5 9"/><path d="M14 17h5"/>'
		],
		[
			'palette',
			'<path d="M12 21a9 9 0 1 1 9-9c0 1.66-1.34 3-3 3h-1.2a2.3 2.3 0 0 0-1.6 3.95A1.9 1.9 0 0 1 13.9 21Z"/><path d="M8 9h.01"/><path d="M11.5 7h.01"/><path d="M15.5 9h.01"/>'
		],
		['type', '<path d="M4 7V4h16v3"/><path d="M9 20h6"/><path d="M12 4v16"/>'],
		[
			'grid',
			'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/>'
		],
		['blend', '<circle cx="9" cy="9" r="7"/><circle cx="15" cy="15" r="7"/>'],
		[
			'blur',
			'<circle cx="12" cy="12" r="3.5"/><circle cx="12" cy="12" r="8" stroke-dasharray="2 3"/>'
		],
		[
			'folder-open',
			'<path d="M6 14.5 7.4 11.6A2 2 0 0 1 9.2 10.5H21a1 1 0 0 1 .95 1.3l-1.7 5.7a2 2 0 0 1-1.9 1.5H4a2 2 0 0 1-2-2V5.5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.7.9l.8 1.2a2 2 0 0 0 1.6.9H18a2 2 0 0 1 2 2v2"/>'
		],
		['terminal', '<path d="m4 17 6-6-6-6"/><path d="M12 19h8"/>']
	]);

	const brands = new Set(['apple', 'windows', 'discord']);
	const solid = new Set(['spotify', 'youtubemusic']);
	const markup = $derived(extra.get(name) ?? icons.get(name) ?? '');
</script>

{#if brands.has(name)}
	<Mark {name} {size} />
{:else}
	<svg
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill={solid.has(name) ? 'currentColor' : 'none'}
		stroke={solid.has(name) ? 'none' : 'currentColor'}
		stroke-width="1.7"
		stroke-linecap="round"
		stroke-linejoin="round"
		aria-hidden="true">{@html markup}</svg
	>
{/if}

<style>
	svg {
		flex: none;
	}
</style>
