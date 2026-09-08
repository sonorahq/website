<section class="providers">
	<div class="page">
		<span class="eyebrow">One player, four sources</span>
		<div class="names">
			<span>Spotify</span>
			<span>YouTube Music</span>
			<span>Subsonic</span>
			<span>Local files</span>
		</div>
	</div>
</section>

<style>
	.providers {
		display: flex;
		height: var(--band);
		align-items: center;
		border-top: 1px solid var(--border);
		border-bottom: 1px solid var(--border);
		text-align: center;
	}

	.eyebrow {
		font-size: 12px;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--dim);
	}

	.page {
		width: 100%;
	}

	.names {
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		gap: 16px 56px;
		margin-top: 26px;
		font-size: 17px;
		font-weight: 500;
		color: var(--muted-fg);
	}

	@media (max-width: 900px) {
		.providers {
			height: auto;
			padding: 44px 0;
		}
	}
</style>
