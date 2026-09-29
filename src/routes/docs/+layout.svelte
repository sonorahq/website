<script lang="ts">
	import { page } from '$app/state';
	import Outline from '$lib/components/docs/Outline.svelte';
	import Search from '$lib/components/docs/Search.svelte';
	import '$lib/prose.css';
	import { groups, pages } from '$lib/data/docs';

	let { children } = $props();

	let article = $state<HTMLElement | null>(null);

	const index = $derived(pages.findIndex((entry) => page.url.pathname === `/docs/${entry.slug}`));
	const previous = $derived(index > 0 ? pages[index - 1] : null);
	const next = $derived(index >= 0 && index < pages.length - 1 ? pages[index + 1] : null);
</script>

<section class="section">
	<span class="cross start"></span>
	<span class="cross end"></span>

	<div class="page layout">
		<aside class="pages">
			<div class="rail">
				<Search />
				<nav aria-label="Docs">
					{#each groups as group (group.label)}
						<div class="group">
							<span class="kicker">{group.label}</span>
							{#each group.pages as entry (entry.slug)}
								<a
									href="/docs/{entry.slug}"
									class:on={index >= 0 && pages[index].slug === entry.slug}
									aria-current={index >= 0 && pages[index].slug === entry.slug ? 'page' : undefined}
									>{entry.title}</a
								>
							{/each}
						</div>
					{/each}
				</nav>
			</div>
		</aside>

		<div class="main">
			<article class="prose" bind:this={article}>
				{@render children()}
			</article>

			{#if previous || next}
				<div class="pager">
					{#if previous}
						<a class="prev" href="/docs/{previous.slug}">
							<span class="kicker">Previous</span>
							<span>{previous.title}</span>
						</a>
					{/if}
					{#if next}
						<a class="next" href="/docs/{next.slug}">
							<span class="kicker">Next</span>
							<span>{next.title}</span>
						</a>
					{/if}
				</div>
			{/if}
		</div>

		<aside class="outline">
			<div class="sticky">
				<Outline root={article} />
			</div>
		</aside>
	</div>
</section>

<style>
	.layout {
		display: grid;
		grid-template-columns: 190px minmax(0, 1fr) 180px;
		gap: 48px;
		padding-top: 56px;
		padding-bottom: 96px;
	}

	.rail,
	.sticky {
		position: sticky;
		top: calc(var(--header) + 32px);
	}

	.rail {
		display: flex;
		flex-direction: column;
		gap: 28px;
	}

	.pages nav {
		display: flex;
		flex-direction: column;
		gap: 28px;
	}

	.group {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.group .kicker {
		margin-bottom: 8px;
	}

	.group a {
		margin-left: -10px;
		padding: 7px 10px;
		border-radius: 8px;
		font-size: 13.5px;
		color: var(--muted-fg);
	}

	.group a:hover {
		color: var(--fg);
	}

	.group a.on {
		background: var(--secondary);
		color: var(--fg);
	}

	.main {
		min-width: 0;
		max-width: 720px;
	}

	.pager {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 12px;
		margin-top: 64px;
	}

	.pager a {
		display: flex;
		flex-direction: column;
		gap: 6px;
		padding: 16px 18px;
		border: 1px solid var(--line);
		border-radius: var(--radius);
		font-size: 14px;
		font-weight: 500;
	}

	.pager a:hover {
		background: var(--secondary);
	}

	.pager .kicker {
		font-size: 11px;
		color: var(--dim);
	}

	.next {
		grid-column: 2;
		text-align: right;
	}

	@media (max-width: 1100px) {
		.layout {
			grid-template-columns: 190px minmax(0, 1fr);
		}

		.outline {
			display: none;
		}
	}

	@media (max-width: 900px) {
		.layout {
			grid-template-columns: minmax(0, 1fr);
			gap: 32px;
			padding-top: 32px;
			padding-bottom: 64px;
		}

		.rail {
			position: static;
			gap: 20px;
		}

		.pages nav {
			flex-direction: row;
			gap: 20px;
			overflow-x: auto;
			scrollbar-width: none;
		}

		.group {
			flex-shrink: 0;
		}
	}
</style>
