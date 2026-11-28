<script lang="ts">
	import MenuPath from '$lib/components/docs/MenuPath.svelte';
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
				it. You've got five minutes, and port 8990 has to be free. Since December 1, 2026, Last.fm
				refuses keys whose account has no Last.fm Pro, and Sonora warns you when it does.
			</td>
		</tr>
		<tr>
			<td>Libre.fm</td>
			<td>Nothing. Just approve Sonora in the browser.</td>
		</tr>
		<tr>
			<td>ListenBrainz</td>
			<td>
				The user token from your ListenBrainz settings page. Leave <strong>Server address</strong>
				empty unless you run your own ListenBrainz or a tool such as multi-scrobbler.
			</td>
		</tr>
		<tr>
			<td>Maloja</td>
			<td>
				Your server address and an API key. Without a scheme, Sonora assumes <code>https://</code>.
			</td>
		</tr>
		<tr>
			<td>teal.fm</td>
			<td>
				Your Bluesky handle, or one from another ATProto server, and an app password, not your
				account password. Each play is saved publicly to your account, where teal.fm picks it up.
			</td>
		</tr>
	</tbody>
</table>

<h2 id="self-hosted">Your own ListenBrainz server</h2>
<p>
	To scrobble to a self-hosted ListenBrainz or to multi-scrobbler, fill in <strong
		>Server address</strong
	>
	when you connect ListenBrainz, along with a token that server accepts. Paste either the server's root
	or the API address ending in <code>/1</code> that multi-scrobbler prints. Without a scheme, Sonora
	assumes <code>https://</code>.
</p>

<h2 id="provider-plays">Plays your service already scrobbles</h2>
<p>
	Some music services scrobble to Last.fm on their own once you link them there. To keep those plays
	from counting twice, turn off <strong>Scrobble &lt;service&gt; plays</strong> at the bottom of the Scrobbling
	page. The switch is named after the service you're signed in to and keeps only its plays away from every
	linked account. Local files still scrobble.
</p>

<h2 id="when">When a play counts</h2>
<p>
	Normal scrobbling conventions apply. The track has to be at least 30 seconds long, and it counts
	once you've listened to half of it or to four minutes, whichever comes first. Skipping ahead
	doesn't count as listening. A track needs both a title and an artist to be submitted.
</p>
<p>
	Last.fm, Libre.fm, ListenBrainz and teal.fm also get a now-playing update when a track starts.
	Maloja doesn't support that.
</p>

<p>
	Navidrome, other Subsonic servers, Jellyfin and Plex also receive now-playing updates and play
	counts directly, without linking a separate scrobbling account.
</p>

<h2 id="offline">Offline plays</h2>
<p>
	If you're offline or a service is down, plays wait and go out once it can be reached again, even
	after a restart. Up to 5,000 plays wait for each service, and past that the oldest are dropped.
	Unlinking a service drops the plays still waiting for it.
</p>
