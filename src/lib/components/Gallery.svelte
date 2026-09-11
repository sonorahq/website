<script lang="ts">
	type Item = { src: string; alt: string; width: number; height: number };

	let { items }: { items: Item[] } = $props();

	let track = $state<HTMLElement | null>(null);
	let at = $state(0);

	function settle() {
		if (!track) return;
		at = Math.round(track.scrollLeft / track.clientWidth);
	}

	function go(to: number) {
		if (!track) return;
		const next = (to + items.length) % items.length;
		track.scrollTo({ left: next * track.clientWidth, behavior: 'smooth' });
	}
</script>

<div class="gallery">
	<div class="track" bind:this={track} onscroll={settle}>
		{#each items as item (item.src)}
			<img src={item.src} alt={item.alt} width={item.width} height={item.height} loading="lazy" />
		{/each}
	</div>

	<div class="bar">
		<button type="button" aria-label="Previous screenshot" onclick={() => go(at - 1)}>
			<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 6l-6 6 6 6" /></svg>
		</button>

		<div class="dots">
			{#each items as item, index (item.src)}
				<button
					type="button"
					class="dot"
					class:on={index === at}
					aria-label="Screenshot {index + 1}"
					aria-pressed={index === at}
					onclick={() => go(index)}
				></button>
			{/each}
		</div>

		<button type="button" aria-label="Next screenshot" onclick={() => go(at + 1)}>
			<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
		</button>
	</div>
</div>

<style>
	.gallery {
		width: 100%;
		border: 1px solid var(--border);
		border-radius: var(--radius-lg);
		overflow: hidden;
		background: var(--bg);
		box-shadow: var(--shadow);
	}

	.track {
		display: flex;
		overflow-x: auto;
		scroll-snap-type: x mandatory;
		scrollbar-width: none;
	}

	.track::-webkit-scrollbar {
		display: none;
	}

	img {
		display: block;
		flex: none;
		width: 100%;
		height: auto;
		scroll-snap-align: start;
	}

	.bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 40px;
		border-top: 1px solid var(--line);
	}

	.bar > button {
		width: 40px;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--dim);
	}

	.bar > button:first-child {
		border-right: 1px solid var(--line);
	}

	.bar > button:last-child {
		border-left: 1px solid var(--line);
	}

	.bar > button:hover {
		color: var(--fg);
		background: var(--secondary);
	}

	svg {
		width: 14px;
		height: 14px;
		fill: none;
		stroke: currentColor;
		stroke-width: 2;
		stroke-linecap: round;
		stroke-linejoin: round;
	}

	.dots {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.dot {
		width: 18px;
		height: 12px;
		padding: 0;
		position: relative;
	}

	.dot::before {
		content: '';
		position: absolute;
		top: 5px;
		left: 0;
		width: 100%;
		height: 2px;
		border-radius: 1px;
		background: var(--faint);
		transition: background-color 0.18s ease;
	}

	.dot:hover::before {
		background: var(--muted-fg);
	}

	.dot.on::before {
		background: var(--fg);
	}
</style>
