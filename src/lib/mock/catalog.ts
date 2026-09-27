export const version = '0.40.0';

export const tabs = ['General', 'Appearance', 'Playback', 'Privacy', 'Integrations', 'About'];

export const startups = [
	'Home',
	'Search',
	'History',
	'Songs',
	'Albums',
	'Playlists',
	'Artists',
	'Local Music'
];

export const visualizers = ['Off', 'Bars', 'Wave', 'Bars and wave'];

export const autohides = ['Automatic', 'Always shown', 'Always hidden'];

export const paces = ['Slow', 'Standard', 'Quick'];

export const savers = ['Off', 'Light (30 FPS)', 'Medium (20 FPS)', 'Strong (10 FPS)'];

export const stillness = ['System', 'Always', 'Never'];

export const corners = ['Square', 'Subtle', 'Rounded', 'Round'];

export const presets = [
	'Custom',
	'Flat',
	'Bass boost',
	'Bass reducer',
	'Treble boost',
	'Vocal',
	'Rock',
	'Pop',
	'Jazz',
	'Classical',
	'Electronic',
	'Acoustic',
	'Loudness'
];

export const statuses = ['Sonora', 'Provider', 'Music', 'Title', 'Artist', 'Artist - Title'];

export const bands = [32, 64, 125, 250, 500, 1000, 2000, 4000, 8000, 16000];

export const providers = [
	{
		glyph: 'spotify',
		name: 'Spotify',
		status: 'Playing from this service',
		stored: true,
		active: true
	},
	{
		glyph: 'applemusic',
		name: 'Apple Music',
		status: 'Not connected',
		stored: false,
		active: false
	},
	{
		glyph: 'youtubemusic',
		name: 'YouTube Music',
		status: 'Connected',
		stored: true,
		active: false
	},
	{ glyph: 'subsonic', name: 'Subsonic', status: 'Not connected', stored: false, active: false },
	{ glyph: 'deezer', name: 'Deezer', status: 'Not connected', stored: false, active: false }
];

export const scrobblers = [
	{
		id: 'lastfm',
		name: 'Last.fm',
		detail:
			'Sonora scrobbles through your own Last.fm API account. Create one, then paste the key and the secret here.',
		status: 'Scrobbling as makakashan',
		linked: true
	},
	{ id: 'librefm', name: 'Libre.fm', detail: '', status: 'Not connected', linked: false },
	{
		id: 'listenbrainz',
		name: 'ListenBrainz',
		detail: 'Paste a user token from your ListenBrainz settings page.',
		status: 'Not connected',
		linked: false
	},
	{
		id: 'maloja',
		name: 'Maloja',
		detail: 'Point Sonora at your Maloja server and paste one of its API keys.',
		status: 'Not connected',
		linked: false
	}
];

export const team = [
	{ login: 'nolight132', role: 'Lead Maintainer' },
	{ login: 'zxsleebu', role: 'Maintainer' },
	{ login: 'fx-got', role: 'Maintainer' },
	{ login: 'Makakashan', role: 'Contributor' },
	{ login: 'imizgun', role: 'Contributor' }
];

export const notice =
	'Copyright © 2026 Sonora Contributors. Sonora comes with absolutely no warranty. It is free software, and you are welcome to redistribute it under the terms of the GNU General Public License version 3 or later. Sonora is unofficial and is not affiliated with Spotify AB.';

export type Title = { kind: 'title'; label: string };

export type Row = {
	kind: 'row';
	key: string;
	title: string;
	detail?: string;
	control:
		'switch' | 'picker' | 'slider' | 'button' | 'accounts' | 'bands' | 'scrobbling' | 'plain';
	options?: string[];
	label?: string;
	value?: string;
	extra?: string;
	needs?: string;
	href?: string;
};

