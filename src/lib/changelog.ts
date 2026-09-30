import { repo } from '$lib/data/links';

export const source = 'https://raw.githubusercontent.com/sonorahq/sonora/main/CHANGELOG.md';

/** One piece of a changelog line. Menu paths are pulled out of plain text so they draw like the docs. */
export type Inline =
	| { kind: 'text'; text: string }
	| { kind: 'code'; text: string }
	| { kind: 'strong'; text: string }
	| { kind: 'link'; text: string; href: string }
	| { kind: 'path'; steps: string[] };

/** A heading such as Added or Fixed and the entries under it, each entry being one bullet. */
export type Group = { title: string; items: Inline[][] };

/** One `## [x.y.z] - date` block. `intro` holds any paragraphs that sit before the first group. */
export type Release = {
	version: string;
	id: string;
	date: string | null;
	tag: string | null;
	compare: string | null;
	intro: Inline[][];
	groups: Group[];
};

const RELEASE = /^## \[?([^\]\s]+)\]?(?:\s+-\s+(\d{4}-\d{2}-\d{2}))?/;
const REFERENCE = /^\[([^\]]+)\]:\s*(\S+)/;
const TOKEN = /`([^`]+)`|\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)\s]+)\)/g;
const PATH = /\bSettings(?: [>→] [A-Z][\w-]*(?: [A-Z][\w-]*)*(?: [a-z]+(?=[,.;:)]| \())?)+/g;

/** Splits plain text around the `Settings > A > B` paths it mentions, written with `>` or `→`. */
function paths(text: string): Inline[] {
	const out: Inline[] = [];
	let last = 0;
	for (const match of text.matchAll(PATH)) {
		if (match.index > last) out.push({ kind: 'text', text: text.slice(last, match.index) });
		out.push({ kind: 'path', steps: match[0].split(/ [>→] /) });
		last = match.index + match[0].length;
	}
	if (last < text.length) out.push({ kind: 'text', text: text.slice(last) });
	return out;
}

/** Tokenizes the inline markdown the changelog uses: code spans, bold and inline links. */
export function inline(text: string): Inline[] {
	const out: Inline[] = [];
	let last = 0;
	for (const match of text.matchAll(TOKEN)) {
		if (match.index > last) out.push(...paths(text.slice(last, match.index)));
		const [, code, strong, label, href] = match;
		if (code !== undefined) out.push({ kind: 'code', text: code });
		else if (strong !== undefined) out.push({ kind: 'strong', text: strong });
		else out.push({ kind: 'link', text: label, href });
		last = match.index + match[0].length;
	}
	if (last < text.length) out.push(...paths(text.slice(last)));
	return out;
}

/**
 * Parses a Keep a Changelog file into releases, newest first as written.
 * The preamble before the first release is dropped, and so is an Unreleased block with nothing in it.
 * A heading that repeats within one release, such as a second Fixed, adds to the first one.
 */
export function parse(markdown: string): Release[] {
	const lines = markdown.split(/\r?\n/);
	const references = new Map<string, string>();
	for (const line of lines) {
		const match = line.match(REFERENCE);
		if (match) references.set(match[1].toLowerCase(), match[2]);
	}

	const releases: Release[] = [];
	let release: Release | null = null;
	let group: Group | null = null;
	/** Source lines of the bullet or paragraph being read, joined once it ends. */
	let buffer: string[] = [];
	let target: Inline[][] | null = null;

	const flush = () => {
		if (target && buffer.length) target.push(inline(buffer.join(' ')));
		buffer = [];
		target = null;
	};

	for (const line of lines) {
		const heading = line.match(RELEASE);
		if (heading) {
			flush();
			const [, version, date] = heading;
			const unreleased = version.toLowerCase() === 'unreleased';
			const reference = references.get(version.toLowerCase());
			release = {
				version: unreleased ? 'Unreleased' : version,
				id: unreleased ? 'unreleased' : `v${version}`,
				date: date ?? null,
				tag: unreleased ? null : `${repo}/releases/tag/v${version}`,
				compare: reference?.includes('/compare/') ? reference : null,
				intro: [],
				groups: []
			};
			releases.push(release);
			group = null;
			continue;
		}

		if (!release || REFERENCE.test(line)) {
			flush();
			continue;
		}

		if (line.startsWith('### ')) {
			flush();
			const title = line.slice(4).trim();
			group = release.groups.find((entry) => entry.title === title) ?? null;
			if (!group) {
				group = { title, items: [] };
				release.groups.push(group);
			}
		} else if (line.startsWith('- ')) {
			flush();
			target = group ? group.items : release.intro;
			buffer.push(line.slice(2).trim());
		} else if (!line.trim()) {
			flush();
		} else {
			if (!target) target = group ? group.items : release.intro;
			buffer.push(line.trim());
		}
	}
	flush();

	return releases.filter((entry) => entry.intro.length || entry.groups.length);
}
