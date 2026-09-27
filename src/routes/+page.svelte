<script>
	import Community from '$lib/components/Community.svelte';
	import Features from '$lib/components/Features.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import Preview from '$lib/components/Preview.svelte';
	import Themes from '$lib/components/Themes.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>Sonora — your whole library, one native app</title>
	<meta
		name="description"
		content="Sonora plays Apple Music, Spotify, YouTube Music, Deezer, Subsonic and your local files from a single window. Written in Rust on GPU-accelerated GPUI."
	/>
</svelte:head>

<Hero />
<Preview />
<Features />
<Themes />
<Community languages={data.languages} strings={data.strings} done={data.done} />
