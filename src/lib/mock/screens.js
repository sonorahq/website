import { albums, catalogue, shelf, tracks, upcoming, similar } from './album.js';

/** @param {string} id */
const one = (id) => catalogue.get(id);

/** @param {string[]} ids */
const pick = (ids) => ids.map(one).filter((track) => track !== undefined);

export const listenAgain = [...upcoming, ...similar.slice(0, 2)];

export const quickPicks = [...tracks.slice(0, 5), ...upcoming.slice(0, 5), ...similar.slice(0, 5)];

export const genres = [
	'Classical',
	'Folk',
	'Baroque',
	'Piano',
	'Ambient',
	'Romantic',
	'Chamber',
	'Opera',
	'Minimalism',
	'Choral'
].map((name) => ({ id: name.toLowerCase(), name }));

export const favorites = [
	...pick(['t1', 't2', 't5']),
	...upcoming.slice(0, 4),
	...similar.slice(0, 3)
].map((track, at) => ({
	...track,
	added: ['Sep 4, 2026', 'Sep 2, 2026', 'Aug 29, 2026', 'Aug 24, 2026', 'Aug 20, 2026'][at % 5]
}));

export const artists = [
	{ id: 'traditional', name: 'Traditional', listeners: '2,410,338' },
	{ id: 'chopin', name: 'Frédéric Chopin', listeners: '8,924,715' },
	{ id: 'debussy', name: 'Claude Debussy', listeners: '6,142,908' },
	{ id: 'satie', name: 'Erik Satie', listeners: '5,308,441' },
	{ id: 'vivaldi', name: 'Antonio Vivaldi', listeners: '9,776,120' },
	{ id: 'grieg', name: 'Edvard Grieg', listeners: '4,015,663' },
	{ id: 'mussorgsky', name: 'Modest Mussorgsky', listeners: '3,229,504' }
];

export const playlists = [
	{ id: 'quiet-hours', name: 'Quiet Hours', owner: 'You', count: 10 },
	{ id: 'evening-studies', name: 'Evening Studies', owner: 'You', count: 24 },
	{ id: 'rainy-windows', name: 'Rainy Windows', owner: 'You', count: 18 },
	{ id: 'morning-light', name: 'Morning Light', owner: 'You', count: 31 },
	{ id: 'long-drives', name: 'Long Drives', owner: 'You', count: 42 }
];

export const played = [
	...pick(['t2', 't1']),
	...upcoming.slice(0, 3),
	...pick(['t5', 't7']),
	...similar.slice(0, 3)
].map((track, at) => ({
	...track,
	at: [
		'Just now',
		'Today at 14:02',
		'Today at 13:48',
		'Today at 13:41',
		'Today at 13:35',
		'Yesterday at 22:10',
		'Yesterday at 21:54',
		'Sep 7, 2026',
		'Sep 7, 2026',
		'Sep 6, 2026'
	][at]
}));

export const localTracks = pick(['g3', 'g2', 'b1', 'b2', 'x2']).map((track, at) => ({
	...track,
	added: ['Sep 6, 2026', 'Sep 6, 2026', 'Aug 31, 2026', 'Aug 31, 2026', 'Aug 12, 2026'][at]
}));

/** @param {string} id */
export function albumsOf(id) {
	const name = artists.find((artist) => artist.id === id)?.name;
	return albums.filter((entry) => entry.artist === name);
}

/** @param {string} id */
export function popularOf(id) {
	const name = artists.find((artist) => artist.id === id)?.name;
	const owned = albums.filter((entry) => entry.artist === name).map((entry) => entry.id);
	return [...catalogue.values()].filter((track) => owned.includes(track.album));
}

const localIds = [...new Set(localTracks.map((track) => track.album))];

export const localAlbums = albums.filter((entry) => localIds.includes(entry.id));

export const localArtists = artists.filter((artist) =>
	localAlbums.some((entry) => entry.artist === artist.name)
);

export const libraryColumns = [
	{ key: 'index', label: '#', width: 44, align: 'center' },
	{ key: 'cover', label: '', width: 50 },
	{ key: 'title', label: 'Title', width: 309.567, sortable: true },
	{ key: 'artist', label: 'Artist', width: 127.433, sortable: true },
	{ key: 'added', label: 'Date added', width: 112, sortable: true },
	{ key: 'length', label: 'Length', width: 84, align: 'right', sortable: true }
];

export const artistColumns = [
	{ key: 'index', label: '#', width: 44, align: 'center' },
	{ key: 'cover', label: '', width: 50 },
	{ key: 'title', label: 'Title', width: 252.925, sortable: true },
	{ key: 'album', label: 'Album', width: 134.075, sortable: true },
	{ key: 'plays', label: 'Plays', width: 112, sortable: true },
	{ key: 'length', label: 'Length', width: 84, align: 'right', sortable: true }
];

export const historyColumns = [
	{ key: 'index', label: '#', width: 44, align: 'center' },
	{ key: 'cover', label: '', width: 50 },
	{ key: 'title', label: 'Title', width: 269.897, sortable: true },
	{ key: 'artist', label: 'Artist', width: 111.103, sortable: true },
	{ key: 'at', label: 'Played', width: 168, sortable: true },
	{ key: 'length', label: 'Length', width: 84, align: 'right', sortable: true }
];

export { shelf };
