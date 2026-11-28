<script lang="ts">
	import MenuPath from '$lib/components/docs/MenuPath.svelte';
</script>

<svelte:head>
	<title>Sound · Sonora docs</title>
</svelte:head>

<h1>Sound</h1>
<p class="summary">The output device and the equalizer.</p>

<h2 id="output">Output device</h2>
<p>
	Choose a device in <MenuPath steps={['Settings', 'Playback', 'Sound', 'Output device']} />. While
	it's disconnected, audio plays on the system default. Every track is resampled to the device's
	sample rate unless <strong>Match sample rate</strong> is on.
</p>
<table>
	<tbody>
		<tr>
			<td>Direct to hardware</td>
			<td>
				Linux and macOS. On Linux, a sound card's own device plays past PipeWire or PulseAudio,
				bit-perfect. On macOS, every device is listed a second time under
				<strong>Direct to hardware</strong>, and picking one there keeps every other app off it.
			</td>
		</tr>
		<tr>
			<td>Sample rate</td>
			<td>
				On Linux, pick from 32 to 192 kHz, limited to the rates your device supports. A Direct to
				hardware device on macOS offers its own rates. Otherwise, <strong>Change</strong> opens Audio
				MIDI Setup on macOS or the sound settings on Windows.
			</td>
		</tr>
		<tr>
			<td>Match sample rate</td>
			<td>
				Linux and macOS, with a Direct to hardware device. Each track plays at its own sample rate,
				or the closest one the device supports.
			</td>
		</tr>
		<tr>
			<td>Buffer size</td>
			<td>
				128 to 4096 frames at 48 kHz, 2048 by default, scaled up for higher sample rates. Raise it
				if you hear crackles, lower it if pause feels slow.
			</td>
		</tr>
	</tbody>
</table>
<p class="note">
	While Spotify plays through <a href="/docs/providers#soloist">Soloist</a>, the output settings and
	the equalizer apply to local files only.
</p>

<h2 id="equalizer">Equalizer</h2>
<p>
	Open it from <MenuPath steps={['Settings', 'Playback', 'Sound', 'Equalizer']} />.
	<strong>Simple</strong> mode has the presets and the <strong>Bass</strong> and
	<strong>Treble</strong> sliders, up to 12 dB either way on top of the preset.
	<strong>Advanced</strong> mode has up to 20 filters: peak, low shelf, high shelf, low pass, high pass,
	notch, band pass and all pass.
</p>
<p>On the graph:</p>
<ul>
	<li>drag a filter to move it</li>
	<li>scroll over a filter to change its width</li>
	<li>double-click to add a filter</li>
	<li>right-click a filter to remove it</li>
</ul>
<p>
	If the sound clips, press <strong>Lower preamp</strong>. Undo with <kbd>Ctrl</kbd> <kbd>Z</kbd>,
	redo with <kbd>Ctrl</kbd> <kbd>Shift</kbd> <kbd>Z</kbd>. On macOS, use <kbd>⌘</kbd>.
</p>

<h3 id="import">Importing a profile</h3>
<p>
	<strong>Import and export</strong> takes Equalizer APO text, the format AutoEQ and Room EQ Wizard
	publish, from a file or the clipboard. Unsupported lines, such as <code>Channel</code>,
	<code>Convolution</code> or <code>GraphicEQ</code>, are skipped.
</p>

<h3 id="device-rules">Device rules</h3>
<p>
	Under <strong>Device rules</strong>, assign a preset or profile to an output device. It switches
	on when playback starts on that device. <strong>Any other device</strong> covers the rest.
</p>
