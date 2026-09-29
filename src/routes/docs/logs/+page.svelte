<script lang="ts">
	import MenuPath from '$lib/components/docs/MenuPath.svelte';
	import Code from '$lib/components/docs/Code.svelte';
</script>

<svelte:head>
	<title>Logs · Sonora docs</title>
</svelte:head>

<h1>Logs</h1>
<p class="summary">
	Sonora keeps a log file on every platform. It never leaves your machine unless you send it to
	someone, and if you're filing a bug, please do.
</p>

<h2 id="location">Location</h2>
<p>
	<MenuPath steps={['Settings', 'About', 'Log file', 'Open log']} /> opens it in your default text editor.
	Or find it yourself:
</p>
<table>
	<tbody>
		<tr><td>Linux</td><td><code>~/.local/state/sonora/sonora.log</code></td></tr>
		<tr>
			<td>Flatpak</td>
			<td><code>~/.var/app/io.github.nolight132.sonora/.local/state/sonora/sonora.log</code></td>
		</tr>
		<tr><td>macOS</td><td><code>~/Library/Caches/sonora/sonora.log</code></td></tr>
		<tr><td>Windows</td><td><code>%LOCALAPPDATA%\sonora\sonora.log</code></td></tr>
	</tbody>
</table>
<p>
	The log is capped at 16 MB. When it fills up it becomes <code>sonora.log.1</code> and a fresh file starts,
	so you never have more than 32 MB of logs. The first line tells you which version wrote it.
</p>

<h2 id="verbose">More detail</h2>
<p>
	By default you get warnings plus debug output from Sonora's own code. If a bug is hard to pin
	down, start Sonora with <code>SONORA_LOG=debug</code> and it logs everything.
</p>
<Code label="Linux" text="SONORA_LOG=debug sonora" />
<Code label="Flatpak" text="flatpak run --env=SONORA_LOG=debug io.github.nolight132.sonora" />
<Code label="macOS, then start Sonora" text="launchctl setenv SONORA_LOG debug" />
<Code label="Windows, then start Sonora" text="setx SONORA_LOG debug" />
<p>
	On macOS and Windows the variable sticks around, and debug logs grow fast. Clear it when you're
	done with <code>launchctl unsetenv SONORA_LOG</code> on macOS or
	<code>reg delete HKCU\Environment /v SONORA_LOG /f</code> on Windows.
</p>

<h2 id="terminal">Terminal output</h2>
<p>
	Start Sonora from a terminal and it also prints warnings to stderr. <code>RUST_LOG</code> controls that
	output and leaves the file alone. Windows builds don't open a console.
</p>
