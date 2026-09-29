<script lang="ts">
	import { discord, matrix, repo } from '$lib/data/links';
</script>

<svelte:head>
	<title>Getting help · Sonora docs</title>
</svelte:head>

<h1>Getting help</h1>
<p class="summary">
	Ask questions in the chat and report bugs on GitHub. The issue tracker is not the place for
	questions.
</p>

<h2 id="chat">Chat</h2>
<p>
	<a href={discord}>Discord</a> is where most people are. The <a href={matrix}>Matrix</a> space is bridged
	to it, so you reach the same people from either one.
</p>

<h2 id="bugs">Reporting a bug</h2>
<p>
	Search the <a href="{repo}/issues">existing issues</a> first, and check that you are on the latest release.
	The bug form then asks for:
</p>
<ul>
	<li>what happened and the steps that lead to it</li>
	<li>the Sonora version, which is the first line of the log</li>
	<li>how you installed it, and your OS and version</li>
	<li>on Linux, Wayland or X11 and your desktop</li>
	<li>your GPU and Vulkan driver</li>
	<li>the end of the <a href="/docs/logs">log</a>, pasted as text rather than a screenshot</li>
</ul>

<h2 id="features">Asking for a feature</h2>
<p>
	Open a <a href="{repo}/issues/new/choose">feature request</a> and describe the problem it would solve
	before the feature itself. Sonora will not add anything that downloads or rips streams.
</p>
