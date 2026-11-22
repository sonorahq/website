import { browser } from '$app/environment';
import { tick } from 'svelte';
import { colorsOf, dim, palette, shade, themes, type Tint } from '$lib/mock/theme';
import { DEFAULT_TINT, site } from '$lib/tint.svelte';

/** The scheme that takes its colours from the cover, the way Sonora's adaptive theme does. */
export const ADAPTIVE = 'Adaptive';

/** Every colour scheme the picker offers: the adaptive one first, then Sonora's built-in themes. */
export const schemes = [ADAPTIVE, ...themes.filter((name) => name !== 'System')];

const KEY = 'scheme';

/** The scheme's name as `data-scheme` carries it, such as `rose-pine-moon` for Rosé Pine Moon. */
export const slug = (name: string) =>
	name
		.toLowerCase()
		.normalize('NFD')
		.replace(/[̀-ͯ]/g, '')
		.replace(/[^a-z0-9]+/g, '-');

/** Whether a scheme draws dark text on a light page. */
export const lit = (name: string) => name !== ADAPTIVE && !dim(name);

/**
 * The site's colour tokens for a scheme, taken one for one from the tokens Sonora paints with. The
 * adaptive scheme is Sonora's Dark theme with `tint` washed through it, as the app's adaptive theme is.
 */
export function tokens(name: string, tint: Tint = DEFAULT_TINT): Record<string, string> {
	const adaptive = name === ADAPTIVE;
	const app = palette(adaptive ? tint : undefined, adaptive, adaptive ? 'Dark' : name);
	const token = (field: string) => app[`--m-${field}`];
	const bg = token('background');
	const muted = token('muted-foreground');

	return {
		'--bg': bg,
		'--fg': token('foreground'),
		'--border': token('border'),
		'--line': token('table-row-border'),
		'--muted-fg': muted,
		'--dim': token('table-head-foreground'),
		// Sonora has no text quieter than a table head, so the faintest marks sit halfway to the page
		'--faint': `color-mix(in oklab, ${muted} 50%, ${bg})`,
		'--secondary': token('secondary'),
		'--secondary-hover': token('secondary-hover'),
		'--secondary-active': token('secondary-active'),
		'--primary': token('primary'),
		'--primary-fg': token('primary-foreground'),
		'--primary-hover': token('primary-hover'),
		'--popover': token('popover'),
		// a card wears the player bar's fill: `secondary` at the strength the frosted bar paints it over the page
		'--card': `color-mix(in srgb, ${token('secondary')} 72%, ${bg})`,
		'--chip-fg': muted
	};
}

/** Every scheme as a CSS rule on `data-scheme`, with the adaptive one also the default on `:root`. */
export function stylesheet(): string {
	const rule = (selector: string, values: Record<string, string>) =>
		`${selector}{${Object.entries(values)
			.map(([name, value]) => `${name}:${value}`)
			.join(';')}}`;
	return schemes
		.map((name) =>
			rule(
				name === ADAPTIVE
					? `:root,:root[data-scheme='adaptive']`
					: `:root[data-scheme='${slug(name)}']`,
				tokens(name)
			)
		)
		.join('\n');
}

/** A scheme's own colours for its swatch in the picker. */
export function swatch(name: string) {
	if (name === ADAPTIVE) {
		const values = tokens(ADAPTIVE);
		return { bg: values['--bg'], accent: values['--primary'] };
	}
	const colors = colorsOf(name);
	return { bg: colors.background, accent: colors.primary };
}

let current = $state(ADAPTIVE);

function stored() {
	try {
		const value = localStorage.getItem(KEY);
		return value && schemes.includes(value) ? value : ADAPTIVE;
	} catch {
		return ADAPTIVE;
	}
}

/** The colour scheme the site wears, which the app mock wears too. Defaults to the adaptive one. */
export const scheme = {
	get current() {
		return current;
	},

	/** The hue the hero's light takes: the cover's on the adaptive scheme, otherwise the theme's accent, or none for a grey one. */
	get tint(): Tint | undefined {
		if (current === ADAPTIVE) return site.tint;
		const [hue, saturation] = shade(colorsOf(current).primary.slice(1));
		return saturation < 0.15 ? undefined : { hue, saturation };
	},

	sync() {
		if (browser) current = stored();
	},

	/** Puts on `name`, crossfading the whole page where the browser can and the visitor allows motion. */
	select(name: string) {
		if (!browser) {
			current = name;
			return;
		}

		const root = document.documentElement;
		const apply = async () => {
			current = name;
			root.dataset.scheme = slug(name);
			root.dataset.theme = lit(name) ? 'light' : 'dark';

			try {
				if (name === ADAPTIVE) localStorage.removeItem(KEY);
				else localStorage.setItem(KEY, name);
			} catch {}

			// the app mock repaints in an effect, which has to land before the new frame is captured
			await tick();
		};

		const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (still || !document.startViewTransition) {
			apply();
			return;
		}

		// the crossfade carries the change, so the tokens skip their own easing for it
		root.classList.add('instant');
		const transition = document.startViewTransition(apply);
		transition.finished.finally(() => root.classList.remove('instant'));
	},

	/** Moves `by` places through the list, wrapping at either end. */
	step(by: number) {
		const at = schemes.indexOf(current);
		this.select(schemes[(at + by + schemes.length) % schemes.length]);
	}
};
