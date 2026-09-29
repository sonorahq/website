<script lang="ts">
	import AppButton from '$lib/components/docs/AppButton.svelte';
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
	<li>
		If you are getting a "Spotify is not granting this account playback keys" error each time you
		try playing a track, Spotify won't work for you in Sonora. See <a
			href="https://github.com/librespot-org/librespot/issues/1649">issue 1649</a
		> in librespot.
	</li>
	<li>A region error means Spotify won't serve your account from where you're connecting.</li>
</ul>

<h2 id="youtube">YouTube Music</h2>
<p>
	There are three ways to log in: a Google login window, pasting your cookies manually, or guest
	mode. None of them needs Premium.
</p>

<h2 id="apple-music">Apple Music</h2>
<p>
	Sign in through the Apple Music window, or paste the <code>media-user-token</code> cookie from
	music.apple.com. Playback needs the <a href="#widevine">Widevine module</a>.
</p>

<h2 id="deezer">Deezer</h2>
<p>
	Sign in through the Deezer window or paste your <code>arl</code> cookie.
</p>

<h2 id="subsonic">Subsonic and Navidrome</h2>
<p>
	Enter the server address, your user name and password. Leave out the scheme and Sonora assumes
	<code>http://</code>, so type <code>https://</code> yourself if your server has TLS.
</p>

<h2 id="local-files">Local files</h2>
<p>
	Add folders in settings. Sonora scans them, subfolders and symlinks included. After the first read
	it only checks files whose size or date changed, so later scans are quick. It doesn't watch the
	folders while it runs, though. Hit <AppButton>Rescan</AppButton> after you add music.
</p>
<ul>
	<li>MP3, FLAC, M4A, MP4, AAC, OGG, Opus, WAV, WavPack, APE, WebM and MKA are supported.</li>
	<li>
		Covers are loaded from the embedded art, or from <code>cover.*</code> or <code>folder.*</code>
		in the same folder. Artist pictures come from <code>artist.jpg</code>.
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
	You can't choose a specific quality (yet). The app always asks for the best stream it can get. A
	quality setting might be added in the future, mostly for people on metered connections, as
	lossless is currently out of reach for most providers that don't already support it.
</p>

<h2 id="widevine">Widevine</h2>
<p>
	Apple Music streams are encrypted, and decrypting them needs Google's Widevine module. If you have
	Chrome, Edge, Brave, Vivaldi, Chromium, Opera or Firefox, it borrows their copy.
</p>
<p>
	If you don't, the app will offer to download one from Google once you've accepted their terms. If
	it doesn't, go to <MenuPath steps={['Settings', 'Playback', 'Widevine module']} /> and download it manually.
	Widevine only exists for x86_64 and arm64.
</p>
