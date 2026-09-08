<section id="themes" class="section">
	<div class="page">
		<h2>Eight looks, plus your own.</h2>
		<p class="lead">
			Dark, light, midnight, forest, ocean, rose, lavender, amber — or follow the system. Adaptive
			tinting takes its colour from the artwork, and every token underneath is overridable.
		</p>

		<div class="themes">
			<figure>
				<div class="inset">
					<img
						src="/app-lyrics.webp"
						width="1100"
						height="660"
						alt="Sonora in its light theme showing full-screen synced lyrics"
					/>
				</div>
				<figcaption>
					<span class="swatch light"></span>
					Light, tinted by the record
				</figcaption>
			</figure>

			<figure>
				<div class="inset">
					<img
						src="/app-artist.webp"
						width="1100"
						height="660"
						alt="An artist page in Sonora with the play queue open"
					/>
				</div>
				<figcaption>
					<span class="swatch violet"></span>
					Artists, releases, queue
				</figcaption>
			</figure>
		</div>
	</div>
</section>

<style>
	.themes {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 20px;
		margin-top: 56px;
	}

	figure {
		margin: 0;
		padding: 18px;
		border: 1px solid var(--border);
		border-radius: 12px;
		background: var(--card);
	}

	.inset {
		border: 1px solid var(--border);
		border-radius: 8px;
		overflow: hidden;
		background: var(--bg);
	}

	img {
		display: block;
		width: 100%;
		height: auto;
	}

	figcaption {
		display: flex;
		align-items: center;
		gap: 9px;
		padding: 18px 6px 6px;
		font-size: 15px;
		font-weight: 600;
		letter-spacing: -0.01em;
	}

	.swatch {
		width: 10px;
		height: 10px;
		border-radius: 5px;
		border: 1px solid;
	}

	.light {
		background: #d4d4d4;
		border-color: #404040;
	}

	.violet {
		background: #a855f7;
		border-color: #6b21a8;
	}

	@media (max-width: 900px) {
		.themes {
			grid-template-columns: minmax(0, 1fr);
		}
	}
</style>
