<script lang="ts">
	import { onMount } from 'svelte';
	import { repo } from '$lib/data/links';
	import Logo from './Logo.svelte';
	import Mark from './Mark.svelte';
	import ThemeSwitch from './ThemeSwitch.svelte';

	let { stars = null }: { stars?: number | null } = $props();

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
	<div class="bar">
		<div class="left">
			<a href="/" class="brand">
				<Logo size={20} />
				<span>Sonora</span>
			</a>
			<nav>
				<a href="#steps">Install</a>
				<a href="#about">What it does</a>
				<a href="#community">Community</a>
				<a href="{repo}/blob/main/CHANGELOG.md">Changelog</a>
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
			<a href="#install" class="download">Install</a>
		</div>
	</div>
</header>

<style>
	header {
		position: sticky;
		top: 0;
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

	nav {
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

	@media (max-width: 900px) {
		nav,
		.star {
			display: none;
		}
	}
</style>
