<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import Icon from '$lib/components/mock/Icon.svelte';
	import { pages } from '$lib/data/docs';

	const status = $derived(page.status);
	const missing = $derived(status === 404);
	const title = $derived(missing ? 'Page not found' : 'Something went wrong');

	/** The error code read as a track length, so a 404 runs 4:04 and a 500 runs 5:00. */
	const length = $derived(Math.floor(status / 100) * 60 + (status % 100));

	/** A 3 by 5 pixel font for the digits on the cover. Each string is one row, left to right. */
	const FONT: Record<string, string[]> = {
		'0': ['111', '101', '101', '101', '111'],
		'1': ['010', '110', '010', '010', '111'],
		'2': ['111', '001', '111', '100', '111'],
		'3': ['111', '001', '111', '001', '111'],
		'4': ['101', '101', '111', '001', '001'],
		'5': ['111', '100', '111', '001', '111'],
		'6': ['111', '100', '111', '101', '111'],
		'7': ['111', '001', '010', '010', '010'],
		'8': ['111', '101', '111', '101', '111'],
		'9': ['111', '101', '111', '001', '111']
	};

	const SIDE = 13;

	/** The cover as a 13 by 13 grid of tiles with the status code lit across the middle. Unlit tiles get a fixed pseudo-random flicker so the server and the browser draw the same grid. */
	const tiles = $derived.by(() => {
		const lit = new Set<number>();
		String(status)
			.padStart(3, '0')
			.slice(-3)
			.split('')
			.forEach((digit, place) =>
				FONT[digit].forEach((row, y) =>
					[...row].forEach((bit, x) => {
						if (bit === '1') lit.add((y + 4) * SIDE + 1 + place * 4 + x);
					})
				)
			);
		return Array.from({ length: SIDE * SIDE }, (_, index) => ({
			lit: lit.has(index),
			flicker: (index * 7) % 3 === 0,
			delay: ((index * 37) % 23) / 10,
			speed: 1.4 + ((index * 53) % 17) / 10
		}));
	});

	const lyrics = [
		'We looked through every playlist',
		'and every shelf in the library',
		'but this page was never released',
		'maybe the link was a bootleg',
		"or it's still stuck in the queue",
		'so here are some tracks that exist'
	];

	/** Seconds each lyric line stays lit. */
	const LINE = 3.2;

	const queue = [
		{ title: 'Home', note: 'The front page', href: '/', length: '2:48' },
		{ title: 'Install', note: 'Get Sonora for your system', href: '/#steps', length: '1:30' },
		{ title: 'Docs', note: 'How everything works', href: '/docs', length: '12:07' },
		{ title: 'FAQ', note: 'Fixes for common problems', href: '/faq', length: '5:55' }
	];

	let elapsed = $state(0);
	let playing = $state(false);

	const line = $derived(Math.floor(elapsed / LINE) % lyrics.length);

	function clock(seconds: number) {
		const whole = Math.floor(seconds);
		return `${Math.floor(whole / 60)}:${String(whole % 60).padStart(2, '0')}`;
	}

	/** Moves the playhead to where the progress bar was pressed. */
	function seek(event: PointerEvent) {
		const box = (event.currentTarget as HTMLElement).getBoundingClientRect();
		elapsed = Math.min(Math.max((event.clientX - box.left) / box.width, 0), 1) * length;
	}

	function back() {
		if (history.length > 1) history.back();
		else goto('/');
	}

	/** Jumps to a random real page, which is the only kind of shuffle a missing page can offer. */
	function shuffle() {
		const targets = ['/', '/faq', ...pages.map((entry) => `/docs/${entry.slug}`)];
		goto(targets[Math.floor(Math.random() * targets.length)]);
	}

	onMount(() => {
		playing = !matchMedia('(prefers-reduced-motion: reduce)').matches;

		let last = performance.now();
		let frame = requestAnimationFrame(function tick(now) {
			if (playing) elapsed = (elapsed + (now - last) / 1000) % length;
			last = now;
			frame = requestAnimationFrame(tick);
		});

		const onkey = (event: KeyboardEvent) => {
			const typing = (event.target as Element | null)?.closest(
				'input, textarea, button, a, [contenteditable]'
			);
			if (event.code !== 'Space' || typing || event.repeat) return;
			event.preventDefault();
			playing = !playing;
		};
		addEventListener('keydown', onkey);

		return () => {
			cancelAnimationFrame(frame);
			removeEventListener('keydown', onkey);
		};
	});
</script>

