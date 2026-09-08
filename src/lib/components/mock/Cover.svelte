<script>
	import Icon from './Icon.svelte';

	let { src = '', size = 36, radius = 'var(--m-radius)' } = $props();
</script>

{#if src}
	<img {src} width={size} height={size} style:border-radius={radius} alt="" />
{:else}
	<span class="blank" style:width="{size}px" style:height="{size}px" style:border-radius={radius}>
		<Icon name="music" size={Math.round(size * 0.46)} />
	</span>
{/if}

<style>
	img {
		flex: none;
		object-fit: cover;
	}

	.blank {
		display: flex;
		flex: none;
		align-items: center;
		justify-content: center;
		background: color-mix(in srgb, var(--m-muted-foreground) 12%, transparent);
		color: color-mix(in srgb, var(--m-muted-foreground) 50%, transparent);
	}
</style>
