<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import Control from '$lib/components/mock/Control.svelte';
	import Icon from '$lib/components/mock/Icon.svelte';
	import Scrubber from '$lib/components/mock/Scrubber.svelte';
	import { pages } from '$lib/data/docs';
	import { radius } from '$lib/mock/settings.svelte';
	import { palette } from '$lib/mock/theme';
	import { theme } from '$lib/theme.svelte';

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
		'maybe the link is broken',
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
	let liked = $state(false);
	let volume = $state(0.8);
	let queueing = $state<HTMLElement | null>(null);

	const level = $derived(
		volume <= 0.0001
			? 'volume-x'
			: volume < 0.25
				? 'volume'
				: volume < 0.5
					? 'volume-1'
					: 'volume-2'
	);

	/** The app's own colour tokens for the site's current theme, so the player bar is drawn exactly as Sonora draws it. */
	const chrome = $derived(
		[
			...Object.entries(
				palette(
					undefined,
					false,
					theme.choice === 'light' ? 'Light' : theme.choice === 'dark' ? 'Dark' : 'System'
				)
			).map(([name, value]) => `${name}:${value}`),
			`--m-radius:${radius()}px`
		].join(';')
	);

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

			<div class="bar" style={chrome}>
				<div class="now">
					<div class="thumb">{@render mosaic()}</div>
					<span class="text">
						<span class="line">
							<span class="title">{title}</span>
							<Control
								icon={liked ? 'heart-filled' : 'heart'}
								title={liked ? 'Unlike' : 'Like'}
								small
								size={22}
								tint={liked ? 'primary' : 'muted'}
								onclick={() => (liked = !liked)}
							/>
						</span>
						<span class="caption">Sonora · {missing ? 'Unreleased' : `Error ${status}`}</span>
					</span>
				</div>

				<div class="center">
					<div class="transport">
						<Control icon="shuffle" title="Shuffle" small tint="muted" onclick={shuffle} />
						<Control icon="skip-back" title="Go back" small onclick={back} />
						<Control
							icon={playing ? 'pause' : 'play'}
							title={playing ? 'Pause' : 'Play'}
							small
							onclick={() => (playing = !playing)}
						/>
						<Control icon="skip-forward" title="Go home" small onclick={() => goto('/')} />
						<Control
							icon="repeat"
							title="Try this page again"
							small
							tint="muted"
							onclick={() => location.reload()}
						/>
					</div>

					<div class="seek">
						<span class="clock end">{clock(elapsed)}</span>
						<div class="rail">
							<Scrubber
								fraction={elapsed / length}
								label="Seek"
								onseek={(to: number) => (elapsed = to * length)}
							/>
						</div>
						<span class="clock">{clock(length)}</span>
					</div>
				</div>

				<div class="side">
					<div class="tabs">
						<Control icon="mic-vocal" title="Lyrics" small selected />
						<Control
							icon="list-music"
							title="Queue"
							small
							tint="muted"
							onclick={() => queueing?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
						/>
					</div>

					<div class="sound">
						<Control icon={level} title="Volume" small tint="muted" />
						<div class="volume">
							<Scrubber fraction={volume} label="Volume" onseek={(to: number) => (volume = to)} />
						</div>
					</div>

					<Control icon="maximize" title="Fullscreen" small />
				</div>
			</div>

			<div class="queue" bind:this={queueing}>
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
		display: flex;
		align-items: center;
		gap: 14px;
		height: 76px;
		padding: 0 17.5px;
		background: var(--m-secondary);
		color: var(--m-foreground);
		font-size: 14px;
	}

	.now {
		display: flex;
		flex: 1;
		min-width: 0;
		align-items: center;
		gap: 10.5px;
	}

	.thumb {
		flex: none;
		width: 42px;
		height: 42px;
		padding: 5px;
		border-radius: calc(var(--m-radius) * 0.6);
		background: var(--m-background);
	}

	.thumb .mosaic {
		gap: 1px;
	}

	.thumb .mosaic span {
		border-radius: 0;
	}

	.text {
		display: flex;
		flex: 1;
		min-width: 0;
		flex-direction: column;
		justify-content: center;
	}

	.line {
		display: flex;
		min-width: 0;
		align-items: center;
		gap: 3.5px;
	}

	.title,
	.caption {
		min-width: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.caption {
		font-size: 12px;
		color: var(--m-muted-foreground);
	}

	.center {
		display: flex;
		flex: 1;
		min-width: 0;
		max-width: 560px;
		flex-direction: column;
		align-items: center;
		gap: 3.5px;
	}

	.transport {
		display: flex;
		align-items: center;
		gap: 7px;
	}

	.seek {
		display: flex;
		width: 100%;
		align-items: center;
		gap: 7px;
	}

	.rail {
		flex: 1;
		min-width: 0;
	}

	.clock {
		font-variant-numeric: tabular-nums;
		flex: none;
		width: 37.4px;
		font-size: 11px;
		color: var(--m-muted-foreground);
		white-space: nowrap;
	}

	.end {
		text-align: right;
	}

	.side {
		display: flex;
		flex: 1;
		min-width: 0;
		align-items: center;
		justify-content: flex-end;
		gap: 7px;
	}

	.tabs,
	.sound {
		display: flex;
		flex: none;
		align-items: center;
		gap: 3.5px;
	}

	.volume {
		width: 110px;
		flex: none;
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

		.side {
			display: none;
		}

		.now {
			flex: none;
		}

		.text {
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
