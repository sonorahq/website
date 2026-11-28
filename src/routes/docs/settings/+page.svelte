<script lang="ts">
	import Code from '$lib/components/docs/Code.svelte';
	import MenuPath from '$lib/components/docs/MenuPath.svelte';

	const example = `{
  "gapless": true,
  "normalisation": false,
  "close_to_tray": true,
  "startup": "home",
  "local_folders": ["/home/me/Music"],
  "lyrics_providers": ["Local", "Spotify", "LrcLib"],
  "appearance": {
    "theme": "catppuccin/mocha",
    "adaptive_theme": false,
    "icons": "lucide",
    "rounding": "rounded",
    "font_size": 14
  }
}`;

	const nixModule = `{
  imports = [ inputs.sonora.nixosModules.default ];
  # or inputs.sonora.homeModules.default for Home Manager
  programs.sonora = {
    enable = true;
    settings = {
      gapless = true;
      appearance = {
        theme = "catppuccin/mocha";
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
	Your preferences live in one JSON file. Just like <a href="/docs/themes">themes</a>, it's picked
	up on the fly.
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
	Missing keys use their defaults. Unknown keys are ignored, and they disappear the next time Sonora
	saves, because it rewrites the whole file. Here is an example of a valid settings.json:
</p>
<Code label="settings.json" lang="json" text={example} />
<p>
	Break the formatting and Sonora shows <strong>Fix line N of settings.json to save changes</strong
	>. It won't save anything until you do. It also won't overwrite the file if something else changed
	it since Sonora last read it.
</p>

<p>
	Save as UTF-8. Since v0.42.0, a UTF-8 byte order mark, which some Windows editors add, is accepted
	too.
</p>

<h2 id="backup">Backup</h2>
<p>
	The previous valid version of your settings is in <code>sonora.backup.json</code> next to settings.json.
	To restore it, quit Sonora and copy it over settings.json.
</p>

<h2 id="not-here">What isn't in the file</h2>
<p>
	The last provider you used, volume, queue resume position, window layout and other runtime state
	are saved in <code>state.sqlite</code>. To always start on one service, pick it in
	<MenuPath steps={['Settings', 'General', 'Provider']} /> or set <code>provider</code> in
	settings.json to <code>spotify</code>, <code>youtube</code>, <code>apple</code>,
	<code>deezer</code>, <code>tidal</code>, <code>subsonic</code>, <code>jellyfin</code>,
	<code>plex</code> or <code>local</code>.
</p>
<p>
	Provider sign-ins and linked scrobbling accounts live in the <code>accounts</code> folder in the data
	folder, so settings.json holds no tokens and is safe to share. Scrobbling accounts that an older version
	kept in settings.json move there on their own.
</p>

<h2 id="file-only">Only in the file</h2>
<p>These keys under <code>appearance</code> have no switch in the app.</p>
<table>
	<tbody>
		<tr>
			<td><code>page_width</code></td>
			<td
				><code>"centered"</code> or <code>"wide"</code>, how far pages stretch on a large window</td
			>
		</tr>
		<tr>
			<td><code>window_rounding</code></td>
			<td>
				The window's own corners: <code>"square"</code>, <code>"subtle"</code>,
				<code>"rounded"</code> or <code>"round"</code>
			</td>
		</tr>
		<tr>
			<td><code>traffic_light_controls</code></td>
			<td>
				<code>true</code> draws minimize, maximize and close as colored dots. Not on macOS.
			</td>
		</tr>
		<tr>
			<td><code>traffic_light_reversed</code></td>
			<td>
				<code>true</code> swaps minimize and maximize in the dots, so on the right they read minimize,
				maximize, close like the plain controls. Not on macOS.
			</td>
		</tr>
	</tbody>
</table>

<h2 id="other-files">Other files</h2>
<table>
	<thead>
		<tr><th>Folder</th><th>What's in it</th></tr>
	</thead>
	<tbody>
		<tr>
			<td>Data</td>
			<td>
				<code>state.sqlite</code>, <a href="/docs/downloads">downloads</a> and provider sign-ins in
				<code>accounts</code>, in
				<code>~/.local/share/sonora</code>,
				<code>~/Library/Application Support/sonora</code> or <code>%LOCALAPPDATA%\sonora</code>.
				Deleting a provider's folder in <code>accounts</code> signs you out of it.
			</td>
		</tr>
		<tr>
			<td>Cache</td>
			<td>
				The Widevine module, cached lyrics, artwork and played tracks, and the local scan index, in
				<code>~/.cache/sonora</code>, <code>~/Library/Caches/sonora</code> or
				<code>%LOCALAPPDATA%\sonora</code>. Emptying it doesn't sign you out.
			</td>
		</tr>
	</tbody>
</table>

<p class="note">
	On Windows, data and cache share the same folder. Deleting the whole folder also removes
	<code>state.sqlite</code>, including local playlists and favorites, every song you downloaded and
	your sign-ins.
</p>

<h2 id="home-manager">NixOS and Home Manager</h2>
<p>
	The flake has a NixOS module and a Home Manager module, both under <code>programs.sonora</code>.
	Anything under <code>settings</code> gets merged into settings.json every time Sonora starts, and with
	Home Manager on every switch too. Keys you don't set keep whatever you picked in the app.
</p>
<Code label="configuration.nix or home.nix" text={nixModule} />
<p>Use the same keys as settings.json.</p>
