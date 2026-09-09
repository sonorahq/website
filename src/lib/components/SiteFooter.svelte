<script>
	import { discord, matrix, repo } from '$lib/data/links.js';
	import Logo from './Logo.svelte';
</script>

<footer>
	<div class="page">
		<div class="cols">
			<div class="about">
				<a href="/" class="brand">
					<Logo size={20} />
					<span>Sonora</span>
				</a>
				<p>A native music streaming client, built with Rust and GPUI.</p>
			</div>

			<div class="links">
				<div>
					<h3>Product</h3>
					<a href="#features">Features</a>
					<a href="#install">Download</a>
					<a href="#themes">Themes</a>
				</div>
				<div>
					<h3>Project</h3>
					<a href={repo}>GitHub</a>
					<a href="{repo}/blob/main/CONTRIBUTING.md">Contributing</a>
					<a href="{repo}/blob/main/README.md#translations">Translations</a>
				</div>
				<div>
					<h3>Community</h3>
					<a href={discord}>Discord</a>
					<a href={matrix}>Matrix</a>
					<a href="{repo}/issues">Issues</a>
				</div>
			</div>
		</div>

		<div class="fine">
			<span>Licensed under the GPL. Built with Zed's GPUI, librespot and yt-dlp.</span>
			<span>sonorahq/sonora</span>
		</div>

		<p class="credit">
			The preview plays public domain music and public domain lyrics. Its covers are public domain
			paintings from Wikimedia Commons — Whistler, van Gogh, Monet, Hokusai and Munch.
		</p>
	</div>
</footer>

<style>
	footer {
		border-top: 1px solid var(--border);
		padding: 64px 0 40px;
	}

	.cols {
		display: flex;
		justify-content: space-between;
		gap: 48px;
		flex-wrap: wrap;
	}

	.about {
		display: flex;
		flex-direction: column;
		gap: 14px;
		max-width: 300px;
	}

	.brand {
		display: flex;
		align-items: center;
		gap: 10px;
		font-size: 15px;
		font-weight: 600;
		letter-spacing: -0.02em;
	}

	.about p {
		font-size: 13px;
		line-height: 1.6;
		color: var(--muted-fg);
	}

	.links {
		display: flex;
		gap: 72px;
		flex-wrap: wrap;
	}

	.links > div {
		display: flex;
		flex-direction: column;
		gap: 12px;
		font-size: 13px;
		color: var(--chip-fg);
	}

	.links a:hover {
		color: var(--fg);
	}

	h3 {
		margin: 0;
		font-size: 12px;
		font-weight: 600;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--dim);
	}

	.fine {
		margin-top: 56px;
		border-top: 1px solid var(--border);
		padding-top: 24px;
		display: flex;
		justify-content: space-between;
		gap: 16px;
		flex-wrap: wrap;
		font-size: 12px;
		color: var(--dim);
	}

	.credit {
		margin: 12px 0 0;
		max-width: 640px;
		font-size: 12px;
		line-height: 1.5;
		color: var(--dim);
	}

	@media (max-width: 900px) {
		.links {
			gap: 40px;
		}
	}
</style>
