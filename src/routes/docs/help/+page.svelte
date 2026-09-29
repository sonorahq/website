<script lang="ts">
	import { discord, matrix, repo } from '$lib/data/links';
</script>

<svelte:head>
	<title>Getting help · Sonora docs</title>
</svelte:head>

<h1>Getting help</h1>
<p class="summary">
	Questions go in the chat and bugs go on GitHub. Please don't open an issue just to ask something.
	The <a href="/faq">FAQ</a> covers the problems people hit most, so it's worth a look first.
</p>

<h2 id="chat">Chat</h2>
<p>
	Most people hang out on <a href={discord}>Discord</a>. We also have a bridged
	<a href={matrix}>Matrix</a> space.
</p>

<h2 id="bugs">Reporting a bug</h2>
<p>
	Search the <a href="{repo}/issues">existing issues</a> first, and make sure you're on the latest release.
	The bug form asks for:
</p>
<ul>
	<li>what happened and how to make it happen again</li>
	<li>your Sonora version</li>
	<li>how you installed it, and your OS and its version</li>
	<li>on Linux, Wayland or X11 and your desktop</li>
	<li>your GPU and Vulkan driver</li>
	<li>the end of the <a href="/docs/logs">log</a></li>
</ul>
<p>The log is the part that matters most. Paste it as text, not a screenshot.</p>

<h2 id="features">Asking for a feature</h2>
<p>
	Read the <a href="/docs/vision">Vision</a> page first. It spells out what fits Sonora and what's out
	of scope, so you can tell before writing a request whether your idea belongs here.
</p>
<p>
	If it does, open a <a href="{repo}/issues/new/choose">feature request</a>. Start with the problem
	you're trying to solve, then the feature you have in mind.
</p>
<p class="note">Sonora won't add anything that downloads or rips streams.</p>
