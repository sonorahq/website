<script>
	import { onMount } from 'svelte';
	import '../app.css';
	import SiteFooter from '$lib/components/SiteFooter.svelte';
	import SiteHeader from '$lib/components/SiteHeader.svelte';
	import { anchors } from '$lib/anchors.js';

	let { children, data } = $props();

	onMount(() => {
		if (!location.hash) requestAnimationFrame(() => scrollTo(0, 0));
		return anchors();
	});
</script>

<SiteHeader stars={data.stars} />

{@render children()}

<SiteFooter />
