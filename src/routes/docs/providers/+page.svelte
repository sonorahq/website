<script lang="ts">
	import AppButton from '$lib/components/docs/AppButton.svelte';
	import MenuPath from '$lib/components/docs/MenuPath.svelte';

	/** The levels each service offers under Streaming quality, best first, as the app labels them. */
	const qualities = [
		{
			provider: 'Spotify',
			levels:
				'Lossless, with Soloist only: FLAC up to 24-bit 44.1 kHz. High: Vorbis 320 kbps. Normal: 160 kbps. Low: 96 kbps.'
		},
		{
			provider: 'YouTube Music',
			levels: 'High: AAC up to 256 kbps with Premium. Normal: 128 kbps. Low: 48 kbps.'
		},
		{ provider: 'Apple Music', levels: 'High: AAC 256 kbps. Low: 64 kbps.' },
		{
			provider: 'Deezer',
			levels:
				'Hi-res: FLAC up to 24-bit 192 kHz. Lossless: FLAC 16-bit 44.1 kHz. High: MP3 320 kbps. Normal: MP3 128 kbps.'
		},
		{
			provider: 'Tidal',
			levels:
				'Hi-res: FLAC up to 24-bit 192 kHz. Lossless: FLAC 16-bit 44.1 kHz. High: AAC 320 kbps. Low: AAC 96 kbps.'
		}
	];
</script>

<svelte:head>
	<title>Providers · Sonora docs</title>
</svelte:head>

<h1>Providers</h1>
<p class="summary">
	Sonora plays from one streaming service at a time, with your local files next to it in Library.
	Switching services takes the streaming songs out of the queue and leaves your local files in it.
</p>

<h2 id="accounts">Accounts</h2>
<p>
	The sign-in screen lists every service in one card. Pick one, and if it has more than one way to
	sign in, choose the method in the dialog that opens. To play only your music folders, choose
	<strong>Continue offline</strong> instead.
</p>
<p>
	You can stay signed in to several services. Switch between them, Guest mode and Offline from the
	account menu at the top right. Switching opens your startup page. <strong>Manage accounts</strong>
	in the same menu opens <MenuPath steps={['Settings', 'General', 'Streaming services']} />, where
	you sign in to another service or sign out. To choose the service Sonora opens with, use
	<MenuPath steps={['Settings', 'General', 'Provider']} />, or leave it on
	<strong>Last used</strong>.
</p>
<p>
	Subsonic, Jellyfin and Plex keep one account per server, each with its own library, downloads and
	queue. To add another server, click the arrow on the service's card under Streaming services and
	choose <strong>Add server</strong>. The account menu lists each server under its service.
</p>

<h2 id="spotify">Spotify</h2>
<p>
	Signing in opens Spotify's login page in your browser. Once you approve, the browser hands the
	session back to Sonora through <code>127.0.0.1:8989</code>, so nothing else can be using that
	port.
</p>
<ul>
	<li>You need Premium. Spotify turns free accounts away at sign-in.</li>
	<li>A region error means Spotify won't serve your account from where you're connecting.</li>
</ul>

<h3 id="soloist">Soloist</h3>
<p>
	Soloist is Spotify's own player for other apps. It plays lossless, and it plays on accounts that
	Spotify refuses playback keys to through the built-in player. For such an account the setup opens
	at launch, and the <strong>Playback key error</strong> offers it too.
</p>
<p>
	To set it up yourself, open <MenuPath steps={['Settings', 'Playback', 'Use Soloist']} /> while signed
	in to Spotify and click <AppButton>Set up</AppButton>. You need Premium. The setup has three
	steps:
</p>
<ol>
	<li>
		Download Soloist. It comes straight from Spotify, and using it means accepting Spotify's terms
		of use.
	</li>
	<li>
		Open the Soloist page of Spotify's developer dashboard, accept the terms, generate an API key
		and paste it in.
	</li>
	<li>
		Pair it. Open Spotify on a phone or computer on the same network, signed in to the same account,
		start any song, and pick <strong>Sonora Soloist</strong> from the device list. If it doesn't show
		up or stays on connecting, turn off VPNs on both devices and virtual networks such as Docker or OrbStack
		on this computer while you pair. Your firewall also has to let in UDP 5353 and the TCP port the dialog
		names.
	</li>
</ol>
<p>
	Soloist plays the sound itself, so the equalizer, the visualizer and the output settings only
	apply to local files while it plays Spotify. <strong>Show as a Spotify device</strong> and
	<strong>Keep played tracks</strong> are off while it plays. The <strong>Use Soloist</strong>
	switch goes back to the built-in player and keeps the setup. <AppButton>Remove</AppButton> deletes Soloist,
	your API key and its sign-in.
