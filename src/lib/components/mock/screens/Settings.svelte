<script>
	import { settings } from '$lib/mock/settings.svelte.js';
	import Control from '../Control.svelte';
	import Icon from '../Icon.svelte';
	import Picker from '../Picker.svelte';
	import Scrubber from '../Scrubber.svelte';
	import SettingGroup from '../SettingGroup.svelte';
	import SettingRow from '../SettingRow.svelte';
	import Switch from '../Switch.svelte';

	let { tab = 'General' } = $props();

	const listener = { name: 'Alex Rivera', id: '31mfqtv7xk2dwrbn4hpz8ecajlyu' };

	const accounts = [
		{ slug: 'spotify', name: 'Spotify', status: 'Playing from this service', stored: true },
		{ slug: 'youtubemusic', name: 'YouTube Music', status: 'Not connected', stored: false }
	];

	const team = [
		{ login: 'nolight132', role: 'Lead Maintainer' },
		{ login: 'zxsleebu', role: 'Maintainer' },
		{ login: 'fx-got', role: 'Maintainer' },
		{ login: 'Makakashan', role: 'Contributor' },
		{ login: 'imizgun', role: 'Contributor' }
	];

	const notice =
		'Copyright © 2026 Sonora Contributors. Sonora comes with absolutely no warranty. It is free software, and you are welcome to redistribute it under the terms of the GNU General Public License version 3 or later. Sonora is unofficial and is not affiliated with Spotify AB.';
</script>

