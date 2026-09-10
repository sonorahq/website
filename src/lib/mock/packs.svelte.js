/** @type {Record<string, () => Promise<{ icons: Map<string, string> }>>} */
const loaders = {
	Remix: () => import('./packs/remix.js'),
	Solar: () => import('./packs/solar.js'),
	Iconoir: () => import('./packs/iconoir.js')
};

/** @type {Record<string, Map<string, string>>} */
let loaded = $state({});
const asked = new Set();

/** @param {string} pack */
export function reach(pack) {
	const load = loaders[pack];
	if (!load || loaded[pack] || asked.has(pack)) return;
	asked.add(pack);
	load().then((module) => {
		loaded = { ...loaded, [pack]: module.icons };
	});
}

/** @param {string} pack */
export const glyphs = (pack) => loaded[pack];
