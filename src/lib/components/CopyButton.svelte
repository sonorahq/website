<script lang="ts">
	let { text }: { text: string } = $props();

	let copied = $state(false);

	/** Copies through a hidden text field. Pages served over plain HTTP have no Clipboard API, so this is the only way there. */
	function fallback(): boolean {
		const field = document.createElement('textarea');
		field.value = text;
		field.setAttribute('readonly', '');
		field.style.position = 'fixed';
		field.style.opacity = '0';
		document.body.append(field);
		field.select();
		const done = document.execCommand('copy');
		field.remove();
		return done;
	}

	async function copy() {
		let done = false;
		try {
			await navigator.clipboard.writeText(text);
			done = true;
		} catch {
			done = fallback();
		}
		copied = done;
		if (done) setTimeout(() => (copied = false), 1600);
	}
</script>

<button class:done={copied} onclick={copy} aria-label={copied ? 'Copied' : 'Copy command'}>
	{#if copied}
		<svg
			width="14"
			height="14"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2.4"
			stroke-linecap="round"
			stroke-linejoin="round"
			aria-hidden="true"
		>
			<path d="M4 12.5l5 5L20 6.5" />
		</svg>
	{:else}
		<svg
			width="14"
			height="14"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			aria-hidden="true"
		>
			<rect x="9" y="9" width="11" height="11" rx="2" />
			<path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1" />
		</svg>
	{/if}
</button>

<style>
	button {
		width: 32px;
		height: 32px;
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: var(--radius);
		background: none;
		color: var(--dim);
	}

	button:hover {
		background: var(--secondary-hover);
		color: var(--fg);
	}

	button.done {
		color: var(--fg);
	}
</style>
