<script lang="ts">
	import type { Language } from '$lib/data/languages';
	import { reveal } from '$lib/reveal';
	import { discord, matrix, repo } from '$lib/data/links';
	import Flag from './Flag.svelte';
	import Mark from './Mark.svelte';

	let { languages, strings, done }: { languages: Language[]; strings: number; done: number } =
		$props();
</script>

<section id="community" class="section">
	<span class="cross start"></span>
	<span class="cross end"></span>

	<div class="page">
		<div class="section-head" use:reveal>
			<span class="kicker">Community</span>
			<h2>Come say hi</h2>
		</div>

		<div class="wire cols" use:reveal>
			<div class="talk">
				<div class="block">
					<span class="kicker">Chat</span>
					<div class="links">
						<a class="btn btn-primary" href={discord}>
							<Mark name="discord" size={16} />
							Discord
						</a>
						<a class="btn btn-secondary" href={matrix}>
							<Mark name="matrix" size={16} />
							Matrix
						</a>
					</div>
				</div>

				<div class="block">
					<span class="kicker">Project</span>
					<div class="plain">
						<a href="{repo}/issues">Issues</a>
						<a href="{repo}/blob/main/CONTRIBUTING.md">Contributing</a>
						<a href="/changelog">Changelog</a>
					</div>
				</div>

				<div class="clip" aria-hidden="true">
					<img class="topic" src="/hi-head.webp" width="634" height="56" alt="" />
					<div class="feed">
						<div class="reel">
							<img src="/hi-chat.webp" width="634" height="1961" alt="" />
							<img src="/hi-chat.webp" width="634" height="1961" alt="" />
						</div>
					</div>
				</div>
			</div>

			<div class="langs">
				<div class="head">
					<span class="kicker">Translations</span>
					<p>{strings} strings · {languages.length} languages · {done} complete</p>
				</div>

				<ul>
					{#each languages as language (language.code)}
						<li>
							<Flag code={language.flag} />
							<span class="name">{language.name}</span>
							<span class="mono code">{language.code}</span>
							<span class="bar" aria-hidden="true">
								<span class="fill" style:width="{language.share}%"></span>
							</span>
							<span class="mono share" class:full={language.share === 100}>{language.share}%</span>
						</li>
					{/each}
				</ul>

				<a class="more" href="{repo}/blob/main/README.md#translations">
					Add a language
					<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
				</a>
			</div>
		</div>
	</div>
</section>

<style>
	.page {
		padding-bottom: 72px;
	}

	.cols {
		grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
	}

	.talk {
		display: flex;
		flex-direction: column;
	}

	.block {
		display: flex;
		flex-direction: column;
		gap: 16px;
		padding: 24px;
		border-bottom: 1px solid var(--line);
	}

	.clip {
		position: relative;
		flex-grow: 1;
		min-height: 240px;
		overflow: hidden;
	}

	.clip {
		display: flex;
		flex-direction: column;
	}

	.clip img {
		display: block;
		width: 100%;
		height: auto;
	}

	.topic {
		position: relative;
		z-index: 1;
		flex: none;
	}

	.feed {
		position: relative;
		flex: 1;
		min-height: 0;
		overflow: hidden;
	}

	.reel {
		position: absolute;
		top: 0;
		right: 0;
		left: 0;
		animation: reel 10.08s linear infinite;
	}

	@keyframes reel {
		to {
			transform: translateY(-50%);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.reel {
			animation: none;
		}
	}

	.links {
		display: flex;
		gap: 8px;
	}

	.plain {
		display: flex;
		gap: 18px;
		font-size: 14px;
	}

	.plain a {
		text-decoration: underline;
		text-decoration-color: var(--faint);
		text-underline-offset: 3px;
	}

	.plain a:hover {
		text-decoration-color: var(--fg);
	}

	.langs {
		display: flex;
		flex-direction: column;
	}

	.head {
		display: flex;
		flex-direction: column;
		gap: 10px;
		padding: 24px 24px 18px;
		border-bottom: 1px solid var(--line);
	}

	.head p {
		font-size: 13px;
		color: var(--muted-fg);
	}

	ul {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	li {
		display: grid;
		grid-template-columns: 14px minmax(0, 1fr) 44px minmax(60px, 120px) 40px;
		align-items: center;
		gap: 12px;
		height: 36px;
		padding: 0 24px;
		border-bottom: 1px solid var(--line);
		font-size: 13px;
	}

	li:hover {
		background: var(--secondary);
	}

	.name {
		min-width: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.code {
		font-size: 11px;
		color: var(--faint);
	}

	.bar {
		height: 1px;
		background: var(--line);
	}

	.fill {
		display: block;
		height: 3px;
		margin-top: -1px;
		border-radius: 2px;
		background: var(--dim);
	}

	.share {
		text-align: right;
		font-size: 11px;
		font-variant-numeric: tabular-nums;
		color: var(--dim);
	}

	.share.full {
		color: var(--fg);
	}

	.more {
		display: flex;
		align-items: center;
		gap: 6px;
		margin-top: auto;
		padding: 16px 24px;
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

	@media (max-width: 900px) {
		.page {
			padding-bottom: 48px;
		}

		.cols {
			grid-template-columns: minmax(0, 1fr);
		}

		.clip {
			min-height: 0;
			aspect-ratio: 4 / 3;
			border-bottom: 1px solid var(--line);
		}

		.block,
		.head {
			padding: 18px 16px;
		}

		li {
			grid-template-columns: 14px minmax(0, 1fr) 40px;
			padding: 0 16px;
		}

		.bar,
		.code {
			display: none;
		}

		.more {
			padding: 14px 16px;
		}
	}
</style>
