<section id="closer-look" class="section look">
	<div class="page">
		<h2>The real window, at rest.</h2>
		<p class="lead">
			A playlist open on the left, lyrics tracking the line on the right, and the whole frame tinted
			by the record that is playing.
		</p>

		<figure>
			<div class="frame">
				<img
					src="/app-playlist.webp"
					width="1400"
					height="867"
					alt="Sonora playing an album with the lyrics panel open"
				/>
			</div>
			<figcaption>Sonora on Linux, adaptive dark, lyrics panel open</figcaption>
		</figure>
	</div>
</section>

<style>
	.look {
		background: var(--band);
	}

	figure {
		max-width: 1180px;
		margin: 40px auto 0;
	}

	.frame {
		aspect-ratio: 1602 / 992;
		border: 1px solid var(--border);
		border-radius: 14px;
		overflow: hidden;
		background: var(--card);
		box-shadow: var(--shadow);
	}

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	figcaption {
		margin-top: 16px;
		font-size: 12px;
		color: var(--dim);
		text-align: center;
	}
</style>
