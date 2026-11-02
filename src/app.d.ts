declare global {
	namespace App {
		interface PageData {
			stars: number | null;
			version: string | null;
			locales?: string[];
		}
	}

	interface Window {
		/** Cloudflare Turnstile, once its script has loaded on the theme submission page. */
		turnstile?: {
			render(element: HTMLElement, options: Record<string, unknown>): string;
			reset(id: string): void;
		};
	}
}

export {};
