const SURFACE_TINT = 0.5;
const BORDER_TINT = 0.4;
const TEXT_TINT = 0.12;
const MAX_WASH_SATURATION = 0.7;
const MIN_ACCENT_SATURATION = 0.6;
const MAX_ACCENT_SATURATION = 0.85;

const FIELDS = [
	'background',
	'secondary',
	'secondary_hover',
	'secondary_active',
	'muted',
	'popover',
	'sidebar',
	'sidebar_accent',
	'table_head',
	'table_hover',
	'border',
	'sidebar_border',
	'title_bar_border',
	'table_row_border',
	'foreground',
	'popover_foreground',
	'muted_foreground',
	'table_head_foreground',
	'primary',
	'primary_hover',
	'primary_foreground',
	'progress_bar',
	'table_active'
];

const SURFACES = 10;
const BORDERS = 14;
const TEXTS = 18;

const palettes: Record<string, string[]> = {
	light:
		'fafafa f5f5f5 e5e5e5 d4d4d4 e5e5e5 ffffff f5f5f5 e5e5e5 f5f5f5e6 f0f0f0 d4d4d4 d4d4d4 d4d4d4 d4d4d4b3 171717 171717 737373 737373 171717 262626 fafafa 262626 2563eb1f'.split(
			' '
		),
	dark: '0a0a0a 171717 232323 303030 262626 141414 0a0a0a 262626 171717cc 262626 262626 262626 262626 262626b3 fafafa fafafa 737373 525252 fafafa e5e5e5 171717 f5f5f5 1e40af33'.split(
		' '
	),
	midnight:
		'07111f 102238 17304d 1e3b5d 15283d 0b1a2c 091827 17304d 102238e6 132b45 1e344d 1e344d 1e344d 1e344db3 e6edf7 e6edf7 8296ad 8296ad 38bdf8 7dd3fc 07111f 38bdf8 0284c733'.split(
			' '
		),
	forest:
		'0b1410 16261d 203328 2a4334 203328 101d16 0d1812 203328 16261de6 1b2e23 263d30 263d30 263d30 263d30b3 ecf7ef ecf7ef 86a58f 86a58f 86efac bbf7d0 0b1410 4ade80 16a34a33'.split(
			' '
		),
	ocean:
		'06171a 0f292d 17373b 20474c 17373b 0a2024 081c1f 17373b 0f292de6 123136 1d4145 1d4145 1d4145 1d4145b3 e6edf7 e6edf7 7fa9ad 5a787b 5eead4 99f6e4 06171a 2dd4bf 0d948833'.split(
			' '
		),
	rose: '180b10 2b161e 3b2029 4b2633 3b2029 211018 1c0d13 3b2029 2b161ee6 341b24 4b2633 4b2633 4b2633 4b2633b3 fafafa fafafa b58a98 80626c fda4af fecdd3 180b10 fb7185 e11d4833'.split(
		' '
	),
	lavender:
		'120e1c 241c35 302745 3d3158 302745 191326 161020 302745 241c35e6 2a213d 3d3158 3d3158 3d3158 3d3158b3 fafafa fafafa a99bc2 786e8a c4b5fd ddd6fe 120e1c a78bfa 7c3aed33'.split(
			' '
		),
	amber:
		'171108 291f11 382b18 49371d 382b18 20170c 1b1409 382b18 291f11e6 312514 49371d 49371d 49371d 49371db3 fafafa fafafa ad9878 7b6c55 fcd34d fde68a 171108 f59e0b d9770633'.split(
			' '
		)
};

const kinds: Record<string, string> = {
	System: 'system',
	Dark: 'dark',
	Light: 'light',
	Midnight: 'midnight',
	Forest: 'forest',
	Ocean: 'ocean',
	Rose: 'rose',
	Lavender: 'lavender',
	Amber: 'amber'
};

export const themes = Object.keys(kinds);

export type Shade = [number, number, number, number];

const clamp = (value: number, low: number, high: number) => Math.min(Math.max(value, low), high);

const round = (value: number) => Math.round(value * 1000) / 1000;

function shade(value: string): Shade {
	const bits = parseInt(value, 16);
	const wide = value.length === 8;
	const red = ((wide ? bits >>> 24 : bits >> 16) & 255) / 255;
	const green = ((wide ? bits >>> 16 : bits >> 8) & 255) / 255;
	const blue = ((wide ? bits >>> 8 : bits) & 255) / 255;
	const alpha = wide ? (bits & 255) / 255 : 1;

	const top = Math.max(red, green, blue);
	const low = Math.min(red, green, blue);
	const lightness = (top + low) / 2;
	const span = top - low;
	if (span === 0) return [0, 0, lightness * 100, alpha];

	const saturation = span / (lightness > 0.5 ? 2 - top - low : top + low);
	const hue =
		top === red
			? (green - blue) / span + (green < blue ? 6 : 0)
			: top === green
				? (blue - red) / span + 2
				: (red - green) / span + 4;

	return [hue * 60, saturation, lightness * 100, alpha];
}

const css = ([hue, saturation, lightness, alpha]: Shade) => {
	const parts = `${round(hue)} ${round(saturation * 100)}% ${round(lightness)}%`;
	return alpha === 1 ? `hsl(${parts})` : `hsl(${parts} / ${round(alpha)})`;
};

type Tint = { hue: number; saturation: number };

const wash = (base: Shade, tint: Tint, strength: number): Shade => [
	tint.hue,
	Math.min(base[1] + tint.saturation * strength, MAX_WASH_SATURATION),
	base[2],
	base[3]
];

function shades(source: string[], tint: Tint | undefined): Record<string, string> {
	const base = source.map(shade);
	const out = [...base];

	if (tint) {
		for (let at = 0; at < FIELDS.length; at += 1) {
			const strength =
				at < SURFACES ? SURFACE_TINT : at < BORDERS ? BORDER_TINT : at < TEXTS ? TEXT_TINT : 0;
			if (strength) out[at] = wash(base[at], tint, strength);
		}

		const dark = base[0][2] < 50;
		const saturation = clamp(tint.saturation, MIN_ACCENT_SATURATION, MAX_ACCENT_SATURATION);
		const accent = (lightness: number): Shade => [tint.hue, saturation, lightness, 1];

		out[FIELDS.indexOf('primary')] = accent(dark ? 72 : 42);
		out[FIELDS.indexOf('primary_hover')] = accent(dark ? 82 : 34);
		out[FIELDS.indexOf('primary_foreground')] = [
			tint.hue,
			Math.min(tint.saturation, 0.25),
			dark ? 8 : 98,
			1
		];
		out[FIELDS.indexOf('progress_bar')] = accent(dark ? 72 : 42);
		out[FIELDS.indexOf('table_active')] = [tint.hue, saturation, dark ? 44 : 50, 0.22];
	}

	const tokens: Record<string, string> = {};
	FIELDS.forEach((name, at) => {
		tokens[`--m-${name.replaceAll('_', '-')}`] = css(out[at]);
	});
	return tokens;
}

export function palette(
	tint: Tint | undefined,
	adaptive = true,
	theme = 'Dark'
): Record<string, string> {
	const washing = adaptive ? tint : undefined;
	const kind = kinds[theme] ?? 'dark';
	if (kind !== 'system') return shades(palettes[kind], washing);

	const light = shades(palettes.light, washing);
	const dark = shades(palettes.dark, washing);
	const tokens: Record<string, string> = {};
	for (const name of Object.keys(dark)) {
		tokens[name] = `light-dark(${light[name]}, ${dark[name]})`;
	}
	return tokens;
}
