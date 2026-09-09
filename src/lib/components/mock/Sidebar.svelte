<script>
	import { nav, pinned } from '$lib/mock/album.js';
	import { route } from '$lib/mock/route.svelte.js';
	import Card from './Card.svelte';
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

	/** @param {{ to: { screen: string, id: string } }} entry */
	const here = (entry) => at.screen === entry.to.screen && at.id === entry.to.id;
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
					<span class="seat">
						<button
							type="button"
							class="row tab"
							class:lit={chosen(entry, tab)}
							class:on={chosen(entry, tab)}
							onclick={() => route.go({ screen: entry.id, tab })}
						>
							<span class="label">{tab}</span>
						</button>
					</span>
				{/each}
			</div>
		{/if}
	{/each}

	<span class="group"><span class="eyebrow">Pinned</span></span>

	{#each pinned as entry (entry.id)}
		<span class="pin" class:here={here(entry)}>
			<Card
				flat
				title={entry.title}
				meta={entry.kind}
				cover={entry.cover}
				fallback={entry.icon}
				tint={here(entry) ? 'var(--m-foreground)' : 'var(--m-muted-foreground)'}
				circle={entry.round ?? false}
				onplay={() => route.go(entry.to)}
				onpress={() => route.go(entry.to)}
			/>
		</span>
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

	.seat {
		display: flex;
		align-items: center;
		height: 32px;
		padding-left: 10.5px;
	}

	.tab {
		flex: 1;
		min-width: 0;
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

	.pin {
		display: flex;
		flex: none;
		border-radius: var(--m-radius);
		color: var(--m-muted-foreground);
	}

	.pin.here {
		background: var(--m-sidebar-accent);
		color: var(--m-foreground);
	}

	.pin:hover {
		background: var(--m-sidebar-accent);
	}
</style>
