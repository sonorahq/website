<script lang="ts">
	import { page } from '$app/state';
	import {
		bands,
		catalog,
		notice,
		providers,
		scrobblers,
		tabs,
		team,
		version
	} from '$lib/mock/catalog';
	import type { Row } from '$lib/mock/catalog';
	import { settings } from '$lib/mock/settings.svelte';
	import { themes } from '$lib/mock/theme';
	import Control from '../Control.svelte';
	import Icon from '../Icon.svelte';
	import Picker from '../Picker.svelte';
	import Scrubber from '../Scrubber.svelte';
	import Switch from '../Switch.svelte';

	let { tab = $bindable('General') }: { tab?: string } = $props();

	let query = $state('');
	let top = $state(125);

	const listener = { name: 'Alex Rivera', id: '31mfqtv7xk2dwrbn4hpz8ecajlyu' };

	const store = settings as unknown as Record<string, string | number | boolean>;

	const running = $derived(page.data.version?.replace(/^v/, '') ?? version);
	const locales = $derived(['System', ...(page.data.locales ?? [])]);

	function options(row: Row): string[] {
		if (row.key === 'theme') return themes;
		if (row.key === 'language') return locales;
		return row.options ?? [];
	}

	const marks: Record<string, string> = {
		General: 'settings',
		Appearance: 'palette',
		Playback: 'play',
		Privacy: 'lock',
		Integrations: 'link',
		About: 'info'
	};

	const searching = $derived(query.trim().length > 0);

	function shown(row: Row) {
		if (row.needs === 'ambient') return settings.ambient;
		if (row.needs === 'visualizer') return settings.visualizer !== 'Off';
		if (row.needs === 'equalizer') return settings.equalizer;
		if (row.needs === 'discord') return settings.discord;
		if (row.needs === 'clientDecorations') return !settings.serverDecorations;
		return true;
	}

	const found = $derived.by(() => {
		const needle = query.trim().toLowerCase();
		if (!needle) return [];

		const hits: Row[] = [];
		for (const entries of Object.values(catalog)) {
			for (const entry of entries) {
				if (entry.kind !== 'row' || !entry.title || !shown(entry)) continue;
				const title = entry.title.toLowerCase().includes(needle);
				const detail = (entry.detail ?? '').toLowerCase().includes(needle);
				if (title || detail) hits.push(entry);
			}
		}
		return hits;
	});

	const listed = $derived(
		searching ? found : (catalog[tab] ?? []).filter((entry) => entry.kind !== 'row' || shown(entry))
	);

	function reading(key: string): string {
		if (key === 'opacity') return `${Math.round(settings.opacity * 100)}%`;
		if (key === 'fontSize') return `${settings.fontSize} px`;
		if (key === 'panelLyrics') return `${Math.round(settings.panelLyrics * 100)}%`;
		if (key === 'fullscreenLyrics') return `${Math.round(settings.fullscreenLyrics * 100)}%`;
		return '';
	}

	function fraction(key: string): number {
		if (key === 'opacity') return Number(settings.opacity);
		if (key === 'fontSize') return (Number(settings.fontSize) - 10) / 14;
		return Number(store[key]) / 2;
	}

	const hertz = (hz: number) => (hz >= 1000 ? `${hz / 1000} kHz` : `${hz} Hz`);
</script>

