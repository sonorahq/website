import { DurableObject } from 'cloudflare:workers';
import { submit, type SubmitEnv } from './submit';

export { Submissions } from './submit';

/** The parts of the runtime's types this worker uses, since the site does not install them. */
type Env = SubmitEnv & {
	ASSETS: { fetch(request: Request): Promise<Response> };
	DOWNLOADS: { getByName(name: string): Pick<Downloads, 'all' | 'count'> };
};

type Sql = {
	exec(query: string, ...bindings: unknown[]): { toArray(): Record<string, unknown>[] };
};

/** A theme id as the gallery builds it, the rule Sonora holds a theme folder to. */
const ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const RECORD = /^\/api\/themes\/([^/]+)\/download$/;
/** How many themes the counter keeps before it refuses new ids, so stray requests stay small. */
const THEME_LIMIT = 256;

/**
 * Counts the times each community theme was installed or downloaded, and files themes sent
 * through the submission form as pull requests. The site's pages are static assets, and only `/api/*` reaches this worker.
 */
export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const url = new URL(request.url);
		if (url.pathname === '/api/themes/submit' && request.method === 'POST') {
			return submit(request, env);
		}

		const counter = env.DOWNLOADS.getByName('themes');

		if (url.pathname === '/api/themes/downloads' && request.method === 'GET') {
			return json(await counter.all(), { 'cache-control': 'public, max-age=60' });
		}

		const match = RECORD.exec(url.pathname);
		if (match && request.method === 'POST') {
			const id = match[1];
			if (id.length > 40 || !ID.test(id)) return json({ error: 'unknown theme' }, {}, 404);
			const day = new Date().toISOString().slice(0, 10);
			const visitor = await digest(`${day}:${request.headers.get('cf-connecting-ip')}:${id}`);
			return json({ count: await counter.count(id, visitor, day) });
		}

		return json({ error: 'not found' }, {}, 404);
	}
};

/**
 * Keeps the counts in its own SQLite database. Each visitor counts once per theme a day, known by
 * a hash of the day, the address and the theme, so no address is stored.
 */
export class Downloads extends DurableObject {
	sql: Sql;

	constructor(ctx: { storage: { sql: unknown } }, env: Env) {
		super(ctx, env);
		this.sql = ctx.storage.sql as Sql;
		this.sql.exec(
			'CREATE TABLE IF NOT EXISTS downloads (id TEXT PRIMARY KEY, count INTEGER NOT NULL)'
		);
		this.sql.exec('CREATE TABLE IF NOT EXISTS seen (visitor TEXT PRIMARY KEY, day TEXT NOT NULL)');
	}

	/** Every theme's count by id. A theme nobody took yet is missing. */
	all(): Record<string, number> {
		const rows = this.sql.exec('SELECT id, count FROM downloads').toArray();
		return Object.fromEntries(rows.map((row) => [row.id as string, row.count as number]));
	}

	/** Counts a download unless `visitor` already took this theme on `day`, and returns the count. */
	count(id: string, visitor: string, day: string): number {
		this.sql.exec('DELETE FROM seen WHERE day < ?', day);
		const fresh = this.sql
			.exec(
				'INSERT INTO seen (visitor, day) VALUES (?, ?) ON CONFLICT DO NOTHING RETURNING visitor',
				visitor,
				day
			)
			.toArray().length;
		const known = this.sql.exec('SELECT count FROM downloads WHERE id = ?', id).toArray()[0];
		if (!fresh) return (known?.count as number) ?? 0;
		if (!known) {
			const [{ total }] = this.sql.exec('SELECT COUNT(*) AS total FROM downloads').toArray();
			if ((total as number) >= THEME_LIMIT) return 0;
		}
		const [row] = this.sql
			.exec(
				'INSERT INTO downloads (id, count) VALUES (?, 1) ON CONFLICT (id) DO UPDATE SET count = count + 1 RETURNING count',
				id
			)
			.toArray();
		return row.count as number;
	}
}

function json(body: unknown, headers: Record<string, string> = {}, status = 200): Response {
	return new Response(JSON.stringify(body), {
		status,
		headers: { 'content-type': 'application/json', ...headers }
	});
}

/** The SHA-256 of `text` in hex. */
async function digest(text: string): Promise<string> {
	const hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
	return [...new Uint8Array(hash)].map((byte) => byte.toString(16).padStart(2, '0')).join('');
}