<svelte:head>
	<title>{missing ? 'Not found' : 'Something went wrong'} · Sonora</title>
	<meta name="robots" content="noindex" />
</svelte:head>

{#snippet mosaic()}
	<div class="mosaic" class:playing aria-hidden="true">
		{#each tiles as tile, index (index)}
			<span
				class:lit={tile.lit}
				class:flicker={tile.flicker && !tile.lit}
				style:--delay="{tile.delay}s"
				style:--speed="{tile.speed}s"
			></span>
		{/each}
	</div>
{/snippet}

<section class="section">
	<span class="cross start"></span>
	<span class="cross end"></span>

	<div class="page">
		<div class="section-head">
			<span class="kicker">Error {status}</span>
			<h1>{title}</h1>
		</div>

		<div class="wire deck">
			<div class="cover">{@render mosaic()}</div>

			<div class="words">
				<span class="kicker">Lyrics</span>
				<ol class="lyrics">
					{#each lyrics as text, index (text)}
						<li class:on={index === line} class:past={index < line}>{text}</li>
					{/each}
				</ol>
			</div>

			<div class="bar">
				<div class="track">
					<div class="thumb">{@render mosaic()}</div>
					<div class="names">
						<span class="name">{title}</span>
						<span class="artist">Sonora · {missing ? 'Unreleased' : `Error ${status}`}</span>
					</div>
				</div>

				<div class="center">
					<div class="controls">
						<button type="button" class="small" aria-label="Shuffle" onclick={shuffle}>
							<Icon name="shuffle" size={16} />
						</button>
						<button type="button" aria-label="Go back" onclick={back}>
							<Icon name="skip-back" size={18} />
						</button>
						<button
							type="button"
							class="play"
							aria-label={playing ? 'Pause' : 'Play'}
							onclick={() => (playing = !playing)}
						>
							<Icon name={playing ? 'pause-filled' : 'play-filled'} size={18} />
						</button>
						<button type="button" aria-label="Go home" onclick={() => goto('/')}>
							<Icon name="skip-forward" size={18} />
						</button>
						<button
							type="button"
							class="small"
							aria-label="Try this page again"
							onclick={() => location.reload()}
						>
							<Icon name="repeat" size={16} />
						</button>
					</div>

					<div class="progress">
						<span class="mono">{clock(elapsed)}</span>
						<div
							class="rail"
							role="slider"
							tabindex="0"
							aria-label="Position"
							aria-valuemin="0"
							aria-valuemax={length}
							aria-valuenow={Math.floor(elapsed)}
							onpointerdown={seek}
						>
							<div class="fill" style:width="{(elapsed / length) * 100}%"></div>
						</div>
						<span class="mono">{clock(length)}</span>
					</div>
				</div>

				<div class="hint mono">
					<kbd>Space</kbd>
					{playing ? 'pause' : 'play'}
				</div>
			</div>

			<div class="queue">
				<div class="head">
					<span class="kicker">Up next</span>
				</div>
				{#each queue as track, index (track.href)}
					<a class="row" href={track.href}>
						<span class="index mono">
							<span class="number">{index + 1}</span>
							<span class="glyph"><Icon name="play-filled" size={12} /></span>
						</span>
						<span class="title">{track.title}</span>
						<span class="note">{track.note}</span>
						<span class="length mono">{track.length}</span>
					</a>
				{/each}
			</div>
		</div>
	</div>
</section>

<style>
	.page {
		padding-bottom: 96px;
	}

	h1 {
		font-size: 40px;
		line-height: 1.05;
		letter-spacing: -0.03em;
	}

	.deck {
		grid-template-columns: 340px minmax(0, 1fr);
	}

	.cover {
		padding: 28px;
	}

	.mosaic {
		display: grid;
		grid-template-columns: repeat(13, 1fr);
		gap: 4px;
		aspect-ratio: 1;
	}

	.mosaic span {
		border-radius: 2px;
		background: color-mix(in srgb, var(--fg) 7%, transparent);
	}

	.mosaic span.flicker {
		animation: flicker var(--speed) ease-in-out var(--delay) infinite alternate;
		animation-play-state: paused;
	}

	.mosaic span.lit {
		background: var(--fg);
	}

	.mosaic.playing span {
		animation-play-state: running;
	}

	@keyframes flicker {
		0%,
		65% {
			background: color-mix(in srgb, var(--fg) 7%, transparent);
		}

		100% {
			background: color-mix(in srgb, var(--fg) 17%, transparent);
		}
	}

	.words {
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 18px;
		padding: 36px 40px;
	}

	.lyrics {
		margin: 0;
		padding: 0;
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 8px;
		font-size: 26px;
		font-weight: 600;
		line-height: 1.2;
		letter-spacing: -0.02em;
	}

	.lyrics li {
		color: var(--faint);
		filter: blur(1.4px);
		transition:
			color 0.4s ease,
			filter 0.4s ease;
	}

	.lyrics li.past {
		color: var(--dim);
		filter: blur(0.7px);
	}

	.lyrics li.on {
		color: var(--fg);
		filter: none;
	}

	.bar {
		grid-column: 1 / -1;
		display: grid;
		grid-template-columns: 1fr minmax(0, 460px) 1fr;
		align-items: center;
		gap: 24px;
		padding: 14px 18px;
		background: var(--card);
	}

	.track {
		display: flex;
		align-items: center;
		gap: 12px;
		min-width: 0;
	}

	.thumb {
		flex: none;
		width: 48px;
		padding: 5px;
		border: 1px solid var(--line);
		border-radius: 8px;
		background: var(--bg);
	}

	.thumb .mosaic {
		gap: 1px;
	}

	.thumb .mosaic span {
		border-radius: 0;
	}

	.names {
		display: flex;
		flex-direction: column;
		gap: 3px;
		min-width: 0;
	}

	.name {
		font-size: 13.5px;
		font-weight: 600;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.artist {
		font-size: 12px;
		color: var(--muted-fg);
		white-space: nowrap;
	}

	.center {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.controls {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
	}

	.controls button {
		width: 34px;
		height: 34px;
		display: grid;
		place-items: center;
		border-radius: 8px;
		color: var(--fg);
	}

	.controls button:hover {
		background: var(--secondary-hover);
	}

	.controls .small {
		color: var(--dim);
	}

	.controls .small:hover {
		color: var(--fg);
	}

	.controls .play {
		width: 38px;
		height: 38px;
		margin: 0 4px;
		border-radius: 10px;
		background: var(--primary);
		color: var(--primary-fg);
	}

	.controls .play:hover {
		background: var(--primary-hover);
	}

	.progress {
		display: grid;
		grid-template-columns: 38px minmax(0, 1fr) 38px;
		align-items: center;
		gap: 10px;
		font-size: 11px;
		color: var(--dim);
	}

	.progress span:last-child {
		text-align: right;
	}

	.rail {
		position: relative;
		height: 4px;
		background: var(--border);
		cursor: pointer;
		touch-action: none;
	}

	.rail::before {
		content: '';
		position: absolute;
		inset: -10px 0;
	}

	.fill {
		height: 100%;
		background: var(--fg);
	}

	.hint {
		justify-self: end;
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 11px;
		color: var(--dim);
	}

	kbd {
		padding: 2px 6px;
		border: 1px solid var(--border);
		border-bottom-width: 2px;
		border-radius: 5px;
		font-family: var(--mono);
		font-size: 10.5px;
		color: var(--muted-fg);
	}

	.queue {
		grid-column: 1 / -1;
		display: flex;
		flex-direction: column;
	}

	.head {
		padding: 14px 18px 10px;
	}

	.row {
		display: grid;
		grid-template-columns: 28px 140px minmax(0, 1fr) auto;
		align-items: center;
		gap: 12px;
		height: 46px;
		padding: 0 18px;
		border-top: 1px solid var(--line);
		font-size: 13.5px;
	}

	.row:hover {
		background: var(--secondary);
	}

	.index {
		display: grid;
		color: var(--dim);
	}

	.index > * {
		grid-area: 1 / 1;
	}

	.glyph {
		display: flex;
		opacity: 0;
		color: var(--fg);
	}

	.row:hover .number {
		opacity: 0;
	}

	.row:hover .glyph {
		opacity: 1;
	}

	.title {
		font-weight: 500;
	}

	.note {
		color: var(--muted-fg);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.length {
		font-size: 12px;
		color: var(--dim);
	}

	@media (max-width: 900px) {
		h1 {
			font-size: 30px;
		}

		.deck {
			grid-template-columns: minmax(0, 1fr);
		}

		.cover {
			padding: 32px 48px;
		}

		.words {
			padding: 24px;
		}

		.lyrics {
			font-size: 19px;
		}

		.bar {
			grid-template-columns: minmax(0, 1fr);
			gap: 14px;
		}

		.hint {
			display: none;
		}

		.row {
			grid-template-columns: 24px minmax(0, 1fr) auto;
		}

		.note {
			display: none;
		}
	}
</style>
