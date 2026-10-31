<script lang="ts">
	import EditLink from '$lib/components/EditLink.svelte';
	import Glyph from '$lib/components/Glyph.svelte';
	import ThemeMiniature from '$lib/components/ThemeMiniature.svelte';
	import { submit, themes } from '$lib/data/themes';

	/** The variant whose name the pointer is on, by theme id, shown alone in its card. */
	let previewed: Record<string, string> = $state({});

	/** Everyone who wrote a theme, as "A", "A and B" or "A, B and C". */
	function credit(authors: string[]): string {
		return authors.length < 2
			? authors.join('')
			: `${authors.slice(0, -1).join(', ')} and ${authors.at(-1)}`;
	}
</script>

<svelte:head>
	<title>Community themes · Sonora</title>
	<meta
		name="description"
		content="Themes for Sonora that people made and shared. Install one with a click."
	/>
</svelte:head>

<section class="section">
	<span class="cross start"></span>
	<span class="cross end"></span>

	<div class="page gallery">
		<header>
			<span class="kicker">Themes</span>
			<h1>Community themes</h1>
			<p class="summary">
				Want to contribute? <a href="/docs/themes#format">Write a theme</a>, then
				<a href={submit}>open a pull request</a> that adds it.
			</p>
		</header>

		<ul class="grid">
			{#each themes as theme (theme.id)}
				<li class="card">
					<div class="preview">
						<ThemeMiniature
							palettes={theme.variants
								.filter((variant) => !previewed[theme.id] || variant.id === previewed[theme.id])
								.map((variant) => variant.colors)}
						/>
					</div>
					<div class="body">
						<div class="names">
							<div class="title">
								<h2>{theme.name}</h2>
								{#if theme.variants.length > 1}
									<ul
										class="variants"
										aria-label="Variants"
										onpointerleave={() => delete previewed[theme.id]}
									>
										{#each theme.variants as variant (variant.id)}
											<li
												aria-label={variant.name}
												onpointerenter={() => (previewed[theme.id] = variant.id)}
											>
												<span
													class="swatch"
													style:--page={variant.colors.background}
													style:--accent={variant.colors.primary}
												></span>
											</li>
										{/each}
									</ul>
								{/if}
							</div>
							<span class="author">by {credit(theme.authors)}</span>
						</div>
						<div class="actions">
							<a class="btn btn-primary" href={theme.link}>
								Install
								<Glyph name="arrow-right" />
							</a>
							<a
								class="btn btn-secondary"
								href={theme.download.href}
								download={theme.download.name}
							>
								Download
								<Glyph name="arrow-down" />
							</a>
						</div>
					</div>
				</li>
			{/each}
		</ul>

		<div class="source">
			<EditLink path="src/routes/themes/+page.svelte" />
		</div>
	</div>
</section>

<style>
	.gallery {
		padding-top: 72px;
		padding-bottom: 96px;
	}

	header {
		max-width: 640px;
		display: flex;
		flex-direction: column;
		gap: 12px;
		margin-bottom: 40px;
	}

	h1 {
		font-size: 36px;
	}

	.summary {
		font-size: 15px;
		line-height: 1.6;
		color: var(--muted-fg);
	}

	.summary a {
		color: var(--fg);
		text-decoration: underline;
		text-decoration-color: var(--faint);
		text-underline-offset: 3px;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
		gap: 20px;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.card {
		display: flex;
		flex-direction: column;
		border: 1px solid var(--line);
		border-radius: var(--radius-lg);
		background: var(--card);
		overflow: hidden;
	}

	.preview {
		padding: 16px;
		border-bottom: 1px solid var(--line);
	}

	.preview :global(svg) {
		border-radius: var(--radius);
		overflow: hidden;
	}

	.body {
		display: flex;
		flex: 1;
		flex-direction: column;
		gap: 14px;
		padding: 14px 16px 16px;
	}

	.names {
		display: flex;
		flex-direction: column;
		gap: 4px;
		min-width: 0;
	}

	h2 {
		font-size: 15px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.author {
		font-size: 13px;
		color: var(--muted-fg);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.title {
		display: flex;
		align-items: center;
		gap: 12px;
		min-width: 0;
	}

	.title h2 {
		flex: 1;
		min-width: 0;
	}

	/* the dots touch through their padding, so the pointer never falls between two of them */
	.variants {
		display: flex;
		flex: none;
		margin: 0 -2px;
		padding: 0;
		list-style: none;
	}

	.variants li {
		display: flex;
		padding: 2px;
	}

	/* the page colour at the top left and the accent at the bottom right, like the app's menu */
	.swatch {
		width: 14px;
		height: 14px;
		border-radius: 50%;
		background: linear-gradient(135deg, var(--page) 50%, var(--accent) 50%);
		box-shadow: inset 0 0 0 1px rgb(127 127 127 / 0.3);
		transition: transform 0.12s ease;
	}

	.variants li:hover .swatch {
		transform: scale(1.2);
	}

	.actions {
		display: flex;
		margin-top: auto;
		gap: 8px;
	}

	.actions .btn {
		flex: 1;
		height: 34px;
		padding: 0 14px;
		font-size: 13px;
	}

	.source {
		margin-top: 48px;
	}

	@media (max-width: 900px) {
		.gallery {
			padding-top: 48px;
			padding-bottom: 64px;
		}
	}
</style>
