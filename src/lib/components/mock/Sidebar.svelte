<script>
	import { nav, pinned } from '$lib/mock/album.js';
	import { route } from '$lib/mock/route.svelte.js';
	import Cover from './Cover.svelte';
	import Icon from './Icon.svelte';

	let open = $state('library');

	const at = $derived(route.now);

	/** @param {{ id: string, tabs?: string[] }} entry */
	function pick(entry) {
		if (entry.tabs) {
			open = open === entry.id ? '' : entry.id;
			return;
		}
		route.go({ screen: entry.id });
	}

	/** @param {{ id: string }} entry */
	const inside = (entry) => at.screen === entry.id;

	/** @param {{ id: string }} entry @param {string} tab */
	const chosen = (entry, tab) => at.screen === entry.id && at.tab === tab;
</script>

<nav class="sidebar">
	{#each nav as entry (entry.id)}
		<button
			type="button"
			class="row"
			class:lit={inside(entry)}
			class:on={!entry.tabs && inside(entry)}
			onclick={() => pick(entry)}
		>
			<Icon name={entry.icon} />
			<span class="label">{entry.label}</span>
			{#if entry.tabs}
				<Icon name={open === entry.id ? 'chevron-down' : 'chevron-right'} />
			{/if}
		</button>

		{#if entry.tabs && open === entry.id}
			<div class="tabs">
				{#each entry.tabs as tab (tab)}
					<button
						type="button"
						class="row tab"
						class:lit={chosen(entry, tab)}
						class:on={chosen(entry, tab)}
						onclick={() => route.go({ screen: entry.id, tab })}
					>
						<span class="label">{tab}</span>
					</button>
				{/each}
			</div>
		{/if}
	{/each}

	<span class="group"><span class="eyebrow">Pinned</span></span>

	{#each pinned as entry (entry.id)}
		<button type="button" class="card" onclick={() => route.go(entry.to)}>
			<Cover src={entry.cover} fallback={entry.icon} circle={entry.round ?? false} />
			<span class="text">
				<span class="title">{entry.title}</span>
				<span class="caption">{entry.kind}</span>
			</span>
		</button>
	{/each}
</nav>

<style>
	.sidebar {
		display: flex;
		flex: none;
		flex-direction: column;
		gap: 3.5px;
		width: 195px;
		padding: 10.5px;
		overflow-y: auto;
		scrollbar-width: thin;
		scrollbar-color: color-mix(in srgb, var(--m-muted-foreground) 45%, transparent) transparent;
		background: var(--m-sidebar);
		border-right: 1px solid var(--m-sidebar-border);
	}

	.row {
		display: flex;
		flex: none;
		align-items: center;
		gap: 8.75px;
		height: 32px;
		padding: 0 12px;
		border: 0;
		border-radius: var(--m-radius);
		background: none;
		color: var(--m-muted-foreground);
		font: inherit;
		text-align: left;
		cursor: pointer;
	}

	.row.lit {
		color: var(--m-foreground);
	}

	.row:hover,
	.row.on {
		background: var(--m-sidebar-accent);
	}

	.label {
		flex: 1;
		min-width: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.tabs {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 3.5px;
		margin-left: 16px;
	}

	.tabs::before {
		content: '';
		position: absolute;
		top: 0;
		bottom: 16px;
		left: 4px;
		width: 1px;
		background: var(--m-sidebar-border);
	}

	.tab {
		margin-left: 12px;
	}

	.group {
		display: flex;
		flex: none;
		align-items: flex-end;
		height: 52px;
		padding: 0 7px 3.5px;
		font-size: 12px;
		font-weight: 600;
		color: var(--m-muted-foreground);
	}

	.group .eyebrow {
		text-transform: uppercase;
	}

	.card {
		display: flex;
		flex: none;
		align-items: center;
		gap: 10.5px;
		width: 100%;
		height: 52px;
		padding: 8px;
		border: 0;
		border-radius: var(--m-radius);
		background: none;
		color: var(--m-muted-foreground);
		font: inherit;
		text-align: left;
		cursor: pointer;
	}

	.card:hover {
		background: var(--m-sidebar-accent);
	}

	.text {
		display: flex;
		flex: 1;
		min-width: 0;
		flex-direction: column;
		gap: 2px;
		line-height: 1.25;
	}

	.title,
	.caption {
		min-width: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.caption {
		font-size: 12px;
	}
</style>
