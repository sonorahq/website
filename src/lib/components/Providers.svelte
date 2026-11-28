<script lang="ts">
	import { onMount } from 'svelte';
	import Glyph from './Glyph.svelte';

	const items = [
		{ glyph: 'spotify', text: 'Spotify' },
		{ glyph: 'applemusic', text: 'Apple Music' },
		{ glyph: 'youtubemusic', text: 'YouTube Music' },
		{ glyph: 'tidal', text: 'Tidal' },
		{ glyph: 'deezer', text: 'Deezer' },
		{ glyph: 'jellyfin', text: 'Jellyfin' },
		{ glyph: 'plex', text: 'Plex' },
		{ glyph: 'subsonic', text: 'Subsonic' },
		{ glyph: 'file-music', text: 'Your files' }
	];

	let row = $state<HTMLElement | null>(null);
	let shown = $state(false);

	/** The marks pop in one by one the first time the row scrolls into view, as the promo film ends. */
	onMount(() => {
		if (!row) return;
		const watch = new IntersectionObserver(([entry]) => {
			if (!entry.isIntersecting) return;
			shown = true;
			watch.disconnect();
		});
		watch.observe(row);
		return () => watch.disconnect();
	});
</script>

<section class="providers page">
	<ul class="row" class:shown bind:this={row}>
		{#each items as item, index (item.text)}
			<li style:--at={index} title={item.text}>
				<span class="mark"><Glyph name={item.glyph} size={44} /></span>
				<span class="label">{item.text}</span>
			</li>
		{/each}
	</ul>
	<h2>One app.</h2>
	<p>Switch services from the account menu. Your own files sit next to each of them.</p>
</section>

<style>
	.providers {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 120px;
		padding-bottom: 48px;
		text-align: center;
	}

	.row {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: clamp(20px, 4vw, 44px);
		margin: 0;
		padding: 0;
		list-style: none;
	}

	li {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 10px;
		color: var(--fg);
	}

	:global(html.js) li {
		opacity: 0;
		transform: translateY(18px) scale(0.6);
	}

	:global(html.js) .shown li {
		animation: pop 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
		animation-delay: calc(var(--at) * 0.14s);
	}

	.mark {
		display: flex;
		align-items: center;
		height: 44px;
	}

	.label {
		font-size: 12px;
		color: var(--muted-fg);
	}

	h2 {
		margin-top: 56px;
		font-size: clamp(48px, 6vw, 80px);
		line-height: 1;
		letter-spacing: -0.05em;
	}

	p {
		max-width: 440px;
		margin-top: 18px;
		font-size: 15px;
		line-height: 1.6;
		color: var(--muted-fg);
		text-wrap: balance;
	}

	@keyframes pop {
		to {
			opacity: 1;
			transform: none;
		}
	}

	@media (max-width: 900px) {
		.providers {
			padding-top: 72px;
			padding-bottom: 32px;
		}
	}
</style>
