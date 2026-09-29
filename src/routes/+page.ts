import { fallback, flags, readme } from '$lib/data/languages';

const ROW = /\|\s*([^|]+?)\s*\(`([^`]+)`\)\s*\|\s*(\d+)\/(\d+)\s*\|/g;

export async function load({ fetch }) {
	try {
		const res = await fetch(readme);
		if (!res.ok) return fallback;

		const table = (await res.text()).split('<!-- i18n:start -->')[1]?.split('<!-- i18n:end -->')[0];
		if (!table) return fallback;

		const rows = [...table.matchAll(ROW)].map(([, name, code, translated, total]) => ({
			code,
			name,
			flag: flags.get(code) ?? '',
			share: Math.round((Number(translated) / Number(total)) * 100),
			total: Number(total)
		}));

		if (!rows.length) return fallback;

		const locales = rows.map((row) => row.name);

		rows.sort((a, b) => b.share - a.share || a.name.localeCompare(b.name));

		return {
			strings: rows[0].total,
			languages: rows,
			done: rows.filter((row) => row.share === 100).length,
			locales
		};
	} catch {
		return fallback;
	}
}
