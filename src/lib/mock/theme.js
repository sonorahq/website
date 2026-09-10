const SURFACE_TINT = 0.5;
const BORDER_TINT = 0.4;
const TEXT_TINT = 0.12;
const MAX_WASH_SATURATION = 0.7;
const MIN_ACCENT_SATURATION = 0.6;
const MAX_ACCENT_SATURATION = 0.85;

const SURFACES = [
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
];

const BORDERS = ['border', 'sidebar_border', 'title_bar_border', 'table_row_border'];

const TEXTS = ['foreground', 'popover_foreground', 'muted_foreground', 'table_head_foreground'];

/** @typedef {[number, number, number, number]} Shade */

/** @type {Record<string, Record<string, Shade>>} */
const palettes = {
	light: {
		background: [0, 0, 98.039, 1],
		secondary: [0, 0, 96.078, 1],
		secondary_hover: [0, 0, 89.804, 1],
		secondary_active: [0, 0, 83.137, 1],
		muted: [0, 0, 89.804, 1],
		popover: [0, 0, 100, 1],
		sidebar: [0, 0, 96.078, 1],
		sidebar_accent: [0, 0, 89.804, 1],
		table_head: [0, 0, 96.078, 0.902],
		table_hover: [0, 0, 94.118, 1],
		border: [0, 0, 83.137, 1],
		sidebar_border: [0, 0, 83.137, 1],
		title_bar_border: [0, 0, 83.137, 1],
		table_row_border: [0, 0, 83.137, 0.702],
		foreground: [0, 0, 9.02, 1],
		popover_foreground: [0, 0, 9.02, 1],
		muted_foreground: [0, 0, 45.098, 1],
		table_head_foreground: [0, 0, 45.098, 1],
		primary: [0, 0, 9.02, 1],
		primary_hover: [0, 0, 14.902, 1],
		primary_foreground: [0, 0, 98.039, 1],
		progress_bar: [0, 0, 14.902, 1],
		table_active: [221.212, 0.8319, 53.333, 0.122]
	},
	dark: {
		background: [0, 0, 3.922, 1],
		secondary: [0, 0, 9.02, 1],
		secondary_hover: [0, 0, 13.725, 1],
		secondary_active: [0, 0, 18.824, 1],
		muted: [0, 0, 14.902, 1],
		popover: [0, 0, 7.843, 1],
		sidebar: [0, 0, 3.922, 1],
		sidebar_accent: [0, 0, 14.902, 1],
		table_head: [0, 0, 9.02, 0.8],
		table_hover: [0, 0, 14.902, 1],
		border: [0, 0, 14.902, 1],
		sidebar_border: [0, 0, 14.902, 1],
		title_bar_border: [0, 0, 14.902, 1],
		table_row_border: [0, 0, 14.902, 0.702],
		foreground: [0, 0, 98.039, 1],
		popover_foreground: [0, 0, 98.039, 1],
		muted_foreground: [0, 0, 45.098, 1],
		table_head_foreground: [0, 0, 32.157, 1],
		primary: [0, 0, 98.039, 1],
		primary_hover: [0, 0, 89.804, 1],
		primary_foreground: [0, 0, 9.02, 1],
		progress_bar: [0, 0, 96.078, 1],
		table_active: [225.931, 0.7073, 40.196, 0.2]
	},
	midnight: {
		background: [215, 0.6316, 7.451, 1],
		secondary: [213, 0.5556, 14.118, 1],
		secondary_hover: [212.222, 0.54, 19.608, 1],
		secondary_active: [212.381, 0.5122, 24.118, 1],
		muted: [211.5, 0.4878, 16.078, 1],
		popover: [212.727, 0.6, 10.784, 1],
		sidebar: [210, 0.625, 9.412, 1],
		sidebar_accent: [212.222, 0.54, 19.608, 1],
		table_head: [213, 0.5556, 14.118, 0.902],
		table_hover: [211.2, 0.5682, 17.255, 1],
		border: [211.915, 0.4393, 20.98, 1],
		sidebar_border: [211.915, 0.4393, 20.98, 1],
		title_bar_border: [211.915, 0.4393, 20.98, 1],
		table_row_border: [211.915, 0.4393, 20.98, 0.702],
		foreground: [215.294, 0.5152, 93.529, 1],
		popover_foreground: [215.294, 0.5152, 93.529, 1],
		muted_foreground: [212.093, 0.2077, 59.412, 1],
		table_head_foreground: [212.093, 0.2077, 59.412, 1],
		primary: [198.438, 0.932, 59.608, 1],
		primary_hover: [199.37, 0.9549, 73.922, 1],
		primary_foreground: [215, 0.6316, 7.451, 1],
		progress_bar: [198.438, 0.932, 59.608, 1],
		table_active: [200.406, 0.9801, 39.412, 0.2]
	},
	forest: {
		background: [153.333, 0.2903, 6.078, 1],
		secondary: [146.25, 0.2667, 11.765, 1],
		secondary_hover: [145.263, 0.2289, 16.275, 1],
		secondary_active: [144, 0.2294, 21.373, 1],
		muted: [145.263, 0.2289, 16.275, 1],
		popover: [147.692, 0.2889, 8.824, 1],
		sidebar: [147.273, 0.2973, 7.255, 1],
		sidebar_accent: [145.263, 0.2289, 16.275, 1],
		table_head: [146.25, 0.2667, 11.765, 0.902],
		table_hover: [145.263, 0.2603, 14.314, 1],
		border: [146.087, 0.2323, 19.412, 1],
		sidebar_border: [146.087, 0.2323, 19.412, 1],
		title_bar_border: [146.087, 0.2323, 19.412, 1],
		table_row_border: [146.087, 0.2323, 19.412, 0.702],
		foreground: [136.364, 0.4074, 94.706, 1],
		popover_foreground: [136.364, 0.4074, 94.706, 1],
		muted_foreground: [137.419, 0.1469, 58.627, 1],
		table_head_foreground: [137.419, 0.1469, 58.627, 1],
		primary: [141.714, 0.7664, 73.137, 1],
		primary_hover: [141, 0.7895, 85.098, 1],
		primary_foreground: [153.333, 0.2903, 6.078, 1],
		progress_bar: [141.892, 0.6916, 58.039, 1],
		table_active: [142.128, 0.7622, 36.275, 0.2]
	},
	ocean: {
		background: [189, 0.625, 6.275, 1],
		secondary: [188, 0.5, 11.765, 1],
		secondary_hover: [186.667, 0.439, 16.078, 1],
		secondary_active: [186.818, 0.4074, 21.176, 1],
		muted: [186.667, 0.439, 16.078, 1],
		popover: [189.231, 0.5652, 9.02, 1],
		sidebar: [187.826, 0.5897, 7.647, 1],
		sidebar_accent: [186.667, 0.439, 16.078, 1],
		table_head: [188, 0.5, 11.765, 0.902],
		table_hover: [188.333, 0.5, 14.118, 1],
		border: [186, 0.4082, 19.216, 1],
		sidebar_border: [186, 0.4082, 19.216, 1],
		title_bar_border: [186, 0.4082, 19.216, 1],
		table_row_border: [186, 0.4082, 19.216, 0.702],
		foreground: [215.294, 0.5152, 93.529, 1],
		popover_foreground: [215.294, 0.5152, 93.529, 1],
		muted_foreground: [185.217, 0.219, 58.824, 1],
		table_head_foreground: [185.455, 0.1549, 41.765, 1],
		primary: [170.571, 0.7692, 64.314, 1],
		primary_hover: [168.387, 0.8378, 78.235, 1],
		primary_foreground: [189, 0.625, 6.275, 1],
		progress_bar: [172.455, 0.6601, 50.392, 1],
		table_active: [174.667, 0.8385, 31.569, 0.2]
	},
	rose: {
		background: [336.923, 0.3714, 6.863, 1],
		secondary: [337.143, 0.3231, 12.745, 1],
		secondary_hover: [340, 0.2967, 17.843, 1],
		secondary_active: [338.919, 0.3274, 22.157, 1],
		muted: [340, 0.2967, 17.843, 1],
		popover: [331.765, 0.3469, 9.608, 1],
		sidebar: [336, 0.3659, 8.039, 1],
		sidebar_accent: [340, 0.2967, 17.843, 1],
		table_head: [337.143, 0.3231, 12.745, 0.902],
		table_hover: [338.4, 0.3165, 15.49, 1],
		border: [338.919, 0.3274, 22.157, 1],
		sidebar_border: [338.919, 0.3274, 22.157, 1],
		title_bar_border: [338.919, 0.3274, 22.157, 1],
		table_row_border: [338.919, 0.3274, 22.157, 0.702],
		foreground: [0, 0, 98.039, 1],
		popover_foreground: [0, 0, 98.039, 1],
		muted_foreground: [340.465, 0.2251, 62.549, 1],
		table_head_foreground: [340, 0.1327, 44.314, 1],
		primary: [352.584, 0.957, 81.765, 1],
		primary_hover: [352.653, 0.9608, 90, 1],
		primary_foreground: [336.923, 0.3714, 6.863, 1],
		progress_bar: [351.304, 0.9452, 71.373, 1],
		table_active: [346.837, 0.7717, 49.804, 0.2]
	},
	lavender: {
		background: [257.143, 0.3333, 8.235, 1],
		secondary: [259.2, 0.3086, 15.882, 1],
		secondary_hover: [258, 0.2778, 21.176, 1],
		secondary_active: [258.462, 0.2847, 26.863, 1],
		muted: [258, 0.2778, 21.176, 1],
		popover: [258.947, 0.3333, 11.176, 1],
		sidebar: [262.5, 0.3333, 9.412, 1],
		sidebar_accent: [258, 0.2778, 21.176, 1],
		table_head: [259.2, 0.3086, 15.882, 0.902],
		table_hover: [259.286, 0.2979, 18.431, 1],
		border: [258.462, 0.2847, 26.863, 1],
		sidebar_border: [258.462, 0.2847, 26.863, 1],
		title_bar_border: [258.462, 0.2847, 26.863, 1],
		table_row_border: [258.462, 0.2847, 26.863, 0.702],
		foreground: [0, 0, 98.039, 1],
		popover_foreground: [0, 0, 98.039, 1],
		muted_foreground: [261.538, 0.2422, 68.431, 1],
		table_head_foreground: [261.429, 0.1129, 48.627, 1],
		primary: [252.5, 0.9474, 85.098, 1],
		primary_hover: [250.5, 0.9524, 91.765, 1],
		primary_foreground: [257.143, 0.3333, 8.235, 1],
		progress_bar: [255.135, 0.9174, 76.275, 1],
		table_active: [262.123, 0.8326, 57.843, 0.2]
	},
	amber: {
		background: [36, 0.4839, 6.078, 1],
		secondary: [35, 0.4138, 11.373, 1],
		secondary_hover: [35.625, 0.4, 15.686, 1],
		secondary_active: [35.455, 0.4314, 20, 1],
		muted: [35.625, 0.4, 15.686, 1],
		popover: [33, 0.4545, 8.627, 1],
		sidebar: [36.667, 0.5, 7.059, 1],
		sidebar_accent: [35.625, 0.4, 15.686, 1],
		table_head: [35, 0.4138, 11.373, 0.902],
		table_hover: [35.172, 0.4203, 13.529, 1],
		border: [35.455, 0.4314, 20, 1],
		sidebar_border: [35.455, 0.4314, 20, 1],
		title_bar_border: [35.455, 0.4314, 20, 1],
		table_row_border: [35.455, 0.4314, 20, 0.702],
		foreground: [0, 0, 98.039, 1],
		popover_foreground: [0, 0, 98.039, 1],
		muted_foreground: [36.226, 0.2442, 57.451, 1],
		table_head_foreground: [36.316, 0.1827, 40.784, 1],
		primary: [45.943, 0.9669, 64.51, 1],
		primary_hover: [48, 0.9664, 76.667, 1],
		primary_foreground: [36, 0.4839, 6.078, 1],
		progress_bar: [37.692, 0.9213, 50.196, 1],
		table_active: [32.133, 0.9462, 43.725, 0.2]
	}
};

