<script lang="ts">
	import { onMount } from 'svelte';
	import CopyButton from '$lib/components/CopyButton.svelte';
	import { discord, matrix, repo } from '$lib/data/links';

	/** The table of contents, in page order. Each id matches a section heading below. */
	const toc = [
		{ id: 'start', label: 'Getting started' },
		{ id: 'providers', label: 'Providers' },
		{ id: 'settings', label: 'Settings file' },
		{ id: 'shortcuts', label: 'Keyboard shortcuts' },
		{ id: 'lyrics', label: 'Lyrics' },
		{ id: 'scrobbling', label: 'Scrobbling' },
		{ id: 'troubleshooting', label: 'Troubleshooting' },
		{ id: 'help', label: 'Getting help' }
	];

	const paths = [
		{ os: 'Linux', path: '~/.config/sonora/settings.json' },
		{ os: 'macOS', path: '~/Library/Application Support/sonora/settings.json' },
		{ os: 'Windows', path: '%APPDATA%\\sonora\\settings.json' }
	];

	/** The global bindings from Sonora's input crate. The playback keys only fire while no text field has focus. */
	const shortcuts = [
		{ keys: ['Space'], action: 'Play or pause' },
		{ keys: ['Ctrl', '←'], action: 'Previous song' },
		{ keys: ['Ctrl', '→'], action: 'Next song' },
		{ keys: ['F'], action: 'Toggle the fullscreen player' },
		{ keys: ['Ctrl', 'F'], action: 'Filter the current view' },
		{ keys: ['Ctrl', 'Shift', 'F'], action: 'Open search' },
		{ keys: ['Ctrl', 'R'], action: 'Refresh the library' },
		{ keys: ['Ctrl', ','], action: 'Open settings' },
		{ keys: ['Alt', '←'], action: 'Go back' },
		{ keys: ['Alt', '→'], action: 'Go forward' },
		{ keys: ['Esc'], action: 'Dismiss a sheet or clear the selection' },
		{ keys: ['Ctrl', 'Q'], action: 'Quit' }
	];

	const homeManager = `{
  imports = [ inputs.sonora.homeManagerModules.default ];
  programs.sonora = {
    enable = true;
    settings = {
      provider = "youtube";
      appearance.theme = "dark";
    };
  };
}`;

	let active = $state(toc[0].id);

	/** Highlights the table of contents entry for the section nearest the top of the viewport. */
	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				const seen = entries.filter((entry) => entry.isIntersecting);
				if (seen.length) active = seen[0].target.id;
			},
			{ rootMargin: '-80px 0px -70% 0px' }
		);
		for (const { id } of toc) {
			const element = document.getElementById(id);
			if (element) observer.observe(element);
		}
		return () => observer.disconnect();
	});
</script>

<svelte:head>
	<title>Docs · Sonora</title>
	<meta
		name="description"
		content="How to install Sonora, connect a streaming service, find the settings file and use the keyboard shortcuts."
	/>
</svelte:head>

<section class="section intro">
	<span class="cross start"></span>
	<span class="cross end"></span>

	<div class="page">
		<span class="kicker">Docs</span>
		<h1>Using Sonora</h1>
		<p class="summary">
			Sonora is a native player for Spotify, YouTube Music, Apple Music, Deezer, Subsonic and local
			files. This page covers the first launch, where the settings live and what to do when audio
			will not start.
		</p>
	</div>
</section>