<div class="settings">
	<div class="screen" style:--m-top="{top}px">
		<div class="sheet" style:padding-top="{top}px">
			{#if !searching && tab === 'General'}
				<div class="profile">
					<span class="face">{listener.name.slice(0, 1)}</span>
					<div class="who">
						<span class="display">{listener.name}</span>
						<span class="handle">{listener.id}</span>
					</div>
				</div>
				<hr class="split" />
			{/if}

			{#each listed as entry, at (entry.kind === 'row' ? entry.key : `${entry.label}-${at}`)}
				{#if entry.kind === 'title'}
					<div class="group"><span class="eyebrow">{entry.label}</span></div>
				{:else if entry.control === 'accounts'}
					<div class="accounts">
						<div class="text">
							<span class="title">{entry.title}</span>
							<span class="detail">{entry.detail}</span>
						</div>
						{#each providers as account (account.glyph)}
							<div class="account" class:pressable={!account.active}>
								<span class="radio" class:on={account.active}><span class="hole"></span></span>
								<span class="logo"><Icon name={account.glyph} size={26} /></span>
								<div class="text">
									<span class="name">{account.name}</span>
									<span class="detail">{account.status}</span>
								</div>
								{#if account.stored}
									<Control icon="log-out" title="Sign out" size={32} />
								{:else}
									<span class="arrow"><Icon name="chevron-right" size={14} /></span>
								{/if}
							</div>
						{/each}
					</div>
				{:else if entry.control === 'scrobbling'}
					<div class="deck">
						{#each scrobblers as service (service.id)}
							<div class="account">
								<div class="text">
									<span class="title">{service.name}</span>
									<span class="detail">{service.detail || service.status}</span>
								</div>
								{#if service.linked}
									<Switch checked onchange={() => {}} />
								{/if}
								<button type="button" class="action">
									{service.linked ? 'Disconnect' : 'Connect'}
								</button>
							</div>
						{/each}
					</div>
				{:else if entry.control === 'bands'}
					<div class="bands">
						{#each bands as hz (hz)}
							<div class="band">
								<span class="db">0 dB</span>
								<div class="slot"><span class="knob"></span></div>
								<span class="hz">{hertz(hz)}</span>
							</div>
						{/each}
					</div>
				{:else}
					<div class="row">
						<div class="text">
							<span class="title">{entry.title}</span>
							{#if entry.detail}<span class="detail">{entry.detail}</span>{/if}
						</div>
						<div class="control">
							{#if entry.control === 'switch'}
								{#if entry.extra}
									<button type="button" class="action">{entry.extra}</button>
								{/if}
								<Switch
									checked={Boolean(store[entry.key])}
									onchange={(value) => (store[entry.key] = value)}
								/>
							{:else if entry.control === 'picker'}
								{#if entry.extra}
									<button type="button" class="action">{entry.extra}</button>
								{/if}
								<Picker
									value={String(store[entry.key] ?? '')}
									options={options(entry)}
									onpick={(value) => (store[entry.key] = value)}
								/>
							{:else if entry.control === 'slider'}
								<div class="slider">
									<Scrubber fraction={fraction(entry.key)} label="" onseek={() => {}} />
									<span class="reading">{reading(entry.key)}</span>
								</div>
							{:else if entry.control === 'button'}
								{#if entry.value}<span class="reading">{entry.value}</span>{/if}
								{#if entry.href}
									<a class="action" href={entry.href} target="_blank" rel="noreferrer"
										>{entry.label}</a
									>
								{:else}
									<button type="button" class="action">{entry.label}</button>
								{/if}
							{:else}
								<span class="reading">{entry.value ?? running}</span>
							{/if}
						</div>
					</div>
				{/if}
			{/each}

			{#if !searching && tab === 'About'}
				<div class="team">
					<div class="cap">
						<span class="eyebrow">Team</span>
						<span class="rule"></span>
					</div>
					<div class="members">
						{#each team as member (member.login)}
							<a
								class="member"
								href="https://github.com/{member.login}"
								target="_blank"
								rel="noreferrer"
							>
								<img
									class="avatar"
									src="https://github.com/{member.login}.png"
									width="34"
									height="34"
									alt=""
								/>
								<span class="ident">
									<span class="login">{member.login}</span>
									<span class="hint">GitHub</span>
								</span>
								<span class="role">{member.role}</span>
							</a>
						{/each}
					</div>
				</div>
				<p class="notice">{notice}</p>
			{/if}

			{#if searching && !found.length}
				<p class="notice">Nothing here</p>
			{/if}
		</div>
	</div>

	<header class="masthead" bind:clientHeight={top}>
		<div class="haze"></div>
		<div class="column">
			<label class="field">
				<Icon name="search" />
				<input placeholder="Search settings" bind:value={query} />
			</label>
			<div class="categories">
				{#each tabs as name (name)}
					<button
						type="button"
						class="chip"
						class:on={!searching && tab === name}
						onclick={() => {
							query = '';
							tab = name;
						}}
					>
						<Icon name={marks[name]} />
						{name}
					</button>
				{/each}
			</div>
		</div>
	</header>
</div>

<style>
	.settings {
		position: relative;
		display: flex;
		flex: 1;
		min-width: 0;
		min-height: 0;
		overflow: hidden;
	}

	.screen {
		position: absolute;
		inset: 0;
		overflow-y: auto;
		mask-image: linear-gradient(to bottom, transparent 0, #000 calc(var(--m-top) + 48px));
	}

	.masthead {
		position: absolute;
		top: 0;
		right: 0;
		left: 0;
		z-index: 2;
		display: flex;
		justify-content: center;
		padding: 0 21px;
		pointer-events: none;
	}

	.haze {
		position: absolute;
		inset: 0;
		backdrop-filter: blur(1px);
		mask-image: linear-gradient(to bottom, #000, transparent);
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

	.who {
		display: flex;
		flex: 1;
		min-width: 0;
		flex-direction: column;
		gap: 3.5px;
	}

	.display {
		font-size: 19px;
		font-weight: 600;
	}

	.handle {
		font-size: 12px;
		color: var(--m-muted-foreground);
	}

	.split {
		margin: 21px 0 0;
		border: 0;
		border-top: 1px solid var(--m-border);
	}

	.column {
		position: relative;
		pointer-events: auto;
		display: flex;
		flex-direction: column;
		gap: 7px;
		width: 100%;
		max-width: 640px;
		padding: 21px 0;
	}

	.field {
		display: flex;
		align-items: center;
		gap: 7px;
		height: 40px;
		padding: 0 10.5px;
		border: 1px solid var(--m-border);
		border-radius: var(--m-radius);
		background: color-mix(in srgb, var(--m-popover) 20%, transparent);
		backdrop-filter: blur(8px);
		color: var(--m-muted-foreground);
	}

	.field input {
		flex: 1;
		min-width: 0;
		border: 0;
		background: none;
		color: var(--m-foreground);
		font: inherit;
		outline: none;
	}

	.categories {
		display: flex;
		align-self: center;
		max-width: 100%;
		gap: 3.5px;
		padding: 3.5px;
		border: 1px solid var(--m-border);
		border-radius: var(--m-radius);
		background: color-mix(in srgb, var(--m-popover) 20%, transparent);
		backdrop-filter: blur(8px);
		box-shadow: 0 1px 2px rgb(0 0 0 / 0.05);
	}

	.chip {
		display: flex;
		align-items: center;
		gap: 4px;
		height: 26px;
		padding: 0 8px;
		border: 0;
		border-radius: var(--m-radius);
		background: none;
		color: var(--m-foreground);
		font: inherit;
		font-size: 13px;
		white-space: nowrap;
		cursor: pointer;
	}

	.chip:hover {
		background: var(--m-secondary-hover);
		color: var(--m-foreground);
	}

	.chip.on {
		background: var(--m-secondary-active);
		color: var(--m-foreground);
	}

	.sheet {
		width: 100%;
		max-width: 682px;
		margin: 0 auto;
		padding: 0 21px 28px;
	}

	.group {
		padding: 17.5px 0 3.5px;
	}

	.eyebrow {
		font-size: 12px;
		font-weight: 600;
		text-transform: uppercase;
		color: var(--m-muted-foreground);
	}

	.row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 14px;
		padding: 10.5px 0;
		border-bottom: 1px solid var(--m-table-row-border);
	}

	.text {
		display: flex;
		flex: 1;
		min-width: 0;
		flex-direction: column;
		gap: 3.5px;
	}

	.title {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.detail {
		min-width: 0;
		font-size: 12px;
		line-height: 1.45;
		color: var(--m-muted-foreground);
	}

	.control {
		display: flex;
		flex: none;
		align-items: center;
		gap: 7px;
	}

	.action {
		display: inline-flex;
		align-items: center;
		height: 26px;
		text-decoration: none;
		padding: 0 8.75px;
		border: 1px solid var(--m-border);
		border-radius: var(--m-radius);
		background: none;
		color: var(--m-foreground);
		font: inherit;
		font-size: 12px;
		white-space: nowrap;
		cursor: pointer;
	}

	.action:hover {
		background: var(--m-secondary-hover);
	}

	.reading {
		font-size: 12px;
		color: var(--m-muted-foreground);
		white-space: nowrap;
	}

	.slider {
		display: flex;
		align-items: center;
		gap: 10.5px;
		width: 180px;
	}

	.deck {
		display: flex;
		flex-direction: column;
		gap: 7px;
		padding: 3.5px 0 10.5px;
	}

	.bands {
		display: flex;
		justify-content: space-between;
		gap: 3.5px;
		padding: 10.5px 0 14px;
	}

	.band {
		display: flex;
		flex: 1;
		flex-direction: column;
		align-items: center;
		gap: 7px;
	}

	.db,
	.hz {
		font-size: 11px;
		color: var(--m-muted-foreground);
		white-space: nowrap;
	}

	.slot {
		position: relative;
		width: 4px;
		height: 96px;
		border-radius: 2px;
		background: var(--m-muted);
	}

	.knob {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 12px;
		height: 12px;
		transform: translate(-50%, -50%);
		border-radius: 999px;
		background: var(--m-primary);
	}

	.notice {
		margin: 14px 0 0;
		font-size: 12px;
		line-height: 1.6;
		color: var(--m-muted-foreground);
	}

	.accounts {
		display: flex;
		flex-direction: column;
		gap: 10.5px;
		padding: 10.5px 0;
		border-bottom: 1px solid var(--m-table-row-border);
	}

	.account {
		display: flex;
		min-height: 35px;
		align-items: center;
		gap: 10.5px;
		padding: 8px;
		border: 1px solid var(--m-border);
		border-radius: var(--m-radius);
	}

	.account.pressable {
		cursor: pointer;
	}

	.account.pressable:hover {
		background: var(--m-secondary);
	}

	.radio {
		display: flex;
		width: 16px;
		height: 16px;
		flex: none;
		align-items: center;
		justify-content: center;
		border: 1px solid var(--m-border);
		border-radius: 999px;
	}

	.radio.on {
		border-color: var(--m-primary);
		background: var(--m-primary);
	}

	.hole {
		width: 5px;
		height: 5px;
		border-radius: 999px;
	}

	.radio.on .hole {
		background: var(--m-primary-foreground);
	}

	.logo {
		display: flex;
		flex: none;
		color: var(--m-foreground);
	}

	.name {
		overflow: hidden;
		font-weight: 500;
		line-height: 1.25;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.arrow {
		display: flex;
		width: 32px;
		height: 32px;
		flex: none;
		align-items: center;
		justify-content: center;
		color: var(--m-muted-foreground);
	}

	.team {
		display: flex;
		flex-direction: column;
		gap: 14px;
		margin-top: 17.5px;
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

	.login {
		overflow: hidden;
		font-weight: 500;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.hint,
	.role {
		font-size: 12px;
		color: var(--m-muted-foreground);
	}

	.role {
		flex: none;
		font-weight: 500;
	}
</style>
