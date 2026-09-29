<script lang="ts">
	import { repo } from '$lib/data/links';

	/** One roadmap line. `done` is the release it shipped in, or `true` when the release isn't recorded. `issue` and `pull` link the discussion behind it. */
	type Entry = { text: string; issue?: number; pull?: number; done?: string | true };

	const areas: { id: string; title: string; entries: Entry[] }[] = [
		{
			id: 'providers',
			title: 'Providers',
			entries: [
				{ text: 'Jellyfin', issue: 422 },
				{ text: 'SoundCloud', issue: 474 },
				{ text: 'NetEase Cloud Music', pull: 801 },
				{ text: 'Spotify', done: '0.1' },
				{ text: 'YouTube Music', done: '0.8' },
				{ text: 'Local files', done: '0.9' },
				{ text: 'Subsonic and Navidrome', done: '0.32' },
				{ text: 'Deezer', issue: 421, done: '0.37' },
				{ text: 'Apple Music', done: '0.37' }
			]
		},
		{
			id: 'playback',
			title: 'Playback',
			entries: [
				{ text: 'A quality setting where the provider offers more than one stream' },
				{ text: 'SponsorBlock for YouTube Music', issue: 431 },
				{ text: 'Gapless playback', done: '0.5' },
				{ text: 'System media controls', done: '0.6' },
				{ text: 'Sleep timer', done: '0.32' },
				{ text: 'Ten-band equalizer', done: '0.35' }
			]
		},
		{
			id: 'lyrics',
			title: 'Lyrics',
			entries: [
				{ text: 'Choose the order lyrics providers are tried in', issue: 498 },
				{ text: 'Unison as a lyrics provider', issue: 477 },
				{ text: 'Glow and wave animation for lyrics', issue: 423 },
				{ text: 'Synced lyrics', done: '0.9' },
				{ text: 'Word-by-word karaoke lyrics and romanization', done: '0.17' },
				{ text: 'A timing offset for synced lyrics', issue: 428, done: true }
			]
		},
		{
			id: 'library',
			title: 'Library and playlists',
			entries: [
				{ text: 'Reorder playlists and give them custom covers', issue: 806 },
				{ text: 'Import and export playlists in a standard format', issue: 642 },
				{ text: 'A rethought library tab', issue: 13, done: true },
				{ text: 'Favourites, playlists and a tag editor for local files', done: '0.26' }
			]
		},
		{
			id: 'player',
			title: 'Player and interface',
			entries: [
				{ text: 'Animated album covers in the fullscreen player', issue: 537 },
				{ text: 'A background gradient taken from the album art', issue: 47 },
				{ text: 'A glow behind the album art that pulses with the music', issue: 325 },
				{ text: 'Use the system fullscreen mode, as a setting', issue: 602 },
				{ text: 'Fullscreen player with lyrics and the queue', done: '0.15' },
				{ text: 'System tray and spectrum visualizer', done: '0.30' },
				{ text: 'Custom themes as JSON files', done: '0.41' }
			]
		},
		{
			id: 'control',
			title: 'Shortcuts and integrations',
			entries: [
				{ text: 'Customizable keyboard shortcuts' },
				{ text: 'A rethink of global shortcuts', issue: 10 },
				{ text: 'Vim-style navigation', issue: 263 },
				{ text: 'Control Sonora from the command line, like sonora next-track', pull: 777 },
				{ text: 'Discord status', done: '0.34' },
				{ text: 'Cover art in Discord for local music', issue: 571, done: '0.40' },
				{ text: 'Scrobbling to Last.fm, Libre.fm, ListenBrainz and Maloja', done: '0.36' }
			]
		},
		{
			id: 'platforms',
			title: 'Platforms and packaging',
			entries: [
				{ text: 'WinGet', issue: 383 },
				{ text: 'Snap', issue: 663 },
				{ text: 'Nix flake and Home Manager module', done: '0.31' },
				{ text: 'Windows installer', done: '0.17' },
				{ text: 'In-app updates on Windows', issue: 53, done: '0.19' },
				{ text: 'Flatpak', done: '0.29' },
				{ text: 'Windows on ARM', done: '0.32' },
				{ text: 'Open audio files from your file manager', issue: 438, done: '0.34' },
				{ text: 'AppImage', done: '0.36' }
			]
		}
	];
</script>

<svelte:head>
	<title>Roadmap · Sonora docs</title>
</svelte:head>

<h1>Roadmap</h1>
<p class="summary">
	What we're working toward, grouped by area. Crossed-out lines have shipped, with the release they
	came in.
</p>

<p class="note">
	The order means nothing. For what won't be built at all, see <a href="/docs/vision">Vision</a>.
</p>

{#each areas as area (area.id)}
	<h2 id={area.id}>{area.title}</h2>
	<ul class="entries">
		{#each area.entries as entry (entry.text)}
			<li class:done={entry.done}>
				{#if entry.done}<s>{entry.text}</s>{:else}{entry.text}{/if}
				{#if entry.issue}
					<a class="ref mono" href="{repo}/issues/{entry.issue}">#{entry.issue}</a>
				{:else if entry.pull}
					<a class="ref mono" href="{repo}/pull/{entry.pull}">#{entry.pull}</a>
				{/if}
				{#if typeof entry.done === 'string'}
					<span class="ref mono">v{entry.done}</span>
				{/if}
			</li>
		{/each}
	</ul>
{/each}

<h2 id="suggest">Suggesting something</h2>
<p>
	Read <a href="/docs/vision">Vision</a> first, then open a
	<a href="{repo}/issues/new/choose">feature request</a>. See
	<a href="/docs/help#features">Getting help</a> for what a good request includes.
</p>

<style>
	.entries li {
		color: var(--fg);
	}

	.entries li.done {
		color: var(--dim);
	}

	s {
		text-decoration-color: var(--faint);
	}

	.ref {
		margin-left: 6px;
		font-size: 12px;
		color: var(--dim);
	}

	a.ref:hover {
		color: var(--fg);
	}
</style>
