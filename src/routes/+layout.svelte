<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.css';
	import SiteFooter from '$lib/components/SiteFooter.svelte';
	import SiteHeader from '$lib/components/SiteHeader.svelte';
	import { anchors } from '$lib/anchors';
	import { ADAPTIVE, scheme, stylesheet, tokens } from '$lib/scheme.svelte';
	import { DEFAULT_TINT, site } from '$lib/tint.svelte';

	import type { LayoutProps } from './$types';

	let { children, data }: LayoutProps = $props();

	/** Every scheme's colours, written once into the head so the saved one applies before the first paint. */
	const schemes = `<style>${stylesheet()}</style>`;

	/** On the adaptive scheme the page follows the cover playing in the app mock, and the tokens ease to it. */
	$effect(() => {
		const style = document.documentElement.style;
		const follow = scheme.current === ADAPTIVE && site.tint !== DEFAULT_TINT;
		for (const [name, value] of Object.entries(tokens(ADAPTIVE, site.tint))) {
			if (follow) style.setProperty(name, value);
			else style.removeProperty(name);
		}
	});

	onMount(() => {
		scheme.sync();
		if (!location.hash) requestAnimationFrame(() => scrollTo(0, 0));
		return anchors();
	});
</script>

<svelte:head>
	{@html schemes}
</svelte:head>

<SiteHeader stars={data.stars} />

<div class="page-column">
	{@render children()}
	<SiteFooter />
</div>
