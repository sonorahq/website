<script lang="ts">
	import { repo } from '$lib/data/links';
	import { areas } from '$lib/data/roadmap';

	let { data } = $props();

	const done = $derived(new Set(data.done));
</script>

<svelte:head>
	<title>Roadmap · Sonora docs</title>
</svelte:head>

<h1>Roadmap</h1>
<p class="summary">
	What we're working toward, grouped by area. A line gets crossed out once it ships in a release,
	its issue closes as done or its pull request merges.
</p>

<p class="note">
	The order means nothing. For what won't be built at all, see <a href="/docs/vision">Vision</a>.
</p>

{#each areas as area (area.id)}
	<h2 id={area.id}>{area.title}</h2>
	<ul class="entries">
		{#each area.entries as entry (entry.text)}
			{@const shipped = entry.done != null || done.has(entry.issue ?? entry.pull ?? 0)}
			<li class:done={shipped}>
				{#if shipped}<s>{entry.text}</s>{:else}{entry.text}{/if}
				{#if entry.issue}
					<a class="ref mono" href="{repo}/issues/{entry.issue}">#{entry.issue}</a>
				{:else if entry.pull}
					<a class="ref mono" href="{repo}/pull/{entry.pull}">#{entry.pull}</a>
				{/if}
				{#if typeof entry.done === 'string'}
					<a class="ref mono" href="/changelog#v{entry.done}">v{entry.done}</a>
				{/if}
			</li>
		{/each}
	</ul>
{/each}

<h2 id="suggest">Suggesting something</h2>
<p>
	Read <a href="/docs/vision">Vision</a> first, then open a
	<a href="{repo}/issues/new/choose">feature request</a>. See
	<a href="/docs/help#features">Getting help</a> for what a good request includes.
</p>

<style>
	.entries li {
		color: var(--fg);
	}

	.entries li.done {
		color: var(--dim);
	}

	s {
		text-decoration-color: var(--faint);
	}

	.ref {
		margin-left: 6px;
		font-size: 12px;
		color: var(--dim);
	}

	a.ref:hover {
		color: var(--fg);
	}
</style>
