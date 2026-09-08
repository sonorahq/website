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
						class="on-dark"
						src="/app-artist.webp"
						width="1100"
						height="660"
						alt="An artist page in Sonora with the play queue open"
					/>
					<img
						class="on-light"
						src="/app-playlist.webp"
						width="1400"
						height="867"
						alt="Sonora in its dark theme with the lyrics panel open"
					/>
				</div>
				<figcaption>
					<span class="on-dark-row">
						<span class="swatch violet"></span>
						Artists, releases, queue
					</span>
					<span class="on-light-row">
						<span class="swatch ink"></span>
						Dark, tinted by the record
					</span>
				</figcaption>
			</figure>

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
					<span class="row">
						<span class="swatch paper"></span>
						Light, full-screen lyrics
					</span>
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
		aspect-ratio: 1602 / 992;
		border: 1px solid var(--border);
		border-radius: 8px;
		overflow: hidden;
		background: var(--bg);
	}

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	figcaption {
		padding: 18px 6px 6px;
		font-size: 15px;
		font-weight: 600;
		letter-spacing: -0.01em;
	}

	figcaption span {
		align-items: center;
		gap: 9px;
	}

	.row {
		display: flex;
	}

	.swatch {
		width: 10px;
		height: 10px;
		border-radius: 5px;
		border: 1px solid;
		flex-shrink: 0;
	}

	.violet {
		background: #a855f7;
		border-color: #6b21a8;
	}

	.ink {
		background: #171717;
		border-color: #404040;
	}

	.paper {
		background: #e5e5e5;
		border-color: #a3a3a3;
	}

	@media (max-width: 900px) {
		.themes {
			grid-template-columns: minmax(0, 1fr);
		}
	}
</style>
