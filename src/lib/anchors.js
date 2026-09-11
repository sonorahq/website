/**
 * @returns {() => void}
 */
export function anchors() {
	const gentle = !matchMedia('(prefers-reduced-motion: reduce)').matches;
	const behavior = gentle ? 'smooth' : 'auto';

	/** @param {MouseEvent} event */
	const onclick = (event) => {
		if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey) return;

		const link = /** @type {HTMLElement | null} */ (event.target)?.closest?.('a[href]');
		if (!(link instanceof HTMLAnchorElement) || link.target || link.origin !== location.origin) {
			return;
		}

		if (link.hash) {
			const target = document.getElementById(link.hash.slice(1));
			if (!target || link.pathname !== location.pathname) return;

			event.preventDefault();
			target.scrollIntoView({ behavior, block: 'start' });
			return;
		}

		if (link.pathname !== location.pathname || link.search !== location.search) return;

		event.preventDefault();
		scrollTo({ top: 0, behavior });
	};

	document.addEventListener('click', onclick, true);
	return () => document.removeEventListener('click', onclick, true);
}
