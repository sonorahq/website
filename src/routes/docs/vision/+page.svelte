<svelte:head>
	<title>Vision · Sonora docs</title>
</svelte:head>

<h1>Vision</h1>
<p class="summary">Who Sonora is for, and what it will never be.</p>

<h2>TL;DR</h2>
<p>
	If you're just here to figure out if your feature request will be implemented, here's a quick
	guide:
</p>
<ul>
	<li>
		<b>No piracy.</b> Sonora is a music player, not a music downloader or ripping tool. Exporting
		audio from streaming services, circumventing subscription requirements, and similar
		functionality will
		<u>never</u> be supported.
	</li>
	<li>
		<b>Sonora is not VLC.</b> It will not reconstruct a broken .mp69 file into something audible. If a
		file is broken, it is broken.
	</li>
	<li>
		<b>No provider mixing.</b> Sonora will never support having one library from multiple providers or
		adding tracks from different providers into one playlist. This is a deliberate choice based on Spotify's
		and other services' ToS and our personal beliefs.
	</li>
</ul>

<h2 id="what-it-is">What is Sonora?</h2>
<p>
	Despite it being a fairly simple question, sometimes we ourselves don't know the answer. Sonora
	initially started after <a href="https://github.com/nolight132">@nolight132</a> (that's me) was
	frustrated with all the existing solutions for streaming music on Linux. It was a mystery to us
	how such amazing tools like <a href="https://github.com/librespot-org/librespot">librespot</a> hadn't
	been used to their full potential to create something that resembled a first-party client and ran anywhere,
	without Chromium. So we got to work!
</p>

<p>
	The project hasn't stopped evolving ever since. All the ideas and opinions that we had about music
	players as users were now coming to life as we were building it. All the menus, the visuals, we
	got to think it all through from scratch.
</p>

<h3>Providers</h3>
<p>
	At some point we realized that the provider abstraction was <i>sound</i> enough to try and add
	another one.
	<a href="https://github.com/imizgun">@imizgun</a> was already working on a separate local-only
	mode for the app at the time. Some of us were reluctant to add another provider, with concerns
	around deduplicating tracks from different providers being raised. This was the point where we
	realized that in order to keep the project maintainable and providers easy to add, we needed to
	draw hard lines in the sand. We couldn't afford to write a matcher for every service or, even
	worse, call an external API to do it. So the first rule was established:
	<b>no provider mixing</b>.
</p>

<p>
	Great, now we have an app that supports Spotify and YouTube Music independently. A person using
	Spotify could never know about the existence of YouTube Music, and vice versa. Enter...
</p>

<h3>Local music</h3>
<p>
	It was looking great. Every audio file was being played locally, without any external services
	needed. Local wasn't a big focus at the time, but even then we realized there was nothing stopping
	us from providing lyrics for it. Despite this somewhat unique feature being added, local music
	didn't become a priority at the time.
</p>
<p>
	It all changed after some real users showed up (yes, you!). It was only to be expected that people
	from <a href="https://www.reddit.com/r/rust/">r&#8288;/&#8288;rust</a>
	and <a href="https://www.reddit.com/r/foss/">r&#8288;/&#8288;foss</a> would like to see local music
	as a first-class citizen, so we got tons of feedback. There were many awesome suggestions and requests,
	and some people even expressed interest in contributing! It was awesome to see the community grow and
	work together on Sonora.
</p>
<p>
	What we also got was quite a few issues about local files not playing. Each and every one of them
	turned out to be a malformed file not being parsed by <a
		href="https://github.com/pdeljanov/Symphonia">Symphonia</a
	>. We were able to resolve most of these issues for the most common errors, but after some time it
	became clear that we weren't able to support every use case, as there are countless ways to break
	an audio file. This is when we decided to <b>stop trying to fix broken files</b>. If a file
	doesn't follow a standard, we'll just let it fail. There are many tools to fix these errors, and
	we never intended Sonora to be one of them.
</p>

<h3>What <i>did</i> we intend it to be?</h3>
<p>
	A third-party streaming client that works and looks better than the official ones. One that
	supports as many providers as possible along with their unique features. One that can be used as a
	somewhat traditional music player without relying on external services. One that doesn't suck.
</p>

<h2 id="direction">Where is it heading?</h2>
<p>
	There are countless features on the <a href="/docs/roadmap">roadmap</a>. Even when there are none
	left, there will always be things to improve.
</p>
