<script>
	/** @type {{ checked?: boolean, onchange?: (value: boolean) => void, label?: string }} */
	let { checked = false, onchange = undefined, label = '' } = $props();
</script>

<button
	type="button"
	class="switch"
	class:on={checked}
	role="switch"
	aria-checked={checked}
	aria-label={label}
	onclick={() => onchange?.(!checked)}
>
	<span class="knob"></span>
</button>

<style>
	.switch {
		display: flex;
		flex: none;
		align-items: center;
		width: 39px;
		height: 22px;
		padding: 2px;
		border: 1px solid var(--m-border);
		border-radius: 11px;
		background: var(--m-muted);
		cursor: pointer;
	}

	.switch.on {
		border-color: var(--m-primary);
		background: var(--m-primary);
	}

	.switch:hover {
		background: var(--m-secondary-hover);
	}

	.switch.on:hover {
		background: var(--m-primary-hover);
	}

	.knob {
		width: 16px;
		height: 16px;
		flex: none;
		border-radius: 8px;
		background: var(--m-muted-foreground);
		transition:
			margin-left 110ms cubic-bezier(0.455, 0.03, 0.515, 0.955),
			background-color 110ms cubic-bezier(0.455, 0.03, 0.515, 0.955);
	}

	.switch.on .knob {
		margin-left: 17px;
		background: var(--m-primary-foreground);
	}

	@media (prefers-reduced-motion: reduce) {
		.knob {
			transition: none;
		}
	}
</style>
