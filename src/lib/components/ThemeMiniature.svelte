<script lang="ts">
	/**
	 * The Sonora window in a theme's colours as a few flat shapes, the same miniature the app
	 * draws on its theme cards. Each entry of `palettes` maps every colour token to CSS. Several
	 * palettes cut the window into vertical slices, one per variant, along the same seams the app
	 * uses, so the layout runs on across the cuts.
	 */
	let { palettes }: { palettes: Record<string, string>[] } = $props();

	const WIDTH = 148;
	const HEIGHT = 94;
	/** How many variants the miniature shows side by side at most. */
	const SLICES = 4;
	/** The columns a cut may run down: the sidebar's edge and the gaps between the tiles. */
	const SEAMS = [38, 76, 110];
	/** How far a slice runs on under the one after it, so no seam opens between pixels. */
	const OVERLAP = 1;

	const entries = [
		[8, 14, 22, 5],
		[8, 25, 16, 5],
		[8, 36, 19, 5]
	];
	const tiles = [45, 79, 113];

	const slices = $derived.by(() => {
		const shown = palettes.slice(0, SLICES);
		const cuts = shown.slice(1).map((_, index) => {
			const even = (WIDTH * (index + 1)) / shown.length;
			return SEAMS.reduce((best, seam) =>
				Math.abs(seam - even) < Math.abs(best - even) ? seam : best
			);
		});
		const edges = [0, ...cuts, WIDTH];
		return shown.map((colors, index) => {
			const left = edges[index];
			const right = edges[index + 1] < WIDTH ? edges[index + 1] + OVERLAP : WIDTH;
			const panel = colors.sidebar === colors.background ? colors.secondary : colors.sidebar;
			return { colors, panel, left, width: right - left };
		});
	});
</script>

<svg class="miniature" viewBox="0 0 {WIDTH} {HEIGHT}" aria-hidden="true">
	{#each slices as { colors, panel, left, width }, slice (slice)}
		<svg x={left} {width} height={HEIGHT} viewBox="{left} 0 {width} {HEIGHT}">
			<rect width={WIDTH} height={HEIGHT} fill={colors.background} />
			<rect width="38" height={HEIGHT} fill={panel} />
			{#each entries as [x, y, w, h], index (index)}
				<rect
					{x}
					{y}
					width={w}
					height={h}
					rx={h / 2}
					fill={colors.foreground}
					fill-opacity={index === 0 ? 0.4 : 0.2}
				/>
			{/each}
			<rect
				x="45"
				y="14"
				width="34"
				height="5"
				rx="2.5"
				fill={colors.foreground}
				fill-opacity="0.4"
			/>
			{#each tiles as x, index (x)}
				<rect
					{x}
					y="27"
					width="28"
					height="28"
					rx="3"
					fill={index === 0 ? colors.primary : colors.muted}
					fill-opacity={index === 0 ? 0.9 : 1}
				/>
			{/each}
			<rect x="45" y="66" width="96" height="14" rx="7" fill={panel} />
			<rect x="50" y="70" width="6" height="6" rx="3" fill={colors.primary} />
		</svg>
	{/each}
</svg>

<style>
	.miniature {
		display: block;
		width: 100%;
		height: auto;
	}
</style>
