/** One roadmap line. `issue` and `pull` link the discussion behind it, and the build crosses the line out once that issue closes as completed or that pull request merges. */
export type Entry = { text: string; issue?: number; pull?: number };

export type Area = { id: string; title: string; entries: Entry[] };

export const areas: Area[] = [
	{
		id: 'providers',
		title: 'Providers',
		entries: [
			{ text: 'Jellyfin', issue: 422 },
			{ text: 'SoundCloud', issue: 474 },
			{ text: 'NetEase Cloud Music', pull: 801 }
		]
	},
	{
		id: 'playback',
		title: 'Playback',
		entries: [
			{ text: 'A quality setting where the provider offers more than one stream', pull: 1004 },
			{ text: 'SponsorBlock for YouTube Music', issue: 431 }
		]
	},
	{
		id: 'lyrics',
		title: 'Lyrics',
		entries: [
			{ text: 'Choose the order lyrics providers are tried in', pull: 973 },
			{ text: 'Unison as a lyrics provider', issue: 477 },
			{ text: 'Glow and wave animation for lyrics', issue: 423 }
		]
	},
	{
		id: 'library',
		title: 'Library and playlists',
		entries: [
			{ text: 'Reorder playlists and give them custom covers', issue: 806 },
			{ text: 'Import and export playlists in a standard format', issue: 642 },
			{ text: 'A stats page with your top tracks, artists and listening time', issue: 1168 }
		]
	},
	{
		id: 'player',
		title: 'Player and interface',
		entries: [
			{ text: 'Animated album covers in the fullscreen player', issue: 537 },
			{ text: 'A background gradient taken from the album art', issue: 47 },
			{ text: 'A glow behind the album art that pulses with the music', issue: 325 },
			{
				text: 'Floating mini player windows with lyrics and controls that stay on top of other apps',
				issue: 1065
			}
		]
	},
	{
		id: 'control',
		title: 'Shortcuts and integrations',
		entries: [
			{ text: 'Customizable keyboard shortcuts' },
			{ text: 'A rethink of global shortcuts', issue: 10 },
			{ text: 'Vim-style navigation', issue: 263 },
			{ text: 'Control Sonora from the command line, like sonora next-track', pull: 777 }
		]
	},
	{
		id: 'platforms',
		title: 'Platforms and packaging',
		entries: [
			{ text: 'WinGet', issue: 383 },
			{ text: 'Snap', issue: 663 }
		]
	}
];
