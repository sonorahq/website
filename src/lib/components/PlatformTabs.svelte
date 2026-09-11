<script lang="ts">
	import { platforms } from '$lib/data/platforms';
	import { platform } from '$lib/platform.svelte';
	import Mark from './Mark.svelte';

	let { size = 'sm' }: { size?: 'sm' | 'lg' } = $props();
</script>

<div class="tabs {size}">
	{#each platforms as entry (entry.id)}
		<button
			aria-pressed={platform.id === entry.id}
			class:on={platform.id === entry.id}
			onclick={() => (platform.id = entry.id)}
		>
			<Mark name={entry.mark} size={size === 'lg' ? 15 : 13} />
			<span>{entry.label}</span>
		</button>
	{/each}
</div>

<style>
	.tabs {
		display: flex;
		gap: 2px;
		padding: 3px;
		border: 1px solid var(--border);
		border-radius: 8px;
		background: var(--popover);
	}

	button {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 7px;
		border-radius: var(--radius);
		font-weight: 500;
		color: var(--muted-fg);
	}

	button:hover {
		color: var(--fg);
	}

	button.on {
		background: var(--secondary-active);
		color: var(--fg);
	}

	.sm {
		width: 100%;
	}

	.sm button {
		flex: 1 1 auto;
		min-width: 0;
		height: 28px;
		padding: 0 11px;
		font-size: 12px;
	}

	.lg {
		width: fit-content;
		margin: 44px auto 0;
		padding: 4px;
		border-color: transparent;
		background: var(--secondary);
	}

	.lg button {
		height: 36px;
		padding: 0 18px;
		font-size: 14px;
	}

	@media (max-width: 900px) {
		.tabs {
			width: 100%;
			flex-wrap: wrap;
		}

		button {
			flex: 1 1 auto;
			min-width: 0;
			height: 44px;
			padding: 0 12px;
		}
	}
</style>
