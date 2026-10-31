import { website } from '$lib/data/links';
import { FIELDS, darkColors } from '$lib/mock/theme';

/** One theme file of a community theme. */
export type ThemeVariant = {
	/** The file name without `.json`. */
	id: string;
	/** The name inside its family, such as "Dark". A theme of one file uses the whole title. */
	name: string;
	/** The name the file gives, such as "Pastel Pink Dark". */
	title: string;
	author: string;
	/** Every colour token as CSS, the theme's own over the Dark theme's. */
	colors: Record<string, string>;
};

/**
 * A community theme as the gallery shows it: a single file in `src/lib/themes`, or a folder
 * there whose files are its variants, the way Sonora's themes folder groups them.
 */
export type CommunityTheme = {
	id: string;
	name: string;
	/** Everyone who wrote a variant, in order of first appearance. */
	authors: string[];
	/** Sorted by file name, the order Sonora lists them in once installed. */
	variants: ThemeVariant[];
	/** The `sonora://theme/` link that carries every file. */
	link: string;
	/** The file to save: the theme file itself, or a zip of the folder for a family. */
	download: { name: string; href: string };
};

/** What every theme link starts with. Sonora reads the rest as the theme in base64url. */
const LINK = 'sonora://theme/';
/** The longest link Sonora reads. */
const LINK_LIMIT = 16 * 1024;
/** How many characters a theme's name or author may have before Sonora refuses the link. */
const LABEL_LIMIT = 64;
/** How many variants a family may have before Sonora refuses the link. */
const VARIANT_LIMIT = 8;
/** The longest folder or file name Sonora gives a theme. */
const SLUG_LIMIT = 40;
/** Names Sonora never gives a theme folder or file, since Windows keeps them for devices. */
const DEVICE_NAMES = new Set([
	'con',
	'prn',
	'aux',
	'nul',
	...Array.from({ length: 9 }, (_, index) => `com${index + 1}`),
	...Array.from({ length: 9 }, (_, index) => `lpt${index + 1}`)
]);
/** The built-in themes' ids, which no theme folder may take. */
const RESERVED = new Set(['system', 'dark', 'light']);
const COLOR = /^#?(?:[0-9a-f]{6}|[0-9a-f]{8})$/i;
/** Controls, direction marks and invisible characters, which Sonora refuses in a name. */
const HIDDEN = /[\p{Cc}​-‏‪-‮⁠-⁯﻿]/u;
const KEYS = new Set(['name', 'author', 'version', 'theme']);
const TOKENS = new Set(FIELDS);

const files = import.meta.glob(['../themes/*.json', '../themes/*/*.json'], {
	eager: true,
	query: '?raw',
	import: 'default'
}) as Record<string, string>;

/** The file a new theme starts from. Every color it leaves out comes from the Dark theme. */
const STARTER = `{
	"name": "My theme",
	"author": "Your name",
	"version": 1,
	"theme": {
		"background": "#101014",
		"foreground": "#fafafa",
		"primary": "#a5b4fc",
		"primary_foreground": "#101014"
	}
}
`;

/**
 * Opens GitHub's editor on a new file in `src/lib/themes`. Committing it forks the repository
 * and opens a pull request that starts from the theme template.
 */
export const submit = `${website}/new/main/src/lib/themes?filename=my-theme.json&value=${encodeURIComponent(STARTER)}`;

/**
 * Every theme in `src/lib/themes`, sorted by name. A file or folder Sonora would refuse fails
 * the build.
 */
export const themes: CommunityTheme[] = collect()
	.map(([id, entries]) => build(id, entries))
	.sort((a, b) => a.name.localeCompare(b.name));

/** A theme file as Sonora rebuilds it after checking it. */
type Canonical = { name: string; author: string; version: 1; theme: Record<string, string> };

/**
 * Groups the files by theme id, each with its file name inside the folder and its text. A loose
 * file is a theme of one with no file name there.
 */
