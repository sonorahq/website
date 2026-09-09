<script>
	let { fraction, label, onseek } = $props();

	let bar = $state(/** @type {HTMLElement | null} */ (null));
	let held = $state(false);

	/** @param {number} x */
	function at(x) {
		if (!bar) return 0;
		const box = bar.getBoundingClientRect();
		const travel = box.width - 12;
		return travel <= 0 ? 0 : Math.min(Math.max((x - box.left - 6) / travel, 0), 1);
	}

	/** @param {PointerEvent} event */
	function grab(event) {
		held = true;
		if (event.currentTarget instanceof Element)
			event.currentTarget.setPointerCapture(event.pointerId);
		onseek(at(event.clientX));
	}

	/** @param {PointerEvent} event */
	function drag(event) {
		if (held) onseek(at(event.clientX));
	}

	/** @param {PointerEvent} event */
	function release(event) {
		held = false;
		if (event.currentTarget instanceof Element)
			event.currentTarget.releasePointerCapture(event.pointerId);
	}
</script>

<div
	class="scrub"
	role="slider"
	tabindex="-1"
	aria-label={label}
	aria-valuemin="0"
	aria-valuemax="100"
	aria-valuenow={Math.round(fraction * 100)}
	onpointerdown={grab}
	onpointermove={drag}
	onpointerup={release}
	onpointercancel={release}
>
	<div bind:this={bar} class="bar">
		<div class="filled" style:width="calc(6px + (100% - 12px) * {fraction})"></div>
		<div class="thumb" style:left="calc((100% - 12px) * {fraction})"></div>
	</div>
</div>

<style>
	.scrub {
		position: relative;
		display: flex;
		width: 100%;
		height: 24px;
		align-items: center;
		cursor: pointer;
		touch-action: none;
	}

	.bar {
		position: relative;
		width: 100%;
		height: 4px;
		border-radius: 999px;
		background: color-mix(in srgb, var(--m-muted-foreground) 30%, transparent);
	}

	.filled {
		height: 100%;
		border-radius: 999px;
		background: var(--m-progress-bar);
	}

	.thumb {
		position: absolute;
		top: -4px;
		width: 12px;
		height: 12px;
		border-radius: 999px;
		background: var(--m-foreground);
	}
</style>
