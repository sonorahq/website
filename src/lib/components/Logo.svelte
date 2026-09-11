<script>
	let { size = 22 } = $props();
</script>

<svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true">
	<rect width="64" height="64" rx="16" fill="#ffffff" />
	<path d="M13.3333 27.3333V36.6667" stroke="#000000" stroke-width="4" stroke-linecap="round" />
	<path d="M22.6667 20.3333V43.6667" stroke="#000000" stroke-width="4" stroke-linecap="round" />
	<path d="M32 13.3333V50.6667" stroke="#000000" stroke-width="4" stroke-linecap="round" />
	<path d="M41.3333 20.3333V43.6667" stroke="#000000" stroke-width="4" stroke-linecap="round" />
	<path d="M50.6667 27.3333V36.6667" stroke="#000000" stroke-width="4" stroke-linecap="round" />
</svg>

<style>
	svg {
		flex-shrink: 0;
		box-shadow: 0 0 0 1px rgb(0 0 0 / 0.08);
		border-radius: 25%;
	}
</style>
