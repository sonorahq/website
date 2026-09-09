<script>
	import Control from './Control.svelte';

	let { left = $bindable(), right = $bindable() } = $props();
</script>

<div class="bar">
	<div class="leading" style:width={left ? '195px' : undefined}>
		<Control
			icon={left ? 'panel-left-close' : 'panel-left-open'}
			title="Toggle sidebar"
			small
			onclick={() => (left = !left)}
		/>
	</div>

	<div class="middle">
		<div class="history">
			<Control icon="chevron-left" title="Back" size={28} disabled />
			<Control icon="chevron-right" title="Forward" size={28} disabled />
		</div>

		<div class="tools">
			<Control icon="columns-3" title="Columns" small />
			<Control icon="funnel" title="Filters" small tint="muted" />
			<Control icon="arrow-up-down" title="Sort" small tint="muted" />
			<Control icon="search" title="Search" small />
		</div>
	</div>

	<div class="trail">
		<Control
			icon={right ? 'panel-right-close' : 'panel-right-open'}
			title="Show or hide lyrics and queue"
			small
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
		gap: 3.5px;
		padding-left: 12px;
		padding-right: 10.5px;
	}

	.middle {
		display: flex;
		flex: 1;
		min-width: 0;
		align-items: center;
		gap: 3.5px;
		padding-right: 10.5px;
	}

	.history,
	.tools {
		display: flex;
		align-items: center;
		gap: 3.5px;
	}

	.tools {
		flex: 1;
		min-width: 0;
		justify-content: flex-end;
	}

	.trail {
		display: flex;
		flex: none;
		align-items: center;
		padding-right: 10.5px;
	}
</style>