</p>
<p>
	Spotify builds Soloist for Windows on x86_64, macOS on Apple silicon, and Linux on x86_64, arm64
	and 32-bit ARM. Elsewhere the setting is missing, and an account refused playback keys can't play
	Spotify in Sonora. On NixOS, the flake's package runs Soloist without nix-ld.
</p>

<h3 id="spotify-connect">Spotify Connect and Jams</h3>
<p>
	Sonora appears as a device in Spotify's other apps, so you can control it from your phone. To turn
	this off, use <MenuPath steps={['Settings', 'Playback', 'Show as a Spotify device']} />.
</p>
<p>
	The Sessions button in the player bar switches playback to another Spotify device and back. While
	another device plays, the button shows that device's icon. Jams are in its
	<strong>Spotify Jams</strong> submenu, see <a href="/docs/sessions#spotify-jams">Sessions</a>. To
	hide Sonora's Discord status while Spotify Connect plays, turn on
	<MenuPath steps={['Settings', 'Integrations', 'Discord', 'Hide during Spotify Connect']} />.
</p>

<h2 id="youtube">YouTube Music</h2>
<p>
	There are three ways to log in, all in the sign-in dialog: a Google login window, pasting your
	cookies manually, or guest mode. None of them needs Premium. A guest can't like songs or change
	playlists.
</p>
<p>
	To play on a TV or speaker with YouTube on your network, pick it from the Sessions button. It
	keeps playing after you close Sonora, and you can still pause, skip and seek from Sonora. A
	speaker plays only while you're signed in. To stop looking for devices, turn off
	<MenuPath steps={['Settings', 'Playback', 'Cast to devices on your network']} />.
</p>
<p>
	To skip sponsors, self-promotion and non-music sections marked on SponsorBlock, turn on
	<MenuPath steps={['Settings', 'Playback', 'SponsorBlock']} />. The skipped sections show on the
	seek bar.
</p>

<h2 id="apple-music">Apple Music</h2>
<p>
	Sign in through the Apple Music window, or paste the <code>media-user-token</code> cookie from
	music.apple.com. You need an active subscription. Playback needs the
	<a href="#widevine">Widevine module</a>.
</p>
<p>Songs you uploaded through iTunes or the Music app show in your library and play too.</p>

<h2 id="deezer">Deezer</h2>
<p>
	Sign in through the Deezer window or paste your <code>arl</code> cookie. On a Family account, pick your
	profile when Sonora asks.
</p>

<h2 id="tidal">Tidal</h2>
<p>
	Signing in opens <code>link.tidal.com</code> in your browser with a code. Approve it there.
</p>

<h2 id="subsonic">Subsonic and Navidrome</h2>
<p>
	Enter the server address, your user name and password. Leave out the scheme and Sonora assumes
	<code>http://</code>, so type <code>https://</code> yourself if your server has TLS.
</p>
<p>
	If the server has more than one library, pick the one to browse under
	<MenuPath steps={['Settings', 'General', 'Streaming services', 'Library']} />. On Navidrome 0.58
	or newer, you can tick several.
</p>
<p>
	Lyrics stored on the server, such as ones embedded in your files, are used too. Servers that send
	OpenSubsonic's enhanced lyrics are synced word by word.
</p>
<p>
	On Navidrome 0.64 or newer, right-click an empty part of your Playlists page and choose
	<strong>New smart playlist</strong>. To change the rules later, choose
	<strong>Smart rules</strong> from the playlist's menu.
</p>

<h2 id="jellyfin">Jellyfin</h2>
<p>
	Enter the server address with your user name and password, or click
	<AppButton>Sign in with Quick Connect</AppButton>. Quick Connect shows a code and opens the
	server's Quick Connect page. Approve the code from a Jellyfin app where you're signed in within
	five minutes. It has to be turned on in the server's settings. As with Subsonic, an address
	without a scheme is taken as <code>http://</code>.
</p>
<p>
	Favorites, playlists, instant mixes and downloads work, and lyrics come from the server, synced
	word by word when it has them.
</p>
<p>
	Sonora shows up in Jellyfin's apps and dashboard as a device you can control, and the Sessions
	button in the player bar plays on your other Jellyfin apps. To turn this off, use
	<MenuPath steps={['Settings', 'Playback', 'Let Jellyfin apps control Sonora']} />.
</p>

<h2 id="plex">Plex</h2>
<p>
	Signing in opens a plex.tv window, where you approve Sonora with your Plex account within 15
	minutes. If the account reaches more than one server, or the server has more than one music
	library, pick the one to use. A server someone shared with you works too.
</p>
<p>
	Playing, search, ratings, playlists, radio, downloads and lyrics from the server work. Your plays
	show up on the server as they happen.
</p>

<h2 id="local-files">Local files</h2>
<p>
	Add folders under <MenuPath steps={['Settings', 'General', 'Music folders']} />. Sonora scans
	them, subfolders and symlinks included. After the first read it only checks files whose size or
	date changed, so later scans are quick. It doesn't watch the folders while it runs, though. Hit <AppButton
		>Rescan</AppButton
	> after you add music.
