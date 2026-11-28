<script lang="ts">
	import AppButton from '$lib/components/docs/AppButton.svelte';
	import MenuPath from '$lib/components/docs/MenuPath.svelte';

	/** One row of a shortcut table. `keys` are shown as separate key caps and read left to right. */
	type Shortcut = { keys: string[]; action: string };

	const playback: Shortcut[] = [
		{ keys: ['Space'], action: 'Play or pause' },
		{ keys: ['Ctrl', '←'], action: 'Previous song' },
		{ keys: ['Ctrl', '→'], action: 'Next song' },
		{ keys: ['↑'], action: 'Volume up' },
		{ keys: ['↓'], action: 'Volume down' },
		{ keys: ['←'], action: 'Skip back 5 seconds' },
		{ keys: ['→'], action: 'Skip forward 5 seconds' }
	];

	const navigation: Shortcut[] = [
		{ keys: ['Ctrl', 'K'], action: 'Quick search' },
		{ keys: ['Ctrl', 'F'], action: 'Open search' },
		{ keys: ['/'], action: 'Filter the current page' },
		{ keys: ['Ctrl', ','], action: 'Open settings' },
		{ keys: ['Ctrl', 'R'], action: 'Reload the current page' },
		{ keys: ['Alt', '←'], action: 'Go back' },
		{ keys: ['Alt', '→'], action: 'Go forward' },
		{ keys: ['Esc'], action: 'Close the open dialog or menu, or leave the fullscreen player' },
		{ keys: ['Ctrl', 'Q'], action: 'Quit' }
	];

	const display: Shortcut[] = [
		{ keys: ['F'], action: 'Open or close the fullscreen player' },
		{ keys: ['Q'], action: 'Show or hide the queue' },
		{ keys: ['L'], action: 'Show or hide the lyrics' },
		{ keys: ['F11'], action: 'Make the window fill the screen, or go back' },
		{ keys: ['Ctrl', '+'], action: 'Make the text bigger' },
		{ keys: ['Ctrl', '-'], action: 'Make the text smaller' },
		{ keys: ['Ctrl', '0'], action: 'Put the text back to its default size' }
	];

	const quickSearch: Shortcut[] = [
		{ keys: ['↑'], action: 'Previous result' },
		{ keys: ['↓'], action: 'Next result' },
		{ keys: ['Enter'], action: 'Play the song, or open anything else' },
		{ keys: ['Ctrl', 'Enter'], action: "Open the song's page" },
		{ keys: ['Esc'], action: 'Close quick search' }
	];

	const lists: Shortcut[] = [
		{ keys: ['↑'], action: 'Select the previous row' },
		{ keys: ['↓'], action: 'Select the next row' },
		{ keys: ['Shift', '↑'], action: 'Extend the selection up' },
		{ keys: ['Shift', '↓'], action: 'Extend the selection down' },
		{ keys: ['Alt', '↑'], action: 'Move the selected song up in a playlist you own' },
		{ keys: ['Alt', '↓'], action: 'Move the selected song down in a playlist you own' },
		{ keys: ['Enter'], action: 'Play or open the selected row' },
		{ keys: ['Delete'], action: 'Remove the selected rows. Undo on the toast puts them back.' },
		{ keys: ['Esc'], action: 'Clear the selection' }
	];

	const dialogs: Shortcut[] = [
		{ keys: ['Tab'], action: 'Next field' },
		{ keys: ['Shift', 'Tab'], action: 'Previous field' },
		{ keys: ['Enter'], action: 'Confirm' },
		{ keys: ['Esc'], action: 'Close the dialog' }
	];

	const cover: Shortcut[] = [
		{ keys: ['+'], action: 'Zoom in' },
		{ keys: ['-'], action: 'Zoom out' },
		{ keys: ['0'], action: 'Reset the zoom' },
		{ keys: ['Esc'], action: 'Close the viewer' }
	];

	const equalizer: Shortcut[] = [
		{ keys: ['Ctrl', 'Z'], action: 'Undo' },
		{ keys: ['Ctrl', 'Shift', 'Z'], action: 'Redo' },
		{ keys: ['Ctrl', 'Y'], action: 'Redo' }
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
		{ id: 'window', title: 'View and text size', rows: display },
		{ id: 'quick-search', title: 'Quick search', rows: quickSearch },
		{ id: 'lists', title: 'Lists and tables', rows: lists },
		{ id: 'dialogs', title: 'Dialogs', rows: dialogs },
		{ id: 'cover', title: 'Cover viewer', rows: cover },
		{ id: 'equalizer', title: 'Equalizer', rows: equalizer },
		{ id: 'macos', title: 'macOS window', rows: macos }
	];
