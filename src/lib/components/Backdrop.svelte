<script lang="ts">
	import { onMount } from 'svelte';
	import { scheme } from '$lib/scheme.svelte';
	import Ambient from './mock/Ambient.svelte';

	/** Pixels of scroll that move the waves as far as a second of their own motion does. */
	const STIR = 700;
	/** Screen heights of scroll over which the field blurs out into the page colour. */
	const GONE = 1.25;
	/** Screen pixels per drawn pixel. The field is a soft blur, so a coarse grid costs little and looks the same. */
	const COARSE = 6;
	/** Frames a second, plenty for waves this slow. */
	const RATE = 30;

	let scrolled = $state(0);
	let fade = $state(0);

	onMount(() => {
		let pending = 0;
		const read = () => {
			pending = 0;
			scrolled = scrollY;
			fade = Math.min(scrollY / (innerHeight * GONE), 1);
		};
		const queue = () => {
			if (!pending) pending = requestAnimationFrame(read);
		};

		read();
		addEventListener('scroll', queue, { passive: true });
		addEventListener('resize', queue);
		return () => {
			cancelAnimationFrame(pending);
			removeEventListener('scroll', queue);
			removeEventListener('resize', queue);
		};
	});

	/** Holds behind the hero, then thins out by the time the window has scrolled past. */
	const opacity = $derived(1 - fade * fade * (3 - 2 * fade));
</script>

<div class="backdrop" aria-hidden="true" style:opacity>
	<Ambient
		tint={scheme.tint}
		downscale={COARSE}
		fps={RATE}
		drift={scrolled / STIR}
		soften={fade}
		paused={opacity < 0.002}
		upscale
	/>
</div>

<style>
	.backdrop {
		position: fixed;
		inset: 0;
		z-index: -1;
		pointer-events: none;
	}

	/* the field is drawn on a dark stage, so a light scheme flips it to a pale wash of the same hue */
	:global(:root[data-theme='light']) .backdrop > :global(*) {
		filter: invert(1) hue-rotate(180deg);
	}
</style>
