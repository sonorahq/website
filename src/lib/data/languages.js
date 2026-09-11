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
	['pt-BR', 'br'],
	['zh-CN', 'cn'],
	['tr', 'tr']
]);

export const fallback = {
	strings: 533,
	done: 3,
	languages: [
		{ code: 'en-US', name: 'English', flag: 'us', share: 100 },
		{ code: 'de', name: 'Deutsch', flag: 'de', share: 100 },
		{ code: 'pl', name: 'Polski', flag: 'pl', share: 100 },
		{ code: 'id', name: 'Bahasa Indonesia', flag: 'id', share: 99 },
		{ code: 'es', name: 'Español', flag: 'es', share: 96 },
		{ code: 'ja', name: '日本語', flag: 'jp', share: 96 },
		{ code: 'pt-BR', name: 'Português (Brasil)', flag: 'br', share: 96 },
		{ code: 'ru', name: 'Русский', flag: 'ru', share: 94 },
		{ code: 'uk', name: 'Українська', flag: 'ua', share: 94 },
		{ code: 'fr', name: 'Français', flag: 'fr', share: 92 },
		{ code: 'it', name: 'Italiano', flag: 'it', share: 92 }
	]
};
