<script>
	import { onMount } from 'svelte';

	/**
	 * @type {{
	 *   color: string,
	 *   style?: string,
	 *   playing?: boolean,
	 *   max?: number
	 * }}
	 */
	let { color, style = 'Bars and wave', playing = false, max = 160 } = $props();

	const BANDS = 32;
	const GAP = 3;
	const OPACITY = 0.32;
	const FLOOR = 0.03;
	const STROKE = 2;
	const CHANNELS = [0.62, 1];
	const GLOW = 10;
	const GLOW_STROKE = 2.4;
	const GLOW_OPACITY = 0.9;
	const BEDDED = 0.55;
	const RIDE = 0.4;
	const FILL = 0.22;
	const FILL_BASE = 0.05;
	const LINE_BLUR = 0.7;
	const EASE = 0.18;

	let canvas = $state(/** @type {HTMLCanvasElement | null} */ (null));

	const bars = $derived(style === 'Bars' || style === 'Bars and wave');
	const waves = $derived(style === 'Wave' || style === 'Bars and wave');

	/** @type {number[][]} */
	let levels = [new Array(BANDS).fill(FLOOR), new Array(BANDS).fill(FLOOR)];

	/**
	 * A spectrum shaped like music: loud lows falling toward the highs, stirred by a beat
	 * and a slower swell, the right channel a touch behind the left.
	 * @param {number} time
	 * @param {number} lag
	 * @returns {number[]}
	 */
	function spectrum(time, lag) {
		const beat = Math.pow(Math.max(0, Math.sin((time - lag) * Math.PI * 2 * 1.9)), 6);
		return Array.from({ length: BANDS }, (_, band) => {
			const slope = 0.42 * Math.exp(-band / 22) + 0.2;
			const stir =
				0.16 * Math.sin(time * 3.1 + band * 0.9 + lag * 4) +
				0.1 * Math.sin(time * 5.3 - band * 0.45) +
				0.07 * Math.sin(time * 11.7 + band * 1.7 + lag * 9);
			const kick = band < 6 ? beat * 0.32 * (1 - band / 6) : beat * 0.05;
			return Math.min(Math.max(slope + stir * (0.4 + slope) + kick, FLOOR), 1);
		});
	}

	/**
	 * A Catmull-Rom spline through the points, as cubic Béziers.
	 * @param {CanvasRenderingContext2D} context
	 * @param {[number, number][]} points
	 */
	function trace(context, points) {
		context.moveTo(points[0][0], points[0][1]);
		for (let index = 0; index < points.length - 1; index += 1) {
			const before = points[Math.max(index - 1, 0)];
			const from = points[index];
			const to = points[index + 1];
			const after = points[Math.min(index + 2, points.length - 1)];
			context.bezierCurveTo(
				from[0] + (to[0] - before[0]) / 6,
				from[1] + (to[1] - before[1]) / 6,
				to[0] - (after[0] - from[0]) / 6,
				to[1] - (after[1] - from[1]) / 6,
				to[0],
				to[1]
			);
		}
	}

	/**
	 * @param {CanvasRenderingContext2D} context
	 * @param {number} wide
	 * @param {number} high
	 * @param {boolean} blurred
	 */
	function wave(context, wide, high, blurred) {
		const width = blurred ? STROKE * GLOW_STROKE : STROKE;
		const inset = width / 2;
		const span = Math.max(high - inset * 2, 0);

		levels.forEach((bands, channel) => {
			const step = wide / bands.length;
			const crest = (/** @type {number} */ band) =>
				high - inset - span * Math.min(Math.max(band, FLOOR), 1);
			/** @type {[number, number][]} */
			const points = [[0, crest(bands[0])]];
			bands.forEach((band, index) => points.push([step * (index + 0.5), crest(band)]));
			points.push([wide, crest(bands[bands.length - 1])]);

			const weight = CHANNELS[channel] * (blurred ? GLOW_OPACITY : 1);

			if (!blurred) {
				const gradient = context.createLinearGradient(0, 0, 0, high);
				gradient.addColorStop(0, tone(FILL * weight));
				gradient.addColorStop(1, tone(FILL * FILL_BASE * weight));
				context.beginPath();
				trace(context, points);
				context.lineTo(wide, high);
				context.lineTo(0, high);
				context.closePath();
				context.fillStyle = gradient;
				context.fill();
			}

			context.beginPath();
			trace(context, points);
			context.lineWidth = width;
			context.strokeStyle = tone(OPACITY * 2 * weight);
			context.stroke();
		});
	}

	/** @param {number} alpha */
	const tone = (alpha) => color.replace(/\s*\/[^)]*\)$|\)$/, ` / ${Math.min(alpha, 1)})`);

	function draw() {
		if (!canvas) return;
		const context = canvas.getContext('2d');
		if (!context) return;

		const ratio = window.devicePixelRatio || 1;
		const wide = canvas.width / ratio;
		const high = canvas.height / ratio;
		context.setTransform(ratio, 0, 0, ratio, 0, 0);
		context.clearRect(0, 0, wide, high);

		if (bars) {
			const ride = waves ? RIDE : 0;
			const mixed = levels[0].map((level, band) => Math.max(level, levels[1][band]));
			const column = (wide - GAP * (BANDS - 1)) / BANDS;
			context.filter = 'none';
			context.fillStyle = tone(waves ? OPACITY * BEDDED : OPACITY);
			mixed.forEach((level, band) => {
				const tall = (high * Math.min(Math.max(level, FLOOR), 1)) / (1 + ride);
				context.fillRect(band * (column + GAP), high - tall, column, tall);
			});
		}

		if (waves) {
			context.filter = `blur(${GLOW}px)`;
			wave(context, wide, high, true);
			context.filter = `blur(${LINE_BLUR}px)`;
			wave(context, wide, high, false);
			context.filter = 'none';
		}
	}

	onMount(() => {
		if (!canvas) return;
		const host = canvas;
		const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
		let frame = 0;

		const size = () => {
			const ratio = window.devicePixelRatio || 1;
			const bounds = host.getBoundingClientRect();
			host.width = Math.max(1, Math.round(bounds.width * ratio));
			host.height = Math.max(1, Math.round(bounds.height * ratio));
		};

		const tick = (/** @type {number} */ now) => {
			const time = now / 1000;
			const target = playing && !still ? [spectrum(time, 0), spectrum(time, 0.07)] : null;
			levels = levels.map((bands, channel) =>
				bands.map((level, band) => {
					const goal = target ? target[channel][band] : FLOOR;
					return level + (goal - level) * EASE;
				})
			);
			draw();
			frame = requestAnimationFrame(tick);
		};

		const watch = new ResizeObserver(size);
		watch.observe(host);
		size();
		frame = requestAnimationFrame(tick);

		return () => {
			cancelAnimationFrame(frame);
			watch.disconnect();
		};
	});
</script>

<canvas class="visualizer" style:height="{max}px" bind:this={canvas}></canvas>

<style>
	.visualizer {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		width: 100%;
		pointer-events: none;
	}
</style>
