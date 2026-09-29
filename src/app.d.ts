declare global {
	namespace App {
		interface PageData {
			stars: number | null;
			version: string | null;
			locales?: string[];
		}
	}
}

export {};
