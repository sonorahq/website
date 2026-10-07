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
		[
			'file-text',
			'<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>'
		],
		[
			'sliders-vertical',
			'<path d="M5 21v-7"/><path d="M5 10V3"/><path d="M12 21v-9"/><path d="M12 8V3"/><path d="M19 21v-5"/><path d="M19 12V3"/><path d="M3 14h4"/><path d="M10 8h4"/><path d="M17 16h4"/>'
		],
		['terminal', '<path d="m4 17 6-6-6-6"/><path d="M12 19h8"/>'],
		['circle-plus', '<circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/>'],
		['circle-minus', '<circle cx="12" cy="12" r="10"/><path d="M8 12h8"/>'],
		['circle-dot', '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="1"/>'],
		[
			'refresh-cw',
			'<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/>'
		],
		[
			'wrench',
			'<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>'
		]
	]);

	const brands = new Set([
		'apple',
		'windows',
		'linux',
		'discord',
		'subsonic',
		'lastfm',
		'librefm',
		'listenbrainz',
		'maloja'
	]);
	const solid = new Set(['spotify', 'youtubemusic', 'applemusic']);
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
