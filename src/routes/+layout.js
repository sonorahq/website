export const prerender = true;

export async function load({ fetch }) {
	try {
		const res = await fetch('https://api.github.com/repos/sonorahq/sonora');
		if (!res.ok) return { stars: null };

		const data = await res.json();
		return { stars: data.stargazers_count };
	} catch {
		return { stars: null };
	}
}
