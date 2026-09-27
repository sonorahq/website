<script>
	import {
		bands,
		catalog,
		notice,
		providers,
		scrobblers,
		tabs,
		team,
		version
	} from '$lib/mock/catalog.js';
	import { settings } from '$lib/mock/settings.svelte.js';
	import { themes } from '$lib/mock/theme.js';
	import Icon from '../Icon.svelte';
	import Picker from '../Picker.svelte';
	import Scrubber from '../Scrubber.svelte';
	import Switch from '../Switch.svelte';

	let { tab = $bindable('General') } = $props();

	let query = $state('');

	const store = /** @type {Record<string, string | number | boolean>} */ (settings);

	/** @type {Record<string, string>} */
	const marks = {
		General: 'settings',
		Appearance: 'palette',
		Playback: 'play',
		Privacy: 'lock',
		Integrations: 'link',
		About: 'info'
	};

	const searching = $derived(query.trim().length > 0);

	/** @param {import('$lib/mock/catalog.js').Row} row */
	function shown(row) {
		if (row.needs === 'ambient') return settings.ambient;
		if (row.needs === 'visualizer') return settings.visualizer !== 'Off';
		if (row.needs === 'equalizer') return settings.equalizer;
		if (row.needs === 'discord') return settings.discord;
		return true;
	}

	const found = $derived.by(() => {
		const needle = query.trim().toLowerCase();
		if (!needle) return [];

		/** @type {import('$lib/mock/catalog.js').Row[]} */
		const hits = [];
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

	/** @param {string} key @returns {string} */
	function reading(key) {
		if (key === 'opacity') return `${Math.round(settings.opacity * 100)}%`;
		if (key === 'fontSize') return `${settings.fontSize} px`;
		if (key === 'panelLyrics') return `${Math.round(settings.panelLyrics * 100)}%`;
		if (key === 'fullscreenLyrics') return `${Math.round(settings.fullscreenLyrics * 100)}%`;
		return '';
	}

	/** @param {string} key @returns {number} */
	function fraction(key) {
		if (key === 'opacity') return Number(settings.opacity);
		if (key === 'fontSize') return (Number(settings.fontSize) - 10) / 14;
		return Number(store[key]) / 2;
	}

	/** @param {number} hz @returns {string} */
	const hertz = (hz) => (hz >= 1000 ? `${hz / 1000} kHz` : `${hz} Hz`);
</script>

<div class="screen">
	<header class="head">
		<div class="column">
			<label class="field">
				<Icon name="search" />
				<input placeholder="Search settings" bind:value={query} />
			</label>
			<div class="bar">
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

	<div class="sheet">
		{#each listed as entry, at (entry.kind === 'row' ? entry.key : `${entry.label}-${at}`)}
			{#if entry.kind === 'title'}
				<div class="group"><span class="eyebrow">{entry.label}</span></div>
			{:else if entry.control === 'accounts'}
				<div class="deck">
					{#each providers as account (account.slug)}
						<div class="account">
							<span class="mark"><Icon name={account.slug} /></span>
							<div class="text">
								<span class="title">{account.name}</span>
								<span class="detail">{account.status}</span>
							</div>
							<button type="button" class="ghost">
								{account.stored ? 'Sign out' : 'Connect'}
							</button>
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
							<button type="button" class="ghost">
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
								<button type="button" class="ghost">{entry.extra}</button>
							{/if}
							<Switch
								checked={Boolean(store[entry.key])}
								onchange={(value) => (store[entry.key] = value)}
							/>
						{:else if entry.control === 'picker'}
							{#if entry.extra}
								<button type="button" class="ghost">{entry.extra}</button>
							{/if}
							<Picker
								value={String(store[entry.key] ?? '')}
								options={entry.key === 'theme' ? themes : (entry.options ?? [])}
								onpick={(value) => (store[entry.key] = value)}
							/>
						{:else if entry.control === 'slider'}
							<div class="slider">
								<Scrubber fraction={fraction(entry.key)} label="" onseek={() => {}} />
								<span class="reading">{reading(entry.key)}</span>
							</div>
						{:else if entry.control === 'button'}
							{#if entry.value}<span class="reading">{entry.value}</span>{/if}
							<button type="button" class="ghost">{entry.label}</button>
						{:else}
							<span class="reading">{entry.value ?? version}</span>
						{/if}
					</div>
				</div>
			{/if}
		{/each}

		{#if !searching && tab === 'About'}
			<div class="group"><span class="eyebrow">Team</span></div>
			<div class="deck">
				{#each team as member (member.login)}
					<div class="account">
						<span class="face">{member.login.slice(0, 1).toUpperCase()}</span>
						<div class="text">
							<span class="title">{member.login}</span>
							<span class="detail">{member.role}</span>
						</div>
						<button type="button" class="ghost">GitHub</button>
					</div>
				{/each}
			</div>
			<p class="notice">{notice}</p>
		{/if}

		{#if searching && !found.length}
			<p class="notice">Nothing here</p>
		{/if}
	</div>
</div>

<style>
	.screen {
		display: flex;
		flex-direction: column;
		height: 100%;
		min-height: 0;
		overflow-y: auto;
	}

	.head {
		position: sticky;
		top: 0;
		z-index: 2;
		display: flex;
		justify-content: center;
		padding: 0 21px;
		background: var(--m-background);
	}

	.column {
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
		background: var(--m-secondary);
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

	.bar {
		display: flex;
		justify-content: center;
		gap: 3.5px;
		padding: 3.5px;
		border: 1px solid var(--m-border);
		border-radius: var(--m-radius);
		background: var(--m-secondary);
	}

	.chip {
		display: flex;
		align-items: center;
		gap: 5.25px;
		height: 26px;
		padding: 0 8.75px;
		border: 0;
		border-radius: calc(var(--m-radius) - 2px);
		background: none;
		color: var(--m-muted-foreground);
		font: inherit;
		font-size: 12px;
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
		max-width: 640px;
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

	.ghost {
		height: 26px;
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

	.ghost:hover {
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

	.account {
		display: flex;
		align-items: center;
		gap: 10.5px;
		padding: 10.5px;
		border: 1px solid var(--m-border);
		border-radius: var(--m-radius);
		background: var(--m-secondary);
	}

	.mark,
	.face {
		display: flex;
		width: 28px;
		height: 28px;
		flex: none;
		align-items: center;
		justify-content: center;
		border-radius: 999px;
		background: var(--m-muted);
		color: var(--m-muted-foreground);
		font-size: 12px;
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
</style>