</p>
<p>
	Local songs, albums, artists and playlists sit in Library next to your streaming library, marked
	with a file icon. Filter a page to <strong>Local only</strong> or <strong>Streaming only</strong> to
	see one side. Search finds them too, with the same mark.
</p>
<p>
	To use Sonora without a streaming account, choose <strong>Continue offline</strong> on the sign-in
	screen, or <strong>Offline</strong> under
	<MenuPath steps={['Settings', 'General', 'Streaming services']} />.
</p>
<ul>
	<li>MP3, FLAC, M4A, MP4, AAC, OGG, Opus, WAV, AIFF, WavPack, APE, WebM and MKA are supported.</li>
	<li>
		A track with several artist tags shows each artist separately. Sonora never splits a single tag
		on commas, ampersands or "feat.", and artist names that differ only in capitalization count as
		one artist.
	</li>
	<li>
		Covers are loaded from the embedded art, or from <code>cover.*</code> or <code>folder.*</code>
		in the same folder. Use JPG, JPEG, PNG or WebP. Artist pictures come from a scanned folder whose name
		matches the artist, using <code>artist.*</code>, <code>folder.*</code> or
		<code>cover.*</code> in those formats.
	</li>
	<li>
		Lyrics come from a <code>.ttml</code> or <code>.lrc</code> file next to the track, or from the tags.
	</li>
	<li>
		A song keeps its playlists, favorite and play history when you move its file within your music
		folders.
	</li>
	<li>
		While a music folder is unavailable, its songs stay listed, and Sonora names the files it
		couldn't read.
	</li>
</ul>

<h3 id="local-playlists">Importing and exporting playlists</h3>
<p>
	To make a local playlist while signed in to a streaming service, pick
	<strong>Local files</strong> under <strong>Save to</strong> in the Create playlist dialog. To
	import an M3U or M3U8 file, click <strong>Import playlist…</strong> in the same dialog, or
	right-click an empty part of the Playlists page. Songs that aren't in your library are left out.
	To export a local playlist, right-click it and choose <strong>Export playlist…</strong>. An export
	saved next to your music lists songs by relative path.
</p>

<h3 id="local-tags">Editing tags</h3>
<p>
	Right-click one local track and choose <strong>Edit tags</strong>. Saving writes the changes to
	the audio file and updates the library. The album artist tag controls album grouping. If it is
	missing, tracks with the same album name in the same folder stay together even when their track
	artists differ.
</p>

<h3 id="local-lyrics">Local lyrics</h3>
<p>
	Enable <strong>Local</strong> under <MenuPath steps={['Settings', 'Lyrics', 'Lyrics sources']} /> to
	use lyrics from a track's tags or a matching <code>.ttml</code> or <code>.lrc</code> file. TTML files
	and TTML in the lyrics tag can be timed word by word. Drag the sources to rank them. Synced lyrics beat
	plain text, and among synced lyrics the higher source wins, even when a lower one has them word by word.
</p>
<p>
	To keep your local track metadata off online lyrics services, turn off
	<MenuPath steps={['Settings', 'Lyrics', 'Look up lyrics for local files']} />. Lyrics from your
	files still work.
</p>

<h2 id="quality">Audio quality</h2>
<p>
	Pick a level in <MenuPath steps={['Settings', 'Playback', 'Streaming quality']} />. If your plan
	or the track doesn't have it, the next level down plays.
</p>
<table>
	<thead>
		<tr><th>Provider</th><th>Levels</th></tr>
	</thead>
	<tbody>
		{#each qualities as row (row.provider)}
			<tr><td>{row.provider}</td><td>{row.levels}</td></tr>
		{/each}
		<tr><td>Local files</td><td>The file as it is</td></tr>
	</tbody>
</table>
<p>
	Subsonic, Navidrome, Jellyfin and Plex send the original file. To have a Subsonic, Navidrome or
	Jellyfin server convert tracks, set
	<strong>Stream format</strong> to MP3, Opus or AAC and a <strong>Maximum bitrate</strong> under
	<MenuPath steps={['Settings', 'Playback', 'Streaming']} />. To keep music for offline use, see
	<a href="/docs/downloads">Downloads and offline</a>.
</p>

<h2 id="widevine">Widevine</h2>
<p>
	Apple Music streams are encrypted and need Google's Widevine module. A copy downloaded from Google
	is used first, then one from a browser such as Chrome, Edge, Brave, Vivaldi, Chromium or Firefox.
</p>
<p>
	To download Google's copy, use <MenuPath steps={['Settings', 'Playback', 'Widevine module']} />.
	Do this if no browser has the module or if Apple Music tracks fail because the browser's copy is
	out of date. Widevine only exists for x86_64 and arm64.
</p>
