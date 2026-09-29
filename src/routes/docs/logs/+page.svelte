<script lang="ts">
	import Code from '$lib/components/docs/Code.svelte';
</script>

<svelte:head>
	<title>Logs · Sonora docs</title>
</svelte:head>

<h1>Logs</h1>
<p class="summary">
	Sonora writes a log file on every platform. Attach it to bug reports. It stays on your machine
	unless you send it to someone.
</p>

<h2 id="location">Location</h2>
<p><strong>Settings → About → Log file → Open log</strong> opens it in your default text editor.</p>
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
	The file is capped at 16 MB. When it fills up, it moves to <code>sonora.log.1</code> and a new one starts,
	so the two never take more than 32 MB. The first line holds the Sonora version.
</p>

<h2 id="verbose">More detail</h2>
<p>
	By default the log holds warnings plus debug lines from Sonora's own modules. For a bug that is
	hard to pin down, start Sonora with <code>SONORA_LOG=debug</code> to log everything.
</p>
<Code label="Linux" text="SONORA_LOG=debug sonora" />
<Code label="Flatpak" text="flatpak run --env=SONORA_LOG=debug io.github.nolight132.sonora" />
<Code label="macOS, then start Sonora" text="launchctl setenv SONORA_LOG debug" />
<Code label="Windows, then start Sonora" text="setx SONORA_LOG debug" />
<p>
	On macOS and Windows the variable stays set. Clear it afterwards with
	<code>launchctl unsetenv SONORA_LOG</code>, or on Windows with
	<code>reg delete HKCU\Environment /v SONORA_LOG /f</code>, because debug logs grow fast.
</p>

<h2 id="terminal">Terminal output</h2>
<p>
	When you start Sonora from a terminal, it also prints warnings to stderr. <code>RUST_LOG</code>
	sets that level and does not change the file. Windows builds have no console.
</p>
