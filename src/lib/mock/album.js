const artist = 'Evanescence';
const cover = '/mock-cover.webp';

export const album = {
	eyebrow: 'Album',
	title: 'Fallen',
	artist,
	released: 'Mar 4, 2003',
	cover
};

export const tracks = [
	{ id: 'a1', title: 'Going Under', plays: '610,859,143', length: 214 },
	{ id: 'a2', title: 'Bring Me To Life', plays: '2,135,409,376', length: 235 },
	{ id: 'a3', title: "Everybody's Fool", plays: '223,967,877', length: 195 },
	{ id: 'a4', title: 'My Immortal', plays: '678,696,675', length: 262 },
	{ id: 'a5', title: 'Haunted', plays: '73,642,394', length: 185 },
	{ id: 'a6', title: 'Tourniquet', plays: '106,232,441', length: 278 },
	{ id: 'a7', title: 'Imaginary', plays: '56,008,294', length: 256 },
	{ id: 'a8', title: 'Taking Over Me', plays: '60,541,808', length: 228 },
	{ id: 'a9', title: 'Hello', plays: '76,626,189', length: 220 },
	{ id: 'a10', title: 'My Last Breath', plays: '50,559,031', length: 247 },
	{ id: 'a11', title: 'Whisper', plays: '44,318,902', length: 326 },
	{ id: 'a12', title: 'My Immortal (Band Version)', plays: '31,204,558', length: 273 }
].map((track) => ({ ...track, artist, cover }));

export const similar = [
	{ id: 's1', title: "Heaven's a Lie", artist: 'Lacuna Coil', length: 233 },
	{ id: 's2', title: 'Ice Queen', artist: 'Within Temptation', length: 306 },
	{ id: 's3', title: 'Nemo', artist: 'Nightwish', length: 276 },
	{ id: 's4', title: 'All Around Me', artist: 'Flyleaf', length: 214 },
	{ id: 's5', title: 'Decode', artist: 'Paramore', length: 262 },
	{ id: 's6', title: 'Make Me Wanna Die', artist: 'The Pretty Reckless', length: 262 },
	{ id: 's7', title: 'I Miss The Misery', artist: 'Halestorm', length: 220 }
].map((track) => ({ ...track, plays: '', cover: '' }));

export const catalogue = new Map([...tracks, ...similar].map((track) => [track.id, track]));

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
	{ key: 'index', label: '#', width: '44px', align: 'center' },
	{ key: 'title', label: 'Title', width: 'minmax(0, 2fr)', sortable: true },
	{ key: 'artist', label: 'Artist', width: 'minmax(0, 1.35fr)', sortable: true },
	{ key: 'plays', label: 'Plays', width: '124px', sortable: true },
	{ key: 'length', label: 'Length', width: '84px', align: 'right', sortable: true }
];

export const total = tracks.reduce((sum, track) => sum + track.length, 0);

/** @param {number} seconds */
export function clock(seconds) {
	const whole = Math.max(0, Math.floor(seconds));
	return `${Math.floor(whole / 60)}:${String(whole % 60).padStart(2, '0')}`;
}
