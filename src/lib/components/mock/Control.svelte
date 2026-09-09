<script>
	import Icon from './Icon.svelte';

	let {
		icon = '',
		label = '',
		title = '',
		variant = 'ghost',
		small = false,
		muted = false,
		selected = false,
		onclick = undefined
	} = $props();
</script>

<button
	type="button"
	class={variant}
	class:small
	class:muted
	class:selected
	class:squared={!label}
	aria-label={title}
	aria-pressed={selected || undefined}
	{onclick}
>
	{#if icon}<Icon name={icon} />{/if}
	{#if label}<span>{label}</span>{/if}
</button>

<style>
	button {
		display: inline-flex;
		flex: none;
		align-items: center;
		justify-content: center;
		gap: 6px;
		height: 32px;
		padding: 0 12px;
		border: 0;
		border-radius: var(--m-radius);
		background: none;
		color: var(--m-foreground);
		font: inherit;
		cursor: pointer;
	}

	.small {
		height: 26px;
		gap: 4px;
		padding: 0 8px;
		font-size: 12.9px;
	}

	.squared {
		width: 40px;
	}

	.small.squared {
		width: 32px;
	}

	.muted {
		color: var(--m-muted-foreground);
	}

	.ghost:hover,
	.outline:hover {
		background: var(--m-secondary-hover);
	}

	.ghost:active,
	.outline:active {
		background: var(--m-secondary-active);
	}

	.selected {
		background: var(--m-secondary-active);
		color: var(--m-foreground);
	}

	.outline {
		border: 1px solid var(--m-border);
	}

	.primary {
		background: var(--m-primary);
		color: var(--m-primary-foreground);
	}

	.primary:hover {
		background: var(--m-primary-hover);
	}
</style>
