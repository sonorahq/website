<script lang="ts">
	import Code from '$lib/components/docs/Code.svelte';

	const example = `{
  "gapless": true,
  "normalisation": false,
  "close_to_tray": true,
  "startup": "home",
  "local_folders": ["/home/me/Music"],
  "lyrics_providers": ["Local", "Spotify", "LrcLib"],
  "appearance": {
    "theme": "midnight",
    "adaptive_theme": false,
    "icons": "lucide",
    "rounding": "rounded",
    "font_size": 14
  }
}`;

	const homeManager = `{
  imports = [ inputs.sonora.homeManagerModules.default ];
  programs.sonora = {
    enable = true;
    settings = {
      gapless = true;
      appearance = {
        theme = "midnight";
        adaptive_theme = false;
      };
    };
  };
}`;
</script>

<svelte:head>
	<title>Settings file · Sonora docs</title>
</svelte:head>

<h1>Settings file</h1>
<p class="summary">
	Everything on the settings page is saved to one JSON file. You can edit it while Sonora runs and
	it picks up the change within a moment.
</p>

<h2 id="location">Location</h2>
<table>
	<tbody>
		<tr><td>Linux</td><td><code>~/.config/sonora/settings.json</code></td></tr>
		<tr>
			<td>Flatpak</td>
			<td><code>~/.var/app/io.github.nolight132.sonora/config/sonora/settings.json</code></td>
		</tr>
		<tr>
			<td>macOS</td>
			<td><code>~/Library/Application Support/sonora/settings.json</code></td>
		</tr>
		<tr><td>Windows</td><td><code>%APPDATA%\sonora\settings.json</code></td></tr>
	</tbody>
</table>

<h2 id="editing">Editing by hand</h2>
<p>
	The file is plain JSON without comments. Missing keys fall back to their defaults and unknown keys
	are ignored. Sonora rewrites the whole file when it saves, so your formatting and any unknown keys
	do not survive the next change made in the app.
</p>
<p>
	If the JSON stops parsing, Sonora shows <strong
		>Fix line N of settings.json to save changes</strong
	>
	and saves nothing until you fix it. It also refuses to overwrite a file that changed on disk after it
	last read it.
</p>
<Code label="settings.json" lang="json" text={example} />

<h2 id="not-here">What is not in the file</h2>
<p>
	The signed-in provider, volume, shuffle and repeat, window size, sidebar widths, table layouts and
	pins live in <code>state.sqlite</code> in the data folder. Listening history, local playlists and
	favourites are there too. Setting <code>provider</code> in settings.json has no effect.
</p>

<h2 id="other-files">Other files</h2>
<table>
	<thead>
		<tr><th>Folder</th><th>Holds</th></tr>
	</thead>
	<tbody>
		<tr>
			<td>Data</td>
			<td>
				<code>state.sqlite</code>. It lives in <code>~/.local/share/sonora</code>,
				<code>~/Library/Application Support/sonora</code> or <code>%LOCALAPPDATA%\sonora</code>.
			</td>
		</tr>
		<tr>
			<td>Cache</td>
			<td>
				Sign-in sessions per provider, the Widevine module, cached lyrics and artwork. It lives in
				<code>~/.cache/sonora</code>, <code>~/Library/Caches/sonora</code> or
				<code>%LOCALAPPDATA%\sonora</code>. Deleting it signs you out.
			</td>
		</tr>
	</tbody>
</table>

<h2 id="home-manager">Home Manager</h2>
<p>
	The flake ships a Home Manager module. Whatever you put under <code>settings</code> is merged into settings.json
	on every switch and again on every launch. Keys you leave out keep the value you set in the app.
</p>
<Code label="home.nix" text={homeManager} />
