<script lang="ts">
	import Code from '$lib/components/docs/Code.svelte';

	/** One row of the command table, the command as typed and what it does. */
	type Command = { command: string; action: string };

	const playback: Command[] = [
		{ command: 'sonora play / pause / toggle', action: 'Resume, pause, or switch between the two' },
		{ command: 'sonora next / prev', action: 'Skip to the next song, or go back' },
		{
			command: 'sonora seek 50 | 1:30 | +10',
			action: 'Jump to a percent, to a time, or by a number of seconds'
		},
		{
			command: 'sonora volume [N | +N | -N]',
			action: 'Print the volume, set it from 0 to 100, or step it'
		},
		{ command: 'sonora mute [on | off | toggle]', action: 'Print or switch mute' },
		{ command: 'sonora shuffle [on | off | toggle]', action: 'Print or switch shuffle' },
		{ command: 'sonora repeat [off | all | one]', action: 'Print or set repeat' },
		{
			command: 'sonora like [on | off | toggle]',
			action: 'Print whether the current song is liked, or change it'
		}
	];

	const queue: Command[] = [
		{ command: 'sonora play <file or link>...', action: 'Play now, then carry on with the queue' },
		{ command: 'sonora play -s <query>', action: 'Play the best search hit now' },
		{ command: 'sonora add <file or link>...', action: 'Queue after the songs you queued by hand' },
		{ command: 'sonora play-next <file or link>...', action: 'Queue right after the current song' },
		{ command: 'sonora add -s <query>', action: 'Queue the best search hit' },
		{ command: 'sonora add --at N ...', action: 'Queue at position N, where 1 plays next' },
		{ command: 'sonora search <query> [-n N]', action: 'Search the current provider' },
		{
			command: 'sonora queue',
			action: 'Print what played, what plays and what follows, without changing it'
		},
		{ command: 'sonora queue remove <uid>', action: 'Take an upcoming song out of the queue' },
		{ command: 'sonora queue move <uid> <gap>', action: 'Move an upcoming song, 0 being next' },
		{ command: 'sonora queue clear', action: 'Drop everything after the current song' }
	];

	const playlists: Command[] = [
		{ command: 'sonora playlist list', action: 'List your playlists with their ids' },
		{
			command: 'sonora playlist create <name> [--tracks ID...] [--local]',
			action: 'Create a playlist, optionally with songs in it'
		},
		{ command: 'sonora playlist rename <id> <name>', action: 'Rename a playlist' },
		{ command: 'sonora playlist public <id> on | off', action: 'Make a playlist public or not' },
		{ command: 'sonora playlist add <id> <track>...', action: 'Add songs to a playlist' },
		{ command: 'sonora playlist remove <id> <track>...', action: 'Take songs out of a playlist' },
		{ command: 'sonora playlist delete <id>', action: 'Delete a playlist' }
	];

	const status: Command[] = [
		{ command: 'sonora current', action: 'Print what plays now as JSON' },
		{ command: 'sonora watch [--position]', action: 'Print a line of JSON on every change' },
		{ command: 'sonora lyrics', action: 'Print the lyrics of the current song with their times' },
		{ command: 'sonora providers', action: 'List the providers and which one is current' },
		{ command: 'sonora provider [slug]', action: 'Print the current provider, or switch' },
		{
			command: 'sonora session [start | join CODE | leave]',
			action: 'Print, start, join or leave a Session'
		},
		{ command: 'sonora completions <shell>', action: 'Print a completion script' },
		{ command: 'sonora --version', action: 'Print the version' }
	];

	const sections = [
		{ id: 'playback', title: 'Playback', rows: playback },
		{ id: 'queue', title: 'Queue and search', rows: queue },
		{ id: 'playlists', title: 'Playlists', rows: playlists },
		{ id: 'status', title: 'Status and the rest', rows: status }
	];

	const examples = `sonora toggle
sonora current | jq -r .track.title
sonora play -s "What's Up?"
sonora search daft punk --json | jq -r '.[0].link'`;

	const hyprland = `bind = SUPER, right, exec, sonora seek +10
bind = SUPER, left, exec, sonora seek -10`;

	const watch = `sonora watch | jq --unbuffered -r '.track.title // ""'`;

	const completions = `sonora completions bash > ~/.local/share/bash-completion/completions/sonora
sonora completions zsh > "\${fpath[1]}/_sonora"
sonora completions fish > ~/.config/fish/completions/sonora.fish`;
</script>

<svelte:head>
	<title>Command line · Sonora docs</title>
</svelte:head>

