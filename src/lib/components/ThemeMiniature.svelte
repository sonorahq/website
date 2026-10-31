<script lang="ts">
	/**
	 * The Sonora window in a theme's colours as a few flat shapes, the same miniature the app
	 * draws on its theme cards. `colors` maps every colour token to CSS. Swapping it for another
	 * variant's palette fades every shape into its new colour.
	 */
	let { colors }: { colors: Record<string, string> } = $props();

	const WIDTH = 148;
	const HEIGHT = 94;

	const entries = [
		[8, 14, 22, 5],
		[8, 25, 16, 5],
		[8, 36, 19, 5]
	];
	const tiles = [45, 79, 113];

	const panel = $derived(colors.sidebar === colors.background ? colors.secondary : colors.sidebar);
</script>

<svg class="miniature" viewBox="0 0 {WIDTH} {HEIGHT}" aria-hidden="true">
	<rect width={WIDTH} height={HEIGHT} style:fill={colors.background} />
	<rect width="38" height={HEIGHT} style:fill={panel} />
	{#each entries as [x, y, w, h], index (index)}
		<rect
			{x}
			{y}
			width={w}
			height={h}
			rx={h / 2}
			style:fill={colors.foreground}
			fill-opacity={index === 0 ? 0.4 : 0.2}
		/>
	{/each}
	<rect
		x="45"
		y="14"
		width="34"
		height="5"
		rx="2.5"
		style:fill={colors.foreground}
		fill-opacity="0.4"
	/>
	{#each tiles as x, index (x)}
		<rect
			{x}
			y="27"
			width="28"
			height="28"
			rx="3"
			style:fill={index === 0 ? colors.primary : colors.muted}
			fill-opacity={index === 0 ? 0.9 : 1}
		/>
	{/each}
	<rect x="45" y="66" width="96" height="14" rx="7" style:fill={panel} />
	<rect x="50" y="70" width="6" height="6" rx="3" style:fill={colors.primary} />
</svg>

<style>
	.miniature {
		display: block;
		width: 100%;
		height: auto;
	}

	rect {
		transition: fill 0.35s ease;
	}

	@media (prefers-reduced-motion: reduce) {
		rect {
			transition: none;
		}
	}
</style>
