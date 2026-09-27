const SURFACE_TINT = 0.5;
const BORDER_TINT = 0.4;
const TEXT_TINT = 0.12;
const MAX_WASH_SATURATION = 0.7;
const MIN_ACCENT_SATURATION = 0.6;
const MAX_ACCENT_SATURATION = 0.85;

const FIELDS = [
	'background',
	'foreground',
	'border',
	'muted',
	'overlay',
	'overlay_foreground',
	'muted_foreground',
	'secondary',
	'secondary_hover',
	'secondary_active',
	'primary',
	'primary_foreground',
	'primary_hover',
	'danger',
	'danger_foreground',
	'danger_hover',
	'popover',
	'popover_foreground',
	'progress_bar',
	'selection',
	'sidebar',
	'sidebar_accent',
	'sidebar_border',
	'title_bar_border',
	'table_head',
	'table_head_foreground',
	'table_row_border',
	'table_hover',
	'table_active',
	'table_active_border'
];

const SURFACES = new Set([
	'background',
	'secondary',
	'secondary_hover',
	'secondary_active',
	'muted',
	'popover',
	'sidebar',
	'sidebar_accent',
	'table_head',
	'table_hover'
]);

const BORDERS = new Set(['border', 'sidebar_border', 'title_bar_border', 'table_row_border']);

const TEXTS = new Set([
	'foreground',
	'popover_foreground',
	'muted_foreground',
	'table_head_foreground'
]);

const palettes: Record<string, string> = {
	dark: '0a0a0a fafafa 50505066 262626 0000008c fafafa 909090 171717 36363666 4d4d4d66 fafafa 171717 e5e5e5b3 7f1d1d fef2f2 8b2020b3 141414 fafafa f5f5f5 1d4ed8 0a0a0a 50505066 262626 262626 171717cc 8a8a8a 262626b3 3b3b3b66 1e40af33 1d4ed8',
	light:
		'fafafa 171717 9b9b9b66 e5e5e5 0000008c fafafa 606060 f5f5f5 d5d5d566 b7b7b766 171717 fafafa 262626b3 b91c1c fef2f2 991b1bb3 ffffff 171717 262626 2563eb f5f5f5 cdcdcd66 d4d4d4 d4d4d4 f5f5f5e6 666666 d4d4d4b3 e8e8e866 2563eb1f 2563eb',
	midnight:
		'07111f e6edf7 40689266 15283d 0000008c fafafa 8296ad 102238 23477066 2f5b8c66 38bdf8 07111f 7dd3fcb3 991b1b fff1f2 b91c1cb3 0b1a2c e6edf7 38bdf8 0284c7 091827 2c548666 1e344d 1e344d 102238e6 8296ad 1e344db3 1c3f6266 0284c733 38bdf8',
	forest:
		'0b1410 ecf7ef 4e7a6066 203328 0000008c fafafa 86a58f 16261d 304a3a66 41664f66 86efac 0b1410 bbf7d0b3 991b1b fff1f2 b91c1cb3 101d16 ecf7ef 4ade80 16a34a 0d1812 3c5c4966 263d30 263d30 16261de6 86a58f 263d30b3 27423166 16a34a33 4ade80',
	ocean:
		'06171a e6edf7 3f808666 17373b 0000008c fafafa 7fa9ad 0f292d 244f5466 346b7266 5eead4 06171a 99f6e4b3 991b1b fff1f2 b91c1cb3 0a2024 e6edf7 2dd4bf 0d9488 081c1f 2d606566 1d4145 1d4145 0f292de6 5a787b 1d4145b3 1b454b66 0d948833 2dd4bf',
	rose: '180b10 fafafa 984e6766 3b2029 0000008c fafafa b58a98 2b161e 55303c66 713a4d66 fda4af 180b10 fecdd3b3 7f1d1d fef2f2 8b2020b3 211018 fafafa fb7185 e11d48 1c0d13 6a3c4a66 4b2633 4b2633 2b161ee6 80626c 4b2633b3 49273366 e11d4833 fb7185',
	lavender:
		'120e1c fafafa 7e66b266 302745 0000008c fafafa a99bc2 241c35 473a6466 5d4b8566 c4b5fd 120e1c ddd6feb3 7f1d1d fef2f2 8b2020b3 191326 fafafa a78bfa 7c3aed 161020 57497c66 3d3158 3d3158 241c35e6 786e8a 3d3158b3 3c2f5666 7c3aed33 a78bfa',
	amber:
		'171108 fafafa 94703c66 382b18 0000008c fafafa ad9878 291f11 513f2466 6f542d66 fcd34d 171108 fde68ab3 7f1d1d fef2f2 8b2020b3 20170c fafafa f59e0b d97706 1b1409 634e2e66 49371d 49371d 291f11e6 7b6c55 49371db3 45341d66 d9770633 f59e0b'
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

export type Tint = { hue: number; saturation: number };

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

const wash = (base: Shade, tint: Tint, strength: number): Shade => [
	tint.hue,
	Math.min(base[1] + tint.saturation * strength, MAX_WASH_SATURATION),
	base[2],
	base[3]
];

function shades(source: string, tint: Tint | undefined): Record<string, string> {
	const raw = source.split(' ').map(shade);
	const out: Record<string, Shade> = {};
	FIELDS.forEach((name, at) => {
		out[name] = raw[at];
	});

	if (tint) {
		for (const name of FIELDS) {
			const strength = SURFACES.has(name)
				? SURFACE_TINT
				: BORDERS.has(name)
					? BORDER_TINT
					: TEXTS.has(name)
						? TEXT_TINT
						: 0;
			if (strength) out[name] = wash(out[name], tint, strength);
		}

		const dark = raw[0][2] < 50;
		const saturation = clamp(tint.saturation, MIN_ACCENT_SATURATION, MAX_ACCENT_SATURATION);
		const accent = (lightness: number, alpha = 1): Shade => [
			tint.hue,
			saturation,
			lightness,
			alpha
		];

		out.primary = accent(dark ? 72 : 42);
		out.primary_hover = accent(dark ? 82 : 34, 0.7);
		out.primary_foreground = [tint.hue, Math.min(tint.saturation, 0.25), dark ? 8 : 98, 1];
		out.progress_bar = out.primary;
		out.selection = accent(dark ? 44 : 50);
		out.table_active = accent(dark ? 44 : 50, 0.22);
		out.table_active_border = out.primary;
	}

	const tokens: Record<string, string> = {};
	for (const name of FIELDS) {
		tokens[`--m-${name.replaceAll('_', '-')}`] = css(out[name]);
	}
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
