<script lang="ts">
	import type { Hit } from '$lib/mock/screens';
	import { clock } from '$lib/mock/album';
	import { player } from '$lib/mock/player.svelte';
	import Card from './Card.svelte';

	let {
		hit,
		compact = false,
		onopen
	}: { hit: Hit; compact?: boolean; onopen: (hit: Hit) => void } = $props();

	const current = $derived(!!hit.track && player.id === hit.track.id);
	const meta = $derived(
		compact
			? `${hit.kind} · ${hit.meta}`
			: hit.kind === 'Artist' || hit.kind === 'Playlist'
				? hit.kind
				: hit.meta
	);
</script>

<Card
	circle={hit.circle}
	underline={!hit.track}
	tint={current ? 'var(--m-primary)' : ''}
	title={hit.title}
	{meta}
	cover={hit.cover}
	fallback={hit.fallback}
	trailing={hit.track ? clock(hit.track.length) : ''}
	playing={current && player.playing}
	onplay={hit.track ? () => onopen(hit) : undefined}
	onpress={() => onopen(hit)}
/>