<div class="page">
	<div class="sheet">
		{#if tab === 'General'}
			<div class="profile">
				<span class="face">{listener.name.slice(0, 1)}</span>
				<div class="who">
					<span class="display">{listener.name}</span>
					<span class="handle">{listener.id}</span>
				</div>
			</div>
			<hr />
			<div class="panel">
				<SettingRow
					title="Show on startup"
					detail="The screen Sonora opens on launch"
					control={startupPick}
				/>
				<hr />
				<SettingRow
					title="Sidebar entries"
					detail="The sections listed in the sidebar"
					control={entriesPick}
				/>
				<hr />
				<SettingRow
					title="Language"
					detail="The language Sonora uses across the interface"
					control={languagePick}
				/>
				<SettingGroup label="Window" />
				<SettingRow
					title="Keep playing when closed"
					detail="Keep Sonora in the system tray and continue playing after its window closes"
					control={trayToggle}
				/>
				<SettingGroup label="Accounts" />
				<div class="accounts">
					<div class="text">
						<span>Manage accounts</span>
						<span class="detail">The services this device can play from</span>
					</div>
					{#each accounts as account (account.slug)}
						<div class="account">
							<div class="head">
								<Icon name={account.slug} size={26} />
								<div class="ident">
									<span class="name">{account.name}</span>
									<span class="hint">{account.status}</span>
								</div>
								{#if account.stored}
									<Control icon="log-out" label="Sign out" small />
								{/if}
							</div>
							{#if !account.stored}
								<div class="methods">
									<Control variant="outline" small label="Use Guest mode" />
									<Control variant="outline" small label="Paste cookies manually" />
								</div>
							{/if}
						</div>
					{/each}
				</div>
				<SettingGroup label="Library" />
				<SettingRow title="Music folders" detail="Not configured" control={folderAction} />
			</div>
		{:else if tab === 'Appearance'}
			<div class="panel">
				<SettingRow
					title="Theme"
					detail="Choose the application colour palette"
					control={themePick}
				/>
				<hr />
				<SettingRow
					title="Adaptive theme"
					detail="Tint the palette with the artwork of the playing album"
					control={adaptiveToggle}
				/>
				<hr />
				<SettingRow
					title="Visualizer"
					detail="Show spectrum bars behind fullscreen artwork"
					control={visualizerToggle}
				/>
				<hr />
				<SettingRow
					title="Icon pack"
					detail="Choose the icon set the interface draws from"
					control={iconsPick}
				/>
				<hr />
				<SettingRow
					title="Opacity"
					detail="Adjust the app background opacity"
					control={opacityScrub}
				/>
				<hr />
				<SettingRow
					title="Backdrop"
					detail="The material drawn behind the app window"
					control={backdropPick}
				/>
				<hr />
				<SettingRow
					title="Corners"
					detail="How rounded surfaces and controls are"
					control={cornersPick}
				/>
				<SettingGroup label="Lyrics" />
				<SettingRow
					title="Lyrics size (panel)"
					detail="Size of the lyrics text in the side panel, on top of the base font size"
					control={panelLyricsStep}
				/>
				<hr />
				<SettingRow
					title="Lyrics size (fullscreen)"
					detail="Size of the lyrics text on the fullscreen player, on top of the base font size"
					control={fullscreenLyricsStep}
				/>
				<hr />
				<SettingRow
					title="Blur inactive lyrics"
					detail="Blur upcoming and previous lines in the lyrics panel"
					control={blurToggle}
				/>
				<SettingGroup label="Text" />
				<SettingRow
					title="Font size"
					detail="Base text size, everything else scales with it"
					control={fontStep}
				/>
				<hr />
				<SettingRow
					title="Font"
					detail="The typeface Sonora uses across the interface"
					control={typefacePick}
				/>
				<SettingGroup label="Motion" />
				<SettingRow
					title="Reduce motion"
					detail="Skip interface animations and transitions"
					control={motionPick}
				/>
				<hr />
				<SettingRow
					title="Animation speed"
					detail="How fast interface animations play"
					control={pacePick}
				/>
				<hr />
				<SettingRow
					title="Battery saving"
					detail="Cap the frame rate of animations while Sonora is not focused, applied from the next launch"
					control={saverPick}
				/>
				<SettingGroup label="Advanced" />
				<SettingRow
					title="Adaptive context menu"
					detail="Leaves out entries the row already shows, such as the album or the artist"
					control={menusToggle}
				/>
			</div>
		{:else if tab === 'Playback'}
			<div class="panel">
				<SettingRow
					title="Normalize loudness"
					detail="Keeps tracks at a consistent volume"
					control={loudToggle}
				/>
				<hr />
				<SettingRow
					title="Gapless playback"
					detail="Runs one track into the next without a pause, the way an album was sequenced"
					control={gaplessToggle}
				/>
				<hr />
				<SettingRow
					title="Sleep timer"
					detail="Lets the music stop on its own after a set time, so it can play you to sleep"
					control={sleepToggle}
				/>
				<SettingGroup label="Lyrics" />
				<SettingRow
					title="Karaoke lyrics"
					detail="Highlight lyrics word by word when timing is available"
					control={karaokeToggle}
				/>
				<hr />
				<SettingRow
					title="Romanized lyrics"
					detail="Show locally generated pronunciation for selected writing systems"
					control={romanizedToggle}
				/>
			</div>
		{:else if tab === 'Privacy'}
			<div class="panel">
				<SettingRow
					title="Lyrics for local files"
					detail="Use metadata from local files to fetch lyrics from the internet"
					control={localLyricsToggle}
				/>
			</div>
		{:else}
			<div class="panel">
				<SettingRow
					title="Version"
					detail="The build of sonora you are running"
					control={versionText}
				/>
				<hr />
				<SettingRow
					title="Check for updates"
					detail="Ask GitHub once at startup whether a newer version is out. Sonora installs the update itself on Windows only; elsewhere it points you at what changed"
					control={updatesToggle}
				/>
				<SettingGroup label="Project" />
				<SettingRow
					title="License"
					detail="GNU General Public License version 3 or later"
					control={licenseAction}
				/>
				<hr />
				<SettingRow
					title="Source code"
					detail="The corresponding source for this build"
					control={sourceAction}
				/>
			</div>
			<div class="card">
				<div class="cap">
					<span class="eyebrow">Team</span>
					<span class="rule"></span>
				</div>
				<div class="members">
					{#each team as member (member.login)}
						<a class="member" href="https://github.com/{member.login}">
							<img
								class="avatar"
								src="https://github.com/{member.login}.png"
								width="34"
								height="34"
								alt=""
							/>
							<span class="ident">
								<span class="name">{member.login}</span>
								<span class="hint">GitHub</span>
							</span>
							<span class="role">{member.role}</span>
						</a>
					{/each}
				</div>
			</div>
			<p class="notice">{notice}</p>
		{/if}
	</div>
</div>

{#snippet startupPick()}
	<Picker
		value={settings.startup}
		options={['Home', 'Search', 'Your Library', 'Local Music', 'History']}
		width={170}
		onpick={(value) => (settings.startup = value)}
	/>
{/snippet}

{#snippet entriesPick()}
	<Control variant="outline" small label="Choose entries" />
{/snippet}

{#snippet languagePick()}
	<Picker
		value={settings.language}
		options={['System', 'English', 'Russian', 'German', 'Japanese']}
		width={170}
		onpick={(value) => (settings.language = value)}
	/>
{/snippet}

{#snippet trayToggle()}
	<Switch
		checked={settings.tray}
		label="Keep playing when closed"
		onchange={(value) => (settings.tray = value)}
	/>
{/snippet}

{#snippet folderAction()}
	<Control variant="outline" small label="Choose folder…" />
{/snippet}

{#snippet themePick()}
	<Picker
		value={settings.theme}
		options={['System', 'Dark', 'Light']}
		width={170}
		onpick={(value) => (settings.theme = value)}
	/>
{/snippet}

{#snippet adaptiveToggle()}
	<Switch
		checked={settings.adaptive}
		label="Adaptive theme"
		onchange={(value) => (settings.adaptive = value)}
	/>
{/snippet}

{#snippet visualizerToggle()}
	<Switch
		checked={settings.visualizer}
		label="Visualizer"
		onchange={(value) => (settings.visualizer = value)}
	/>
{/snippet}

{#snippet iconsPick()}
	<Picker
		value={settings.icons}
		options={['Lucide', 'Remix', 'Solar', 'Iconoir']}
		width={170}
		onpick={(value) => (settings.icons = value)}
	/>
{/snippet}

{#snippet backdropPick()}
	<Picker
		value={settings.backdrop}
		options={['Plain', 'Blur']}
		width={170}
		onpick={(value) => (settings.backdrop = value)}
	/>
{/snippet}

{#snippet cornersPick()}
	<Picker
		value={settings.corners}
		options={['Square', 'Subtle', 'Rounded', 'Round']}
		width={170}
		onpick={(value) => (settings.corners = value)}
	/>
{/snippet}

{#snippet blurToggle()}
	<Switch
		checked={settings.blur}
		label="Blur inactive lyrics"
		onchange={(value) => (settings.blur = value)}
	/>
{/snippet}

{#snippet typefacePick()}
	<Picker
		value={settings.typeface}
		options={['Default', 'Inter', 'JetBrains Mono']}
		width={170}
		onpick={(value) => (settings.typeface = value)}
	/>
{/snippet}

{#snippet motionPick()}
	<Picker
		value={settings.motion}
		options={['System', 'Always', 'Never']}
		width={170}
		onpick={(value) => (settings.motion = value)}
	/>
{/snippet}

{#snippet pacePick()}
	<Picker
		value={settings.pace}
		options={['Slow', 'Standard', 'Quick']}
		width={170}
		onpick={(value) => (settings.pace = value)}
	/>
{/snippet}

{#snippet saverPick()}
	<Picker
		value={settings.saver}
		options={['Off', 'Light (90 FPS)', 'Medium (60 FPS)', 'Strong (30 FPS)']}
		width={170}
		onpick={(value) => (settings.saver = value)}
	/>
{/snippet}

{#snippet menusToggle()}
	<Switch
		checked={settings.menus}
		label="Adaptive context menu"
		onchange={(value) => (settings.menus = value)}
	/>
{/snippet}

{#snippet loudToggle()}
	<Switch
		checked={settings.normalisation}
		label="Normalize loudness"
		onchange={(value) => (settings.normalisation = value)}
	/>
{/snippet}

{#snippet gaplessToggle()}
	<Switch
		checked={settings.gapless}
		label="Gapless playback"
		onchange={(value) => (settings.gapless = value)}
	/>
{/snippet}

{#snippet sleepToggle()}
	<Switch
		checked={settings.sleep}
		label="Sleep timer"
		onchange={(value) => (settings.sleep = value)}
	/>
{/snippet}

{#snippet karaokeToggle()}
	<Switch
		checked={settings.karaoke}
		label="Karaoke lyrics"
		onchange={(value) => (settings.karaoke = value)}
	/>
{/snippet}

{#snippet romanizedToggle()}
	<Switch
		checked={settings.romanized}
		label="Romanized lyrics"
		onchange={(value) => (settings.romanized = value)}
	/>
{/snippet}

{#snippet localLyricsToggle()}
	<Switch
		checked={settings.localLyrics}
		label="Lyrics for local files"
		onchange={(value) => (settings.localLyrics = value)}
	/>
{/snippet}

{#snippet opacityScrub()}
	<span class="stepper">
		<span class="dial">
			<Scrubber
				fraction={settings.opacity}
				label="Opacity"
				empty="var(--m-muted)"
				onseek={(/** @type {number} */ to) => (settings.opacity = to)}
			/>
		</span>
		<span class="value">{Math.round(settings.opacity * 100)}%</span>
	</span>
{/snippet}

{#snippet fontStep()}
	<span class="stepper">
		<Control
			small
			variant="outline"
			label="−"
			title="Smaller"
			disabled={settings.fontSize <= 10}
			onclick={() => (settings.fontSize -= 1)}
		/>
		<span class="value">{settings.fontSize} px</span>
		<Control
			small
			variant="outline"
			label="+"
			title="Larger"
			disabled={settings.fontSize >= 24}
			onclick={() => (settings.fontSize += 1)}
		/>
	</span>
{/snippet}

{#snippet panelLyricsStep()}
	<span class="stepper">
		<Control
			small
			variant="outline"
			label="−"
			title="Smaller"
			disabled={settings.panelLyrics <= 0.6}
			onclick={() => (settings.panelLyrics -= 0.1)}
		/>
		<span class="value">{Math.round(settings.panelLyrics * 100)}%</span>
		<Control
			small
			variant="outline"
			label="+"
			title="Larger"
			disabled={settings.panelLyrics >= 2}
			onclick={() => (settings.panelLyrics += 0.1)}
		/>
	</span>
{/snippet}

{#snippet fullscreenLyricsStep()}
	<span class="stepper">
		<Control
			small
			variant="outline"
			label="−"
			title="Smaller"
			disabled={settings.fullscreenLyrics <= 0.6}
			onclick={() => (settings.fullscreenLyrics -= 0.1)}
		/>
		<span class="value">{Math.round(settings.fullscreenLyrics * 100)}%</span>
		<Control
			small
			variant="outline"
			label="+"
			title="Larger"
			disabled={settings.fullscreenLyrics >= 2}
			onclick={() => (settings.fullscreenLyrics += 0.1)}
		/>
	</span>
{/snippet}

{#snippet updatesToggle()}
	<Switch
		checked={settings.updates}
		label="Check for updates"
		onchange={(value) => (settings.updates = value)}
	/>
{/snippet}

{#snippet versionText()}
	<span class="value">0.32.0</span>
{/snippet}

{#snippet licenseAction()}
	<Control variant="outline" small label="Read the license" />
{/snippet}

{#snippet sourceAction()}
	<Control variant="outline" small label="Open the repository" />
{/snippet}

<style>
	.page {
		display: flex;
		flex: 1;
		min-width: 0;
		flex-direction: column;
		align-items: center;
		background: var(--m-background);
		overflow-y: auto;
		scrollbar-width: thin;
		scrollbar-color: color-mix(in srgb, var(--m-muted-foreground) 45%, transparent) transparent;
	}

	.sheet {
		display: flex;
		width: 100%;
		max-width: 640px;
		flex-direction: column;
		gap: 21px;
		padding: 21px;
		flex: none;
	}

	.panel {
		display: flex;
		flex-direction: column;
	}

	.stepper {
		display: flex;
		align-items: center;
		gap: 7px;
	}

	.dial {
		display: flex;
		width: 140px;
	}

	hr {
		width: 100%;
		height: 1px;
		margin: 0;
		border: 0;
		background: var(--m-border);
	}

	.eyebrow {
		font-size: 12px;
		font-weight: 600;
		text-transform: uppercase;
		color: var(--m-muted-foreground);
	}

	.profile {
		display: flex;
		align-items: center;
		gap: 14px;
	}

	.face {
		display: flex;
		width: 64px;
		height: 64px;
		flex: none;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		background: var(--m-secondary);
		color: var(--m-muted-foreground);
		font-size: 21.76px;
	}

	.display {
		font-size: 19px;
		font-weight: 600;
	}

	.handle {
		font-size: 12px;
		color: var(--m-muted-foreground);
	}

	.accounts {
		display: flex;
		flex-direction: column;
		gap: 10.5px;
		padding: 10.5px 0;
	}

	.accounts .text {
		display: flex;
		flex-direction: column;
		gap: 3.5px;
	}

	.detail {
		font-size: 12px;
		color: var(--m-muted-foreground);
	}

	.account {
		display: flex;
		flex-direction: column;
		gap: 10.5px;
		padding: 8px;
		border: 1px solid var(--m-border);
		border-radius: var(--m-radius);
	}

	.head {
		display: flex;
		align-items: center;
		gap: 10.5px;
		padding-left: 7px;
	}

	.methods {
		display: flex;
		flex-wrap: wrap;
		align-items: flex-start;
		gap: 7px;
	}

	.who {
		display: flex;
		flex: 1;
		min-width: 0;
		flex-direction: column;
		gap: 3.5px;
	}

	.card {
		display: flex;
		flex-direction: column;
		gap: 14px;
		padding: 17.5px;
		border: 1px solid var(--m-border);
		border-radius: var(--m-radius);
		background: color-mix(in srgb, var(--m-secondary) 45%, transparent);
	}

	.cap {
		display: flex;
		align-items: center;
		gap: 10.5px;
	}

	.rule {
		flex: 1;
		height: 1px;
		background: var(--m-border);
	}

	.members {
		display: flex;
		flex-direction: column;
		gap: 10.5px;
	}

	.member {
		display: flex;
		align-items: center;
		gap: 10.5px;
		padding: 4px 8px;
		border-radius: var(--m-radius);
		color: inherit;
		text-decoration: none;
	}

	.member:hover {
		background: var(--m-secondary-hover);
	}

	.avatar {
		flex: none;
		border-radius: 50%;
		object-fit: cover;
	}

	.ident {
		display: flex;
		flex: 1;
		min-width: 0;
		flex-direction: column;
		gap: 1.75px;
	}

	.name {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-weight: 500;
	}

	.hint {
		font-size: 12px;
		color: var(--m-muted-foreground);
	}

	.role {
		flex: none;
		font-size: 12px;
		font-weight: 500;
		color: var(--m-muted-foreground);
	}

	.value {
		font-size: 13px;
		color: var(--m-muted-foreground);
	}

	.notice {
		margin: 0;
		font-size: 12px;
		line-height: 1.618;
		color: var(--m-muted-foreground);
	}
</style>