function collect(): [string, [string | null, string][]][] {
	const groups = new Map<string, [string | null, string][]>();
	for (const [path, text] of Object.entries(files)) {
		const parts = path.replace(/^\.\.\/themes\//, '').split('/');
		const id = parts[0].replace(/\.json$/, '');
		const stem = parts.length > 1 ? parts[1].replace(/\.json$/, '') : null;
		if (groups.has(id) && (stem === null || groups.get(id)![0][0] === null)) {
			throw new Error(`src/lib/themes/${id}: a theme is either ${id}.json or a folder, not both`);
		}
		groups.set(id, [...(groups.get(id) ?? []), [stem, text]]);
	}
	return [...groups];
}

/** Checks a theme's files the way Sonora checks a theme link, and builds its link. */
function build(id: string, entries: [string | null, string][]): CommunityTheme {
	const folder = entries[0][0] !== null;
	const where = folder ? `src/lib/themes/${id}/` : `src/lib/themes/${id}.json`;
	const fail = (reason: string): never => {
		throw new Error(`${where}: ${reason}`);
	};
	if (!slugged(id)) fail('the name must be lowercase-kebab-case of at most 40 characters');

	if (!folder) {
		const file = read(entries[0][1], fail);
		const text = JSON.stringify(file, null, 2) + '\n';
		return {
			id,
			name: file.name,
			authors: [file.author],
			variants: [variant(id, file)],
			link: link(JSON.stringify(file), fail),
			download: { name: `${id}.json`, href: `data:application/json;base64,${base64(bytes(text))}` }
		};
	}

	if (RESERVED.has(id)) fail(`"${id}" is the id of a built-in theme`);
	if (entries.length < 2)
		fail(`a folder holds 2 or more variants, put a single theme in ${id}.json`);
	if (entries.length > VARIANT_LIMIT) fail(`a theme has at most ${VARIANT_LIMIT} variants`);
	const sorted = entries
		.map(([stem, text]) => {
			const at = (reason: string): never => fail(`${stem}.json: ${reason}`);
			if (!slugged(stem!)) at('the file name must be lowercase-kebab-case');
			return [stem!, read(text, at)] as const;
		})
		.sort(([a], [b]) => (`${a}.json` < `${b}.json` ? -1 : 1));

	const variants = sorted.map(([stem, file]) => variant(stem, file));
	const name = names(id, variants);
	const payload = { family: id, variants: Object.fromEntries(sorted) };
	const archive = zip(
		sorted.map(([stem, file]) => [`${id}/${stem}.json`, JSON.stringify(file, null, 2) + '\n'])
	);
	return {
		id,
		name,
		authors: [...new Set(variants.map((variant) => variant.author))],
		variants,
		link: link(JSON.stringify(payload), fail),
		download: { name: `${id}.zip`, href: `data:application/zip;base64,${base64(archive)}` }
	};
}

/** Checks one theme file and returns it as Sonora would write it. */
function read(text: string, fail: (reason: string) => never): Canonical {
	const parsed: unknown = JSON.parse(text);
	if (!isObject(parsed)) return fail('the file must contain an object');
	for (const key of Object.keys(parsed)) {
		if (!KEYS.has(key)) fail(`unknown field "${key}"`);
	}
	if (parsed.version !== 1) fail('version must be 1');

	const name = label(parsed.name, 'name', fail);
	const author = label(parsed.author, 'author', fail);

	if (!isObject(parsed.theme)) return fail('theme must contain an object');
	const theme: Record<string, string> = {};
	for (const [token, value] of Object.entries(parsed.theme)) {
		if (!TOKENS.has(token)) fail(`"${token}" is not a theme color`);
		if (typeof value !== 'string' || !COLOR.test(value.trim())) {
			fail(`theme.${token} is not a valid color`);
		}
		theme[token] = (value as string).trim();
	}
	return { name, author, version: 1, theme };
}

function variant(id: string, file: Canonical): ThemeVariant {
	const colors: Record<string, string> = {};
	for (const token of FIELDS) colors[token] = css(file.theme[token] ?? darkColors[token]);
	return { id, name: file.name, title: file.name, author: file.author, colors };
}

/**
 * Names a family after the words all its variant titles share and each variant after the rest
 * of its title, the way Sonora names them. Titles that share nothing leave the family named
 * after its folder and every variant after its whole title.
 */
function names(id: string, variants: ThemeVariant[]): string {
	const titles = variants.map((variant) => variant.title.split(/\s+/).filter(Boolean));
	const [first, ...rest] = titles;
	let shared = 0;
	while (shared < first.length && rest.every((title) => title[shared] === first[shared])) shared++;
	variants.forEach((variant, index) => {
		const words = titles[index].slice(shared);
		if (words.length) variant.name = words.join(' ');
	});
	return shared ? first.slice(0, shared).join(' ') : id;
}

/** Wraps a payload in a theme link, or fails when Sonora would refuse it for its length. */
function link(payload: string, fail: (reason: string) => never): string {
	const link =
		LINK + base64(bytes(payload)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
	if (link.length > LINK_LIMIT) fail('the theme is too large for a link');
	return link;
}

function label(value: unknown, field: string, fail: (reason: string) => never): string {
	if (typeof value !== 'string' || !value.trim()) return fail(`${field} must not be empty`);
	const text = value.trim();
	if ([...text].length > LABEL_LIMIT) fail(`${field} is longer than ${LABEL_LIMIT} characters`);
	if (HIDDEN.test(text)) fail(`${field} has control or invisible characters`);
	return text;
}

/** Whether `name` is a folder or file name Sonora accepts from a link. */
function slugged(name: string): boolean {
	return (
		/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name) && name.length <= SLUG_LIMIT && !DEVICE_NAMES.has(name)
	);
}

function isObject(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/** A hex colour, with or without `#` and with an optional alpha byte, as CSS `rgb()`. */
function css(hex: string): string {
	const digits = hex.replace(/^#/, '');
	const [red, green, blue, alpha = 255] = (digits.match(/../g) ?? []).map((pair) =>
		parseInt(pair, 16)
	);
	return `rgb(${red} ${green} ${blue} / ${Math.round((alpha / 255) * 1000) / 1000})`;
}

function bytes(text: string): Uint8Array {
	return new TextEncoder().encode(text);
}

/** Padded standard base64 of `data`. */
function base64(data: Uint8Array): string {
	let binary = '';
	for (const byte of data) binary += String.fromCharCode(byte);
	return btoa(binary);
}

/** A zip archive that stores `entries`, each a path and its text, without compressing them. */
function zip(entries: [string, string][]): Uint8Array {
	const parts: Uint8Array[] = [];
	const directory: Uint8Array[] = [];
	let offset = 0;
	for (const [path, text] of entries) {
		const name = bytes(path);
		const data = bytes(text);
		const sum = crc32(data);
		const local = header(30 + name.length, [
			[4, 0x04034b50],
			[2, 20],
			[2, 0x0800],
			[2, 0],
			[2, 0],
			[2, 0x21],
			[4, sum],
			[4, data.length],
			[4, data.length],
			[2, name.length],
			[2, 0]
		]);
		local.set(name, 30);
		const central = header(46 + name.length, [
			[4, 0x02014b50],
			[2, 20],
			[2, 20],
			[2, 0x0800],
			[2, 0],
			[2, 0],
			[2, 0x21],
			[4, sum],
			[4, data.length],
			[4, data.length],
			[2, name.length],
			[2, 0],
			[2, 0],
			[2, 0],
			[2, 0],
			[4, 0],
			[4, offset]
		]);
		central.set(name, 46);
		parts.push(local, data);
		directory.push(central);
		offset += local.length + data.length;
	}
	const size = directory.reduce((total, entry) => total + entry.length, 0);
	const end = header(22, [
		[4, 0x06054b50],
		[2, 0],
		[2, 0],
		[2, entries.length],
		[2, entries.length],
		[4, size],
		[4, offset],
		[2, 0]
	]);
	const out = new Uint8Array(offset + size + end.length);
	let at = 0;
	for (const part of [...parts, ...directory, end]) {
		out.set(part, at);
		at += part.length;
	}
	return out;
}

/** A zip record of `length` bytes that starts with `fields`, each a width and a little-endian value. */
function header(length: number, fields: [2 | 4, number][]): Uint8Array {
	const record = new Uint8Array(length);
	const view = new DataView(record.buffer);
	let at = 0;
	for (const [width, value] of fields) {
		if (width === 2) view.setUint16(at, value, true);
		else view.setUint32(at, value >>> 0, true);
		at += width;
	}
	return record;
}

function crc32(data: Uint8Array): number {
	let crc = ~0;
	for (const byte of data) {
		crc ^= byte;
		for (let bit = 0; bit < 8; bit++) crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
	}
	return ~crc >>> 0;
}
