import { pages } from '$lib/data/docs';

/** One searchable stretch of a docs page: the text under a heading, or the page intro when `id` is empty. */
export type Section = { slug: string; page: string; id: string; title: string; text: string };

export type Hit = { section: Section; snippet: { text: string; hit: boolean }[] };

let loading: Promise<Section[]> | null = null;

/** Elements whose text must not run into the next element's, such as table cells and key caps. */
const SPACED = new Set([
	'P',
	'LI',
	'TD',
	'TH',
	'TR',
	'DIV',
	'PRE',
	'FIGCAPTION',
	'H2',
	'H3',
	'KBD'
]);

/** Reads the text under `node` the way it reads on screen, with a space between blocks and a chevron where a menu path draws one. */
function words(node: Node): string {
	const parts: string[] = [];
	const visit = (current: Node) => {
		if (current.nodeType === Node.TEXT_NODE) {
			parts.push(current.textContent ?? '');
			return;
		}
		if (!(current instanceof Element)) return;
		if (current.tagName.toLowerCase() === 'svg') {
			if (current.getAttribute('aria-label') === 'then') parts.push(' › ');
			return;
		}
		const spaced = SPACED.has(current.tagName);
		if (spaced) parts.push(' ');
		current.childNodes.forEach(visit);
		if (spaced) parts.push(' ');
	};
	visit(node);
	return parts.join('').replace(/\s+/g, ' ').trim();
}

/** Cuts one page into sections at its `h2[id]` headings. */
function sections(slug: string, title: string, html: string): Section[] {
	const article = new DOMParser().parseFromString(html, 'text/html').querySelector('article.doc');
	if (!article) return [];

	const found: Section[] = [{ slug, page: title, id: '', title, text: '' }];
	for (const child of Array.from(article.children)) {
		if (child.tagName === 'H1') continue;
		if (child.tagName === 'H2' && child.id) {
			found.push({ slug, page: title, id: child.id, title: words(child), text: '' });
			continue;
		}
		const current = found[found.length - 1];
		current.text = `${current.text} ${words(child)}`.trim();
	}
	return found;
}

/** Fetches every docs page once and indexes it. Later calls reuse the same result, and a failed page is skipped rather than failing the whole index. */
export function loadIndex(): Promise<Section[]> {
	loading ??= Promise.all(
		pages.map(async ({ slug, title }) => {
			try {
				const res = await fetch(`/docs/${slug}`);
				return res.ok ? sections(slug, title, await res.text()) : [];
			} catch {
				return [];
			}
		})
	).then((all) => all.flat());
	return loading;
}

const SPAN = 70;

/** Cuts a stretch of `text` around the first match and marks every term inside it. */
function snippet(text: string, terms: string[]): Hit['snippet'] {
	const lower = text.toLowerCase();
	const first = Math.min(...terms.map((term) => lower.indexOf(term)).filter((at) => at >= 0));
	if (!Number.isFinite(first)) return [{ text: text.slice(0, SPAN * 2), hit: false }];

	const start = Math.max(0, first - SPAN);
	const end = Math.min(text.length, first + SPAN);
	const piece = `${start > 0 ? '…' : ''}${text.slice(start, end)}${end < text.length ? '…' : ''}`;

	const pattern = new RegExp(
		`(${terms.map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`,
		'gi'
	);
	return piece
		.split(pattern)
		.filter(Boolean)
		.map((part) => ({ text: part, hit: terms.includes(part.toLowerCase()) }));
}

/** Returns the sections that contain every word of the query, with heading matches ranked above body matches. */
export function search(index: Section[], query: string, limit = 12): Hit[] {
	const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
	if (!terms.length) return [];

	return index
		.map((section) => {
			const title = section.title.toLowerCase();
			const page = section.page.toLowerCase();
			const text = section.text.toLowerCase();
			let score = 0;
			for (const term of terms) {
				if (title.includes(term)) score += 10;
				else if (page.includes(term)) score += 4;
				else if (text.includes(term)) score += 1;
				else return null;
			}
			return { section, score };
		})
		.filter((entry) => entry !== null)
		.sort((a, b) => b.score - a.score)
		.slice(0, limit)
		.map(({ section }) => ({ section, snippet: snippet(section.text || section.title, terms) }));
}
