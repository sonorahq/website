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
	{:else if code === 'cn'}
		<rect width="16" height="12" fill="#de2910" />
		<polygon points="3.40,1.05 3.86,2.47 5.35,2.47 4.14,3.34 4.60,4.76 3.40,3.88 2.20,4.76 2.66,3.34 1.45,2.47 2.94,2.47" fill="#ffde00" />
		<polygon points="6.60,0.63 6.76,1.13 7.28,1.13 6.86,1.43 7.02,1.93 6.60,1.63 6.18,1.93 6.34,1.43 5.92,1.13 6.44,1.13" fill="#ffde00" />
		<polygon points="8.00,2.03 8.16,2.53 8.68,2.53 8.26,2.83 8.42,3.33 8.00,3.03 7.58,3.33 7.74,2.83 7.32,2.53 7.84,2.53" fill="#ffde00" />
		<polygon points="7.60,4.03 7.76,4.53 8.28,4.53 7.86,4.83 8.02,5.33 7.60,5.03 7.18,5.33 7.34,4.83 6.92,4.53 7.44,4.53" fill="#ffde00" />
		<polygon points="6.10,5.18 6.26,5.68 6.78,5.68 6.36,5.98 6.52,6.48 6.10,6.18 5.68,6.48 5.84,5.98 5.42,5.68 5.94,5.68" fill="#ffde00" />
	{:else if code === 'tr'}
		<rect width="16" height="12" fill="#e30a17" />
		<circle cx="6.2" cy="6" r="3" fill="#fff" />
		<circle cx="7.3" cy="6" r="2.4" fill="#e30a17" />
		<polygon points="10.60,4.45 10.95,5.52 12.07,5.52 11.16,6.18 11.51,7.25 10.60,6.59 9.69,7.25 10.04,6.18 9.13,5.52 10.25,5.52" fill="#fff" />
	{/if}
</svg>

<style>
	svg {
		width: 14px;
		height: 11px;
		flex-shrink: 0;
		border-radius: 2px;
		box-shadow: 0 0 0 1px rgb(128 128 128 / 0.35) inset;
	}
</style>
