import { platforms } from '$lib/data/platforms.js';

let id = $state(platforms[0].id);

export const platform = {
	get id() {
		return id;
	},
	set id(value) {
		id = value;
	},
	get current() {
		return platforms.find((entry) => entry.id === id) ?? platforms[0];
	}
};
