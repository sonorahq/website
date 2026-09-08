<script>
	import '../app.css';
	import SiteFooter from '$lib/components/SiteFooter.svelte';
	import SiteHeader from '$lib/components/SiteHeader.svelte';

	let { children, data } = $props();
</script>

<SiteHeader stars={data.stars} />

{@render children()}

<SiteFooter />
