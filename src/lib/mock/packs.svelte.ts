const loaders: Record<string, () => Promise<{ icons: Map<string, string> }>> = {
	Remix: () => import('./packs/remix'),
	Solar: () => import('./packs/solar'),
	Iconoir: () => import('./packs/iconoir')
};

let loaded: Record<string, Map<string, string>> = $state({});
const asked = new Set();

export function reach(pack: string) {
	const load = loaders[pack];
	if (!load || loaded[pack] || asked.has(pack)) return;
	asked.add(pack);
	load().then((module) => {
		loaded = { ...loaded, [pack]: module.icons };
	});
}

export const glyphs = (pack: string) => loaded[pack];
