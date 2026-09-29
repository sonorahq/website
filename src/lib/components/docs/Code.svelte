<script lang="ts">
	import CopyButton from '../CopyButton.svelte';

	let { text, label }: { text: string; label?: string } = $props();
</script>

<figure>
	{#if label}
		<figcaption class="mono">{label}</figcaption>
	{/if}
	<div class="body">
		<pre class="mono">{text}</pre>
		<CopyButton {text} />
	</div>
</figure>

<style>
	figure {
		margin: 0;
		border: 1px solid var(--line);
		border-radius: var(--radius);
		background: var(--card);
		overflow: hidden;
	}

	figcaption {
		padding: 9px 16px;
		border-bottom: 1px solid var(--line);
		font-size: 12px;
		color: var(--dim);
	}

	.body {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 12px;
		padding: 12px 12px 12px 16px;
	}

	pre {
		margin: 0;
		padding-top: 6px;
		overflow-x: auto;
		font-size: 13px;
		line-height: 1.6;
	}
</style>
