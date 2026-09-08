export const album = {
	eyebrow: 'Album',
	title: 'Fallen',
	artist: 'Evanescence',
	released: 'Mar 4, 2003',
	cover: '/mock-cover.webp'
};

export const tracks = [
	{ title: 'Going Under', plays: '610,859,143', length: 214 },
	{ title: 'Bring Me To Life', plays: '2,135,409,376', length: 235 },
	{ title: "Everybody's Fool", plays: '223,967,877', length: 195 },
	{ title: 'My Immortal', plays: '678,696,675', length: 262 },
	{ title: 'Haunted', plays: '73,642,394', length: 185 },
	{ title: 'Tourniquet', plays: '106,232,441', length: 278 },
	{ title: 'Imaginary', plays: '56,008,294', length: 256 },
	{ title: 'Taking Over Me', plays: '60,541,808', length: 228 },
	{ title: 'Hello', plays: '76,626,189', length: 220 },
	{ title: 'My Last Breath', plays: '50,559,031', length: 247 },
	{ title: 'Whisper', plays: '44,318,902', length: 326 },
	{ title: 'My Immortal (Band Version)', plays: '31,204,558', length: 273 }
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
