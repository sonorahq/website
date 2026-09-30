import { parse, source, type Release } from '$lib/changelog';

export async function load({ fetch }): Promise<{ releases: Release[] }> {
	try {
		const res = await fetch(source);
		if (res.ok) return { releases: parse(await res.text()) };
	} catch {}

	return { releases: [] };
}