/** @type {Record<string, string>} */
const kinds = {
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

/** @param {number} value @param {number} low @param {number} high */
const clamp = (value, low, high) => Math.min(Math.max(value, low), high);

/** @param {number} value */
const round = (value) => Math.round(value * 1000) / 1000;

/** @param {Shade} shade */
const css = ([hue, saturation, lightness, alpha]) => {
	const shade = `${round(hue)} ${round(saturation * 100)}% ${round(lightness)}%`;
	return alpha === 1 ? `hsl(${shade})` : `hsl(${shade} / ${round(alpha)})`;
};

/**
 * @param {Shade} base
 * @param {{ hue: number, saturation: number }} tint
 * @param {number} strength
 * @returns {Shade}
 */
const wash = (base, tint, strength) => [
	tint.hue,
	Math.min(base[1] + tint.saturation * strength, MAX_WASH_SATURATION),
	base[2],
	base[3]
];

/**
 * @param {Record<string, Shade>} base
 * @param {{ hue: number, saturation: number } | undefined} tint
 * @returns {Record<string, string>}
 */
function shades(base, tint) {
	/** @type {Record<string, Shade>} */
	const out = { ...base };
	if (tint) {
		for (const name of SURFACES) out[name] = wash(base[name], tint, SURFACE_TINT);
		for (const name of BORDERS) out[name] = wash(base[name], tint, BORDER_TINT);
		for (const name of TEXTS) out[name] = wash(base[name], tint, TEXT_TINT);

		const dark = base.background[2] < 50;
		const saturation = clamp(tint.saturation, MIN_ACCENT_SATURATION, MAX_ACCENT_SATURATION);
		/** @param {number} lightness @returns {Shade} */
		const accent = (lightness) => [tint.hue, saturation, lightness, 1];

		out.primary = accent(dark ? 72 : 42);
		out.primary_hover = accent(dark ? 82 : 34);
		out.primary_foreground = [tint.hue, Math.min(tint.saturation, 0.25), dark ? 8 : 98, 1];
		out.progress_bar = out.primary;
		out.table_active = [tint.hue, saturation, dark ? 44 : 50, 0.22];
	}

	/** @type {Record<string, string>} */
	const tokens = {};
	for (const [name, shade] of Object.entries(out)) {
		tokens[`--m-${name.replaceAll('_', '-')}`] = css(shade);
	}
	return tokens;
}

/**
 * @param {{ hue: number, saturation: number } | undefined} tint
 * @param {boolean} adaptive
 * @param {string} theme
 * @returns {Record<string, string>}
 */
export function palette(tint, adaptive = true, theme = 'Dark') {
	const washing = adaptive ? tint : undefined;
	const kind = kinds[theme] ?? 'dark';
	if (kind !== 'system') return shades(palettes[kind], washing);

	const light = shades(palettes.light, washing);
	const dark = shades(palettes.dark, washing);
	/** @type {Record<string, string>} */
	const tokens = {};
	for (const name of Object.keys(dark)) {
		tokens[name] = `light-dark(${light[name]}, ${dark[name]})`;
	}
	return tokens;
}
