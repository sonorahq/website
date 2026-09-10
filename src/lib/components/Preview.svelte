<script>
	import { onMount } from 'svelte';
	import { reveal } from '$lib/reveal.js';
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
		<figure class="shot" bind:this={column}>
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

		<h2 use:reveal>Not a render. Sonora itself.</h2>
		{#if small}
			<p class="lead" use:reveal>
				A screenshot of the window as it runs. Open the page wider and the live interface takes its
				place.
			</p>
		{:else}
			<p class="lead" use:reveal>
				The interface rebuilt in the browser, at the size the window opens on your desktop. Library,
				queue, lyrics and every setting are live — click around.
			</p>
		{/if}
	</div>
</section>

<style>
	.preview {
		position: relative;
		scroll-margin-top: var(--header);
		padding: 0 0 104px;
	}

	.preview .page {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	h2 {
		margin-top: 56px;
		max-width: 22ch;
		font-size: clamp(30px, 3.4vw, 46px);
		line-height: 1.08;
		letter-spacing: -0.03em;
		text-align: center;
		text-wrap: balance;
	}

	.lead {
		margin-top: 18px;
		max-width: 62ch;
		font-size: 16px;
		line-height: 1.55;
		color: var(--muted-fg);
		text-align: center;
		text-wrap: pretty;
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
			padding: 0 0 64px;
		}

		h2 {
			margin-top: 36px;
		}
	}
</style>
