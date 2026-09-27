/** @type {Record<string, number>} */
const rounding = { Square: 0, Subtle: 6, Rounded: 10, Round: 20 };

export const settings = $state({
	startup: 'Home',
	language: 'System',
	tray: true,
	trayIcon: true,

	theme: 'Dark',
	adaptive: false,
	icons: 'Lucide',
	opacity: 1,
	blurWindow: false,
	blur: true,
	corners: 'Rounded',
	ambient: true,
	ambientMotion: true,
	visualizer: 'Bars and wave',
	visualizerAbsolute: false,
	fullscreenControls: 'Automatic',
	panelLyrics: 1,
	fullscreenLyrics: 1,
	blurLyrics: true,
	fontSize: 14,
	typeface: 'Default',
	motion: 'System',
	pace: 'Standard',
	saver: 'Off',
	adaptiveMenu: false,

	normalisation: false,
	gapless: true,
	sleep: false,
	stayAwake: true,
	equalizer: false,
	preset: 'Flat',
	preferLocalLyrics: true,
	karaoke: true,
	romanized: true,

	lyricsForLocal: true,
	artworkForLocal: true,

	discord: true,
	discordName: 'Sonora',
	discordPaused: false,
	discordBadge: true,
	discordAnonymous: false,

	updates: false
});

/** @returns {number} */
export const radius = () => rounding[settings.corners] ?? 10;
