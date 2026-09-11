<script>
	import About from '$lib/components/About.svelte';
	import Community from '$lib/components/Community.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import Install from '$lib/components/Install.svelte';
	import Preview from '$lib/components/Preview.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>Sonora</title>
	<meta
		name="description"
		content="A native music streaming client for Spotify, YouTube Music, Subsonic and local files. Written in Rust with GPUI. Free software for macOS, Linux and Windows."
	/>
</svelte:head>

<Hero version={data.version} />
<Preview />
<Install />
<About />
<Community languages={data.languages} strings={data.strings} done={data.done} />
