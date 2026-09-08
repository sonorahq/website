<script>
	import { languages } from '$lib/data/platforms.js';
</script>

<section class="section">
	<div class="page community">
		<div class="panel">
			<h2>Speaks 11 languages</h2>
			<p>
				Translated by the community and tracked in the repo, from English and Deutsch through
				日本語, Русский and Português.
			</p>
			<div class="chips">
				{#each languages as code (code)}
					<span>{code}</span>
				{/each}
			</div>
		</div>

		<div class="panel">
			<h2>Come hang out</h2>
			<p>Discord is where most of it happens, bridged to Matrix.</p>
			<div class="panel-cta">
				<a class="btn btn-primary" href="https://discord.gg/a8N8Tx23rV">Join Discord</a>
				<a class="btn btn-secondary" href="https://matrix.to/#/#sonora:nolight.dev">Matrix space</a>
			</div>
		</div>
	</div>
</section>

<style>
	.community {
		display: grid;
		grid-template-columns: 2fr 1fr;
		gap: 20px;
	}

	.panel {
		display: flex;
		flex-direction: column;
		gap: 14px;
		padding: 32px;
		border: 1px solid var(--border);
		border-radius: var(--radius-lg);
		background: var(--card);
	}

	h2 {
		font-size: 24px;
		text-align: left;
		letter-spacing: -0.025em;
	}

	p {
		font-size: 14px;
		line-height: 1.6;
		color: var(--muted-fg);
		max-width: 460px;
	}

	.chips {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		margin-top: 8px;
	}

	.chips span {
		height: 26px;
		display: flex;
		align-items: center;
		padding: 0 10px;
		border: 1px solid var(--border);
		border-radius: var(--radius);
		font-size: 12px;
		color: var(--chip-fg);
	}

	.panel-cta {
		display: flex;
		flex-direction: column;
		gap: 8px;
		margin-top: auto;
	}

	@media (max-width: 900px) {
		.community {
			grid-template-columns: minmax(0, 1fr);
		}
	}
</style>
