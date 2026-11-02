<script lang="ts">
	import EditLink from '$lib/components/EditLink.svelte';
	import Glyph from '$lib/components/Glyph.svelte';
	import ThemeCard from '$lib/components/ThemeCard.svelte';
	import { themes } from '$lib/data/themes';
	import { onMount, untrack } from 'svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	/** The counts each card shows, which go up as soon as someone here takes a theme. */
	let downloads = $state(untrack(() => data.downloads));
	/**
	 * The gallery in order of the counts the build saw. Live counts never reorder it, so the cards
	 * stay where the prerendered page put them.
	 */
	const sorted = themes.toSorted(
		(a, b) => (data.downloads?.[b.id] ?? 0) - (data.downloads?.[a.id] ?? 0)
	);
	const compact = new Intl.NumberFormat('en', { notation: 'compact' });

	onMount(async () => {
		try {
			const res = await fetch('/api/themes/downloads');
			if (res.ok) downloads = await res.json();
		} catch {}
	});

	/** Counts an install or download of theme `id` and shows the new count. */
	async function record(id: string) {
		try {
			const res = await fetch(`/api/themes/${id}/download`, { method: 'POST', keepalive: true });
			if (res.ok) downloads = { ...downloads, [id]: (await res.json()).count };
		} catch {}
	}
</script>

<svelte:head>
	<title>Community themes · Sonora</title>
	<meta
		name="description"
		content="Themes for Sonora that people made and shared. Install one with a click."
	/>
</svelte:head>

<section class="section">
	<span class="cross start"></span>
	<span class="cross end"></span>

	<div class="page gallery">
		<header>
			<span class="kicker">Themes</span>
			<h1>Community themes</h1>
			<p class="summary">
				Want to contribute? <a href="/docs/themes#format">Write a theme</a>, then
				<a href="/themes/submit">submit it</a>.
			</p>
		</header>

		<ul class="grid">
			{#each sorted as theme (theme.id)}
				<ThemeCard tag="li" name={theme.name} authors={theme.authors} variants={theme.variants}>
					{#snippet meta()}
						{#if downloads}
							{@const count = downloads[theme.id] ?? 0}
							<span class="downloads" title="{count} {count === 1 ? 'download' : 'downloads'}">
								<Glyph name="arrow-down" size={12} />
								{compact.format(count)}
							</span>
						{/if}
					{/snippet}
					{#snippet actions()}
						<a class="btn btn-primary" href={theme.link} onclick={() => record(theme.id)}>
							Install
							<Glyph name="arrow-right" />
						</a>
						<a
							class="btn btn-secondary"
							href={theme.download.href}
							download={theme.download.name}
							onclick={() => record(theme.id)}
						>
							Download
							<Glyph name="arrow-down" />
						</a>
					{/snippet}
				</ThemeCard>
			{/each}
		</ul>

		<div class="source">
			<EditLink path="src/routes/themes/+page.svelte" />
		</div>
	</div>
</section>

<style>
	.gallery {
		padding-top: 72px;
		padding-bottom: 96px;
	}

	header {
		max-width: 640px;
		display: flex;
		flex-direction: column;
		gap: 12px;
		margin-bottom: 40px;
	}

	h1 {
		font-size: 36px;
	}

	.summary {
		font-size: 15px;
		line-height: 1.6;
		color: var(--muted-fg);
	}

	.summary a {
		color: var(--fg);
		text-decoration: underline;
		text-decoration-color: var(--faint);
		text-underline-offset: 3px;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
		gap: 20px;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.downloads {
		display: flex;
		flex: none;
		align-items: center;
		gap: 3px;
		font-size: 12px;
		font-variant-numeric: tabular-nums;
		color: var(--muted-fg);
	}

	.source {
		margin-top: 48px;
	}

	@media (max-width: 900px) {
		.gallery {
			padding-top: 48px;
			padding-bottom: 64px;
		}
	}
</style>