<section class="section">
	<span class="cross start"></span>
	<span class="cross end"></span>

	<div class="page layout">
		<aside>
			<nav aria-label="On this page">
				<span class="kicker">On this page</span>
				{#each toc as entry (entry.id)}
					<a href="#{entry.id}" class:on={active === entry.id}>{entry.label}</a>
				{/each}
			</nav>
		</aside>

		<article>
			<h2 id="start">Getting started</h2>
			<p>
				Install Sonora with the command for your system from the <a href="/#steps">install steps</a
				>. On first launch it asks which service to play from. You can add more later in settings,
				and switch between them from the sidebar.
			</p>
			<p>
				Sonora does not replace a subscription. If a service needs a paid plan to play a track, it
				needs one in Sonora too.
			</p>

			<h2 id="providers">Providers</h2>
			<div class="wire grid">
				<div class="cell">
					<h3>Spotify</h3>
					<p>Sign in with your Spotify account. Playback needs Premium.</p>
				</div>
				<div class="cell">
					<h3>YouTube Music</h3>
					<p>Sign in through the embedded Google page. Sonora keeps the session cookies locally.</p>
				</div>
				<div class="cell">
					<h3>Apple Music</h3>
					<p>Sign in with an Apple ID that has an active Apple Music subscription.</p>
				</div>
				<div class="cell">
					<h3>Deezer</h3>
					<p>Sign in with your Deezer account.</p>
				</div>
				<div class="cell">
					<h3>Subsonic and Navidrome</h3>
					<p>Enter the server address, user name and password of your own server.</p>
				</div>
				<div class="cell">
					<h3>Local files</h3>
					<p>
						Point Sonora at one or more folders. It reads the tags when it scans them and splits
						artist tags such as "A feat. B" into separate artists.
					</p>
				</div>
			</div>

			<h2 id="settings">Settings file</h2>
			<p>
				Everything you change in the settings page is written to one JSON file. Quit Sonora before
				you edit it by hand, or it will overwrite your change on the next save.
			</p>
			<div class="wire table">
				{#each paths as row (row.os)}
					<div class="tr">
						<span class="os">{row.os}</span>
						<code class="mono">{row.path}</code>
					</div>
				{/each}
			</div>
			<p>
				On NixOS and Home Manager you can declare the same settings under <code
					>programs.sonora</code
				>.
			</p>
			<div class="code">
				<pre class="mono">{homeManager}</pre>
				<CopyButton text={homeManager} />
			</div>

			<h2 id="shortcuts">Keyboard shortcuts</h2>
			<p>
				On macOS, use <kbd>⌘</kbd> wherever this table says <kbd>Ctrl</kbd>. The playback keys only
				work while no text field has focus.
			</p>
			<div class="wire table">
				{#each shortcuts as row (row.action)}
					<div class="tr">
						<span class="keys">
							{#each row.keys as key (key)}<kbd>{key}</kbd>{/each}
						</span>
						<span>{row.action}</span>
					</div>
				{/each}
			</div>

			<h2 id="lyrics">Lyrics</h2>
			<p>
				Open the fullscreen player with <kbd>F</kbd> to see lyrics. Where the source has timing, lines
				scroll with the song and karaoke lyrics light up word by word. Background vocals get their own
				line, and lyrics in non-Latin scripts can show a romanization beneath them.
			</p>

			<h2 id="scrobbling">Scrobbling</h2>
			<p>
				Link Last.fm, ListenBrainz, Libre.fm or Maloja under settings. You can link several at once
				and Sonora sends every play to each of them.
			</p>

			<h2 id="troubleshooting">Troubleshooting</h2>
			<h3>macOS says the app is damaged</h3>
			<p>
				The app is not signed yet, so macOS quarantines it. Clear the flag once after installing.
			</p>
			<div class="code">
				<pre class="mono">xattr -dr com.apple.quarantine /Applications/Sonora.app</pre>
				<CopyButton text="xattr -dr com.apple.quarantine /Applications/Sonora.app" />
			</div>

			<h3>No sound on Linux</h3>
			<p>
				Sonora talks to ALSA, so it needs the ALSA plugin for your sound server. Install
				<code>pipewire-alsa</code> on PipeWire or <code>pulseaudio-alsa</code> on PulseAudio.
			</p>

			<h3>The AppImage will not open a window</h3>
			<p>
				The AppImage ships without a Vulkan driver. Install the Vulkan driver for your GPU from your
				distribution.
			</p>

			<h2 id="help">Getting help</h2>
			<p>
				Ask on <a href={discord}>Discord</a> or <a href={matrix}>Matrix</a>, which are bridged.
				Report bugs on <a href="{repo}/issues">GitHub</a> with your system, the Sonora version and the
				provider you were playing from.
			</p>
		</article>
	</div>
</section>

<style>
	.intro .page {
		display: flex;
		flex-direction: column;
		gap: 12px;
		padding-top: 72px;
		padding-bottom: 48px;
	}

	h1 {
		font-size: 40px;
		line-height: 1.1;
	}

	.summary {
		max-width: 620px;
		font-size: 17px;
		line-height: 1.55;
		color: var(--muted-fg);
		text-wrap: pretty;
	}

	.layout {
		display: grid;
		grid-template-columns: 200px minmax(0, 1fr);
		gap: 56px;
		padding-top: 40px;
		padding-bottom: 96px;
	}

	aside nav {
		position: sticky;
		top: calc(var(--header) + 32px);
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	aside .kicker {
		margin-bottom: 10px;
	}

	aside a {
		padding: 6px 0 6px 12px;
		border-left: 1px solid var(--line);
		font-size: 13px;
		color: var(--muted-fg);
	}

	aside a:hover {
		color: var(--fg);
	}

	aside a.on {
		border-left-color: var(--fg);
		color: var(--fg);
	}

	article {
		max-width: 720px;
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	article h2 {
		margin-top: 40px;
		scroll-margin-top: calc(var(--header) + 24px);
	}

	article h2:first-child {
		margin-top: 0;
	}

	article > h3 {
		margin-top: 12px;
	}

	article p {
		font-size: 15px;
		line-height: 1.65;
		color: var(--muted-fg);
		text-wrap: pretty;
	}

	article p a {
		color: var(--fg);
		text-decoration: underline;
		text-decoration-color: var(--faint);
		text-underline-offset: 3px;
	}

	article p a:hover {
		text-decoration-color: var(--fg);
	}

	code,
	kbd {
		font-family: var(--mono);
		font-size: 12.5px;
	}

	p code {
		padding: 2px 6px;
		border-radius: 6px;
		background: var(--secondary);
		color: var(--fg);
	}

	kbd {
		display: inline-flex;
		align-items: center;
		min-width: 22px;
		height: 22px;
		justify-content: center;
		padding: 0 6px;
		border: 1px solid var(--border);
		border-bottom-width: 2px;
		border-radius: 6px;
		background: var(--card);
		color: var(--fg);
	}

	.grid {
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}

	.cell {
		display: flex;
		flex-direction: column;
		gap: 8px;
		padding: 20px;
	}

	.cell p {
		font-size: 13.5px;
		line-height: 1.55;
	}

	.table {
		grid-template-columns: minmax(0, 1fr);
	}

	.tr {
		display: grid;
		grid-template-columns: 160px minmax(0, 1fr);
		align-items: center;
		gap: 16px;
		min-height: 44px;
		padding: 8px 16px;
		font-size: 13.5px;
		color: var(--muted-fg);
	}

	.os {
		color: var(--fg);
	}

	.tr code {
		overflow-wrap: anywhere;
		color: var(--fg);
	}

	.keys {
		display: flex;
		gap: 4px;
	}

	.code {
		position: relative;
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 12px;
		padding: 14px 12px 14px 16px;
		border: 1px solid var(--line);
		border-radius: var(--radius);
		background: var(--card);
	}

	.code pre {
		margin: 0;
		overflow-x: auto;
		font-size: 13px;
		line-height: 1.6;
	}

	@media (max-width: 900px) {
		.intro .page {
			padding-top: 48px;
			padding-bottom: 32px;
		}

		h1 {
			font-size: 30px;
		}

		.layout {
			grid-template-columns: minmax(0, 1fr);
			gap: 24px;
			padding-bottom: 64px;
		}

		aside {
			display: none;
		}

		.grid {
			grid-template-columns: minmax(0, 1fr);
		}

		.tr {
			grid-template-columns: minmax(0, 1fr);
			gap: 6px;
		}
	}
</style>
