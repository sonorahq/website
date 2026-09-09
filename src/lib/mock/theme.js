const SURFACE_TINT = 0.5;
const BORDER_TINT = 0.4;
const TEXT_TINT = 0.12;
const MAX_WASH_SATURATION = 0.7;
const MIN_ACCENT_SATURATION = 0.6;
const MAX_ACCENT_SATURATION = 0.85;

const surfaces = {
	background: [98, 3.9],
	secondary: [96.1, 9],
	'secondary-hover': [89.8, 13.7],
	'secondary-active': [83.1, 18.8],
	muted: [89.8, 14.9],
	sidebar: [96.1, 3.9],
	'sidebar-accent': [89.8, 14.9],
	'table-hover': [94.1, 14.9]
};

const borders = {
	border: [83.1, 14.9],
	'sidebar-border': [83.1, 14.9],
	'title-bar-border': [83.1, 14.9]
};

const texts = {
	foreground: [9, 98],
	'muted-foreground': [45.1, 45.1],
	'table-head-foreground': [45.1, 32.2]
};

const veiled = [
	{ name: 'table-head', light: 96.1, dark: 9, alpha: [0.902, 0.8], strength: SURFACE_TINT },
	{
		name: 'table-row-border',
		light: 83.1,
		dark: 14.9,
		alpha: [0.702, 0.702],
		strength: BORDER_TINT
	}
];

/** @param {number} value @param {number} low @param {number} high */
const clamp = (value, low, high) => Math.min(Math.max(value, low), high);

/** @param {number} hue @param {number} saturation @param {number} lightness @param {number} alpha */
const hsl = (hue, saturation, lightness, alpha = 1) => {
	const shade = `${round(hue)} ${round(saturation * 100)}% ${round(lightness)}%`;
	return alpha === 1 ? `hsl(${shade})` : `hsl(${shade} / ${round(alpha)})`;
};

/** @param {number} value */
const round = (value) => Math.round(value * 1000) / 1000;

/** @param {number} hue @param {number} saturation @param {number} strength @param {number} lightness @param {number} alpha */
const wash = (hue, saturation, strength, lightness, alpha = 1) =>
	hsl(hue, Math.min(saturation * strength, MAX_WASH_SATURATION), lightness, alpha);

/**
 * @param {{ hue: number, saturation: number }} tint
 * @returns {Record<string, string>}
 */
export function palette(tint) {
	const { hue } = tint;
	const saturation = tint.saturation;
	const accent = clamp(saturation, MIN_ACCENT_SATURATION, MAX_ACCENT_SATURATION);

	/** @type {Record<string, string>} */
	const tokens = {};
	/** @param {string} name @param {string} light @param {string} dark */
	const put = (name, light, dark) => {
		tokens[`--m-${name}`] = `light-dark(${light}, ${dark})`;
	};

	for (const [name, [light, dark]] of Object.entries(surfaces)) {
		put(
			name,
			wash(hue, saturation, SURFACE_TINT, light),
			wash(hue, saturation, SURFACE_TINT, dark)
		);
	}
	for (const [name, [light, dark]] of Object.entries(borders)) {
		put(name, wash(hue, saturation, BORDER_TINT, light), wash(hue, saturation, BORDER_TINT, dark));
	}
	for (const [name, [light, dark]] of Object.entries(texts)) {
		put(name, wash(hue, saturation, TEXT_TINT, light), wash(hue, saturation, TEXT_TINT, dark));
	}
	for (const { name, light, dark, alpha, strength } of veiled) {
		put(
			name,
			wash(hue, saturation, strength, light, alpha[0]),
			wash(hue, saturation, strength, dark, alpha[1])
		);
	}

	put('primary', hsl(hue, accent, 42), hsl(hue, accent, 72));
	put('primary-hover', hsl(hue, accent, 34), hsl(hue, accent, 82));
	put(
		'primary-foreground',
		hsl(hue, Math.min(saturation, 0.25), 98),
		hsl(hue, Math.min(saturation, 0.25), 8)
	);
	put('progress-bar', hsl(hue, accent, 42), hsl(hue, accent, 72));
	put('table-active', hsl(hue, accent, 50, 0.22), hsl(hue, accent, 44, 0.22));

	return tokens;
}
