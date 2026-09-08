<script>
	let { code } = $props();
</script>

<svg viewBox="0 0 16 12" aria-hidden="true">
	{#if code === 'us'}
		<rect width="16" height="12" fill="#b31942" />
		<rect y="1.4" width="16" height="1.4" fill="#fff" />
		<rect y="4.2" width="16" height="1.4" fill="#fff" />
		<rect y="7" width="16" height="1.4" fill="#fff" />
		<rect y="9.8" width="16" height="1.4" fill="#fff" />
		<rect width="7" height="6.5" fill="#0a3161" />
	{:else if code === 'de'}
		<rect width="16" height="4" fill="#000" />
		<rect y="4" width="16" height="4" fill="#dd0000" />
		<rect y="8" width="16" height="4" fill="#ffce00" />
	{:else if code === 'pl'}
		<rect width="16" height="6" fill="#fff" />
		<rect y="6" width="16" height="6" fill="#dc143c" />
	{:else if code === 'id'}
		<rect width="16" height="6" fill="#ce1126" />
		<rect y="6" width="16" height="6" fill="#fff" />
	{:else if code === 'es'}
		<rect width="16" height="12" fill="#aa151b" />
		<rect y="3" width="16" height="6" fill="#f1bf00" />
	{:else if code === 'jp'}
		<rect width="16" height="12" fill="#fff" />
		<circle cx="8" cy="6" r="3.2" fill="#bc002d" />
	{:else if code === 'br'}
		<rect width="16" height="12" fill="#009c3b" />
		<path d="M8 1.6 14.6 6 8 10.4 1.4 6z" fill="#ffdf00" />
		<circle cx="8" cy="6" r="2.2" fill="#002776" />
	{:else if code === 'ru'}
		<rect width="16" height="4" fill="#fff" />
		<rect y="4" width="16" height="4" fill="#0039a6" />
		<rect y="8" width="16" height="4" fill="#d52b1e" />
	{:else if code === 'ua'}
		<rect width="16" height="6" fill="#0057b7" />
		<rect y="6" width="16" height="6" fill="#ffd700" />
	{:else if code === 'fr'}
		<rect width="16" height="12" fill="#fff" />
		<rect width="5.34" height="12" fill="#002395" />
		<rect x="10.66" width="5.34" height="12" fill="#ed2939" />
	{:else if code === 'it'}
		<rect width="16" height="12" fill="#fff" />
		<rect width="5.34" height="12" fill="#008c45" />
		<rect x="10.66" width="5.34" height="12" fill="#cd212a" />
	{/if}
</svg>

<style>
	svg {
		width: 16px;
		height: 12px;
		flex-shrink: 0;
		border-radius: 2px;
		box-shadow: 0 0 0 1px rgb(128 128 128 / 0.35) inset;
	}
</style>
