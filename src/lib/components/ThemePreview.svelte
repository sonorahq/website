<script lang="ts">
	import { tick } from 'svelte';
	import type { CommunityTheme } from '$lib/data/themes';
	import { settings } from '$lib/mock/settings.svelte';
	import { addPalette, removePalette } from '$lib/mock/theme';
	import AppMock from './mock/AppMock.svelte';

	/**
	 * A community theme painted over the live Sonora mock in a modal, with a picker under the
	 * window when the theme has more than one variant. The mock's own theme and adaptive colours
	 * come back once it closes.
	 */
	let { theme = $bindable() }: { theme: { family: CommunityTheme; variant: string } | null } =
		$props();

	let dialog = $state<HTMLDialogElement | null>(null);
	/** What the mock showed before the preview, put back on close. */
	let before: { theme: string; adaptive: boolean } | null = null;

	const family = $derived(theme?.family);
	const chosen = $derived(
		family?.variants.find((variant) => variant.id === theme?.variant) ?? family?.variants[0]
	);

	$effect(() => {
		const shown = family;
		if (!shown || !dialog) return;
		before ??= { theme: settings.theme, adaptive: settings.adaptive };
		for (const variant of shown.variants) addPalette(variant.title, variant.colors);
		if (!dialog.open) dialog.showModal();
		// the page behind the modal stays put while the preview is open
		const root = document.documentElement;
		root.style.overflow = 'hidden';
		return () => {
			root.style.removeProperty('overflow');
			for (const variant of shown.variants) removePalette(variant.title);
		};
	});

	// The mock picks the site's theme as it mounts, so the variant goes on after that.
	$effect(() => {
		const title = chosen?.title;
		if (!title) return;
		tick().then(() => {
			settings.adaptive = false;
			settings.theme = title;
		});
	});

	function close() {
		dialog?.close();
	}

	function closed() {
		if (before) {
			settings.theme = before.theme;
			settings.adaptive = before.adaptive;
			before = null;
		}
		theme = null;
	}
</script>

<dialog
	bind:this={dialog}
	aria-label={family ? `${family.name} in Sonora` : undefined}
	onclick={(event) => {
		if (event.target === dialog) close();
	}}
	onclose={closed}
>
	{#if family && theme}
		<div class="window">
			<AppMock />
		</div>

		<div class="below">
			<div class="names">
				<span class="name">{family.name}</span>
				<span class="author">by {family.authors.join(', ')}</span>
			</div>
			{#if family.variants.length > 1}
				<div class="variants" role="radiogroup" aria-label="Variants">
					{#each family.variants as variant (variant.id)}
						<button
							type="button"
							role="radio"
							class="variant"
							aria-checked={variant.id === chosen?.id}
							onclick={() => theme && (theme = { ...theme, variant: variant.id })}
						>
							<span
								class="swatch"
								style:--page={variant.colors.background}
								style:--accent={variant.colors.primary}
							></span>
							{variant.name}
						</button>
					{/each}
				</div>
			{/if}
			<button type="button" class="btn btn-secondary close" onclick={close}>Close</button>
		</div>
	{/if}
</dialog>

<style>
	/* as wide as the mock, or narrower when the viewport's height would not fit it */
	dialog {
		width: min(1172px, calc(100vw - 64px), calc((100vh - 140px) * 1.6));
		max-width: none;
		max-height: none;
		margin: auto;
		padding: 0;
		border: 0;
		background: none;
		color: var(--fg);
		overflow: visible;
	}

	dialog::backdrop {
		background: rgb(0 0 0 / 0.6);
		backdrop-filter: blur(4px);
	}

	.window {
		border: 1px solid var(--border);
		border-radius: 14px;
		overflow: hidden;
		background: var(--bg);
		box-shadow: var(--shadow);
	}

	.below {
		display: flex;
		align-items: center;
		gap: 16px;
		margin-top: 14px;
		padding: 10px 10px 10px 16px;
		border: 1px solid var(--border);
		border-radius: var(--radius-lg);
		background: var(--card);
	}

	.names {
		display: flex;
		flex-direction: column;
		min-width: 0;
		margin-right: auto;
	}

	.name {
		font-size: 14px;
		font-weight: 600;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.author {
		font-size: 12px;
		color: var(--muted-fg);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.variants {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 6px;
	}

	.variant {
		display: flex;
		align-items: center;
		gap: 8px;
		height: 32px;
		padding: 0 12px 0 8px;
		border: 1px solid var(--border);
		border-radius: 999px;
		font-size: 13px;
		color: var(--muted-fg);
	}

	.variant:hover {
		background: var(--secondary);
		color: var(--fg);
	}

	.variant[aria-checked='true'] {
		border-color: var(--fg);
		color: var(--fg);
	}

	/* the page colour at the top left and the accent at the bottom right, like the cards' dots */
	.swatch {
		width: 16px;
		height: 16px;
		border-radius: 50%;
		background: linear-gradient(135deg, var(--page) 50%, var(--accent) 50%);
		box-shadow: inset 0 0 0 1px rgb(127 127 127 / 0.3);
	}

	.close {
		flex: none;
		height: 32px;
		padding: 0 14px;
		font-size: 13px;
	}
</style>
