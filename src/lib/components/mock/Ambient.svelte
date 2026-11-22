<script lang="ts">
	import { onMount } from 'svelte';

	type Tint = { hue: number; saturation: number; second?: { hue: number; saturation: number } };

	let {
		tint,
		moving = true,
		downscale,
		fps = 0,
		drift = 0,
		soften = 0,
		paused = false,
		upscale = false
	}: {
		tint?: Tint;
		moving?: boolean;
		/** How many screen pixels one drawn pixel covers. A larger one costs less and blurs more. */
		downscale?: number;
		/** The most frames drawn in a second, or 0 for every display frame. */
		fps?: number;
		/** Seconds added to the clock, which the page eases toward so scrolling stirs the waves. */
		drift?: number;
		/** From 0 to 1, how far past the desktop's softness the pools blur out. */
		soften?: number;
		/** Stops drawing while nothing of the field shows. */
		paused?: boolean;
		/** Draws the field small and stretches it in a second pass at full size, which costs little more and leaves no banding at a large `downscale`. */
		upscale?: boolean;
	} = $props();

	/** The field is a heavy blur, so it is drawn at a fraction of the size and stretched. */
	const DOWNSCALE = 3;
	/** Seconds the scroll offset takes to catch up, so a flick of the wheel glides. */
	const GLIDE = 0.45;
	/** How many times the desktop's softness the pools reach at full `soften`. */
	const SOFTEST = 3.5;
	/** How much the dark sheet over the field cuts each colour, as the desktop's `SHADE`. */
	const SHADE = 0.55;
	const BACKGROUND = 10 / 255;
	/** Seconds a colour change takes to wash across, as the desktop's `WASH`. */
	const WASH = 0.8;

	// the desktop's waves.rs constants
	const SPEED = 1;
	const SWELL = 1;
	const MORPH = 1;
	const PEAK = 0.72;
	const DENSITY = 3;
	const SOFTNESS = 2.2;
	const VIGNETTE = 0.6;
	const CEILING = 0.18;

	/** A WebGL port of the desktop's waves.wgsl: five soft pools of colour morphing over a stage. */
	const FRAGMENT = `
precision highp float;
uniform vec2 size;
uniform float time;
uniform vec3 stage;
uniform vec3 colors[5];
uniform vec4 shape;
uniform vec4 field;
uniform float dither;

vec2 hash(vec2 p) {
	p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
	return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
}

float gradient_noise(vec2 p) {
	vec2 i = floor(p);
	vec2 f = fract(p);
	vec2 u = f * f * (3.0 - 2.0 * f);
	return mix(
		mix(dot(hash(i), f), dot(hash(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
		mix(dot(hash(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)), dot(hash(i + vec2(1.0)), f - vec2(1.0)), u.x),
		u.y
	) * 1.4;
}

vec2 rotate(vec2 v, float a) {
	float c = cos(a);
	float s = sin(a);
	return vec2(c * v.x - s * v.y, s * v.x + c * v.y);
}

float pool(vec2 q, float scale, vec2 seed, vec2 drift, float soft) {
	float reach = 0.4 * soft;
	return smoothstep(0.2 - reach, 0.2 + reach, gradient_noise(q * scale + seed + drift));
}

void main() {
	vec2 position = vec2(gl_FragCoord.x, size.y - gl_FragCoord.y);
	vec2 uv = position / size;
	float t = time * shape.x;
	float swell = shape.y;
	float morph = shape.z;
	float peak = shape.w;
	float density = max(field.x, 0.1);
	float soft = max(field.y, 0.1);

	vec2 p = (position - size * 0.5) / max(sqrt(size.x * size.y), 1.0) * density;
	vec2 pivot = vec2(0.23 + 0.3 * sin(t * 0.031), -0.17 + 0.25 * cos(t * 0.023));
	float turn = morph * 1.2 * gradient_noise(p * 0.55 + vec2(t * 0.045, 3.1));
	vec2 q = rotate(p - pivot, turn) + pivot;
	q += swell * 0.26 * vec2(
		gradient_noise(q * 1.05 + vec2(0.0, t * 0.06)),
		gradient_noise(q * 1.05 + vec2(5.2, -t * 0.05))
	);
	q.x += swell * 0.07 * sin(q.y * 2.2 + t * 0.21);
	q.y += swell * 0.06 * sin(q.x * 2.9 - t * 0.17);

	vec3 color = stage;
	color = mix(color, colors[0], peak * pool(q, 1.1, vec2(1.3, 0.0), vec2(t * 0.05, 0.0), soft));
	color = mix(color, colors[1], peak * pool(q, 1.3, vec2(-4.7, 2.2), vec2(0.0, -t * 0.055), soft));
	color = mix(color, colors[2], peak * pool(q, 1.0, vec2(7.1, -3.4), vec2(-t * 0.045, 0.0), soft));
	color = mix(color, colors[3], peak * pool(q, 1.2, vec2(-2.6, -6.3), vec2(0.0, t * 0.04), soft));
	color = mix(color, colors[4], peak * pool(q, 1.15, vec2(9.4, 5.8), vec2(t * 0.035, -t * 0.03), soft));

	float edge = length((uv - vec2(0.5)) * 2.0) * 0.7071;
	color *= 1.0 - field.z * smoothstep(0.15, 1.0, edge);

	float ceiling = field.w;
	float level = dot(color, vec3(0.2126, 0.7152, 0.0722));
	if (ceiling > 0.0 && level > ceiling) {
		color *= (ceiling + (level - ceiling) * 0.35) / level;
	}

	float grain = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) - 0.5;
	gl_FragColor = vec4(color + dither * grain / 255.0, 1.0);
}`;

	const VERTEX = `
attribute vec2 corner;
void main() {
	gl_Position = vec4(corner, 0.0, 1.0);
}`;

	let canvas = $state<HTMLCanvasElement | null>(null);

	const clamp = (value: number, low: number, high: number) => Math.min(Math.max(value, low), high);

	function rgb(h: number, s: number, l: number): [number, number, number] {
		const k = (n: number) => (n + h * 12) % 12;
		const a = s * Math.min(l, 1 - l);
		const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
		return [f(0), f(8), f(4)];
	}

	/** The desktop's `Ambient::colors`, laid in the order `layered` draws them, the runner-up last. */
	function colors(): [number, number, number][] {
		const neutral = (light: number) => rgb(0.06, 0.12, light);
		const floor = clamp(0.13 + BACKGROUND * 0.8, 0.13, 0.3);

		if (!tint) {
			return [
				neutral(floor),
				neutral(floor + 0.025),
				neutral(floor + 0.015),
				neutral(floor + 0.04),
				neutral(floor + 0.05)
			];
		}

		const accent = { h: tint.hue / 360, s: clamp(tint.saturation, 0.6, 0.85), l: 0.44 };
		const base = {
			h: accent.h,
			s: clamp(accent.s * 0.9 + 0.04, 0.45, 0.75),
			l: clamp(0.4 + (accent.l - 0.45) * 0.5, 0.28, 0.52)
		};
		const second = tint.second
			? rgb(
					tint.second.hue / 360,
					clamp(clamp(tint.second.saturation, 0.6, 0.85) * 0.9, 0.4, 0.72),
					clamp(0.38 + (0.44 - 0.45) * 0.5, 0.28, 0.5)
				)
			: neutral(floor + 0.03);
		return [
			rgb(base.h, base.s, base.l),
			rgb(base.h, clamp(base.s - 0.08, 0.4, 0.75), clamp(base.l + 0.14, 0.3, 0.62)),
			rgb(base.h, clamp(base.s + 0.04, 0.45, 0.8), clamp(base.l - 0.13, 0.18, 0.45)),
			rgb((base.h + 0.97) % 1, clamp(base.s - 0.02, 0.4, 0.78), clamp(base.l - 0.16, 0.16, 0.4)),
			second
		];
	}

	const shaded = (color: number[]) => color.map((channel) => channel * (1 - SHADE));

	let painted: number[][] | null = null;

	/** The upscale pass: samples the field drawn at a fraction of the size and dithers every screen pixel, so the stretch leaves no steps. */
	const BLIT = `
precision highp float;
uniform sampler2D field;
uniform vec2 size;
uniform float dither;

float noise(vec2 p) {
	return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
	vec3 color = texture2D(field, gl_FragCoord.xy / size).rgb;
	float grain = noise(gl_FragCoord.xy) + noise(gl_FragCoord.xy + 71.3) - 1.0;
	gl_FragColor = vec4(color + dither * grain / 255.0, 1.0);
}`;

	onMount(() => {
		if (!canvas) return;
		const host = canvas;
		const modern = upscale ? host.getContext('webgl2', { antialias: false, alpha: false }) : null;
		const gl: WebGLRenderingContext | WebGL2RenderingContext | null =
			modern ?? host.getContext('webgl', { antialias: false, alpha: false });
		if (!gl) return;
		// a half-float field keeps the steps between shades finer than the screen can show, so the dither has something to smooth
		const deep = !!modern && !!modern.getExtension('EXT_color_buffer_float');

		const compile = (kind: number, source: string) => {
			const shader = gl.createShader(kind);
			if (!shader) return null;
			gl.shaderSource(shader, source);
			gl.compileShader(shader);
			return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null;
		};
		const link = (source: string) => {
			const vertex = compile(gl.VERTEX_SHADER, VERTEX);
			const fragment = compile(gl.FRAGMENT_SHADER, source);
			const linked = gl.createProgram();
			if (!vertex || !fragment || !linked) return null;
			gl.attachShader(linked, vertex);
			gl.attachShader(linked, fragment);
			gl.bindAttribLocation(linked, 0, 'corner');
			gl.linkProgram(linked);
			return gl.getProgramParameter(linked, gl.LINK_STATUS) ? linked : null;
		};

		const program = link(FRAGMENT);
		if (!program) return;
		const blit = upscale ? link(BLIT) : null;

		const buffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
		gl.enableVertexAttribArray(0);
		gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

		const at = (name: string) => gl.getUniformLocation(program, name);
		gl.useProgram(program);
		gl.uniform4f(at('shape'), SPEED, SWELL, MORPH, PEAK);
		// an 8-bit field still needs its own dither under the upscale, a half-float one does not
		gl.uniform1f(at('dither'), blit && deep ? 0 : 1);
		gl.uniform4f(at('field'), DENSITY, SOFTNESS, VIGNETTE, CEILING);
		const [r, g, b] = shaded([BACKGROUND, BACKGROUND, BACKGROUND]);
		gl.uniform3f(at('stage'), r, g, b);

		let texture: WebGLTexture | null = null;
		let target: WebGLFramebuffer | null = null;
		if (blit) {
			texture = gl.createTexture();
			gl.bindTexture(gl.TEXTURE_2D, texture);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
			target = gl.createFramebuffer();
			gl.useProgram(blit);
			gl.uniform1i(gl.getUniformLocation(blit, 'field'), 0);
			gl.uniform1f(gl.getUniformLocation(blit, 'dither'), 1);
		}

		const started = performance.now();
		let stepped = started;
		let drawn = 0;
		let eased = drift;
		const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
		let frame = 0;
		let low = [1, 1];

		const size = () => {
			const bounds = host.getBoundingClientRect();
			const scale = downscale ?? DOWNSCALE;
			low = [
				Math.max(1, Math.round(bounds.width / scale)),
				Math.max(1, Math.round(bounds.height / scale))
			];
			host.width = blit ? Math.max(1, Math.round(bounds.width)) : low[0];
			host.height = blit ? Math.max(1, Math.round(bounds.height)) : low[1];
			gl.useProgram(program);
			gl.uniform2f(at('size'), low[0], low[1]);

			if (!blit || !texture || !target) return;
			gl.bindTexture(gl.TEXTURE_2D, texture);
			if (deep && modern) {
				modern.texImage2D(
					gl.TEXTURE_2D,
					0,
					modern.RGBA16F,
					low[0],
					low[1],
					0,
					gl.RGBA,
					modern.HALF_FLOAT,
					null
				);
			} else {
				gl.texImage2D(
					gl.TEXTURE_2D,
					0,
					gl.RGBA,
					low[0],
					low[1],
					0,
					gl.RGBA,
					gl.UNSIGNED_BYTE,
					null
				);
			}
			gl.bindFramebuffer(gl.FRAMEBUFFER, target);
			gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
			gl.bindFramebuffer(gl.FRAMEBUFFER, null);
			gl.useProgram(blit);
			gl.uniform2f(gl.getUniformLocation(blit, 'size'), host.width, host.height);
		};

		const draw = (now: number) => {
			const animates = moving && !still;
			const goal = colors().map(shaded);
			const step = (now - stepped) / 1000;
			stepped = now;
			const delta = animates && painted ? 1 - Math.exp(-step / WASH) : 1;
			painted = goal.map((color, index) =>
				color.map((channel, at) => {
					const from = painted?.[index][at] ?? channel;
					return from + (channel - from) * delta;
				})
			);
			eased = animates ? eased + (drift - eased) * (1 - Math.exp(-step / GLIDE)) : drift;

			gl.useProgram(program);
			gl.uniform3fv(at('colors'), new Float32Array(painted.flat()));
			gl.uniform4f(
				at('field'),
				DENSITY,
				SOFTNESS * (1 + (SOFTEST - 1) * soften),
				VIGNETTE,
				CEILING
			);
			gl.uniform1f(at('time'), (animates ? (now - started) / 1000 : 0) + eased);
			gl.bindFramebuffer(gl.FRAMEBUFFER, target);
			gl.viewport(0, 0, low[0], low[1]);
			gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

			if (!blit) return;
			gl.bindFramebuffer(gl.FRAMEBUFFER, null);
			gl.viewport(0, 0, host.width, host.height);
			gl.useProgram(blit);
			gl.bindTexture(gl.TEXTURE_2D, texture);
			gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
		};

		const tick = (now: number) => {
			frame = requestAnimationFrame(tick);
			if (paused || document.hidden) {
				stepped = now;
				return;
			}
			if (fps && now - drawn < 1000 / fps - 2) return;
			drawn = now;
			draw(now);
		};

		const watch = new ResizeObserver(() => {
			size();
			draw(performance.now());
		});
		watch.observe(host);
		size();
		frame = requestAnimationFrame(tick);

		return () => {
			cancelAnimationFrame(frame);
			watch.disconnect();
		};
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
		background: rgb(4.5 4.5 4.5);
	}
</style>
