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
    "primary_foreground": "#2e3440",
    "progress_bar": "#88c0d0"
  }
}`;

	/** The color tokens a theme file may set, grouped by the part of the window they paint. */
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
	A theme is one JSON file in the themes folder. Themes support hot reloading, and Sonora reflects
	the changes on each save.
</p>

<h2 id="folder">The themes folder</h2>
<p>
	<MenuPath steps={['Settings', 'Appearance', 'Theme', 'Open folder']} /> opens it. It is located next
	to the
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
	The file needs four keys to be a valid theme: <code>name</code>, <code>author</code>,
	<code>version</code> and <code>theme</code>. The version must be <code>1</code> and is only there for
	future compatibility. If this changes, the current correct value will be reflected here.
</p>
<Code label="themes/nord.json" lang="json" text={example} />
<p>
	Colors are hex, <code>RRGGBB</code> or <code>RRGGBBAA</code>, with or without the <code>#</code>.
	Unset values currently default to a dark theme. Do not rely on this behavior. It may change in the
	future.
</p>

<p>
	Save as UTF-8; a UTF-8 byte order mark is accepted since v0.42.0. Only the four top-level keys and
	the color tokens below are allowed. An unknown key or invalid color rejects the file. If a
	previously loaded theme is edited into an invalid file, Sonora keeps its last valid version and
	reports the error in the <a href="/docs/logs">log</a>.
</p>

<h2 id="tokens">Color tokens</h2>
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
	Your themes show up at the bottom of the theme picker below the built-in themes. Setting <code
		>appearance.theme</code
	> to the id in settings.json works too.
</p>
<p class="note">
	Having <strong>Adaptive theme</strong> on prevents using any custom themes. Adaptive colors are
	also forced in fullscreen unless <strong>Ambient background</strong> is off.
</p>

<h2 id="overrides">Tweaking a built-in theme</h2>
<p>
	Only want to change a color or two? Skip the file and add <code>theme_overrides</code> to the appearance
	block in settings.json. It works on any theme, built-in ones included, and beats the adaptive tint.
</p>
<Code label="settings.json" lang="json" text={overrides} />