<h1>Command line</h1>
<p class="summary">
	Control a running Sonora from a terminal, a script or a key binding. The commands are part of the
	<code>sonora</code> binary, so there is nothing else to install.
</p>

<Code text={examples} />
<p>
	A command never starts Sonora. With none running it exits with code 3. Run
	<code>sonora --help</code> for the full list, or <code>sonora &lt;command&gt; --help</code> for one
	command.
</p>
<p class="note">
	With Flatpak, run commands through the sandbox: <code
		>flatpak run io.github.nolight132.sonora next</code
	>.
</p>

{#each sections as section (section.id)}
	<h2 id={section.id}>{section.title}</h2>
	<table>
		<tbody>
			{#each section.rows as row (row.command)}
				<tr>
					<td><code>{row.command}</code></td>
					<td>{row.action}</td>
				</tr>
			{/each}
		</tbody>
	</table>
{/each}

<h2 id="details">Details</h2>
<p>
	<code>-s</code> picks a song. Add <code>-t album</code>, <code>-t artist</code> or
	<code>-t playlist</code> for another kind. Add <code>--local</code> to <code>play -s</code>,
	<code>add -s</code> or <code>play-next -s</code> to search your local music instead of the current
	provider. Quote a query only when it has characters your shell reads, such as <code>'</code>,
	<code>?</code> or <code>&amp;</code>.
</p>
<p>
	Links have to belong to the current provider. Switch first with <code>sonora provider</code>.
	Relative file paths start from the folder you run the command in. If one item fails, nothing is
	queued.
</p>
<p>
	<code>mute off</code> brings back the volume you had before muting. <code>like</code> waits for the
	provider to save the change and exits with code 1 if it fails.
</p>
<p>
	<code>add --at</code> counts only songs ahead in the queue, never recommendations, and a position
	past the end adds to the end. It works with <code>-s</code> too.
</p>
<p>
	<code>queue</code> marks songs you queued by hand with <code>[queued]</code> and recommendations
	with <code>[suggested]</code>. It lists at most 100 played and 100 upcoming songs.
	<code>queue remove</code> and <code>queue move</code> take the <code>uid</code> each row has in
	<code>queue --json</code>. Keep the <code>uid</code> rather than a row number, since positions change
	as songs play. While another device plays, the queue can't be edited.
</p>
<p>
	The <code>playlist</code> commands take the <code>id</code> from
	<code>playlist list --json</code>. Songs are given by their <code>id</code> from
	<code>search --json</code>. <code>--local</code> creates the playlist in your local library. A command
	returns once Sonora accepts the change, and the app shows a toast when the service has saved it.
</p>
<p>
	<code>lyrics</code> prints what Sonora already loaded for the current song and never looks lyrics up
	itself.
</p>
<p>While Sonora controls another Spotify device, playback commands go to that device.</p>
<p>A step with <code>seek</code> fits a key binding, for example in Hyprland:</p>
<Code label="hyprland.conf" text={hyprland} />

<h2 id="scripts">Scripts and status bars</h2>
<p>
	Add <code>--json</code> to any command for one line of JSON. <code>current</code> always prints
	JSON, or <code>null</code> when nothing is loaded. It has the state, the song, the position in seconds,
	the volume as a percent, shuffle, repeat, the provider, whether the song is liked and what it plays
	from.
</p>
<p>
	<code>watch</code> prints the same JSON again whenever the song, state, volume, shuffle or repeat
	changes. <code>--position</code> adds a line every second while a song plays.
</p>
<Code text={watch} />
<p>
	<code>queue --json</code> has <code>previous</code>, <code>current</code> and
	<code>upcoming</code>, and each entry has a <code>kind</code> of <code>context</code>,
	<code>queued</code> or <code>suggested</code>. <code>lyrics --json</code> adds the line sung now
	as <code>current</code> and the one after it as <code>next</code>. Both are <code>null</code> for lyrics
	without times.
</p>
<table>
	<thead>
		<tr><th>Exit code</th><th>Meaning</th></tr>
	</thead>
	<tbody>
		<tr><td>0</td><td>Done</td></tr>
		<tr><td>1</td><td>Sonora refused the command or didn't answer</td></tr>
		<tr><td>2</td><td>The command line is wrong. Nothing was sent.</td></tr>
		<tr><td>3</td><td>Sonora isn't running</td></tr>
	</tbody>
</table>

<h2 id="completions">Shell completions</h2>
<p>
	The AUR, Nix and Homebrew packages install completions for bash, zsh and fish, and Homebrew puts
	<code>sonora</code> on your PATH. Otherwise, write a script for bash, zsh, fish, elvish or PowerShell
	yourself.
</p>
<Code text={completions} />
