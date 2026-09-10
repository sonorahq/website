<script>
	import { reveal } from '$lib/reveal.js';
</script>

<section id="features" class="section">
	<div class="page">
		<h2 use:reveal>Built like a desktop app,<br />because it is one.</h2>
		<p class="lead" use:reveal>
			GPUI renders the whole interface on the GPU. Playback, library and lyrics all run in the same
			Rust process.
		</p>

		<div class="cards" use:reveal={{ stagger: true }}>
			<article>
				<span class="icon">
					<svg viewBox="0 0 24 24" aria-hidden="true">
						<path d="M3 12h4l2-5 3 10 2.5-7 1.5 2h5" />
					</svg>
				</span>
				<h3>Gapless playback</h3>
				<p>Tracks run into each other the way the record intended, across every provider.</p>
			</article>

			<article>
				<span class="icon">
					<svg viewBox="0 0 24 24" aria-hidden="true">
						<path d="M4 15V9" />
						<path d="M8 18V6" />
						<path d="M12 14v-4" />
						<path d="M16 17V7" />
						<path d="M20 13v-2" />
					</svg>
				</span>
				<h3>Audio normalization</h3>
				<p>Levels stay even when a playlist jumps between a 2003 master and a 2024 one.</p>
			</article>

			<article>
				<span class="icon">
					<svg viewBox="0 0 24 24" aria-hidden="true">
						<path d="M12 3v10" />
						<path d="M8 8a4 4 0 0 0 8 0" />
						<path d="M9 17.5A4 4 0 0 0 12 19a4 4 0 0 0 3-1.5" />
						<path d="M5 21h14" />
					</svg>
				</span>
				<h3>Synced and karaoke lyrics</h3>
				<p>Line-by-line and word-by-word timing, with romanization for non-Latin scripts.</p>
			</article>

			<article>
				<span class="icon">
					<svg viewBox="0 0 24 24" aria-hidden="true">
						<path d="M4 6h11" />
						<path d="M4 11h11" />
						<path d="M4 16h7" />
						<circle cx="17" cy="17" r="3" />
						<path d="M20 17V8" />
					</svg>
				</span>
				<h3>One library, many sources</h3>
				<p>Follow, like and organise inside each provider without leaving the app.</p>
			</article>

			<article>
				<span class="icon">
					<svg viewBox="0 0 24 24" aria-hidden="true">
						<circle cx="12" cy="12" r="9" />
						<path d="M12 3a9 9 0 0 0 0 18 3 3 0 0 0 0-6 3 3 0 0 1 0-6 3 3 0 0 0 0-6z" />
					</svg>
				</span>
				<h3>Custom themes</h3>
				<p>Eight built-in looks plus system, adaptive tinting, and every token overridable.</p>
			</article>

			<article>
				<span class="icon">
					<svg viewBox="0 0 24 24" aria-hidden="true">
						<rect x="3" y="4" width="18" height="12" rx="2" />
						<path d="M8 20h8" />
						<path d="M12 16v4" />
					</svg>
				</span>
				<h3>Cross-platform, natively</h3>
				<p>One Rust binary on macOS, Linux and Windows. No Electron, no bundled browser.</p>
			</article>
		</div>
	</div>
</section>

<style>
	.cards {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 20px;
		margin-top: 56px;
	}

	article {
		display: flex;
		flex-direction: column;
		gap: 12px;
		min-height: 176px;
		padding: 24px;
		border: 1px solid var(--border);
		border-radius: var(--radius-lg);
		background: var(--card);
	}

	.icon {
		width: 32px;
		height: 32px;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 1px solid var(--border);
		border-radius: var(--radius);
		background: var(--secondary);
	}

	svg {
		width: 17px;
		height: 17px;
		fill: none;
		stroke: currentColor;
		stroke-width: 1.7;
		stroke-linecap: round;
		stroke-linejoin: round;
	}

	h3 {
		margin: 4px 0 0;
		font-size: 15px;
		font-weight: 600;
		letter-spacing: -0.01em;
	}

	p {
		font-size: 13px;
		line-height: 1.55;
		color: var(--muted-fg);
	}

	@media (max-width: 900px) {
		.cards {
			grid-template-columns: minmax(0, 1fr);
		}
	}
</style>
