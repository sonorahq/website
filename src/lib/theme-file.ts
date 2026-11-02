import { FIELDS } from './mock/theme';

/**
 * The rules Sonora holds a theme file and a theme folder to. The gallery build and the worker
 * that files submitted themes both check with these, so nothing the form accepts fails the build.
 * This module imports nothing through `$lib`, since the worker bundles it on its own.
 */

/** A theme file as Sonora rebuilds it after checking it. */
export type Canonical = { name: string; author: string; version: 1; theme: Record<string, string> };

/** What every theme link starts with. Sonora reads the rest as the theme in base64url. */
const LINK = 'sonora://theme/';
/** The longest link Sonora reads. */
const LINK_LIMIT = 16 * 1024;
/** How many characters a theme's name or author may have before Sonora refuses the link. */
const LABEL_LIMIT = 64;
/** How many variants a family may have before Sonora refuses the link. */
export const VARIANT_LIMIT = 8;
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
export const RESERVED = new Set(['system', 'dark', 'light']);
const COLOR = /^#?(?:[0-9a-f]{6}|[0-9a-f]{8})$/i;
/** Controls, direction marks and invisible characters, which Sonora refuses in a name. */
const HIDDEN = /[\p{Cc}​-‏‪-‮⁠-⁯﻿]/u;
const KEYS = new Set(['name', 'author', 'version', 'theme']);
const TOKENS = new Set(FIELDS);

/**
 * Checks the files of theme `id`, each a file name inside its folder and its text, and returns
 * them as Sonora would write them. A single entry with no file name is a theme of one file, and
 * a folder's files come back sorted the way Sonora lists them. `fail` gets the first problem and
 * must throw.
 */
export function check(
	id: string,
	entries: [string | null, string][],
	fail: (reason: string) => never
): [string | null, Canonical][] {
	if (!slugged(id)) fail('the name must be lowercase-kebab-case of at most 40 characters');
	if (!entries.length) fail('a theme needs a file');
	if (entries[0][0] === null) {
		if (entries.length > 1) fail(`a theme is either ${id}.json or a folder, not both`);
		return [[null, read(entries[0][1], fail)]];
	}

	if (RESERVED.has(id)) fail(`"${id}" is the id of a built-in theme`);
	if (entries.length < 2)
		fail(`a folder holds 2 or more variants, put a single theme in ${id}.json`);
	if (entries.length > VARIANT_LIMIT) fail(`a theme has at most ${VARIANT_LIMIT} variants`);
	const stems = new Set<string>();
	return entries
		.map(([stem, text]) => {
			const at = (reason: string): never => fail(`${stem}.json: ${reason}`);
			if (stem === null) return fail(`a theme is either ${id}.json or a folder, not both`);
			if (!slugged(stem)) at('the file name must be lowercase-kebab-case');
			if (stems.has(stem)) at('two variants have this file name');
			stems.add(stem);
			return [stem, read(text, at)] as [string, Canonical];
		})
		.sort(([a], [b]) => (`${a}.json` < `${b}.json` ? -1 : 1));
}

/** Checks one theme file and returns it as Sonora would write it. */
export function read(text: string, fail: (reason: string) => never): Canonical {
	let parsed: unknown;
	try {
		parsed = JSON.parse(text);
	} catch {
		return fail('the file is not valid JSON');
	}
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

/**
 * The `sonora://theme/` link that carries `files`, the result of `check`. Fails when Sonora would
 * refuse the link for its length.
 */
export function link(
	id: string,
	files: [string | null, Canonical][],
	fail: (reason: string) => never
): string {
	const payload =
		files[0][0] === null ? files[0][1] : { family: id, variants: Object.fromEntries(files) };
	const link =
		LINK +
		base64(bytes(JSON.stringify(payload)))
			.replace(/\+/g, '-')
			.replace(/\//g, '_')
			.replace(/=+$/, '');
	if (link.length > LINK_LIMIT) fail('the theme is too large for a link');
	return link;
}

/**
 * Names a family after the words all its variant titles share and each variant after the rest
 * of its title, the way Sonora names them. Titles that share nothing leave the family named
 * after its folder `id` and every variant after its whole title.
 */
export function family(id: string, titles: string[]): { name: string; variants: string[] } {
	const words = titles.map((title) => title.split(/\s+/).filter(Boolean));
	const [first, ...rest] = words;
	let shared = 0;
	while (shared < first.length && rest.every((title) => title[shared] === first[shared])) shared++;
	return {
		name: shared ? first.slice(0, shared).join(' ') : id,
		variants: words.map((title, index) =>
			title.length > shared ? title.slice(shared).join(' ') : titles[index]
		)
	};
}

/** Whether `name` is a folder or file name Sonora accepts from a link. */
export function slugged(name: string): boolean {
	return (
		/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name) && name.length <= SLUG_LIMIT && !DEVICE_NAMES.has(name)
	);
}

/** `text` as a theme or file name: lowercase words joined by hyphens, cut to the length Sonora allows. */
export function slug(text: string): string {
	return text
		.normalize('NFKD')
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '')
		.slice(0, SLUG_LIMIT)
		.replace(/-+$/, '');
}

/** A checked theme file as it is saved in the repository. */
export function format(file: Canonical): string {
	return JSON.stringify(file, null, '\t') + '\n';
}

function label(value: unknown, field: string, fail: (reason: string) => never): string {
	if (typeof value !== 'string' || !value.trim()) return fail(`${field} must not be empty`);
	const text = value.trim();
	if ([...text].length > LABEL_LIMIT) fail(`${field} is longer than ${LABEL_LIMIT} characters`);
	if (HIDDEN.test(text)) fail(`${field} has control or invisible characters`);
	return text;
}

function isObject(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function bytes(text: string): Uint8Array {
	return new TextEncoder().encode(text);
}

/** Padded standard base64 of `data`. */
export function base64(data: Uint8Array): string {
	let binary = '';
	for (const byte of data) binary += String.fromCharCode(byte);
	return btoa(binary);
}
