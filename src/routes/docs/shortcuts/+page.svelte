<script lang="ts">
	/** One row of a shortcut table. `keys` are shown as separate key caps and read left to right. */
	type Shortcut = { keys: string[]; action: string };

	const playback: Shortcut[] = [
		{ keys: ['Space'], action: 'Play or pause' },
		{ keys: ['Ctrl', '←'], action: 'Previous song' },
		{ keys: ['Ctrl', '→'], action: 'Next song' },
		{ keys: ['F'], action: 'Open or close the fullscreen player' }
	];

	const navigation: Shortcut[] = [
		{ keys: ['Ctrl', 'F'], action: 'Filter the current view' },
		{ keys: ['Ctrl', 'Shift', 'F'], action: 'Open search' },
		{ keys: ['Ctrl', ','], action: 'Open settings' },
		{ keys: ['Ctrl', 'R'], action: 'Refresh the library' },
		{ keys: ['Alt', '←'], action: 'Go back' },
		{ keys: ['Alt', '→'], action: 'Go forward' },
		{ keys: ['Esc'], action: 'Close the open sheet or menu' },
		{ keys: ['Ctrl', 'Q'], action: 'Quit' }
	];

	const lists: Shortcut[] = [
		{ keys: ['↑'], action: 'Select the previous row' },
		{ keys: ['↓'], action: 'Select the next row' },
		{ keys: ['Shift', '↑'], action: 'Extend the selection up' },
		{ keys: ['Shift', '↓'], action: 'Extend the selection down' },
		{ keys: ['Enter'], action: 'Play or open the selected row' },
		{ keys: ['Delete'], action: 'Remove the selected rows, after a confirmation' },
		{ keys: ['Esc'], action: 'Clear the selection' }
	];

	const macos: Shortcut[] = [
		{ keys: ['⌘', 'W'], action: 'Close the window' },
		{ keys: ['⌘', 'M'], action: 'Minimize' },
		{ keys: ['⌘', 'H'], action: 'Hide Sonora' },
		{ keys: ['⌥', '⌘', 'H'], action: 'Hide other apps' },
		{ keys: ['⌃', '⌘', 'F'], action: 'Enter or leave full screen' },
		{ keys: ['⌘', '['], action: 'Go back' },
		{ keys: ['⌘', ']'], action: 'Go forward' }
	];

	const sections = [
		{ id: 'playback', title: 'Playback', rows: playback },
		{ id: 'navigation', title: 'Navigation', rows: navigation },
		{ id: 'lists', title: 'Lists and tables', rows: lists },
		{ id: 'macos', title: 'macOS window', rows: macos }
	];
</script>

<svelte:head>
	<title>Shortcuts · Sonora docs</title>
</svelte:head>

<h1>Shortcuts</h1>
<p class="summary">
	On macOS the navigation shortcuts take <kbd>⌘</kbd> as well as <kbd>Ctrl</kbd>, and <kbd>Alt</kbd>
	is <kbd>⌥</kbd>.
</p>

<p class="note">You can't rebind anything yet. Custom shortcuts are on the way.</p>
<p>
	Playback shortcuts work while the app has focus and you aren't typing in a text field. In a text
	field, <kbd>Space</kbd> types a space and <kbd>Ctrl</kbd> with the arrow keys moves through words. List
	shortcuts act on the focused list or table.
</p>

{#each sections as section (section.id)}
	<h2 id={section.id}>{section.title}</h2>
	<table>
		<tbody>
			{#each section.rows as row (row.action)}
				<tr>
					<td>
						<span class="keys">
							{#each row.keys as key (key)}<kbd>{key}</kbd>{/each}
						</span>
					</td>
					<td>{row.action}</td>
				</tr>
			{/each}
		</tbody>
	</table>
{/each}
