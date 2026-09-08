<script>
	import { discord, matrix, repo } from '$lib/data/links.js';
	import Flag from './Flag.svelte';
	import Mark from './Mark.svelte';

	let { languages, strings, done } = $props();
</script>

<section class="section">
	<div class="page community">
		<div class="panel">
			<h2>Speaks {languages.length} languages</h2>
			<p>
				{strings} strings, translated by the community and tracked in the repo. {done}
				{done === 1 ? 'is' : 'are'} complete — the rest are a pull request away.
			</p>

			<ul>
				{#each languages as language (language.code)}
					<li>
						<Flag code={language.flag} />
						<span class="name">{language.name}</span>
						<span class="code mono">{language.code}</span>
						<span class="share" class:full={language.share === 100}>{language.share}%</span>
					</li>
				{/each}
			</ul>

			<a class="more" href="{repo}/blob/main/README.md#translations">
				Add a language
				<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
			</a>
		</div>

		<div class="panel">
			<h2>Come hang out</h2>
			<p>Discord is where most of it happens, bridged to Matrix.</p>
			<div class="panel-cta">
				<a class="btn btn-primary" href={discord}>
					<Mark name="discord" size={16} />
					Join Discord
				</a>
				<a class="btn btn-secondary" href={matrix}>
					<Mark name="matrix" size={16} />
					Matrix space
				</a>
			</div>
		</div>
	</div>
</section>

<style>
	.community {
		display: grid;
		/* Each panel sizes to its own content; stretching the short one left a hole
		   between its text and its buttons. */
		align-items: start;
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

	ul {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 4px 40px;
		margin: 10px 0 0;
		padding: 0;
		list-style: none;
	}

	li {
		display: flex;
		align-items: center;
		gap: 10px;
		height: 26px;
		font-size: 13px;
	}

	.name {
		flex-grow: 1;
		min-width: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.code {
		font-size: 11px;
		color: var(--dim);
	}

	.share {
		width: 34px;
		text-align: right;
		font-size: 12px;
		font-variant-numeric: tabular-nums;
		color: var(--dim);
	}

	.share.full {
		color: var(--muted-fg);
	}

	.more {
		display: flex;
		align-items: center;
		gap: 6px;
		margin-top: auto;
		padding-top: 10px;
		font-size: 13px;
		color: var(--muted-fg);
	}

	.more:hover {
		color: var(--fg);
	}

	.more svg {
		width: 11px;
		height: 11px;
		fill: none;
		stroke: currentColor;
		stroke-width: 2.2;
		stroke-linecap: round;
		stroke-linejoin: round;
	}

	.panel-cta {
		display: flex;
		flex-direction: column;
		gap: 8px;
		margin-top: 4px;
	}

	@media (max-width: 900px) {
		.community {
			grid-template-columns: minmax(0, 1fr);
		}

		ul {
			grid-template-columns: minmax(0, 1fr);
		}
	}
</style>
