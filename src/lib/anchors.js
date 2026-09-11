/**
 * @returns {() => void}
 */
export function anchors() {
	const gentle = !matchMedia('(prefers-reduced-motion: reduce)').matches;

	/** @param {MouseEvent} event */
	const onclick = (event) => {
		if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey) return;

		const link = /** @type {HTMLElement | null} */ (event.target)?.closest?.('a[href^="#"]');
		if (!(link instanceof HTMLAnchorElement)) return;

		const id = link.hash.slice(1);
		const target = id && document.getElementById(id);
		if (!target) return;

		event.preventDefault();
		target.scrollIntoView({ behavior: gentle ? 'smooth' : 'auto', block: 'start' });
		history.replaceState(history.state, '', link.hash);
	};

	document.addEventListener('click', onclick);
	return () => document.removeEventListener('click', onclick);
}
