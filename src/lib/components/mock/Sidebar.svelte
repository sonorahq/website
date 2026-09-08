<script>
	import { nav } from '$lib/mock/album.js';
	import Icon from './Icon.svelte';

	let open = $state('library');
	let current = $state('Albums');
</script>

<nav class="sidebar">
	{#each nav as entry (entry.id)}
		<button
			type="button"
			class="row"
			class:on={entry.tabs && open === entry.id}
			onclick={() => (open = open === entry.id ? '' : entry.id)}
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
						class:on={current === tab}
						onclick={() => (current = tab)}
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
		gap: 4px;
		width: 195px;
		padding: 12px;
		overflow: hidden;
		background: var(--m-sidebar);
		border-right: 1px solid var(--m-sidebar-border);
	}

	.row {
		display: flex;
		flex: none;
		align-items: center;
		gap: 10px;
		height: 32px;
		padding: 0 12px;
		border: 0;
		border-radius: var(--m-radius);
		background: none;
		color: var(--m-foreground);
		font: inherit;
		text-align: left;
		cursor: pointer;
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
		display: flex;
		flex-direction: column;
		gap: 4px;
		margin-left: 19px;
		padding-left: 12px;
		border-left: 1px solid var(--m-sidebar-border);
	}

	.tab {
		height: 30px;
		color: var(--m-muted-foreground);
	}

	.tab.on {
		color: var(--m-foreground);
	}
</style>
