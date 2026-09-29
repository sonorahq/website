<script lang="ts">
	import MenuPath from '$lib/components/docs/MenuPath.svelte';
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
	A theme is one JSON file in the themes folder. Sonora watches that folder, so new and edited
	themes show up in the picker straight away, no restart needed.
</p>

<h2 id="folder">The themes folder</h2>
<p>
	<MenuPath steps={['Settings', 'Appearance', 'Theme', 'Open folder']} /> opens it. It lives next to the
	<a href="/docs/settings">settings file</a>.
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
	The file name becomes the theme's id, so <code>nord.json</code> is <code>nord</code>. Built-in
	names like <code>dark</code>, <code>light</code> and <code>midnight</code> are taken.
</p>
<p>
	The file needs exactly four keys: <code>name</code>, <code>author</code>, <code>version</code> and
	<code>theme</code>. The version is always <code>1</code>, and <code>theme</code> holds the colours.
</p>
<Code label="themes/nord.json" lang="json" text={example} />
<p>
	Colours are hex, <code>RRGGBB</code> or <code>RRGGBBAA</code>, with or without the <code>#</code>.
	Your theme sits on top of the built-in Dark theme, and every token you skip keeps its Dark value.
	That's handy for a dark theme. For a light one you'll want to set all 30.
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
	Your themes show up at the bottom of the theme picker. Setting <code>appearance.theme</code> to the
	id in settings.json works too.
</p>
<p class="note">
	Turn off <strong>Adaptive theme</strong> first. It's on by default and only works with System, Dark
	and Light, so your themes stay greyed out until you do. Turning it back on resets the theme to Dark.
</p>

<h2 id="errors">When a theme won't load</h2>
<p>
	One bad colour or one extra top-level key, and the whole file is rejected. Sonora keeps the last
	version that loaded and writes the reason to the <a href="/docs/logs">log</a> as
	<code>settings: cannot load theme</code>. If the theme you picked is gone, the picker marks it
	<strong>(unavailable)</strong>.
</p>

<h2 id="overrides">Tweaking a built-in theme</h2>
<p>
	Only want to change a colour or two? Skip the file and add <code>theme_overrides</code> to the appearance
	block in settings.json. It works on any theme, built-in ones included, and beats the adaptive tint.
</p>
<p>
	Overrides also take <code>radius</code>, from 0 to 24, and <code>font_size</code>, from 10 to 24.
	Theme files can't set those.
</p>
<Code label="settings.json" lang="json" text={overrides} />
