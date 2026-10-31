const API = 'https://sonora-website.johnwatson.workers.dev/api/themes/downloads';

/** Every theme's download count by id as the build finds it, or null when the counter is out of reach. */
export async function load({ fetch }): Promise<{ downloads: Record<string, number> | null }> {
	try {
		const res = await fetch(API);
		if (res.ok) return { downloads: await res.json() };
	} catch {}
	return { downloads: null };
}
