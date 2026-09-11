<script>
	import { onMount } from 'svelte';
	import { repo } from '$lib/data/links.js';
	import { detectPlatform, installer } from '$lib/data/platforms.js';
	import { platform } from '$lib/platform.svelte.js';
	import CopyButton from './CopyButton.svelte';
	import Logo from './Logo.svelte';
	import Mark from './Mark.svelte';
	import PlatformTabs from './PlatformTabs.svelte';

	let { version = null } = $props();

	const windows = $derived(platform.id === 'windows');

	onMount(() => {
		platform.id = detectPlatform();
	});
</script>

<section class="hero">
	<div class="page">
		<div class="mark" data-enter>
			<Logo size={44} />
		</div>

		<h1 data-enter style="--enter: 0.05s">Sonora</h1>

		<div id="install" class="picker" data-enter style="--enter: 0.12s">
			<PlatformTabs />

			{#if platform.current.hero}
				<div class="command">
					<span class="mono prompt">{platform.current.prompt}</span>
					<span class="mono line">{platform.current.hero}</span>
					<CopyButton text={platform.current.hero} />
				</div>
			{:else}
				<div class="command pending">
					<span class="mono prompt">{platform.current.prompt}</span>
					<span class="mono line">{platform.current.pending}</span>
					<span class="soon">coming soon</span>
				</div>
				<p class="aside">winget is not published yet. Download the installer for now.</p>
			{/if}
		</div>

		<div class="cta" data-enter style="--enter: 0.19s">
			{#if windows}
				<a class="btn btn-primary" href={installer}>
					<svg
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						aria-hidden="true"
					>
						<path d="M12 3v13" />
						<path d="M7 12l5 5 5-5" />
						<path d="M4 21h16" />
					</svg>
					Download the installer
				</a>
			{:else}
				<a class="btn btn-primary" href="{repo}/releases/latest">
					<svg
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						aria-hidden="true"
					>
						<path d="M12 3v13" />
						<path d="M7 12l5 5 5-5" />
						<path d="M4 21h16" />
					</svg>
					Latest release
				</a>
			{/if}
			<a class="btn btn-secondary" href={repo}>
				<Mark name="github" size={16} />
				Source
			</a>
		</div>

		<p class="fine" data-enter style="--enter: 0.26s">
			{#if version}
				<span class="mono">{version}</span>
				<span class="dot">·</span>
			{/if}
			Free and open source
			<span class="dot">·</span>
			macOS, Linux, Windows
			<span class="dot">·</span>
			GPL-3.0-or-later
		</p>
	</div>
</section>

<style>
	.hero {
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: center;
		min-height: calc(100vh - var(--header) - var(--fold-peek));
		min-height: calc(100svh - var(--header) - var(--fold-peek));
	}

	.hero .page {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		padding-top: clamp(88px, 12vh, 140px);
		padding-bottom: 64px;
	}

	.mark {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 72px;
		height: 72px;
		border: 1px solid var(--line);
		border-radius: 18px;
		color: var(--fg);
	}

	h1 {
		margin-top: 28px;
		font-size: clamp(48px, 7vw, 84px);
		line-height: 1;
		letter-spacing: -0.045em;
		font-weight: 600;
	}

	.picker {
		scroll-margin-top: calc(var(--header) + 24px);
		display: flex;
		flex-direction: column;
		align-items: stretch;
		gap: 8px;
		width: min(560px, 100%);
		margin-top: 48px;
	}

	.command {
		width: 100%;
		height: 48px;
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 0 7px 0 14px;
		border: 1px solid var(--border);
		border-radius: var(--radius);
		background: var(--card);
		text-align: left;
	}

	.prompt {
		flex-shrink: 0;
		font-size: 12.5px;
		color: var(--faint);
	}

	.line {
		flex-grow: 1;
		font-size: 13px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.pending {
		padding-right: 9px;
	}

	.pending .line {
		color: var(--dim);
	}

	.soon {
		flex-shrink: 0;
		height: 22px;
		display: inline-flex;
		align-items: center;
		padding: 0 8px;
		border: 1px solid var(--border);
		border-radius: 4px;
		font-family: var(--mono);
		font-size: 10.5px;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--muted-fg);
	}

	.aside {
		font-size: 13px;
		line-height: 1.5;
		color: var(--muted-fg);
	}

	.cta {
		display: flex;
		justify-content: center;
		gap: 10px;
		margin-top: 24px;
	}

	.fine {
		display: flex;
		align-items: center;
		gap: 8px;
		flex-wrap: wrap;
		justify-content: center;
		margin-top: 28px;
		font-size: 12px;
		line-height: 1.5;
		color: var(--dim);
	}

	.fine .mono {
		color: var(--muted-fg);
	}

	.dot {
		color: var(--faint);
	}

	@media (max-width: 900px) {
		.hero {
			min-height: 0;
		}

		.hero .page {
			padding-top: 72px;
			padding-bottom: 48px;
		}

		.mark {
			width: 60px;
			height: 60px;
			border-radius: 14px;
		}

		h1 {
			margin-top: 22px;
			font-size: clamp(44px, 14vw, 64px);
		}

		.picker {
			margin-top: 36px;
		}

		.cta {
			flex-direction: column;
			align-self: stretch;
		}
	}
</style>
