<script lang="ts">
	import MenuPath from '$lib/components/docs/MenuPath.svelte';
	import Code from '$lib/components/docs/Code.svelte';
</script>

<svelte:head>
	<title>Troubleshooting · Sonora docs</title>
</svelte:head>

<h1>Troubleshooting</h1>
<p class="summary">
	The problems people run into most, and what fixes them. If yours isn't here, check the
	<a href="/docs/logs">log</a>. It usually names the culprit.
</p>

<h2 id="macos-damaged">macOS says the app is damaged</h2>
<p>
	It isn't. Sonora isn't signed with an Apple developer certificate yet, so macOS quarantines it.
	Clear the flag once after installing.
</p>
<Code text="xattr -dr com.apple.quarantine /Applications/Sonora.app" />

<h2 id="windows-warning">Windows warns about an unknown publisher</h2>
<p>
	The Windows builds aren't code-signed yet. We've applied to the SignPath Foundation for that.
	Until it comes through, click <MenuPath steps={['More info', 'Run anyway']} /> the first time.
</p>

<h2 id="linux-no-sound">No sound on Linux</h2>
<p>
	Sonora plays through ALSA. If it says <strong>no audio output device</strong>, you're missing the
	ALSA bridge to your sound server. Install <code>pipewire-alsa</code> on PipeWire or
	<code>pulseaudio-alsa</code> on PulseAudio. The AppImage doesn't bundle it either.
</p>

<h2 id="blank-window">The window is blank or Sonora won't start</h2>
<p>
	Sonora draws with Vulkan, and the Vulkan loader alone isn't enough. You need a driver for your
	GPU, such as <code>mesa-vulkan-drivers</code>, <code>vulkan-radeon</code>,
	<code>vulkan-intel</code>
	or the proprietary NVIDIA driver. Run <code>vulkaninfo --summary</code> to see whether one works.
</p>
<p>
	If Sonora starts but feels sluggish, <code>SONORA_BLUR=0</code> turns off the lyric blur, edge fades
	and visualizer.
</p>

<h2 id="sign-in-window">The sign-in window doesn't open on Linux</h2>
<p>
	The login windows for YouTube Music, Apple Music and Deezer need WebKitGTK, either
	<code>webkit2gtk-4.1</code> or <code>4.0</code>. Without it Sonora says
	<strong>webkit2gtk is not installed</strong> and offers cookie pasting instead. That works just as well.
</p>

<h2 id="spotify-sign-in">Spotify sign-in fails</h2>
<ul>
	<li>Free accounts don't get in. You need Premium.</li>
	<li>
		Your browser has to reach Sonora on <code>127.0.0.1:8989</code>. Close whatever else holds that
		port and try again.
	</li>
	<li>A region error means Spotify won't serve your account from where you're connecting.</li>
</ul>

<h2 id="widevine">Apple Music won't play</h2>
<p>
	<strong>No widevine module was found on this machine</strong> means none of your browsers had a
	copy Sonora could borrow. Download one in <MenuPath
		steps={['Settings', 'Playback', 'Widevine module']}
	/>.
</p>

<h2 id="skipping">Playback stops after a few tracks</h2>
<p>
	When several tracks in a row fail, Sonora stops instead of burning through your whole queue. The
	log has the reason.
</p>

<h2 id="lastfm">Last.fm won't link</h2>
<p>
	Sonora waits five minutes for Last.fm on <code>127.0.0.1:8990</code>. Make sure that port is free,
	then approve Sonora in the browser before the time runs out.
</p>

<h2 id="settings-not-saved">Settings changes don't stick</h2>
<p>
	You probably left a syntax error in settings.json. Sonora shows
	<strong>Fix line N of settings.json to save changes</strong> and stops saving until the file
	parses again. See <a href="/docs/settings">Settings file</a>.
</p>
