<script lang="ts">
	import MenuPath from '$lib/components/docs/MenuPath.svelte';
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
	Link your accounts in <MenuPath steps={['Settings', 'Integrations', 'Scrobbling']} />. Every play
	goes to every linked service whose toggle is on. Turning a service off keeps the account linked.
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
				Your own API key and secret from last.fm/api. Sonora then sends you to Last.fm to approve
				it. You've got five minutes, and port 8990 has to be free.
			</td>
		</tr>
		<tr>
			<td>Libre.fm</td>
			<td>Nothing. Just approve Sonora in the browser.</td>
		</tr>
		<tr>
			<td>ListenBrainz</td>
			<td>The user token from your ListenBrainz settings page.</td>
		</tr>
		<tr>
			<td>Maloja</td>
			<td>
				Your server address and an API key. Without a scheme, Sonora assumes <code>https://</code>.
			</td>
		</tr>
	</tbody>
</table>

<h2 id="when">When a play counts</h2>
<p>
	Normal scrobbling conventions apply. The track has to be at least 30 seconds long, and it counts
	at the halfway point or at four minutes, whichever comes first. A track needs both a title and an
	artist to be submitted.
</p>
<p>
	Last.fm, Libre.fm and ListenBrainz also get a now-playing update when a track starts. Maloja
	doesn't support that.
</p>

<p>
	Navidrome and other Subsonic servers also receive now-playing updates and play counts directly,
	without linking a separate scrobbling account.
</p>

<h2 id="offline">Offline plays get lost</h2>
<p>
	Sonora sends each play once. If you're offline or the service is down, that play is gone, and the
	<a href="/docs/logs">log</a> says why. Queueing plays and sending them later might be added in the future.
</p>