</script>

<svelte:head>
	<title>Shortcuts · Sonora docs</title>
</svelte:head>

<h1>Shortcuts</h1>
<p class="summary">
	The tables list the default keys. On macOS, use <kbd>⌘</kbd> in place of <kbd>Ctrl</kbd>, except
	for Previous song and Next song, and <kbd>Alt</kbd> is <kbd>⌥</kbd>.
</p>

<p class="note">
	Shortcuts work only while Sonora has focus. For keys that work everywhere, bind
	<a href="/docs/command-line">command line</a> commands in your desktop's settings.
</p>

<h2 id="rebinding">Changing a shortcut</h2>
<p>
	Open <MenuPath steps={['Settings', 'Keybinds']} />, click the key next to an action and press the
	new combination. <kbd>Esc</kbd> cancels and <kbd>Backspace</kbd> leaves the action without a key. Each
	key does one thing, so a key you take from another action stops working there.
</p>
<p>
	Shuffle and Repeat have no key until you give them one. A key without <kbd>Ctrl</kbd>,
	<kbd>Alt</kbd> or <kbd>⌘</kbd> works only while you aren't typing in a text field. The reset
	button on a row puts that shortcut back, and <AppButton>Reset</AppButton> next to Reset all shortcuts
	puts back every one. The keys for lists, dialogs, quick search, the cover viewer and the equalizer can't
	be changed.
</p>

<h2 id="where">Where they work</h2>
<p>
	Single keys such as <kbd>Space</kbd>, <kbd>F</kbd> and <kbd>/</kbd> don't work while you type in a
	text field. There, <kbd>Space</kbd> types a space, <kbd>Ctrl</kbd> with the arrow keys moves
	through words and <kbd>Esc</kbd> leaves the field.
</p>
<p>
	The arrow keys change the volume and skip through the song only when no list, menu or text field
	is using them. On a page with a song list, <kbd>↑</kbd> and <kbd>↓</kbd> select rows instead.
</p>
<p>
	The side buttons of your mouse and a two-finger sideways swipe on a touchpad also go back and
	forward.
</p>
<p>
	<kbd>Q</kbd> and <kbd>L</kbd> open the sidebar on the queue or the lyrics, and close it when it
	already shows them. In the fullscreen player they open its queue and lyrics panels. <kbd>L</kbd> does
	nothing while Show lyrics is off.
</p>
<p>
	In Search, the field lists your search history as soon as the page opens and <kbd>Enter</kbd>
	opens the full results. <kbd>Esc</kbd> closes the suggestions and leaves the field in one press.
	After you click to play something there, <kbd>Space</kbd> pauses and resumes again. Quick search shows
	the same history over any page.
</p>
<p>
	Double-clicking the fullscreen player does the same as <kbd>F11</kbd>. To have every way into the
	fullscreen player fill the screen, turn on
	<MenuPath steps={['Settings', 'Appearance', 'Now playing', 'Use OS fullscreen']} />. Text size you
	change from the keyboard is saved like the one in settings.
</p>
<p>
	Equalizer shortcuts work only on the equalizer screen. Cover viewer shortcuts work while you look
	at a cover or an artist photo you opened from its page.
</p>

{#each sections as section (section.id)}
	<h2 id={section.id}>{section.title}</h2>
	<table>
		<tbody>
			{#each section.rows as row (row.keys.join('+'))}
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
