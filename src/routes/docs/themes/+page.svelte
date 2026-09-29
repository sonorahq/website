<script lang="ts">
	import Code from '$lib/components/docs/Code.svelte';

	const example = `{
  "name": "Nord",
  "author": "Your Name",
  "version": 1,
  "theme": {
    "background": "#2e3440",
    "foreground": "#eceff4",
    "sidebar": "#2b303b",
    "popover": "#3b4252",
    "secondary": "#3b4252",
    "muted": "#434c5e",
    "muted_foreground": "#a3acb9",
    "border": "#4c566a66",
    "primary": "#88c0d0",
    "primary_foreground": "#2e3440",
    "progress_bar": "#88c0d0",
    "selection": "#5e81ac",
    "table_active": "#5e81ac33",
    "table_active_border": "#88c0d0"
  }
}`;

	const overrides = `"appearance": {
  "theme": "dark",
  "theme_overrides": {
    "primary": "#f5a97f",
    "radius": 4,
    "font_size": 15
  }
}`;

	/** The colour tokens a theme file may set, grouped by the part of the window they paint. */
	const tokens = [
		{
			area: 'Surfaces and text',
			names: [
				'background',
				'foreground',
				'muted',
				'muted_foreground',
				'border',
				'secondary',
				'secondary_hover',
				'secondary_active',
				'popover',
				'popover_foreground',
				'overlay',
				'overlay_foreground'
			]
		},
		{
			area: 'Accents',
			names: [
				'primary',
				'primary_foreground',
				'primary_hover',
				'danger',
				'danger_foreground',
				'danger_hover',
				'progress_bar',
				'selection'
			]
		},
		{
			area: 'Sidebar and title bar',
			names: ['sidebar', 'sidebar_accent', 'sidebar_border', 'title_bar_border']
		},
		{
			area: 'Tables',
			names: [
				'table_head',
				'table_head_foreground',
				'table_row_border',
				'table_hover',
				'table_active',
				'table_active_border'
			]
		}
	];
</script>

<svelte:head>
	<title>Custom themes · Sonora docs</title>
</svelte:head>

<h1>Custom themes</h1>
<p class="summary">
	A theme is a JSON file in the themes folder. Sonora watches the folder, so a new or edited file
	shows up in the theme picker without a restart.
</p>

<h2 id="folder">The themes folder</h2>
<p>
	<strong>Settings → Appearance → Theme → Open folder</strong> creates the folder and opens it. It
	sits next to the <a href="/docs/settings">settings file</a>.
</p>
<table>
	<tbody>
		<tr><td>Linux</td><td><code>~/.config/sonora/themes/</code></td></tr>
		<tr>
			<td>Flatpak</td>
			<td><code>~/.var/app/io.github.nolight132.sonora/config/sonora/themes/</code></td>
		</tr>
		<tr><td>macOS</td><td><code>~/Library/Application Support/sonora/themes/</code></td></tr>
		<tr><td>Windows</td><td><code>%APPDATA%\sonora\themes\</code></td></tr>
	</tbody>
</table>

<h2 id="format">Writing a theme</h2>
<p>
	The file name is the theme's id, so <code>nord.json</code> becomes <code>nord</code>. The built-in
	names, such as <code>dark</code>, <code>light</code> and <code>midnight</code>, are taken. The
	file has exactly four keys: <code>name</code>, <code>author</code>, <code>version</code>, which is
	always
	<code>1</code>, and <code>theme</code>, which holds the colours.
</p>
<Code label="themes/nord.json" text={example} />
<p>
	Colours are hex, as <code>RRGGBB</code> or <code>RRGGBBAA</code>, with or without the
	<code>#</code>. Every theme is laid over the built-in Dark theme, and any token you leave out
	keeps its Dark value. A light theme therefore has to set all of them.
</p>

<h2 id="tokens">Colour tokens</h2>
<table>
	<tbody>
		{#each tokens as group (group.area)}
			<tr>
				<td>{group.area}</td>
				<td>
					{#each group.names as name, index (name)}<code>{name}</code>{index <
						group.names.length - 1
							? ' '
							: ''}{/each}
				</td>
			</tr>
		{/each}
	</tbody>
</table>

<h2 id="using">Using it</h2>
<p>
	Custom themes appear at the bottom of the theme picker. You can also set
	<code>appearance.theme</code> to the id in settings.json.
</p>
<p class="note">
	Turn off <strong>Adaptive theme</strong> first. It is on by default and only works with System, Dark
	and Light, so custom themes stay greyed out while it is on. Turning it back on switches the theme to
	Dark.
</p>

<h2 id="errors">When a theme does not load</h2>
<p>
	One bad colour or an extra top-level key rejects the whole file. Sonora keeps showing the last
	version that loaded and writes the reason to the <a href="/docs/logs">log</a> as
	<code>settings: cannot load theme</code>. A theme that is selected but missing shows as
	<strong>(unavailable)</strong> in the picker.
</p>

<h2 id="overrides">Tweaking a built-in theme</h2>
<p>
	To change a few colours without writing a file, add <code>theme_overrides</code> to the appearance
	block of settings.json. It works on top of any theme, including the built-in ones, and wins over
	the adaptive tint. It also takes <code>radius</code>, from 0 to 24, and <code>font_size</code>,
	from 10 to 24. Theme files cannot set those two.
</p>
<Code label="settings.json" text={overrides} />
