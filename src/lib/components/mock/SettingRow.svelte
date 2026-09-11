<script lang="ts">
	let {
		title,
		detail,
		control
	}: { title: string; detail: string; control: import('svelte').Snippet } = $props();
</script>

<div class="row">
	<div class="text">
		<span class="title">{title}</span>
		<span class="detail">{detail}</span>
	</div>
	<div class="control">{@render control()}</div>
</div>

<style>
	.row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 14px;
		padding: 10.5px 0;
	}

	.text {
		display: flex;
		flex: 1;
		min-width: 0;
		flex-direction: column;
		gap: 3.5px;
	}

	.title {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.detail {
		min-width: 0;
		font-size: 12px;
		color: var(--m-muted-foreground);
	}

	.control {
		display: flex;
		flex: none;
	}
</style>
