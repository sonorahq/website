<script>
	import { onMount } from 'svelte';
	import AppMock from './mock/AppMock.svelte';

	const FULL = 1180;
	const FRAME = 2;

	let column = $state(/** @type {HTMLElement | null} */ (null));
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

<section id="preview" class="preview">
	<div class="page">
		<figure class="shot" data-enter style="--enter: 0.35s" bind:this={column}>
			<div class="frame" class:tight={!small}>
				{#if small}
					<img
						src="/app-artist.webp"
						width="1100"
						height="660"
						alt="An artist page in Sonora with the play queue open"
					/>
				{:else}
					<AppMock />
				{/if}
			</div>
		</figure>
	</div>
</section>

<style>
	.preview {
		position: relative;
		scroll-margin-top: var(--header);
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
		width: 100%;
		border: 1px solid var(--border);
		border-radius: 14px;
		overflow: hidden;
		background: var(--bg);
		box-shadow: var(--shadow);
	}

	.frame.tight {
		width: max-content;
		max-width: 100%;
	}

	.frame img {
		display: block;
		width: 100%;
		height: auto;
	}

	@media (max-width: 900px) {
		.preview {
			padding: 0 0 48px;
		}
	}
</style>
