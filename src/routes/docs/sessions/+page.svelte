<script lang="ts">
	import Code from '$lib/components/docs/Code.svelte';
	import MenuPath from '$lib/components/docs/MenuPath.svelte';

	const cli = `sonora session start
sonora session join 123456
sonora session leave`;
</script>

<svelte:head>
	<title>Sessions · Sonora docs</title>
</svelte:head>

<h1>Sessions</h1>
<p class="summary">
	Listen to the same music with friends, in step. Sonora Sessions work on every streaming service,
	and Spotify Jams are there too.
</p>

<h2 id="sonora-session">Sonora Session</h2>
<p>
	Press the Sessions button in the player bar and choose <strong>Start a Session</strong>. Share the
	six-digit code, which <strong>Show Session code</strong> brings back later. Friends join with
	<strong>Join a Session…</strong> and type it in.
</p>
<p>
	When anyone in the Session plays a song, pauses or seeks, it happens for everyone, and everyone
	hears the same moment of the song to within a fraction of a second. Everyone has to be signed in
	to the service the Session started on. Local files are never shared.
</p>
<p>
	<strong>Leave Session</strong> takes you out. The host gets <strong>End Session</strong> instead, which
	ends it for everyone. An accent dot on the Sessions button means you're in one.
</p>

<h2 id="members">Members</h2>
<p>
	Open <strong>Members</strong> from the Sessions button to see who is listening with you, in a Sonora
	Session or a Spotify Jam. It also copies the Session code or Jam link, and leaves or ends it. The host
	can remove people from there.
</p>
<p>The player shows the face of whoever queued the song playing now, and Members rings them.</p>

<h2 id="spotify-jams">Spotify Jams</h2>
<p>
	With Spotify, the <strong>Spotify Jams</strong> submenu of the Sessions button starts, joins,
	leaves or ends a Jam. Joining takes the Jam link a friend shared. Jams need
	<MenuPath steps={['Settings', 'Playback', 'Show as a Spotify device']} /> turned on, so they aren't
	available while Soloist plays Spotify.
</p>
<p>
	While you host a Jam, pausing pauses only you, as in Spotify's own apps. Your friends keep
	listening, and resuming brings you back to where the Jam is.
</p>

<h2 id="devices">Other devices</h2>
<p>
	With Spotify or Jellyfin, the Sessions button also lists your account's other devices, and with
	YouTube Music the TVs and speakers on your network. Pick one to play there, or
	<strong>This computer</strong> to bring playback back. For Spotify, see
	<a href="/docs/providers#spotify-connect">Spotify Connect</a>, and for YouTube Music,
	<a href="/docs/providers#youtube">YouTube Music</a>.
</p>
<p>
	On Jellyfin, this takes
	<MenuPath steps={['Settings', 'Playback', 'Let Jellyfin apps control Sonora']} />, which is on by
	default. It also lets you control Sonora from Jellyfin's apps and dashboard.
</p>

<h2 id="settings">Settings</h2>
<p>
	Turn off <MenuPath steps={['Settings', 'Playback', 'Sessions', 'Show the Sessions button']} /> to hide
	the button.
</p>
<p>
	To run Sessions through your own server, turn off <strong
		>Use the official Sonora Sessions server</strong
	>, type the address and press <strong>Save</strong>. The address is saved only once the server
	answers. A bare host name means <code>wss://</code> and the <code>/ws</code> path.
</p>

<h2 id="command-line">From the command line</h2>
<p>
	<code>sonora session</code> prints the Session you're in. <code>join</code> without a code opens
	the dialog to type one. See <a href="/docs/command-line">Command line</a>.
</p>
<Code text={cli} />
