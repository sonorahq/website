export const prerender = true;

const API = 'https://api.github.com/repos/sonorahq/sonora';

export async function load({ fetch }) {
	const result = { stars: null, version: null };

	try {
		const res = await fetch(API);
		if (res.ok) result.stars = (await res.json()).stargazers_count;
	} catch {}

	try {
		const res = await fetch(`${API}/releases/latest`);
		if (res.ok) result.version = (await res.json()).tag_name;
	} catch {}

	return result;
}
