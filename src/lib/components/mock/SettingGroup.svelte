<script lang="ts">
	let { label }: { label: string } = $props();
</script>

<div class="group"><span class="eyebrow">{label}</span></div>

<style>
	.group {
		padding: 17.5px 0 3.5px;
	}

	.eyebrow {
		font-size: 12px;
		font-weight: 600;
		text-transform: uppercase;
		color: var(--m-muted-foreground);
	}
</style>
