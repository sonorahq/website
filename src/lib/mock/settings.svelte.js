/** @type {Record<string, number>} */
const rounding = { Square: 0, Subtle: 6, Rounded: 10, Round: 20 };

let corners = $state('Rounded');
let theme = $state('Dark');
let adaptive = $state(true);
let visualizer = $state(true);
let icons = $state('Lucide');
let backdrop = $state('Plain');
let motion = $state('System');
let pace = $state('Standard');
let saver = $state('Off');
let language = $state('System');
let typeface = $state('Default');
let startup = $state('Home');
let tray = $state(true);
let normalisation = $state(false);
let gapless = $state(true);
let sleep = $state(false);
let karaoke = $state(true);
let romanized = $state(true);
let blur = $state(true);
let localLyrics = $state(true);
let menus = $state(false);
let updates = $state(false);
let opacity = $state(1);
let fontSize = $state(14);
let panelLyrics = $state(1);
let fullscreenLyrics = $state(1);

export const settings = {
	get updates() {
		return updates;
	},
	set updates(value) {
		updates = value;
	},
	get opacity() {
		return opacity;
	},
	set opacity(value) {
		opacity = value;
	},
	get fontSize() {
		return fontSize;
	},
	set fontSize(value) {
		fontSize = Math.min(Math.max(value, 10), 24);
	},
	get panelLyrics() {
		return panelLyrics;
	},
	set panelLyrics(value) {
		panelLyrics = Math.min(Math.max(value, 0.6), 2);
	},
	get fullscreenLyrics() {
		return fullscreenLyrics;
	},
	set fullscreenLyrics(value) {
		fullscreenLyrics = Math.min(Math.max(value, 0.6), 2);
	},
	get corners() {
		return corners;
	},
	set corners(value) {
		corners = value;
	},
	get radius() {
		return rounding[corners] ?? 10;
	},
	get theme() {
		return theme;
	},
	set theme(value) {
		theme = value;
	},
	get adaptive() {
		return adaptive;
	},
	set adaptive(value) {
		adaptive = value;
	},
	get visualizer() {
		return visualizer;
	},
	set visualizer(value) {
		visualizer = value;
	},
	get icons() {
		return icons;
	},
	set icons(value) {
		icons = value;
	},
	get backdrop() {
		return backdrop;
	},
	set backdrop(value) {
		backdrop = value;
	},
	get motion() {
		return motion;
	},
	set motion(value) {
		motion = value;
	},
	get pace() {
		return pace;
	},
	set pace(value) {
		pace = value;
	},
	get saver() {
		return saver;
	},
	set saver(value) {
		saver = value;
	},
	get language() {
		return language;
	},
	set language(value) {
		language = value;
	},
	get typeface() {
		return typeface;
	},
	set typeface(value) {
		typeface = value;
	},
	get startup() {
		return startup;
	},
	set startup(value) {
		startup = value;
	},
	get tray() {
		return tray;
	},
	set tray(value) {
		tray = value;
	},
	get normalisation() {
		return normalisation;
	},
	set normalisation(value) {
		normalisation = value;
	},
	get gapless() {
		return gapless;
	},
	set gapless(value) {
		gapless = value;
	},
	get sleep() {
		return sleep;
	},
	set sleep(value) {
		sleep = value;
	},
	get karaoke() {
		return karaoke;
	},
	set karaoke(value) {
		karaoke = value;
	},
	get romanized() {
		return romanized;
	},
	set romanized(value) {
		romanized = value;
	},
	get blur() {
		return blur;
	},
	set blur(value) {
		blur = value;
	},
	get localLyrics() {
		return localLyrics;
	},
	set localLyrics(value) {
		localLyrics = value;
	},
	get menus() {
		return menus;
	},
	set menus(value) {
		menus = value;
	}
};
