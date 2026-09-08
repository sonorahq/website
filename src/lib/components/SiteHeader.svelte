<script>
	import { onMount } from 'svelte';
	import { repo } from '$lib/data/links.js';
	import Logo from './Logo.svelte';
	import Mark from './Mark.svelte';
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
				<Mark name="github" />
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
