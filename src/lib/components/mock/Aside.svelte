<script>
	import { untrack } from 'svelte';
	import { catalogue } from '$lib/mock/album.js';
	import { lyrics, writers } from '$lib/mock/lyrics.js';
	import { player } from '$lib/mock/player.svelte.js';
	import Control from './Control.svelte';
	import Cover from './Cover.svelte';
	import Icon from './Icon.svelte';

	let { tab } = $props();

	/** @param {string[]} ids */
	const look = (ids) => ids.map((id) => catalogue.get(id)).filter((track) => track !== undefined);

	const ROOM = 6;

	const upcoming = $derived(look(player.queued).slice(0, ROOM));
	const suggested = $derived(look(player.suggested).slice(0, ROOM - upcoming.length));

	const PIN = 0.3;
	const EDGE_FADE = 11.4;
	const SWEEP_STRETCH = 1.4;
	const SWEEP_LEAST = 0.18;
	const SWEPT = 0.98;

	const verses = $derived(lyrics.get(player.id) ?? []);
	const at = $derived(player.elapsed);
	const active = $derived(
		verses.reduce((found, line, index) => (at >= line.start ? index : found), -1)
	);

	let roll = $state(/** @type {HTMLElement | null} */ (null));
	let sheet = $state(/** @type {HTMLElement | null} */ (null));
	let lift = $state(0);

	$effect(() => {
		void active;
		if (!roll || !sheet) return;
		const line = sheet.children[Math.max(active, 0)];
		if (!(line instanceof HTMLElement)) return;
		lift = roll.clientHeight * PIN - line.offsetTop;
	});

	let spans = $state(/** @type {(HTMLElement | null)[]} */ ([]));
	let body = $state(/** @type {HTMLElement | null} */ (null));
	let plan = $state(/** @type {{ row: number, x: number, width: number }[]} */ ([]));
	let rows = $state(
		/** @type {{ top: number, left: number, height: number, width: number }[]} */ ([])
	);
	let reach = $state(0);

	function measure() {
		const words = verses[active]?.words ?? [];
		const boxes = words.map((_, spot) => spans[spot]).filter((span) => span !== null);
		if (!body || boxes.length !== words.length || !boxes.length) return;

		const tops = [...new Set(boxes.map((span) => span.offsetTop))].sort((a, b) => a - b);
		const seats = tops.map((top) => boxes.filter((span) => span.offsetTop === top));
		const shape = tops.map((top, row) => {
			const left = Math.min(...seats[row].map((span) => span.offsetLeft));
			return {
				top,
				left,
				height: Math.max(...seats[row].map((span) => span.offsetHeight)),
				width: Math.max(...seats[row].map((span) => span.offsetLeft + span.offsetWidth)) - left
			};
		});
		const seating = boxes.map((span) => {
			const row = tops.indexOf(span.offsetTop);
			return { row, x: span.offsetLeft - shape[row].left, width: span.offsetWidth };
		});

		reach = body.clientWidth;
		rows = shape;
		plan = seating;
	}

	let settled = false;

	$effect(() => {
		void active;
		void tab;
		untrack(measure);
		if (settled) return;
		settled = true;
		document.fonts?.ready.then(() => untrack(measure));
	});

	/** @param {{ start: number, end: number }} word @param {boolean} last */
	const swept = (word, last) => {
		const span = word.end - word.start;
		const travel = Math.max(last ? span : span * SWEEP_STRETCH, SWEEP_LEAST);
		const along = Math.min(Math.max((at - word.start) / travel, 0), 1);
		const eased = 1 - (1 - along) ** 3;
		return eased >= SWEPT ? 1 : eased;
	};

	const edges = $derived.by(() => {
		const words = verses[active]?.words ?? [];
		const front = rows.map(() => 0);
		words.forEach((word, spot) => {
			const seat = plan[spot];
			const part = seat ? swept(word, spot + 1 === words.length) : 0;
			if (!seat || part <= 0) return;
			const front_ = seat.x + seat.width * part;
			if (front_ > front[seat.row]) front[seat.row] = front_;
		});
		return front;
	});

	/** @param {number} row */
	const trail = (row) => Math.min(Math.max(rows[row].width - edges[row], 0), EDGE_FADE);
