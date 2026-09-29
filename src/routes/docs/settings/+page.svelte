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
	Everything on the settings page is one JSON file. Just like <a href="/docs/themes">themes</a>,
	it's picked up on the fly.
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
	Unknown keys are ignored, and they disappear the next time Sonora saves, because it rewrites the
	whole file. Here is an example of a valid settings.json:
</p>
<Code label="settings.json" lang="json" text={example} />
<p>
	Break the formatting and Sonora shows <strong>Fix line N of settings.json to save changes</strong
	>. It won't save anything until you do. It also won't overwrite the file if something else changed
	it since Sonora last read it.
</p>

<h2 id="not-here">What isn't in the file</h2>
<p>
	Providers and application state are saved into a local SQLite database. Scrobbling services are
	not, so their secrets may appear in settings.json. This will most likely change in the coming
	releases.
</p>

<h2 id="other-files">Other files</h2>
<table>
	<thead>
		<tr><th>Folder</th><th>What's in it</th></tr>
	</thead>
	<tbody>
		<tr>
			<td>Data</td>
			<td>
				<code>state.sqlite</code>, in <code>~/.local/share/sonora</code>,
				<code>~/Library/Application Support/sonora</code> or <code>%LOCALAPPDATA%\sonora</code>.
			</td>
		</tr>
		<tr>
			<td>Cache</td>
			<td>
				Sign-in sessions, the Widevine module, cached lyrics and artwork, in
				<code>~/.cache/sonora</code>, <code>~/Library/Caches/sonora</code> or
				<code>%LOCALAPPDATA%\sonora</code>. Delete it and you're signed out everywhere.
			</td>
		</tr>
	</tbody>
</table>

<h2 id="home-manager">Home Manager</h2>
<p>
	The flake has a Home Manager module. Anything under <code>settings</code> gets merged into settings.json
	on every switch and every launch. Keys you don't set keep whatever you picked in the app.
</p>
<Code label="home.nix" text={homeManager} />
