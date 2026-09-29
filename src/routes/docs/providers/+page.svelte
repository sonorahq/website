<svelte:head>
	<title>Providers · Sonora docs</title>
</svelte:head>

<h1>Providers</h1>
<p class="summary">
	Sonora is signed in to one streaming service at a time, next to your local files. Switching to
	another service clears the queue.
</p>

<h2 id="spotify">Spotify</h2>
<p>
	Sign-in opens Spotify's own login page in your browser, which then hands the session back to
	Sonora on <code>127.0.0.1:8989</code>. Nothing else may be listening on that port during sign-in.
</p>
<ul>
	<li>Playback needs Premium. Free accounts are refused at sign-in.</li>
	<li>Audio is always 320 kbps. There is no quality setting.</li>
	<li>
		If Spotify throttles playback, Sonora says so and retries on its own. Spotify's "travel
		restriction" errors show up as a region message.
	</li>
</ul>

<h2 id="youtube">YouTube Music</h2>
<p>
	You can sign in through a Google login window, paste your cookies by hand, or listen as a guest.
	If the Google session holds several accounts, Sonora asks which one to use.
</p>
<ul>
	<li>Premium is not needed.</li>
	<li>Signed in, streams are about 256 kbps. As a guest they are about 128 kbps.</li>
	<li>
		YouTube now refuses most music to anonymous listeners, so guest mode plays far less than it used
		to.
	</li>
</ul>

<h2 id="apple-music">Apple Music</h2>
<p>
	Sign in through the Apple Music login window, or paste the <code>media-user-token</code> cookie from
	music.apple.com. Apple Music support is still experimental.
</p>
<ul>
	<li>Playback needs the <a href="#widevine">Widevine module</a>.</li>
	<li>Streams are AAC at 256 kbps. Lossless and ALAC are not supported.</li>
	<li>
		Your account cannot fetch lyrics. The separate Apple Music lyrics source uses the public
		catalogue instead.
	</li>
</ul>

<h2 id="deezer">Deezer</h2>
<p>
	Sign in through the Deezer login window, or paste your <code>arl</code> cookie. The bare value and
	<code>arl=…</code> both work.
</p>
<ul>
	<li>
		Sonora asks for FLAC, then MP3 at 320 kbps, then 128 kbps. Your plan decides which one plays.
	</li>
	<li>A track that is blocked in your region plays from another release of it when one exists.</li>
</ul>

<h2 id="subsonic">Subsonic and Navidrome</h2>
<p>
	Enter the server address, user name and password. The address defaults to <code>http://</code>
	when you leave the scheme out, so type <code>https://</code> for a server behind TLS.
</p>
<ul>
	<li>Streams use the server's default format and bitrate.</li>
	<li>Plays and now playing are reported back to the server.</li>
	<li>
		The password is saved in plain text in the cache folder, readable only by your user on Linux and
		macOS.
	</li>
</ul>

<h2 id="local-files">Local files</h2>
<p>
	Add folders under settings. Sonora scans them recursively and follows symlinks. Later scans only
	re-read files whose size or date changed. Folders are scanned at startup and when you change the
	list, not while Sonora is running, so press <strong>Rescan</strong> after adding music.
</p>
<ul>
	<li>Formats: MP3, FLAC, M4A, MP4, AAC, OGG, Opus, WAV, WavPack, APE, WebM and MKA.</li>
	<li>
		Covers come from the embedded art, otherwise <code>cover.*</code> or <code>folder.*</code> in
		the same folder. Artist pictures come from <code>artist.jpg</code>.
	</li>
	<li>Lyrics come from a <code>.lrc</code> file next to the track or from embedded tags.</li>
	<li>Files opened from your file manager play even when they sit outside your library folders.</li>
</ul>

<h2 id="widevine">Widevine</h2>
<p>
	Apple Music streams are encrypted and need Google's Widevine module to play. Sonora does not ship
	it. It first looks for a copy from Chrome, Edge, Brave, Vivaldi, Chromium, Opera or Firefox. If it
	finds none, open <strong>Settings → Playback → Widevine module</strong> and download it from Google
	after accepting their terms. The same place uninstalls it. Widevine only exists for x86_64 and arm64.
</p>