</script>

<aside class="aside">
	<header class="head">
		<span class="eyebrow">{tab === 'lyrics' ? 'Lyrics' : 'Queue'}</span>
		{#if tab === 'queue'}
			<div class="tools">
				<Control
					icon="radio"
					title="Autoplay similar tracks"
					small
					tint={player.radio ? 'primary' : 'muted'}
					onclick={() => player.toggleRadio()}
				/>
				<Control
					label="Reset"
					title="Reset"
					small
					tint="muted"
					disabled={!player.reordered}
					onclick={() => player.resetQueue()}
				/>
				<Control
					label="Clear"
					title="Clear"
					small
					tint="muted"
					disabled={upcoming.length === 0}
					onclick={() => player.clearQueue()}
				/>
			</div>
		{/if}
	</header>

	{#if tab === 'lyrics' && verses.length}
		<div class="verses" bind:this={roll}>
			<div class="sheet" bind:this={sheet} style:transform="translateY({lift}px)">
				{#each verses as line, index (line.start)}
					<p
						class="verse"
						class:sung={index === active}
						class:past={index < active}
						class:ahead={index > active}
					>
						{#if index === active}
							<span class="body" bind:this={body}>
								{#each line.words as word, spot (spot)}
									<span class="word" bind:this={spans[spot]}>{word.word}</span>{' '}
								{/each}

								{#each rows as row, slot (slot)}
									{#if edges[slot] > 0}
										<span
											class="lit"
											class:soft={trail(slot) > 0}
											style:left="{row.left}px"
											style:top="{row.top}px"
											style:width="{edges[slot]}px"
											style:height="{row.height}px"
											style:--m-reveal="{trail(slot)}px"
										>
											<span
												class="copy"
												style:left="{-row.left}px"
												style:top="{-row.top}px"
												style:width="{reach}px"
											>
												{#each line.words as word, spot (spot)}
													<span class="word">{word.word}</span>{' '}
												{/each}
											</span>
										</span>
									{/if}
								{/each}
							</span>
						{:else}
							{line.text}
						{/if}
					</p>
				{/each}

				<div class="credit">
					<span>Lyrics from {writers.source}</span>
					<span>Written by {writers.by}</span>
				</div>
			</div>
		</div>
	{:else if tab === 'lyrics'}
		<div class="vacancy">
			<Icon name="mic-off" size={70} />
			<p>No lyrics found, sorry!</p>
		</div>
	{:else}
		<div class="list">
			<span class="group">
				<span class="eyebrow">Now playing</span>
				{#if player.from}
					<span class="dot">&middot;</span>
					<span class="faint">From</span>
					<span class="source">{player.from.name}</span>
				{/if}
			</span>
			<div class="card chosen">
				<Cover src={player.track.cover} />
				<span class="text">
					<span class="title playing">{player.track.title}</span>
					<span class="caption">{player.track.artist}</span>
				</span>
			</div>

			{#if upcoming.length}
				<span class="group"><span class="eyebrow">Up next</span></span>
				{#each upcoming as track (track.id)}
					<button type="button" class="card" onclick={() => player.select(track.id)}>
						<Cover src={track.cover} />
						<span class="text">
							<span class="title">{track.title}</span>
							<span class="caption">{track.artist}</span>
						</span>
					</button>
				{/each}
			{/if}

			{#if suggested.length}
				<span class="group"><span class="eyebrow">Similar tracks</span></span>
				{#each suggested as track (track.id)}
					<button type="button" class="card" onclick={() => player.select(track.id)}>
						<Cover src={track.cover} />
						<span class="text">
							<span class="title">{track.title}</span>
							<span class="caption">{track.artist}</span>
						</span>
					</button>
				{/each}
			{/if}
		</div>
	{/if}
</aside>

<style>
	.aside {
		display: flex;
		flex: none;
		flex-direction: column;
		width: 254px;
		overflow: hidden;
		background: var(--m-background);
		border-left: 1px solid var(--m-border);
	}

	.head {
		display: flex;
		flex: none;
		align-items: center;
		justify-content: space-between;
		gap: 7px;
		height: 32px;
		padding: 0 7px;
		border-bottom: 1px solid var(--m-border);
	}

	.eyebrow {
		font-size: 12px;
		font-weight: 600;
		text-transform: uppercase;
		color: var(--m-muted-foreground);
	}

	.tools {
		display: flex;
		align-items: center;
		gap: 3.5px;
	}

	.vacancy {
		display: flex;
		flex: 1;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		color: var(--m-muted-foreground);
	}

	.verses {
		position: relative;
		flex: 1;
		min-height: 0;
		overflow: hidden;
		padding: 0 3.5px;
		mask-image: linear-gradient(
			to bottom,
			transparent 0,
			#000 23.75px,
			#000 calc(100% - 23.75px),
			transparent 100%
		);
	}

	.sheet {
		position: absolute;
		left: 3.5px;
		right: 3.5px;
		top: 0;
		display: flex;
		flex-direction: column;
		gap: 14px;
		will-change: transform;
		transition: transform 520ms cubic-bezier(0.33, 1, 0.68, 1);
	}

	.verse {
		margin: 0;
		padding: 3.5px 7px;
		border-radius: var(--m-radius);
		font-size: 21px;
		font-weight: 600;
		line-height: 26.25px;
		transform: scale(0.904762);
		transform-origin: left center;
		transition: transform 200ms cubic-bezier(0.45, 0, 0.55, 1);
	}

	.verse:hover {
		background: var(--m-table-hover);
	}

	.past {
		color: color-mix(in srgb, var(--m-muted-foreground) 40%, transparent);
	}

	.ahead {
		color: color-mix(in srgb, var(--m-muted-foreground) 60%, transparent);
	}

	.sung {
		transform: none;
		color: var(--m-muted-foreground);
	}

	.body {
		position: relative;
		display: block;
	}

	.word {
		display: inline-block;
		white-space: nowrap;
	}

	.lit {
		position: absolute;
		overflow: hidden;
		color: var(--m-foreground);
	}

	.copy {
		position: absolute;
		display: block;
	}

	.soft {
		mask-image: linear-gradient(to right, #000 calc(100% - var(--m-reveal)), transparent 100%);
	}

	.credit {
		display: flex;
		flex-direction: column;
		padding: 7px 7px 0;
		font-size: 12px;
		font-weight: 400;
		color: var(--m-muted-foreground);
	}

	@media (prefers-reduced-motion: reduce) {
		.sheet,
		.verse {
			transition: none;
		}
	}

	.vacancy :global(svg) {
		margin-top: 24px;
		opacity: 0.35;
	}

	.vacancy p {
		margin: 0;
		padding: 16px;
	}

	.list {
		display: flex;
		flex-direction: column;
		padding: 48px 7px 0;
		overflow: hidden;
	}

	.group {
		display: flex;
		flex: none;
		align-items: flex-end;
		gap: 3.5px;
		height: 52px;
		min-width: 0;
		padding: 0 7px 3.5px;
		overflow: hidden;
		font-size: 12px;
		font-weight: 600;
		color: var(--m-muted-foreground);
	}

	.group .eyebrow {
		text-transform: uppercase;
	}

	.dot,
	.faint {
		flex: none;
	}

	.source {
		min-width: 0;
		flex-shrink: 1;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		cursor: pointer;
	}

	.source:hover {
		color: var(--m-foreground);
		text-decoration: underline;
	}

	.card {
		display: flex;
		flex: none;
		align-items: center;
		gap: 10.5px;
		width: 100%;
		height: 52px;
		padding: 8px;
		border: 0;
		border-radius: var(--m-radius);
		background: none;
		color: var(--m-foreground);
		font: inherit;
		text-align: left;
		cursor: pointer;
	}

	.card:hover {
		background: var(--m-table-hover);
	}

	.chosen {
		background: var(--m-table-active);
	}

	.text {
		display: flex;
		flex: 1;
		min-width: 0;
		flex-direction: column;
		gap: 2px;
		line-height: 1.25;
	}

	.title,
	.caption {
		min-width: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.playing {
		color: var(--m-primary);
	}

	.caption {
		font-size: 12px;
		color: var(--m-muted-foreground);
	}
</style>
