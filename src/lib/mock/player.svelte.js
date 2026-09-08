import { tracks } from '$lib/mock/album.js';

let index = $state(1);
let playing = $state(false);
let elapsed = $state(92);
let volume = $state(0.72);
let shuffle = $state(false);
let repeat = $state(0);
let ticker = 0;

function stop() {
	clearInterval(ticker);
	ticker = 0;
}

function tick() {
	if (elapsed + 0.25 < tracks[index].length) {
		elapsed += 0.25;
		return;
	}
	if (repeat === 2) {
		elapsed = 0;
		return;
	}
	if (index + 1 < tracks.length) {
		index += 1;
		elapsed = 0;
		return;
	}
	if (repeat === 1) {
		index = 0;
		elapsed = 0;
		return;
	}
	elapsed = tracks[index].length;
	playing = false;
	stop();
}

export const player = {
	get index() {
		return index;
	},
	get track() {
		return tracks[index];
	},
	get playing() {
		return playing;
	},
	get elapsed() {
		return Math.min(elapsed, tracks[index].length);
	},
	get progress() {
		return this.elapsed / tracks[index].length;
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
	/** @param {number} to */
	select(to) {
		if (to === index) {
			this.toggle();
			return;
		}
		index = to;
		elapsed = 0;
		this.resume();
	},
	previous() {
		if (elapsed > 3) {
			elapsed = 0;
			return;
		}
		this.select(index === 0 ? tracks.length - 1 : index - 1);
	},
	next() {
		this.select((index + 1) % tracks.length);
	},
	/** @param {number} fraction */
	seek(fraction) {
		elapsed = fraction * tracks[index].length;
	},
	/** @param {number} level */
	setVolume(level) {
		volume = level;
	},
	toggleShuffle() {
		shuffle = !shuffle;
	},
	cycleRepeat() {
		repeat = (repeat + 1) % 3;
	},
	release() {
		stop();
	}
};
