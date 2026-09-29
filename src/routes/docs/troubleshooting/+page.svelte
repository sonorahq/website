<script lang="ts">
	import Code from '$lib/components/docs/Code.svelte';
</script>

<svelte:head>
	<title>Troubleshooting · Sonora docs</title>
</svelte:head>

<h1>Troubleshooting</h1>
<p class="summary">
	Fixes for the problems people hit most. If yours is not here, the <a href="/docs/logs">log</a>
	usually says what went wrong.
</p>

<h2 id="macos-damaged">macOS says the app is damaged</h2>
<p>
	The app is not signed with an Apple developer certificate yet, so macOS quarantines it. Clear the
	flag once after installing.
</p>
<Code text="xattr -dr com.apple.quarantine /Applications/Sonora.app" />

<h2 id="windows-warning">Windows warns about an unknown publisher</h2>
<p>
	The Windows builds are not code-signed yet, and signing through the SignPath Foundation is applied
	for. Until it lands, choose <strong>More info → Run anyway</strong> on the first launch.
</p>

<h2 id="linux-no-sound">No sound on Linux</h2>
<p>
	Sonora plays through ALSA, and an error like <strong>no audio output device</strong> means the
	ALSA bridge to your sound server is missing. Install <code>pipewire-alsa</code> on PipeWire or
	<code>pulseaudio-alsa</code> on PulseAudio. The AppImage does not bundle it either.
</p>

<h2 id="blank-window">The window is blank or Sonora will not start</h2>
<p>
	Sonora draws with Vulkan and needs a Vulkan driver for your GPU, not only the loader. That means
	<code>mesa-vulkan-drivers</code>, <code>vulkan-radeon</code> or <code>vulkan-intel</code>, or the
	proprietary NVIDIA driver. <code>vulkaninfo --summary</code> shows whether one is working.
</p>
<p>
	If Sonora starts but feels slow, set <code>SONORA_BLUR=0</code> to turn off lyric blur, edge fades and
	the visualizer.
</p>

<h2 id="sign-in-window">The sign-in window does not open on Linux</h2>
<p>
	The login windows for YouTube Music, Apple Music and Deezer need WebKitGTK, as
	<code>webkit2gtk-4.1</code> or <code>4.0</code>. Without it, Sonora says
	<strong>webkit2gtk is not installed</strong> and only offers pasting cookies by hand, which works just
	as well.
</p>

<h2 id="spotify-sign-in">Spotify sign-in fails</h2>
<ul>
	<li>Free accounts are refused. Playback needs Premium.</li>
	<li>
		The browser has to reach Sonora on <code>127.0.0.1:8989</code>. Close whatever else is using
		that port and try again.
	</li>
	<li>A region error comes from Spotify refusing the account in the country you connect from.</li>
</ul>

<h2 id="widevine">Apple Music will not play</h2>
<p>
	<strong>No widevine module was found on this machine</strong> means Sonora found no Widevine copy
	in your browsers. Download it under <strong>Settings → Playback → Widevine module</strong>.
</p>

<h2 id="skipping">Playback stops after several tracks</h2>
<p>
	Sonora stops when several tracks in a row fail to play, rather than skipping through your whole
	queue. The log has the details.
</p>

<h2 id="lastfm">Last.fm will not link</h2>
<p>
	Linking waits for Last.fm on <code>127.0.0.1:8990</code> for five minutes. Free the port, then approve
	Sonora in the browser before the time runs out.
</p>

<h2 id="settings-not-saved">Changes in settings are not saved</h2>
<p>
	If you edited settings.json by hand and left a syntax error, Sonora shows <strong
		>Fix line N of settings.json to save changes</strong
	>
	and stops saving until you fix it. See <a href="/docs/settings">Settings file</a>.
</p>
