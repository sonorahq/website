<script>
	import AppMock from './mock/AppMock.svelte';
</script>

<section id="playground" class="section playground">
	<div class="page">
		<h2>This one you can actually use.</h2>
		<p class="lead">
			Everything below is a working rebuild of Sonora's album view, drawn from the theme tokens,
			metrics and icon set the app itself ships. Nothing here is a video.
		</p>

		<div class="frame">
			<AppMock />
		</div>

		<p class="fine">
			The accent is picked from the cover by the app's own colour extraction, so every screen
			re-tints itself around whatever is playing. Lyrics need the app: this preview has no lyrics
			service to reach.
		</p>
	</div>
</section>

<style>
	.playground {
		background: var(--band);
	}

	.frame {
		margin-top: 40px;
		border: 1px solid var(--border);
		border-radius: 14px;
		overflow: hidden;
		background: var(--card);
		box-shadow: var(--shadow);
	}

	.fine {
		max-width: 620px;
		margin: 18px auto 0;
		font-size: 12px;
		line-height: 1.5;
		color: var(--dim);
		text-align: center;
	}
</style>
