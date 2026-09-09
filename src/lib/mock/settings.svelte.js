/** @type {Record<string, number>} */
const rounding = { Square: 0, Subtle: 6, Rounded: 10, Round: 20 };

let corners = $state('Rounded');
let theme = $state('System');
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
let tray = $state(false);
let normalisation = $state(true);
let gapless = $state(true);
let sleep = $state(false);
let karaoke = $state(true);
let romanized = $state(false);
let blur = $state(true);
let localLyrics = $state(false);
let menus = $state(true);

export const settings = {
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
