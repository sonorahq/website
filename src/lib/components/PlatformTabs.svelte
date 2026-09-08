<script>
	import { platforms } from '$lib/data/platforms.js';
	import { platform } from '$lib/platform.svelte.js';

	let { size = 'sm' } = $props();
</script>

<div class="tabs {size}">
	{#each platforms as entry (entry.id)}
		<button
			aria-pressed={platform.id === entry.id}
			class:on={platform.id === entry.id}
			onclick={() => (platform.id = entry.id)}
		>
			{entry.label}
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

	.sm button {
		height: 28px;
		padding: 0 12px;
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
		padding: 0 20px;
		font-size: 14px;
	}

	@media (max-width: 900px) {
		.tabs {
			width: 100%;
		}

		button {
			flex-grow: 1;
			height: 44px;
			padding: 0 8px;
		}
	}
</style>
