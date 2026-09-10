const EDGE = 0.92;
const STEP = 80;

/**
 * @param {HTMLElement} node
 * @param {{ stagger?: boolean }} [options]
 * @returns {{ destroy(): void }}
 */
export function reveal(node, options = {}) {
	const still = { destroy() {} };

	if (matchMedia('(prefers-reduced-motion: reduce)').matches) return still;
	if (node.getBoundingClientRect().top < innerHeight * EDGE) return still;

	const targets = /** @type {HTMLElement[]} */ (
		options.stagger ? Array.from(node.children) : [node]
	);

	for (const target of targets) target.dataset.reveal = 'idle';

	const watch = new IntersectionObserver(
		(entries) => {
			if (!entries.some((entry) => entry.isIntersecting)) return;

			targets.forEach((target, index) => {
				target.style.transitionDelay = `${index * STEP}ms`;
				target.dataset.reveal = 'shown';
			});

			watch.disconnect();
		},
		{ rootMargin: '0px 0px -10% 0px' }
	);

	watch.observe(node);

	return { destroy: () => watch.disconnect() };
}
