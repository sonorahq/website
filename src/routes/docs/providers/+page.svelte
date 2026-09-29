<script lang="ts">
	import MenuPath from '$lib/components/docs/MenuPath.svelte';
</script>

<svelte:head>
	<title>Providers · Sonora docs</title>
</svelte:head>

<h1>Providers</h1>
<p class="summary">
	Sonora signs in to one streaming service at a time, and your local files are always there next to
	it. Switching services clears the queue, so finish what you're listening to first.
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

<h2 id="youtube">YouTube Music</h2>
<p>
	There are three ways in: a Google login window, pasting your cookies by hand, or guest mode. None
	of them needs Premium.
</p>

<h2 id="apple-music">Apple Music</h2>
<p>
	Sign in through the Apple Music window, or paste the <code>media-user-token</code> cookie from
	music.apple.com. Playback needs the <a href="#widevine">Widevine module</a>.
</p>

<h2 id="deezer">Deezer</h2>
<p>
	Sign in through the Deezer window or paste your <code>arl</code> cookie. The bare value works, and
	so does <code>arl=…</code>.
</p>

<h2 id="subsonic">Subsonic and Navidrome</h2>
<p>
	Enter the server address, your user name and password. Leave out the scheme and Sonora assumes
	<code>http://</code>, so type <code>https://</code> yourself if your server has TLS.
</p>
<ul>
	<li>
		Your password is stored in plain text in the cache folder. On Linux and macOS only your user can
		read it.
	</li>
</ul>

<h2 id="local-files">Local files</h2>
<p>
	Add folders in settings. Sonora walks through them, subfolders and symlinks included. After the
	first scan it only rereads files whose size or date changed, so later scans are quick. It doesn't
	watch the folders while it runs, though. Hit <strong>Rescan</strong> after you add music.
</p>
<ul>
	<li>It plays MP3, FLAC, M4A, MP4, AAC, OGG, Opus, WAV, WavPack, APE, WebM and MKA.</li>
	<li>
		Covers come from the embedded art, or from <code>cover.*</code> or <code>folder.*</code> in the
		same folder. Artist pictures come from <code>artist.jpg</code>.
	</li>
	<li>Lyrics come from a <code>.lrc</code> file next to the track, or from the tags.</li>
</ul>

<h2 id="quality">Audio quality</h2>
<table>
	<thead>
		<tr><th>Provider</th><th>What you get</th></tr>
	</thead>
	<tbody>
		<tr><td>Spotify</td><td>320 kbps, always</td></tr>
		<tr><td>YouTube Music</td><td>Around 256 kbps signed in, around 128 kbps as a guest</td></tr>
		<tr><td>Apple Music</td><td>AAC at 256 kbps</td></tr>
		<tr><td>Deezer</td><td>FLAC, 320 kbps MP3 or 128 kbps MP3, whichever your plan allows</td></tr>
		<tr><td>Subsonic and Navidrome</td><td>Whatever your server sends by default</td></tr>
		<tr><td>Local files</td><td>The file as it is</td></tr>
	</tbody>
</table>
<p>
	You can't choose a quality yet. Sonora always asks for the best stream it can get. A quality
	setting might be added in the future, mostly for people on metered connections. The same goes for
	lossless Apple Music and asking a Subsonic server to transcode.
</p>

<h2 id="widevine">Widevine</h2>
<p>
	Apple Music streams are encrypted, and decrypting them takes Google's Widevine module. Sonora
	doesn't ship it. If you have Chrome, Edge, Brave, Vivaldi, Chromium, Opera or Firefox, it borrows
	their copy.
</p>
<p>
	If you don't, go to <MenuPath steps={['Settings', 'Playback', 'Widevine module']} /> and download it
	from Google once you've accepted their terms. Widevine only exists for x86_64 and arm64.
</p>
