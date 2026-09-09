import { SvelteSet } from 'svelte/reactivity';
import { album, catalogue, origin, similar, tracks, upcoming } from '$lib/mock/album.js';

const albumOrder = tracks.map((track) => track.id);
const playlistOrder = upcoming.map((track) => track.id);

/** @param {string} id */
function after(id) {
	const at = albumOrder.indexOf(id);
	return at < 0 ? [...albumOrder] : albumOrder.slice(at + 1);
}

/** @param {string[]} ids */
function scramble(ids) {
	const out = [...ids];
	for (let i = out.length - 1; i > 0; i -= 1) {
		const j = Math.floor(Math.random() * (i + 1));
		[out[i], out[j]] = [out[j], out[i]];
	}
	return out;
}

let current = $state('n2');
let source = $state(playlistOrder);
let queued = $state([...playlistOrder]);
let from = $state(origin);
let suggested = $state(similar.map((track) => track.id));
let playing = $state(false);
let elapsed = $state(92);
let volume = $state(0.72);
let shuffle = $state(false);
let repeat = $state(0);
let radio = $state(true);
let rotation = 0;
let saved = $state(false);
const liked = new SvelteSet(['n2']);
let ticker = 0;

function replenish() {
	if (!radio || suggested.length >= 3) return;
	const more = [];
	while (suggested.length + more.length < similar.length) {
		more.push(similar[rotation % similar.length].id);
		rotation += 1;
	}
	suggested = [...suggested, ...more];
}

function stop() {
	clearInterval(ticker);
	ticker = 0;
}

/** @param {string} id */
function start(id) {
	current = id;
	elapsed = 0;
	source = after(id);
	queued = shuffle ? scramble(source) : [...source];
	from = { name: album.title, kind: 'Album' };
}

function advance() {
	if (queued.length) {
		const [next, ...rest] = queued;
		current = next;
		queued = rest;
		elapsed = 0;
		return true;
	}
	if (suggested.length) {
		const [next, ...rest] = suggested;
		current = next;
		suggested = rest;
		elapsed = 0;
		replenish();
		return true;
	}
	return false;
}

function tick() {
	const span = catalogue.get(current)?.length ?? 0;
	if (elapsed + 0.25 < span) {
		elapsed += 0.25;
		return;
	}
	if (repeat === 2) {
		elapsed = 0;
		return;
	}
	if (advance()) return;
	if (repeat === 1) {
		start(albumOrder[0]);
		return;
	}
	elapsed = span;
	playing = false;
	stop();
}

export const player = {
	get id() {
		return current;
	},
	get track() {
		return catalogue.get(current) ?? tracks[0];
	},
	get from() {
		return from;
	},
	get queued() {
		return queued;
	},
	get suggested() {
		return radio ? suggested : [];
	},
	get playing() {
		return playing;
	},
	get elapsed() {
		return Math.min(elapsed, this.track.length);
	},
	get progress() {
		return this.elapsed / this.track.length;
	},
	get volume() {
		return volume;
	},
	get shuffle() {
		return shuffle;
	},
	get repeat() {
		return repeat;
	},
	get radio() {
		return radio;
	},
	get reordered() {
		return queued.length !== source.length || queued.some((id, at) => id !== source[at]);
	},
	get saved() {
		return saved;
	},

	/** @param {string} id */
	likes(id) {
		return liked.has(id);
	},
	/** @param {string} id */
	toggleLike(id) {
		if (liked.has(id)) liked.delete(id);
		else liked.add(id);
	},
	toggleSaved() {
		saved = !saved;
	},

	resume() {
		if (playing) return;
		playing = true;
		if (!ticker) ticker = setInterval(tick, 250);
	},
	pause() {
		playing = false;
		stop();
	},
	toggle() {
		if (playing) this.pause();
		else this.resume();
	},
	/** @param {string} id */
	select(id) {
		if (id === current) {
			this.toggle();
			return;
		}
		const at = queued.indexOf(id);
		if (at >= 0) {
			current = id;
			elapsed = 0;
			queued = queued.slice(at + 1);
			this.resume();
			return;
		}
		if (suggested.includes(id)) {
			current = id;
			elapsed = 0;
			suggested = suggested.slice(suggested.indexOf(id) + 1);
			replenish();
			this.resume();
			return;
		}
		start(id);
		this.resume();
	},
	previous() {
		if (elapsed > 3) {
			elapsed = 0;
			return;
		}
		const at = albumOrder.indexOf(current);
		this.select(albumOrder[at <= 0 ? albumOrder.length - 1 : at - 1]);
	},
	next() {
		if (advance()) {
			this.resume();
			return;
		}
		this.select(albumOrder[0]);
	},
	/** @param {number} fraction */
	seek(fraction) {
		elapsed = fraction * this.track.length;
	},
	/** @param {number} level */
	setVolume(level) {
		volume = level;
	},
	playShuffled() {
		shuffle = true;
		const rest = scramble(albumOrder);
		const [first, ...tail] = rest;
		current = first;
		elapsed = 0;
		source = after(first);
		queued = tail;
		from = { name: album.title, kind: 'Album' };
		this.resume();
	},
	toggleShuffle() {
		shuffle = !shuffle;
		queued = shuffle ? scramble(queued) : [...source];
	},
	cycleRepeat() {
		repeat = (repeat + 1) % 3;
	},
	toggleRadio() {
		radio = !radio;
		if (radio) replenish();
	},
	resetQueue() {
		queued = [...source];
		shuffle = false;
	},
	clearQueue() {
		queued = [];
	},
	release() {
		stop();
	}
};
