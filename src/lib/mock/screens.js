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

export const ABOUT_FALLBACK = "Explore the artist's popular songs and releases.";

export const artists = [
	{
		id: 'traditional',
		name: 'Traditional',
		listeners: '2,410,338',
		biography: ''
	},
	{
		id: 'chopin',
		name: 'Frédéric Chopin',
		listeners: '8,924,715',
		biography:
			'Frédéric Chopin (1810-1849) was a Polish composer and pianist of the Romantic period, and one of the very few major composers to write almost exclusively for his own instrument. He left Warsaw at twenty and spent the rest of his life in Paris, where he taught, published, and played mostly in salons rather than concert halls. The nocturnes, ballades, mazurkas and preludes he wrote there treat the piano as a singing instrument, and the rubato they ask for is still the hardest thing about them.'
	},
	{
		id: 'debussy',
		name: 'Claude Debussy',
		listeners: '6,142,908',
		biography:
			'Claude Debussy (1862-1918) trained at the Paris Conservatoire and spent a decade pulling away from what he had been taught there. Whole-tone scales, unresolved sevenths and modes borrowed from the Javanese gamelan he heard at the 1889 Exposition gave his music a sense of colour standing in for harmonic argument. He disliked the label Impressionist, but Suite bergamasque and La mer have carried it ever since.'
	},
	{
		id: 'satie',
		name: 'Erik Satie',
		listeners: '5,308,441',
		biography:
			"Erik Satie (1866-1925) worked as a cabaret pianist in Montmartre and wrote music that refused almost everything the conservatoire valued: development, climax, weight. The three Gymnopédies of 1888 are built from a handful of chords and a melody that never raises its voice. Late in life he coined the term musique d'ameublement, furniture music meant to be present without being listened to."
	},
	{
		id: 'vivaldi',
		name: 'Antonio Vivaldi',
		listeners: '9,776,120',
		biography:
			'Antonio Vivaldi (1678-1741) was a Venetian priest and violinist who spent most of his career teaching at the Ospedale della Pietà, an orphanage whose all-female orchestra premiered much of his work. He wrote around five hundred concertos, and The Four Seasons, published in 1725 with a sonnet attached to each concerto, is among the earliest programme music to survive in the repertoire.'
	},
	{
		id: 'grieg',
		name: 'Edvard Grieg',
		listeners: '4,015,663',
		biography:
			"Edvard Grieg (1843-1907) studied in Leipzig and returned to Norway determined to write music that sounded like the country he came from, drawing on folk dance rhythms and the sharp intervals of the Hardanger fiddle. The incidental music he wrote for Ibsen's Peer Gynt in 1875 outlived the play in the concert hall, largely on the strength of two orchestral suites he assembled from it."
	},
	{
		id: 'mussorgsky',
		name: 'Modest Mussorgsky',
		listeners: '3,229,504',
		biography:
			"Modest Mussorgsky (1839-1881) was a member of The Five, the circle of Russian composers who set out to write without German models. He kept a civil service post for most of his life and left much of his music unfinished or unorchestrated. Pictures at an Exhibition, written for piano in 1874 after a memorial show of his friend Viktor Hartmann's drawings, is now heard mostly in Ravel's orchestration."
	}
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
