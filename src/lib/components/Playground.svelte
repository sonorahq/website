<script>
	import AppMock from './mock/AppMock.svelte';
</script>

<section id="playground" class="section playground">
	<div class="page">
		<h2>Try the interface right here.</h2>
		<p class="lead">
			A working rebuild of Sonora's album view, drawn from the same theme tokens, metrics and icon
			set the app ships. Play a track, drag the seek bar, collapse a panel.
		</p>

		<div class="frame">
			<AppMock />
		</div>

		<p class="fine">
			The accent is picked from the cover by the app's own colour extraction — every screen you see
			re-tints itself around whatever is playing.
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
		margin-top: 18px;
		font-size: 12px;
		line-height: 1.5;
		color: var(--dim);
		text-align: center;
	}
</style>
