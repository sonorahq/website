<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import { repo } from '$lib/data/links';
	import Logo from './Logo.svelte';
	import Mark from './Mark.svelte';
	import ThemeSwitch from './ThemeSwitch.svelte';

	let { stars = null }: { stars?: number | null } = $props();

	let live = $state(null);
	let open = $state(false);
	let header = $state<HTMLElement | null>(null);
	let duration = $state(200);

	/** Prefix for the home page anchors, so they still resolve from other routes. */
	const home = $derived(page.url.pathname === '/' ? '' : '/');

	/** Site links shared by the inline nav and the narrow screen menu. */
	const links = $derived([
		{ href: `${home}#steps`, label: 'Install' },
		{ href: `${home}#about`, label: 'What it does' },
		{ href: `${home}#community`, label: 'Community' },
		{ href: '/docs', label: 'Docs' },
		{ href: '/faq', label: 'FAQ' },
		{ href: '/changelog', label: 'Changelog' }
	]);

	const label = $derived.by(() => {
		const count = live ?? stars;
		if (count === null) return null;
		if (count < 1000) return String(count);
		return (count / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
	});

	afterNavigate(() => (open = false));

	onMount(async () => {
		if (matchMedia('(prefers-reduced-motion: reduce)').matches) duration = 0;

		try {
			const res = await fetch('https://api.github.com/repos/sonorahq/sonora');
			if (res.ok) live = (await res.json()).stargazers_count;
		} catch {
			live = null;
		}
	});
</script>

<svelte:window
	onkeydown={(event) => {
		if (open && event.key === 'Escape') open = false;
	}}
	onclick={(event) => {
		if (open && header && !event.composedPath().includes(header)) open = false;
	}}
/>

<div class="slot"></div>

<header bind:this={header}>
	<div class="bar">
		<div class="left">
			<a href="{home}#top" class="brand">
				<Logo size={20} />
				<span>Sonora</span>
			</a>
			<nav>
				{#each links as link (link.label)}
					<a href={link.href}>{link.label}</a>
				{/each}
			</nav>
		</div>

		<div class="right">
			<ThemeSwitch />
			<a href={repo} class="star">
				<Mark name="github" />
				GitHub
				{#if label}
					<span class="count">{label}</span>
				{/if}
			</a>
			<a href="{home}#steps" class="download">Install</a>
			<button
				type="button"
				class="toggle"
				aria-label={open ? 'Close menu' : 'Open menu'}
				aria-expanded={open}
				aria-controls="menu"
				onclick={() => (open = !open)}
			>
				<svg viewBox="0 0 24 24" aria-hidden="true">
					{#if open}
						<path d="M6 6l12 12" />
						<path d="M18 6L6 18" />
					{:else}
						<path d="M4 7h16" />
						<path d="M4 12h16" />
						<path d="M4 17h16" />
					{/if}
				</svg>
			</button>
		</div>
	</div>

	{#if open}
		<nav id="menu" class="menu" aria-label="Menu" transition:fly={{ y: -8, duration }}>
			{#each links as link (link.label)}
				<a href={link.href} onclick={() => (open = false)}>{link.label}</a>
			{/each}
			<a href={repo} class="repo" onclick={() => (open = false)}>
				<Mark name="github" />
				GitHub
				{#if label}
					<span class="count">{label}</span>
				{/if}
			</a>
		</nav>
	{/if}
</header>

{#if open}
	<div class="scrim" transition:fade={{ duration }}></div>
{/if}

<style>
	/* Holds the header's place in the flow, since a fixed header stays pinned when the page overscrolls. */
	.slot {
		height: var(--header);
	}

	header {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 10;
		height: var(--header);
		border-bottom: 1px solid var(--line);
		background: var(--header-bg);
		backdrop-filter: blur(12px);
	}

	.bar {
		height: 100%;
		max-width: var(--page);
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-inline: var(--gutter);
	}

	.left {
		display: flex;
		align-items: center;
		gap: 36px;
	}

	.right {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.brand {
		display: flex;
		align-items: center;
		gap: 9px;
		font-size: 15px;
		font-weight: 600;
		letter-spacing: -0.02em;
	}

	.left nav {
		display: flex;
		gap: 22px;
		font-size: 13px;
		color: var(--muted-fg);
	}

	nav a:hover,
	.star:hover {
		color: var(--fg);
	}

	.star {
		height: var(--control);
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 0 12px;
		border: 1px solid var(--border);
		border-radius: var(--radius);
		font-size: 13px;
		color: var(--chip-fg);
	}

	.count {
		padding-left: 8px;
		border-left: 1px solid var(--border);
		color: var(--dim);
	}

	.star:hover .count {
		color: var(--muted-fg);
	}

	.download {
		height: var(--control);
		display: flex;
		align-items: center;
		padding: 0 14px;
		border-radius: var(--radius);
		background: var(--primary);
		color: var(--primary-fg);
		font-size: 13px;
		font-weight: 500;
	}

	.download:hover {
		background: var(--primary-hover);
	}

	.toggle {
		width: 36px;
		height: 36px;
		display: none;
		align-items: center;
		justify-content: center;
		border: 1px solid var(--border);
		border-radius: var(--radius);
		color: var(--muted-fg);
	}

	.toggle:hover,
	.toggle[aria-expanded='true'] {
		background: var(--secondary);
		color: var(--fg);
	}

	.toggle svg {
		width: 16px;
		height: 16px;
		fill: none;
		stroke: currentColor;
		stroke-width: 2;
		stroke-linecap: round;
	}

	.menu {
		position: absolute;
		top: 100%;
		left: 0;
		right: 0;
		display: none;
		flex-direction: column;
		padding: 8px var(--gutter) 16px;
		border-bottom: 1px solid var(--line);
		background: var(--bg);
		box-shadow: var(--shadow);
		max-height: calc(100dvh - var(--header));
		overflow-y: auto;
	}

	.menu a {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 12px 0;
		border-bottom: 1px solid var(--line);
		font-size: 15px;
		color: var(--muted-fg);
	}

	.menu a:last-child {
		border-bottom: none;
	}

	.menu .count {
		margin-left: auto;
		padding-left: 0;
		border-left: none;
	}

	.scrim {
		position: fixed;
		inset: var(--header) 0 0;
		z-index: 9;
		display: none;
		background: rgb(0 0 0 / 0.4);
		backdrop-filter: blur(8px);
	}

	@media (max-width: 900px) {
		.scrim {
			display: block;
		}

		.left nav,
		.star {
			display: none;
		}

		.toggle,
		.menu {
			display: flex;
		}
	}
</style>
