import { shelf } from '$lib/mock/album';
import { player } from '$lib/mock/player.svelte';
import type { Tint } from '$lib/mock/theme';

/** The colours the site starts in: the tint of the cover behind Promenade, from Pictures at an Exhibition in the mock's catalogue. */
export const DEFAULT_TINT: Tint = shelf.get('pictures')!.tint;

/** The track the mock opens on, which leaves the site in its default colours. */
const first = player.track.id;

/** The colour the whole site wears: the default until the mock plays another track, then that cover's. */
export const site = {
	get tint() {
		if (player.track.id === first) return DEFAULT_TINT;
		return shelf.get(player.track.album)?.tint ?? DEFAULT_TINT;
	}
};
