<script lang="ts">
	import Code from '$lib/components/docs/Code.svelte';

	const selfHosted = `"scrobbling": {
  "listenbrainz": {
    "server": "https://listenbrainz.example.org",
    ...
  }
}`;
</script>

<svelte:head>
	<title>Scrobbling · Sonora docs</title>
</svelte:head>

<h1>Scrobbling</h1>
<p class="summary">
	Link your accounts under <strong>Settings → Integrations → Scrobbling</strong>. Every linked
	service gets every play, and each has its own switch so you can pause one without unlinking it.
</p>

<h2 id="services">Linking a service</h2>
<table>
	<thead>
		<tr><th>Service</th><th>What you need</th></tr>
	</thead>
	<tbody>
		<tr>
			<td>Last.fm</td>
			<td>
				Your own API key and secret from last.fm/api. Sonora then opens Last.fm in your browser to
				approve it. You have five minutes, and port 8990 must be free.
			</td>
		</tr>
		<tr>
			<td>Libre.fm</td>
			<td>Nothing. Approve Sonora in the browser.</td>
		</tr>
		<tr>
			<td>ListenBrainz</td>
			<td>The user token from your ListenBrainz settings page.</td>
		</tr>
		<tr>
			<td>Maloja</td>
			<td>
				Your server address and an API key. Sonora adds <code>https://</code> when you leave the scheme
				out.
			</td>
		</tr>
	</tbody>
</table>
<p>You can link one account per service.</p>

<h2 id="when">When a play counts</h2>
<p>
	A track has to be at least 30 seconds long. It counts once playback reaches half its length or
	four minutes, whichever comes first. Seeking past that point counts too, and pausing does not
	reset it. Tracks without an artist or title are skipped, and only the first artist is sent.
</p>
<p>
	Last.fm, Libre.fm and ListenBrainz also show the track as now playing when it starts. Maloja has
	no now-playing.
</p>
<p>
	Sonora also tells the provider you played from. Subsonic and Navidrome get the play count, and
	Apple Music gets its recently played list.
</p>

<h2 id="offline">Offline plays are not kept</h2>
<p>
	Sonora sends each play once. If the service is down or you are offline, that play is lost. It does
	not queue plays to send later. The reason shows up in the <a href="/docs/logs">log</a>.
</p>

<h2 id="storage">Where accounts are stored</h2>
<p>
	Keys and session tokens live in plain text under <code>scrobbling</code> in the
	<a href="/docs/settings">settings file</a>. To point ListenBrainz at a self-hosted server, set its
	<code>server</code> there.
</p>
<Code label="settings.json" lang="json" text={selfHosted} />
