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

		<p class="hint">
			<span class="dot"></span>
			Live — click a track, drag the seek bar, collapse a panel
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
		margin-top: 12px;
		border: 1px solid var(--border);
		border-radius: 14px;
		overflow: hidden;
		background: var(--card);
		box-shadow: var(--shadow);
	}

	.hint {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		width: fit-content;
		margin: 40px auto 0;
		padding: 7px 14px;
		border: 1px solid var(--border);
		border-radius: 999px;
		background: var(--popover);
		font-size: 12px;
		color: var(--fg);
	}

	.dot {
		width: 7px;
		height: 7px;
		border-radius: 999px;
		background: #22c55e;
		animation: pulse 2s ease-in-out infinite;
	}

	@keyframes pulse {
		50% {
			opacity: 0.25;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.dot {
			animation: none;
		}
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
