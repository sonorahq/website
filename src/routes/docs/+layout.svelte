<script lang="ts">
	import { page } from '$app/state';
	import Outline from '$lib/components/docs/Outline.svelte';
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
		</aside>

		<div class="main">
			<article class="doc" bind:this={article}>
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

	.pages nav,
	.sticky {
		position: sticky;
		top: calc(var(--header) + 32px);
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

	.doc {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.doc :global(h1) {
		font-size: 34px;
		line-height: 1.1;
	}

	.doc :global(.summary) {
		margin-bottom: 8px;
		font-size: 17px;
		line-height: 1.55;
	}

	.doc :global(h2) {
		margin-top: 36px;
		font-size: 22px;
		scroll-margin-top: calc(var(--header) + 24px);
	}

	.doc :global(h3) {
		margin-top: 12px;
	}

	.doc :global(p),
	.doc :global(li) {
		font-size: 15px;
		line-height: 1.65;
		color: var(--muted-fg);
		text-wrap: pretty;
	}

	.doc :global(ul),
	.doc :global(ol) {
		margin: 0;
		padding-left: 20px;
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.doc :global(strong) {
		color: var(--fg);
		font-weight: 500;
	}

	.doc :global(p a),
	.doc :global(li a) {
		color: var(--fg);
		text-decoration: underline;
		text-decoration-color: var(--faint);
		text-underline-offset: 3px;
	}

	.doc :global(p a:hover),
	.doc :global(li a:hover) {
		text-decoration-color: var(--fg);
	}

	.doc :global(code),
	.doc :global(kbd) {
		font-family: var(--mono);
		font-size: 12.5px;
	}

	.doc :global(p code),
	.doc :global(li code),
	.doc :global(td code) {
		padding: 2px 6px;
		border-radius: 6px;
		background: var(--secondary);
		color: var(--fg);
		overflow-wrap: anywhere;
	}

	.doc :global(kbd) {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-width: 22px;
		height: 22px;
		padding: 0 6px;
		border: 1px solid var(--border);
		border-bottom-width: 2px;
		border-radius: 6px;
		background: var(--card);
		color: var(--fg);
	}

	.doc :global(.note) {
		padding: 14px 16px;
		border: 1px solid var(--line);
		border-radius: var(--radius);
		background: var(--secondary);
	}

	.doc :global(table) {
		width: 100%;
		border: 1px solid var(--line);
		border-radius: var(--radius);
		border-spacing: 0;
		overflow: hidden;
		font-size: 13.5px;
	}

	.doc :global(th) {
		padding: 10px 16px;
		border-bottom: 1px solid var(--line);
		background: var(--secondary);
		font-size: 12px;
		font-weight: 600;
		text-align: left;
		color: var(--muted-fg);
	}

	.doc :global(td) {
		padding: 10px 16px;
		border-bottom: 1px solid var(--line);
		color: var(--muted-fg);
		vertical-align: top;
		line-height: 1.5;
	}

	.doc :global(tr:last-child td) {
		border-bottom: none;
	}

	.doc :global(td:first-child) {
		color: var(--fg);
		white-space: nowrap;
	}

	.doc :global(.keys) {
		display: inline-flex;
		gap: 4px;
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

		.pages nav {
			position: static;
			flex-direction: row;
			gap: 20px;
			overflow-x: auto;
			scrollbar-width: none;
		}

		.group {
			flex-shrink: 0;
		}

		.doc :global(h1) {
			font-size: 28px;
		}

		.doc :global(td:first-child) {
			white-space: normal;
		}
	}
</style>
