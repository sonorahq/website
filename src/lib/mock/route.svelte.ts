export type Stop = { screen: string; tab?: string; id?: string };

let trail: Stop[] = $state([{ screen: 'album', id: 'airs' }]);
let at = $state(0);

const same = (one: Stop, other: Stop) =>
	one.screen === other.screen && one.tab === other.tab && one.id === other.id;

export const route = {
	get now() {
		return trail[at];
	},
	get behind() {
		return at > 0;
	},
	get ahead() {
		return at + 1 < trail.length;
	},
	go(stop: Stop) {
		if (same(trail[at], stop)) return;
		trail = [...trail.slice(0, at + 1), stop];
		at = trail.length - 1;
	},
	back() {
		if (at > 0) at -= 1;
	},
	forward() {
		if (at + 1 < trail.length) at += 1;
	}
};
