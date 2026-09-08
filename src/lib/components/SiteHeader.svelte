<script>
	import { onMount } from 'svelte';
	import { repo } from '$lib/data/links.js';
	import Logo from './Logo.svelte';
	import ThemeSwitch from './ThemeSwitch.svelte';

	let { stars = null } = $props();

	let live = $state(null);

	const label = $derived.by(() => {
		const count = live ?? stars;
		if (count === null) return null;
		if (count < 1000) return String(count);
		return (count / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
	});

	onMount(async () => {
		try {
			const res = await fetch('https://api.github.com/repos/sonorahq/sonora');
			if (res.ok) live = (await res.json()).stargazers_count;
		} catch {
			live = null;
		}
	});
</script>

<header>
	<div class="page bar">
		<div class="left">
			<a href="/" class="brand">
				<Logo />
				<span>Sonora</span>
			</a>
			<nav>
				<a href="#features">Features</a>
				<a href="#install">Install</a>
				<a href="#themes">Themes</a>
				<a href="{repo}/blob/main/CHANGELOG.md">Changelog</a>
			</nav>
		</div>

		<div class="right">
			<ThemeSwitch />
			<a href={repo} class="star">
				<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
					<path
						d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.6 9.6 0 0 1 12 6.8c.85 0 1.71.11 2.51.34 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 22 12c0-5.52-4.48-10-10-10z"
					/>
				</svg>
				Star
				{#if label}
					<span class="count">{label}</span>
				{/if}
			</a>
			<a href="#install" class="download">Download</a>
		</div>
	</div>
</header>

<style>
	header {
		position: sticky;
		top: 0;
		z-index: 10;
		height: 64px;
		border-bottom: 1px solid var(--border);
		background: var(--header-bg);
		backdrop-filter: blur(12px);
	}

	.bar {
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.left {
		display: flex;
		align-items: center;
		gap: 40px;
	}

	.right {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.brand {
		display: flex;
		align-items: center;
		gap: 10px;
		font-size: 16px;
		font-weight: 600;
		letter-spacing: -0.02em;
	}

	nav {
		display: flex;
		gap: 24px;
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

	@media (max-width: 900px) {
		nav,
		.star {
			display: none;
		}
	}
</style>
