<script>
	import Community from '$lib/components/Community.svelte';
	import Features from '$lib/components/Features.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import Install from '$lib/components/Install.svelte';
	import Playground from '$lib/components/Playground.svelte';
	import Providers from '$lib/components/Providers.svelte';
	import Themes from '$lib/components/Themes.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>Sonora — your whole library, one native app</title>
	<meta
		name="description"
		content="Sonora plays Spotify, YouTube Music, Subsonic and your local files from a single window. Written in Rust on GPU-accelerated GPUI."
	/>
</svelte:head>

<Hero />
<Providers />
<Playground />
<Install />
<Features />
<Themes />
<Community languages={data.languages} strings={data.strings} done={data.done} />
