<script>
	import { onMount } from 'svelte';

	/** @type {{ tint?: { hue: number, saturation: number }, moving?: boolean }} */
	let { tint, moving = true } = $props();

	const DOWNSCALE = 4;
	const DISCS = 24;
	const DISC_FAINT = 0.027;
	const DISC_STRONG = 0.079;
	const SHADE = 0.55;
	const BACKGROUND = 10 / 255;

	/** @type {[number, number, number, number, number, number, number][]} */
	const SPECS = [
		[0.22, 0.3, 1.1, 34, 0.0, 0.13, 0.1],
		[0.8, 0.24, 1.0, 27, 1.7, 0.11, 0.13],
		[0.52, 0.68, 1.2, 41, 3.4, 0.14, 0.09],
		[0.12, 0.78, 0.9, 24, 5.1, 0.1, 0.12],
		[0.85, 0.72, 0.72, 31, 2.5, 0.12, 0.11]
	];

	let canvas = $state(/** @type {HTMLCanvasElement | null} */ (null));

	/** @param {number} value @param {number} low @param {number} high */
	const clamp = (value, low, high) => Math.min(Math.max(value, low), high);

	/**
	 * @param {number} h @param {number} s @param {number} l
	 * @returns {[number, number, number]}
	 */
	function rgb(h, s, l) {
		const k = (/** @type {number} */ n) => (n + h * 12) % 12;
		const a = s * Math.min(l, 1 - l);
		const f = (/** @type {number} */ n) =>
			l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
		return [f(0), f(8), f(4)];
	}

	/** @returns {[number, number, number][]} */
	function colors() {
		/** @param {number} light @returns {[number, number, number]} */
		const neutral = (light) => rgb(0.06, 0.12, light);
		const floor = clamp(0.13 + BACKGROUND * 0.8, 0.13, 0.3);

		if (!tint) {
			return [
				neutral(floor),
				neutral(floor + 0.025),
				neutral(floor + 0.05),
				neutral(floor + 0.015),
				neutral(floor + 0.04)
			];
		}

		const accent = { h: tint.hue, s: clamp(tint.saturation, 0.6, 0.85), l: 0.44 };
		const base = {
			h: accent.h,
			s: clamp(accent.s * 0.9 + 0.04, 0.45, 0.75),
			l: clamp(0.4 + (accent.l - 0.45) * 0.5, 0.28, 0.52)
		};
		return [
			rgb(base.h, base.s, base.l),
			rgb(base.h, clamp(base.s - 0.08, 0.4, 0.75), clamp(base.l + 0.14, 0.3, 0.62)),
			neutral(floor + 0.03),
			rgb(base.h, clamp(base.s + 0.04, 0.45, 0.8), clamp(base.l - 0.13, 0.18, 0.45)),
			rgb((base.h + 0.97) % 1, clamp(base.s - 0.02, 0.4, 0.78), clamp(base.l - 0.16, 0.16, 0.4))
		];
	}

	/** @param {[number, number, number]} color @param {number} alpha */
	const paint = ([r, g, b], alpha) =>
		`rgba(${Math.round(r * (1 - SHADE) * 255)}, ${Math.round(g * (1 - SHADE) * 255)}, ${Math.round(b * (1 - SHADE) * 255)}, ${alpha})`;

	/** @param {number} elapsed */
	function draw(elapsed) {
		if (!canvas) return;
		const context = canvas.getContext('2d');
		if (!context) return;

		const wide = canvas.width;
		const high = canvas.height;
		const tones = colors();

		context.filter = 'none';
		context.fillStyle = paint([BACKGROUND, BACKGROUND, BACKGROUND], 1);
		context.fillRect(0, 0, wide, high);
		context.filter = 'blur(4px)';

		SPECS.forEach(([x0, y0, size, period, phase, ax, ay], index) => {
			const spin = (Math.PI * 2 * elapsed) / period;
			const x = (x0 + ax * Math.sin(spin + phase)) * wide;
			const y = (y0 + ay * Math.cos(spin * 0.83 + phase * 1.7)) * high;
			const grown = Math.min(wide, high) * size * (1 + 0.12 * Math.sin(spin * 0.6 + phase * 2.3));

			for (let step = 0; step < DISCS; step += 1) {
				const fraction = 1 - (step / DISCS) * (1 - 1 / DISCS);
				const opacity = DISC_FAINT + (step / (DISCS - 1)) * (DISC_STRONG - DISC_FAINT);
				context.fillStyle = paint(tones[index], opacity);
				context.beginPath();
				context.arc(x, y, (grown * fraction) / 2, 0, Math.PI * 2);
				context.fill();
			}
		});
	}

	onMount(() => {
		if (!canvas) return;
		const host = canvas;
		const started = performance.now();
		const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
		let frame = 0;

		const size = () => {
			const bounds = host.getBoundingClientRect();
			host.width = Math.max(1, Math.round(bounds.width / DOWNSCALE));
			host.height = Math.max(1, Math.round(bounds.height / DOWNSCALE));
		};

		const tick = () => {
			draw(moving && !still ? (performance.now() - started) / 1000 : 0);
			if (moving && !still) frame = requestAnimationFrame(tick);
		};

		const watch = new ResizeObserver(() => {
			size();
			draw(moving && !still ? (performance.now() - started) / 1000 : 0);
		});
		watch.observe(host);
		size();
		tick();

		return () => {
			cancelAnimationFrame(frame);
			watch.disconnect();
		};
	});

	$effect(() => {
		void tint;
		draw(0);
	});
</script>

<canvas class="ambient" bind:this={canvas}></canvas>

<style>
	.ambient {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
	}
</style>
