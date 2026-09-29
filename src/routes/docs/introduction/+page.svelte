<script lang="ts">
	import { onMount } from 'svelte';
	import { groups } from '$lib/data/docs';

	/** Every docs group with this page left out, and any group that ends up empty dropped. */
	const rest = groups
		.map((group) => ({
			...group,
			pages: group.pages.filter((entry) => entry.slug !== 'introduction')
		}))
		.filter((group) => group.pages.length);

	let mac = $state(false);

	onMount(() => {
		mac = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
	});
</script>

<svelte:head>
	<title>Introduction · Sonora docs</title>
</svelte:head>

<h1>Introduction</h1>
<p class="summary">
	These docs explain how Sonora works once it's installed. If you haven't installed it yet, the
	<a href="/#steps">install steps</a> are on the home page.
</p>

<h2 id="faq">Something broken? Start with the FAQ</h2>
<p>
	The <a href="/faq">FAQ</a> covers the problems people run into most, like macOS saying the app is damaged,
	no sound on Linux or a Spotify account that won't sign in. Most answers are a line or two, so check
	there before digging through the docs.
</p>

<h2 id="contents">What's in the docs</h2>
<table>
	<tbody>
		{#each rest as group (group.label)}
			<tr>
				<th colspan="2">{group.label}</th>
			</tr>
			{#each group.pages as entry (entry.slug)}
				<tr>
					<td><a href="/docs/{entry.slug}">{entry.title}</a></td>
					<td>{entry.summary}</td>
				</tr>
			{/each}
		{/each}
	</tbody>
</table>

<h2 id="search">Finding things</h2>
<p>
	Press <kbd>{mac ? '⌘' : 'Ctrl'}</kbd> <kbd>K</kbd> anywhere in the docs or the FAQ to search both. Results
	jump straight to the section that matches.
</p>
