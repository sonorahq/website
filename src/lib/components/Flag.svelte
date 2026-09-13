<script lang="ts">
	let { code }: { code: string } = $props();

	/* every 4x3 flag from flag-icons, fetched only when a code asks for it */
	const flags = import.meta.glob<string>('/node_modules/flag-icons/flags/4x3/*.svg', {
		query: '?raw',
		import: 'default'
	});

	const markup = $derived(flags[`/node_modules/flag-icons/flags/4x3/${code}.svg`]?.());
</script>

<span class="flag" aria-hidden="true">
	{#if markup}
		{#await markup then svg}
			{@html svg}
		{/await}
	{/if}
</span>

<style>
	.flag {
		position: relative;
		display: inline-flex;
		width: 14px;
		height: 11px;
		flex-shrink: 0;
		overflow: hidden;
		border-radius: 2px;
	}

	.flag::after {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: inherit;
		box-shadow: 0 0 0 1px rgb(128 128 128 / 0.35) inset;
	}

	.flag :global(svg) {
		width: 100%;
		height: 100%;
	}
</style>
