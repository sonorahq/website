<script lang="ts" module>
	/** Which question is open on the page. The FAQ page creates one and hands it down through context, which keeps a single answer showing at a time. */
	export type Accordion = { open: string | null };
</script>

<script lang="ts">
	import { getContext, onMount, type Snippet } from 'svelte';
	import { cubicOut } from 'svelte/easing';
	import { slide } from 'svelte/transition';

	/** `id` is also the anchor, so `/faq#<id>` opens this question. */
	let { id, question, children }: { id: string; question: string; children: Snippet } = $props();

	const accordion = getContext<Accordion>('faq');
	const open = $derived(accordion.open === id);

	let duration = $state(240);

	onMount(() => {
		if (matchMedia('(prefers-reduced-motion: reduce)').matches) duration = 0;
	});
</script>

<div class="question" {id}>
	<button
		type="button"
		aria-expanded={open}
		aria-controls="{id}-answer"
		onclick={() => (accordion.open = open ? null : id)}
	>
		<span class="label">{question}</span>
	</button>

	{#if open}
		<div class="panel" id="{id}-answer" transition:slide={{ duration, easing: cubicOut }}>
			<div class="answer">{@render children()}</div>
		</div>
	{:else}
		<div
			class="answer"
			id="{id}-answer"
			hidden="until-found"
			onbeforematch={() => (accordion.open = id)}
		>
			{@render children()}
		</div>
	{/if}
</div>

<style>
	.question {
		border-bottom: 1px solid var(--line);
		scroll-margin-top: calc(var(--header) + 24px);
	}

	.question:last-child {
		border-bottom: none;
	}

	button {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
		padding: 16px 18px;
		font-size: 15px;
		font-weight: 500;
		text-align: left;
		user-select: none;
		-webkit-tap-highlight-color: transparent;
	}

	button:hover {
		background: var(--secondary);
	}

	button::after {
		content: '';
		flex-shrink: 0;
		width: 7px;
		height: 7px;
		margin-right: 4px;
		border-right: 1.5px solid var(--dim);
		border-bottom: 1.5px solid var(--dim);
		transform: translateY(-2px) rotate(45deg);
		transition: transform 0.24s cubic-bezier(0.22, 0.61, 0.36, 1);
	}

	button[aria-expanded='true']::after {
		transform: translateY(2px) rotate(-135deg);
	}

	.answer {
		display: flex;
		flex-direction: column;
		gap: 14px;
		padding: 10px 18px 20px;
	}
</style>
