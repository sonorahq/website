<script>
	import Control from './Control.svelte';

	let { left = $bindable(), right = $bindable() } = $props();
</script>

<div class="bar">
	<div class="leading">
		<Control
			icon={left ? 'panel-left-close' : 'panel-left-open'}
			title="Toggle sidebar"
			onclick={() => (left = !left)}
		/>
	</div>

	<div class="middle">
		<Control icon="chevron-left" title="Back" muted />
		<Control icon="chevron-right" title="Forward" muted />
	</div>

	<div class="tools">
		<Control icon="columns-3" title="Columns" muted />
		<Control icon="funnel" title="Filters" muted />
		<Control icon="arrow-up-down" title="Sort" muted />
		<Control icon="search" title="Search" muted />
	</div>

	<div class="trail">
		<Control
			icon={right ? 'panel-right-close' : 'panel-right-open'}
			title="Show or hide lyrics and queue"
			selected={right}
			onclick={() => (right = !right)}
		/>
	</div>
</div>

<style>
	.bar {
		display: flex;
		flex: none;
		align-items: center;
		height: 36px;
		background: var(--m-background);
		border-bottom: 1px solid var(--m-title-bar-border);
	}

	.leading {
		display: flex;
		flex: none;
		align-items: center;
		gap: 4px;
		padding-left: 12px;
		padding-right: 12px;
	}

	.middle {
		display: flex;
		flex: 1;
		min-width: 0;
		align-items: center;
		gap: 4px;
	}

	.tools,
	.trail {
		display: flex;
		flex: none;
		align-items: center;
		gap: 4px;
		padding-right: 12px;
	}
</style>
