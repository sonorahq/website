export const albums = [
	{
		id: 'nocturnes',
		title: 'Nocturnes',
		artist: 'Frédéric Chopin',
		released: '1846',
		eyebrow: 'Album',
		cover: '/cover-nocturnes.webp',
		tint: { hue: 218.72, saturation: 0.368 }
	},
	{
		id: 'bergamasque',
		title: 'Suite bergamasque',
		artist: 'Claude Debussy',
		released: '1905',
		cover: '/cover-bergamasque.webp',
		tint: { hue: 202.07, saturation: 0.299 }
	},
	{
		id: 'gymnopedies',
		title: 'Gymnopédies',
		artist: 'Erik Satie',
		released: '1888',
		cover: '/cover-gymnopedies.webp',
		tint: { hue: 94.64, saturation: 0.307 }
	},
	{
		id: 'seasons',
		title: 'The Four Seasons',
		artist: 'Antonio Vivaldi',
		released: '1725',
		cover: '/cover-seasons.webp',
		tint: { hue: 48.64, saturation: 0.722 }
	},
	{
		id: 'peer-gynt',
		title: 'Peer Gynt, Op. 46',
		artist: 'Edvard Grieg',
		released: '1875',
		cover: '/cover-peer-gynt.webp',
		tint: { hue: 22.62, saturation: 0.368 }
	},
	{
		id: 'pictures',
		title: 'Pictures at an Exhibition',
		artist: 'Modest Mussorgsky',
		released: '1874',
		cover: '/cover-pictures.webp',
		tint: { hue: 9.28, saturation: 0.622 }
	}
];

export const shelf = new Map(albums.map((entry) => [entry.id, entry]));

export const album = albums[0];

export const origin = { name: 'Quiet Hours', kind: 'Playlist' };

/** @param {string} id @param {[string, string, number, string][]} rows */
const listing = (id, rows) =>
	rows.map(([key, title, length, plays]) => ({
		id: key,
		album: id,
		title,
		length,
		plays,
		artist: shelf.get(id)?.artist ?? '',
		cover: shelf.get(id)?.cover ?? ''
	}));

export const tracks = listing('nocturnes', [
	['n1', 'Nocturne in B-flat minor, Op. 9 No. 1', 338, '48,207,614'],
	['n2', 'Nocturne in E-flat major, Op. 9 No. 2', 273, '312,884,905'],
	['n3', 'Nocturne in B major, Op. 9 No. 3', 412, '19,663,208'],
	['n4', 'Nocturne in F major, Op. 15 No. 1', 291, '27,410,771'],
	['n5', 'Nocturne in F-sharp major, Op. 15 No. 2', 219, '61,995,340'],
	['n6', 'Nocturne in G minor, Op. 15 No. 3', 266, '14,238,506'],
	['n7', 'Nocturne in C-sharp minor, Op. 27 No. 1', 324, '22,807,193'],
	['n8', 'Nocturne in D-flat major, Op. 27 No. 2', 371, '73,516,882'],
	['n9', 'Nocturne in B major, Op. 32 No. 1', 287, '11,904,455'],
	['n10', 'Nocturne in A-flat major, Op. 32 No. 2', 329, '16,382,027'],
	['n11', 'Nocturne in G minor, Op. 37 No. 1', 363, '9,745,613'],
	['n12', 'Nocturne in C minor, Op. 48 No. 1', 389, '20,118,349']
]);

export const upcoming = [
	...listing('bergamasque', [['b3', 'Clair de Lune', 303, '204,338,061']]),
	...listing('gymnopedies', [['g1', 'Gymnopédie No. 1', 201, '188,470,552']]),
	...listing('peer-gynt', [['p1', 'Morning Mood', 227, '96,215,884']]),
	...listing('seasons', [['s1', 'Spring, I. Allegro', 198, '141,927,306']]),
	...listing('pictures', [['x1', 'Promenade', 94, '33,608,197']]),
	...listing('bergamasque', [['b4', 'Passepied', 224, '28,715,440']]),
	...listing('peer-gynt', [['p4', 'In the Hall of the Mountain King', 153, '112,504,733']]),
	...listing('seasons', [['s10', 'Winter, II. Largo', 132, '74,860,219']]),
	...listing('pictures', [['x10', 'The Great Gate of Kiev', 341, '41,392,678']]),
	...listing('gymnopedies', [['g3', 'Gymnopédie No. 3', 154, '52,013,905']])
];

export const similar = [
	...listing('bergamasque', [['b1', 'Prélude', 252, '19,884,207']]),
	...listing('peer-gynt', [['p2', "Anitra's Dance", 192, '17,236,940']]),
	...listing('seasons', [['s6', 'Summer, III. Presto', 171, '129,447,318']]),
	...listing('gymnopedies', [['g2', 'Gymnopédie No. 2', 167, '44,905,612']]),
	...listing('pictures', [['x2', 'The Old Castle', 278, '15,772,384']]),
	...listing('bergamasque', [['b2', 'Menuet', 269, '12,660,458']]),
	...listing('pictures', [['x5', 'Ballet of the Unhatched Chicks', 74, '9,318,072']])
];

export const catalogue = new Map(
	[...tracks, ...upcoming, ...similar].map((track) => [track.id, track])
);

export const nav = [
	{ id: 'home', label: 'Home', icon: 'house' },
	{ id: 'search', label: 'Search', icon: 'search' },
	{
		id: 'library',
		label: 'Your Library',
		icon: 'library-big',
		tabs: ['Favorites', 'Albums', 'Artists', 'Playlists']
	},
	{
		id: 'local',
		label: 'Local Music',
		icon: 'file-music',
		tabs: ['Favorites', 'Songs', 'Albums', 'Artists', 'Playlists']
	},
	{ id: 'history', label: 'History', icon: 'rotate-ccw-clock' },
	{
		id: 'settings',
		label: 'Settings',
		icon: 'settings',
		tabs: ['General', 'Appearance', 'Playback', 'Privacy', 'About']
	}
];

export const columns = [
	{ key: 'index', label: '#', width: 44, align: 'center' },
	{ key: 'title', label: 'Title', width: 303.905, sortable: true },
	{ key: 'artist', label: 'Artist', width: 153.095, sortable: true },
	{ key: 'plays', label: 'Plays', width: 108, sortable: true },
	{ key: 'length', label: 'Length', width: 120, align: 'right', sortable: true }
];

export const TRAIL = 4;

export const total = tracks.reduce((sum, track) => sum + track.length, 0);

/** @param {number} seconds */
export function clock(seconds) {
	const whole = Math.max(0, Math.floor(seconds));
	const minutes = Math.floor(whole / 60) % 60;
	const rest = String(whole % 60).padStart(2, '0');
	const hours = Math.floor(whole / 3600);
	if (hours === 0) return `${minutes}:${rest}`;
	return `${hours}:${String(minutes).padStart(2, '0')}:${rest}`;
}
