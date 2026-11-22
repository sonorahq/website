<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { ADAPTIVE, scheme, schemes, swatch } from '$lib/scheme.svelte';

	let open = $state(false);
	let box = $state<HTMLElement | null>(null);

	function pick(name: string) {
		scheme.select(name);
		open = false;
	}

	/** T flips to the next scheme and Shift+T back, anywhere but in a text field. */
	onMount(() => {
		const key = (event: KeyboardEvent) => {
			if (event.key === 'Escape') open = false;
			if (event.key.toLowerCase() !== 't') return;
			if (event.metaKey || event.ctrlKey || event.altKey || event.defaultPrevented) return;
			const target = event.target as HTMLElement;
			if (target.closest('input, textarea, select, [contenteditable]')) return;
			scheme.step(event.shiftKey ? -1 : 1);
		};
		const away = (event: PointerEvent) => {
			if (open && box && !event.composedPath().includes(box)) open = false;
		};
		addEventListener('keydown', key);
		addEventListener('pointerdown', away);
		return () => {
			removeEventListener('keydown', key);
			removeEventListener('pointerdown', away);
		};
	});
</script>

<div class="picker" bind:this={box}>
	<button
		type="button"
		class="trigger"
		aria-haspopup="listbox"
		aria-expanded={open}
		title="Colour scheme: {scheme.current} (T)"
		aria-label="Colour scheme: {scheme.current}"
		onclick={() => (open = !open)}
	>
		<svg viewBox="0 0 24 24" aria-hidden="true">
			<path
				d="M12 21a9 9 0 1 1 9-9c0 1.66-1.34 3-3 3h-1.2a2.3 2.3 0 0 0-1.6 3.95A1.9 1.9 0 0 1 13.9 21Z"
			/>
			<path d="M8 9h.01" />
			<path d="M11.5 7h.01" />
			<path d="M15.5 9h.01" />
		</svg>
	</button>

	{#if open}
		<ul
			class="list"
			role="listbox"
			aria-label="Colour scheme"
			transition:fly={{ y: -6, duration: 160 }}
		>
			{#each schemes as name (name)}
				{@const colors = swatch(name)}
				<li>
					<button
						type="button"
						role="option"
						aria-selected={scheme.current === name}
						class:on={scheme.current === name}
						onclick={() => pick(name)}
					>
						<span class="swatch" style:background={colors.bg}>
							<i style:background={colors.accent}></i>
						</span>
						{name}
						{#if name === ADAPTIVE}<span class="hint">from the cover</span>{/if}
					</button>
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style>
	.picker {
		position: relative;
	}

	.trigger {
		width: var(--control);
		height: var(--control);
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: var(--radius);
		color: var(--chip-fg);
	}

	.trigger:hover,
	.trigger[aria-expanded='true'] {
		background: var(--secondary-hover);
		color: var(--fg);
	}

	svg {
		width: 15px;
		height: 15px;
		fill: none;
		stroke: currentColor;
		stroke-width: 1.8;
		stroke-linecap: round;
		stroke-linejoin: round;
	}

	.list {
		position: absolute;
		top: calc(100% + 8px);
		right: 0;
		z-index: 20;
		width: 240px;
		max-height: min(70vh, 560px);
		overflow-y: auto;
		margin: 0;
		padding: 5px;
		list-style: none;
		border: 1px solid var(--border);
		border-radius: var(--radius-lg);
		background: var(--popover);
		box-shadow: var(--shadow);
	}

	.list button {
		width: 100%;
		height: 34px;
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 0 8px;
		border-radius: calc(var(--radius) - 2px);
		font-size: 13px;
		color: var(--muted-fg);
		text-align: left;
	}

	.list button:hover {
		background: var(--secondary-hover);
		color: var(--fg);
	}

	.list button.on {
		background: var(--secondary-active);
		color: var(--fg);
	}

	.swatch {
		position: relative;
		width: 22px;
		height: 16px;
		flex: none;
		border-radius: 5px;
		box-shadow: inset 0 0 0 1px rgb(127 127 127 / 0.35);
	}

	.swatch i {
		position: absolute;
		right: 4px;
		bottom: 4px;
		width: 6px;
		height: 6px;
		border-radius: 999px;
	}

	.hint {
		margin-left: auto;
		font-size: 11px;
		color: var(--dim);
	}
</style>