export const catalog: Record<string, (Title | Row)[]> = {
	General: [
		{
			kind: 'row',
			key: 'startup',
			title: 'Show on startup',
			detail: 'The screen Sonora opens on launch',
			control: 'picker',
			options: startups
		},
		{
			kind: 'row',
			key: 'entries',
			title: 'Sidebar entries',
			detail: 'The sections listed in the sidebar',
			control: 'button',
			label: 'Choose entries'
		},
		{
			kind: 'row',
			key: 'language',
			title: 'Language',
			detail: 'The language Sonora uses across the interface',
			control: 'picker',
			options: ['System', 'English', 'Deutsch', '简体中文', 'Türkçe', 'Русский']
		},
		{ kind: 'title', label: 'Window' },
		{
			kind: 'row',
			key: 'tray',
			title: 'Keep running in the background',
			detail: 'Keep Sonora running and playing after its window closes',
			control: 'switch'
		},
		{
			kind: 'row',
			key: 'trayIcon',
			title: 'Show in the system tray',
			detail: 'Put an icon with playback controls in the system tray',
			control: 'switch'
		},
		{ kind: 'title', label: 'Accounts' },
		{
			kind: 'row',
			key: 'accounts',
			title: 'Manage accounts',
			detail: 'The services this device can play from',
			control: 'accounts'
		},
		{ kind: 'title', label: 'Library' },
		{
			kind: 'row',
			key: 'folders',
			title: 'Music folders',
			detail: 'Not configured',
			control: 'button',
			label: 'Choose folder…'
		}
	],

	Appearance: [
		{ kind: 'title', label: 'General' },
		{
			kind: 'row',
			key: 'theme',
			title: 'Theme',
			detail: 'Choose the application colour palette',
			control: 'picker',
			extra: 'Open folder'
		},
		{
			kind: 'row',
			key: 'adaptive',
			title: 'Adaptive theme',
			detail: 'Tint the palette with the artwork of the playing album',
			control: 'switch'
		},
		{
			kind: 'row',
			key: 'icons',
			title: 'Icon pack',
			detail: 'Choose the icon set the interface draws from',
			control: 'picker',
			options: ['Lucide', 'Remix', 'Solar', 'Iconoir']
		},
		{
			kind: 'row',
			key: 'opacity',
			title: 'Opacity',
			detail: 'Adjust the app background opacity',
			control: 'slider'
		},
		{
			kind: 'row',
			key: 'blurWindow',
			title: 'Blur window',
			detail: 'Draw the window over a blurred desktop. Needs an opacity below 100%',
			control: 'switch'
		},
		{
			kind: 'row',
			key: 'blur',
			title: 'Blur UI',
			detail: 'Frost the menus and floating controls over whatever they cover',
			control: 'switch'
		},
		{
			kind: 'row',
			key: 'corners',
			title: 'Corners',
			detail: 'How rounded surfaces and controls are',
			control: 'picker',
			options: corners
		},
		{ kind: 'title', label: 'Fullscreen' },
		{
			kind: 'row',
			key: 'ambient',
			title: 'Ambient background',
			detail: 'Fill the fullscreen player with colours drawn from the cover',
			control: 'switch'
		},
		{
			kind: 'row',
			key: 'ambientMotion',
			title: 'Ambient motion',
			detail: 'Drift the ambient colours instead of holding them still',
			control: 'switch',
			needs: 'ambient'
		},
		{
			kind: 'row',
			key: 'visualizer',
			title: 'Visualizer',
			detail: 'How the spectrum is drawn behind fullscreen artwork',
			control: 'picker',
			options: visualizers
		},
		{
			kind: 'row',
			key: 'visualizerAbsolute',
			title: 'Ignore volume',
			detail: "Draw the spectrum at the track's own level, however loud Sonora plays it",
			control: 'switch',
			needs: 'visualizer'
		},
		{
			kind: 'row',
			key: 'fullscreenControls',
			title: 'Hide fullscreen controls',
			detail: 'Fade out playback controls when fullscreen is inactive',
			control: 'picker',
			options: autohides
		},
		{ kind: 'title', label: 'Lyrics' },
		{
			kind: 'row',
			key: 'panelLyrics',
			title: 'Lyrics size (panel)',
			detail: 'Size of the lyrics text in the side panel, on top of the base font size',
			control: 'slider'
		},
		{
			kind: 'row',
			key: 'fullscreenLyrics',
			title: 'Lyrics size (fullscreen)',
			detail: 'Size of the lyrics text on the fullscreen player, on top of the base font size',
			control: 'slider'
		},
		{
			kind: 'row',
			key: 'blurLyrics',
			title: 'Blur inactive lyrics',
			detail: 'Blur upcoming and previous lines in the lyrics panel',
			control: 'switch'
		},
		{ kind: 'title', label: 'Text' },
		{
			kind: 'row',
			key: 'fontSize',
			title: 'Font size',
			detail: 'Base text size, everything else scales with it',
			control: 'slider'
		},
		{
			kind: 'row',
			key: 'typeface',
			title: 'Font',
			detail: 'The typeface Sonora uses across the interface',
			control: 'picker',
			options: ['Default', 'Inter', 'JetBrains Mono', 'Noto Sans']
		},
		{ kind: 'title', label: 'Motion' },
		{
			kind: 'row',
			key: 'motion',
			title: 'Reduce motion',
			detail: 'Skip interface animations and transitions',
			control: 'picker',
			options: stillness
		},
		{
			kind: 'row',
			key: 'pace',
			title: 'Animation speed',
			detail: 'How fast interface animations play',
			control: 'picker',
			options: paces
		},
		{
			kind: 'row',
			key: 'saver',
			title: 'Battery saving',
			detail:
				'Cap the frame rate of animations while Sonora is not focused, applied from the next launch',
			control: 'picker',
			options: savers
		},
		{ kind: 'title', label: 'Window style' },
		{
			kind: 'row',
			key: 'serverDecorations',
			title: 'Server-side decorations',
			detail: 'Let the compositor draw the title bar, border and shadow',
			control: 'switch'
		},
		{
			kind: 'row',
			key: 'controlsSide',
			title: 'Controls side',
			detail: 'Which end of the title bar the controls sit on',
			control: 'button',
			label: 'Right'
		},
		{
			kind: 'row',
			key: 'trafficLights',
			title: 'Traffic light controls',
			detail: 'Draw minimise, maximise and close as colored dots',
			control: 'switch'
		},
		{
			kind: 'row',
			key: 'windowCorners',
			title: 'Window corners',
			detail: "How rounded the window's own corners are",
			control: 'picker',
			options: corners,
			needs: 'clientDecorations'
		},
		{ kind: 'title', label: 'Advanced' },
		{
			kind: 'row',
			key: 'adaptiveMenu',
			title: 'Adaptive context menu',
			detail: 'Leaves out entries the row already shows, such as the album or the artist',
			control: 'switch'
		}
	],

	Playback: [
		{ kind: 'title', label: 'General' },
		{
			kind: 'row',
			key: 'normalisation',
			title: 'Normalize loudness',
			detail: 'Keeps tracks at a consistent volume',
			control: 'switch'
		},
		{
			kind: 'row',
			key: 'gapless',
			title: 'Gapless playback',
			detail: 'Runs one track into the next without a pause, the way an album was sequenced',
			control: 'switch'
		},
		{
			kind: 'row',
			key: 'sleep',
			title: 'Sleep timer',
			detail: 'Lets the music stop on its own after a set time, so it can play you to sleep',
			control: 'switch',
			extra: 'Configure…'
		},
		{
			kind: 'row',
			key: 'stayAwake',
			title: 'Stay awake during playback',
			detail: 'Prevent sleep while playing and keep the display on when playing in fullscreen',
			control: 'switch'
		},
		{
			kind: 'row',
			key: 'widevine',
			title: 'Widevine module',
			detail:
				"Apple Music tracks are encrypted and need Google's Widevine module. Sonora uses one it downloaded from Google with your consent, or else the copy a browser here already has.",
			control: 'button',
			label: 'Uninstall',
			value: 'Found in a browser'
		},
		{ kind: 'title', label: 'Equalizer' },
		{
			kind: 'row',
			key: 'equalizer',
			title: 'Equalizer',
			detail: 'Shapes the sound across ten bands, one per octave',
			control: 'switch'
		},
		{
			kind: 'row',
			key: 'preset',
			title: 'Preset',
			detail: 'A ready-made curve for the bands below',
			control: 'picker',
			options: presets,
			needs: 'equalizer'
		},
		{ kind: 'row', key: 'bands', title: '', control: 'bands', needs: 'equalizer' },
		{ kind: 'title', label: 'Lyrics' },
		{
			kind: 'row',
			key: 'lyricsProviders',
			title: 'Lyrics providers',
			detail: 'Choose which services to search for lyrics',
			control: 'button',
			label: '4 selected'
		},
		{
			kind: 'row',
			key: 'preferLocalLyrics',
			title: 'Prefer local lyrics',
			detail:
				"Use the lyrics stored in a local file's tags or its .lrc file instead of searching the other providers",
			control: 'switch'
		},
		{
			kind: 'row',
			key: 'karaoke',
			title: 'Karaoke lyrics',
			detail: 'Highlight lyrics word by word when timing is available',
			control: 'switch'
		},
		{
			kind: 'row',
			key: 'romanized',
			title: 'Romanized lyrics',
			detail: 'Show locally generated pronunciation for selected writing systems',
			control: 'switch',
			extra: 'Writing systems'
		}
	],

	Privacy: [
		{ kind: 'title', label: 'Lyrics' },
		{
			kind: 'row',
			key: 'lyricsForLocal',
			title: 'Lyrics for local files',
			detail: 'Use metadata from local files to fetch lyrics from the internet',
			control: 'switch'
		},
		{ kind: 'title', label: 'Discord' },
		{
			kind: 'row',
			key: 'artworkForLocal',
			title: 'Artwork for local files',
			detail: 'Use metadata from local files to find a cover on Deezer for your Discord status',
			control: 'switch'
		}
	],

	Integrations: [
		{ kind: 'title', label: 'Discord' },
		{
			kind: 'row',
			key: 'discord',
			title: 'Show on Discord',
			detail: 'Put the track you are playing on your Discord profile',
			control: 'switch'
		},
		{
			kind: 'row',
			key: 'discordName',
			title: 'Status name',
			detail: 'What the status is called after the "Listening to" that your friends see',
			control: 'picker',
			options: statuses,
			needs: 'discord'
		},
		{
			kind: 'row',
			key: 'discordPaused',
			title: 'Show when paused',
			detail: 'Keep the status on your Discord profile while the track is paused',
			control: 'switch',
			needs: 'discord'
		},
		{
			kind: 'row',
			key: 'discordBadge',
			title: 'Show the provider badge',
			detail: 'Mark the status with a small icon of the service the track came from',
			control: 'switch',
			needs: 'discord'
		},
		{
			kind: 'row',
			key: 'discordAnonymous',
			title: 'Hide details',
			detail: 'Say only that music is playing, without the title, artist or artwork',
			control: 'switch',
			needs: 'discord'
		},
		{
			kind: 'row',
			key: 'discordButtons',
			title: 'Buttons',
			detail:
				'Links under the status for your friends to open, one to the track on its service and one to Sonora',
			control: 'button',
			label: 'Choose buttons',
			needs: 'discord'
		},
		{ kind: 'title', label: 'Scrobbling' },
		{ kind: 'row', key: 'scrobbling', title: '', control: 'scrobbling' }
	],

	About: [
		{ kind: 'title', label: 'General' },
		{
			kind: 'row',
			key: 'version',
			title: 'Version',
			detail: 'The build of sonora you are running',
			control: 'plain',
			value: version
		},
		{
			kind: 'row',
			key: 'updates',
			title: 'Check for updates',
			detail:
				'Ask GitHub once at startup whether a newer version is out. Sonora installs the update itself on Windows only; elsewhere it points you at what changed',
			control: 'switch'
		},
		{
			kind: 'row',
			key: 'log',
			title: 'Log file',
			detail: 'What Sonora wrote while running. Attach it to a bug report',
			control: 'button',
			label: 'Open log'
		},
		{ kind: 'title', label: 'Project' },
		{
			kind: 'row',
			key: 'license',
			title: 'License',
			detail: 'GNU General Public License version 3 or later',
			control: 'button',
			label: 'Read the license',
			href: 'https://www.gnu.org/licenses/gpl-3.0.html'
		},
		{
			kind: 'row',
			key: 'source',
			title: 'Source code',
			detail: 'The corresponding source for this build',
			control: 'button',
			label: 'Open the repository',
			href: 'https://github.com/sonorahq/sonora'
		}
	]
};
