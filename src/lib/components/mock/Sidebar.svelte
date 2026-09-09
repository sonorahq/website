<script>
	import { nav } from '$lib/mock/album.js';
	import Icon from './Icon.svelte';

	let section = $state('');
	let current = $state('');
	let open = $state('library');

	/** @param {{ id: string, tabs?: string[] }} entry */
	function pick(entry) {
		if (entry.tabs) {
			open = open === entry.id ? '' : entry.id;
			return;
		}
		section = entry.id;
		current = entry.id;
		open = '';
	}

	/** @param {string} id @param {string} tab */
	function choose(id, tab) {
		section = id;
		current = `${id}/${tab}`;
	}
</script>

<nav class="sidebar">
	{#each nav as entry (entry.id)}
		<button
			type="button"
			class="row"
			class:lit={section === entry.id}
			class:on={!entry.tabs && current === entry.id}
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
					{@const chosen = current === `${entry.id}/${tab}`}
					<button
						type="button"
						class="row tab"
						class:lit={chosen}
						class:on={chosen}
						onclick={() => choose(entry.id, tab)}
					>
						<span class="label">{tab}</span>
					</button>
				{/each}
			</div>
		{/if}
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
		overflow: hidden;
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
</style>
