<script lang="ts">
	import type { Snippet } from 'svelte';
	import Cover from './Cover.svelte';

	let {
		title = '',
		eyebrow = '',
		cover = '',
		fallback = 'music',
		accent = false,
		circle = false,
		meta = [],
		actions = undefined
	}: {
		title?: string;
		eyebrow?: string;
		cover?: string;
		fallback?: string;
		accent?: boolean;
		circle?: boolean;
		meta?: string[];
		actions?: Snippet;
	} = $props();
</script>

<header class="hero">
	<div class="art">
		<Cover
			src={cover}
			size={140}
			radius="calc(var(--m-radius) * 1.5)"
			{fallback}
			{circle}
			{accent}
		/>
	</div>
	<div class="text">
		{#if eyebrow}<span class="eyebrow">{eyebrow}</span>{/if}
		<h1>{title}</h1>
		{#if meta.length}
			<p class="meta">
				{#each meta as item, at (item)}
					<span class="part">
						{#if at > 0}<span>&bull;</span>{/if}
						<span>{item}</span>
					</span>
				{/each}
			</p>
		{/if}
		{#if actions}
			<div class="actions">{@render actions()}</div>
		{/if}
	</div>
</header>

<style>
	.hero {
		display: flex;
		flex: none;
		align-items: flex-end;
		gap: 17.5px;
		padding-bottom: 21px;
	}

	.art {
		display: flex;
		flex: none;
	}

	.text {
		display: flex;
		flex: 1;
		min-width: 0;
		height: 140px;
		flex-direction: column;
		justify-content: flex-end;
		gap: 7px;
		line-height: 1.25;
	}

	.eyebrow {
		font-size: 12px;
		font-weight: 600;
		text-transform: uppercase;
		color: var(--m-muted-foreground);
	}

	h1 {
		margin: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 30px;
		font-weight: 700;
		letter-spacing: normal;
	}

	.meta {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		min-width: 0;
		gap: 3.5px;
		margin: 0;
		font-size: 12px;
		color: var(--m-muted-foreground);
	}

	.part {
		display: flex;
		flex: none;
		align-items: center;
		gap: 3.5px;
	}

	.actions {
		display: flex;
		align-items: center;
		gap: 7px;
		padding-top: 3.5px;
	}
</style>
