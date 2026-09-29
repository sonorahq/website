export const readme = 'https://raw.githubusercontent.com/sonorahq/sonora/main/README.md';

export const flags = new Map([
	['en-US', 'us'],
	['de', 'de'],
	['es', 'es'],
	['fr', 'fr'],
	['it', 'it'],
	['id', 'id'],
	['ja', 'jp'],
	['ru', 'ru'],
	['uk', 'ua'],
	['pl', 'pl'],
	['cs', 'cz'],
	['pt-BR', 'br'],
	['zh-CN', 'cn'],
	['tr', 'tr'],
	['sq', 'al']
]);

export type Language = { code: string; name: string; flag: string; share: number; total?: number };

/**
 * The translation table as it stood when last copied from the README, served when GitHub cannot
 * be reached at build time. `locales` keeps the README order, which is the order the app lists them.
 */
export const fallback: { strings: number; done: number; languages: Language[]; locales: string[] } =
	{
		strings: 749,
		done: 2,
		languages: [
			{ code: 'en-US', name: 'English', flag: 'us', share: 100 },
			{ code: 'fr', name: 'Français', flag: 'fr', share: 100 },
			{ code: 'cs', name: 'Čeština', flag: 'cz', share: 99 },
			{ code: 'pl', name: 'Polski', flag: 'pl', share: 95 },
			{ code: 'sq', name: 'Shqip', flag: 'al', share: 95 },
			{ code: 'ru', name: 'Русский', flag: 'ru', share: 95 },
			{ code: 'uk', name: 'Українська', flag: 'ua', share: 95 },
			{ code: 'es', name: 'Español', flag: 'es', share: 92 },
			{ code: 'de', name: 'Deutsch', flag: 'de', share: 84 },
			{ code: 'id', name: 'Bahasa Indonesia', flag: 'id', share: 81 },
			{ code: 'it', name: 'Italiano', flag: 'it', share: 81 },
			{ code: 'pt-BR', name: 'Português (Brasil)', flag: 'br', share: 81 },
			{ code: 'tr', name: 'Türkçe', flag: 'tr', share: 81 },
			{ code: 'ja', name: '日本語', flag: 'jp', share: 81 },
			{ code: 'zh-CN', name: '简体中文', flag: 'cn', share: 81 }
		],
		locales: [
			'English',
			'Deutsch',
			'Español',
			'Français',
			'Italiano',
			'Bahasa Indonesia',
			'日本語',
			'Русский',
			'Українська',
			'Polski',
			'Čeština',
			'Português (Brasil)',
			'简体中文',
			'Türkçe',
			'Shqip'
		]
	};
