export const albums = [
	{
		id: 'airs',
		title: 'Airs and Ballads',
		artist: 'Traditional',
		released: '1912',
		eyebrow: 'Album',
		cover: '/cover-airs.webp',
		tint: { hue: 171.89, saturation: 0.371 }
	},
	{
		id: 'nocturnes',
		title: 'Nocturnes',
		artist: 'Frédéric Chopin',
		released: '1846',
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

export const tracks = listing('airs', [
	['t1', 'The Water Is Wide', 224, '38,914,207'],
	['t2', 'The Wild Rover', 192, '164,772,530'],
	['t3', 'Wild Mountain Thyme', 241, '21,608,449'],
	['t4', 'She Moved Through the Fair', 267, '46,330,915'],
	['t5', 'Loch Lomond', 198, '29,447,186'],
	['t6', 'Down by the Sally Gardens', 212, '18,905,344'],
	['t7', 'The Lark in the Clear Air', 176, '9,662,801'],
	['t8', 'Black Is the Colour', 254, '24,118,673'],
	['t9', 'Scarborough Fair', 231, '87,504,962'],
	['t10', 'The Ash Grove', 189, '11,236,058'],
	['t11', 'Shenandoah', 246, '33,870,412'],
	['t12', 'The Snowy-Breasted Pearl', 208, '7,491,325']
]);

export const upcoming = [
	...listing('nocturnes', [['n2', 'Nocturne in E-flat major, Op. 9 No. 2', 273, '312,884,905']]),
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

export const pinned = [
	{ id: 'quiet-hours', title: 'Quiet Hours', kind: 'Playlist', icon: 'list', cover: '' },
	{
		id: 'bergamasque',
		title: 'Suite bergamasque',
		kind: 'Album',
		icon: 'disc-3',
		cover: '/cover-bergamasque.webp'
	},
	{ id: 'chopin', title: 'Frédéric Chopin', kind: 'Artist', icon: 'user', cover: '', round: true },
	{
		id: 'seasons',
		title: 'The Four Seasons',
		kind: 'Album',
		icon: 'disc-3',
		cover: '/cover-seasons.webp'
	}
];

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
