<script>
	import { ABOUT_FALLBACK } from '$lib/mock/screens.js';
	import Cover from './Cover.svelte';

	let { name = '', cover = '', biography = '', onpress = undefined } = $props();
</script>

<button type="button" class="about" onclick={onpress}>
	<Cover src={cover} size={88} circle fallback="user-round" />
	<span class="text">
		<span class="eyebrow">About the artist</span>
		<span class="name">{name}</span>
		<span class="blurb">{biography || ABOUT_FALLBACK}</span>
	</span>
</button>

<style>
	.about {
		display: flex;
		width: 100%;
		align-items: center;
		gap: 17.5px;
		padding: 17.5px;
		border: 1px solid var(--m-border);
		border-radius: var(--m-radius);
		background: none;
		color: var(--m-foreground);
		font: inherit;
		cursor: pointer;
	}

	.about:hover {
		background: var(--m-secondary);
	}

	.text {
		display: flex;
		flex: 1;
		min-width: 0;
		flex-direction: column;
		gap: 7px;
		text-align: left;
	}

	.eyebrow {
		flex: none;
		font-size: 12px;
		font-weight: 600;
		text-transform: uppercase;
		color: var(--m-muted-foreground);
	}

	.name {
		flex: none;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 24px;
		font-weight: 600;
	}

	.blurb {
		display: -webkit-box;
		min-width: 0;
		overflow: hidden;
		-webkit-line-clamp: 3;
		line-clamp: 3;
		-webkit-box-orient: vertical;
		color: var(--m-muted-foreground);
	}
</style>
