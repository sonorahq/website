<script lang="ts">
	import { onMount } from 'svelte';
	import Gallery from './Gallery.svelte';
	import AppMock from './mock/AppMock.svelte';

	const FULL = 1180;
	const FRAME = 2;

	const shots = [
		{
			src: '/app-album.webp',
			alt: 'An album page in Sonora with the lyrics panel open',
			width: 1100,
			height: 682
		},
		{
			src: '/app-artist.webp',
			alt: 'An artist page in Sonora with the play queue open',
			width: 1100,
			height: 660
		},
		{
			src: '/app-lyrics.webp',
			alt: 'Sonora in its light theme showing full-screen synced lyrics',
			width: 1100,
			height: 660
		}
	];

	let column = $state<HTMLElement | null>(null);
	let small = $state(true);

	onMount(() => {
		if (!column) return;

		const watch = new ResizeObserver(([entry]) => {
			small = entry.target.clientWidth < FULL + FRAME;
		});
		watch.observe(column);
		return () => watch.disconnect();
	});
</script>

<section id="preview" class="preview section">
	<span class="cross start"></span>
	<span class="cross end"></span>

	<div class="page">
		<figure class="shot" data-enter style="--enter: 0.35s" bind:this={column}>
			{#if small}
				<Gallery items={shots} />
			{:else}
				<div class="frame live">
					<AppMock />
				</div>
			{/if}
		</figure>
	</div>
</section>

<style>
	.preview {
		padding: 0 0 72px;
	}

	.preview .page {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.shot {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		margin: 0;
	}

	.frame {
		width: max-content;
		max-width: 100%;
		border: 1px solid var(--border);
		border-radius: 14px;
		overflow: hidden;
		background: var(--bg);
		box-shadow: var(--shadow);
	}

	.frame.live {
		box-shadow: var(--shadow), var(--glow);
	}

	@media (max-width: 900px) {
		.preview {
			padding: 0 0 48px;
		}
	}
</style>
