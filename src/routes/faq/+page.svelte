<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { onMount } from 'svelte';
	import Code from '$lib/components/docs/Code.svelte';
	import MenuPath from '$lib/components/docs/MenuPath.svelte';
	import Search from '$lib/components/docs/Search.svelte';
	import '$lib/prose.css';

	const DURATION = 240;

	/** Animates one answer open or shut. A closing question keeps its `open` attribute and carries a `closing` class until the animation ends, so clicking it again mid-way reverses cleanly. */
	function slide(details: HTMLDetailsElement, open: boolean) {
		const answer = details.querySelector<HTMLElement>('.answer');
		const closing = details.classList.contains('closing');
		if (!answer || (open && details.open && !closing) || (!open && (!details.open || closing)))
			return;

		const duration = matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : DURATION;
		answer.getAnimations().forEach((animation) => animation.cancel());
		const folded = { height: '0px', paddingTop: '0px', paddingBottom: '0px', opacity: 0 };

		if (open) {
			details.classList.remove('closing');
			details.open = true;
			const style = getComputedStyle(answer);
			const full = {
				height: `${answer.offsetHeight}px`,
				paddingTop: style.paddingTop,
				paddingBottom: style.paddingBottom,
				opacity: 1
			};
			answer.animate([folded, full], { duration, easing: 'cubic-bezier(0.22, 0.61, 0.36, 1)' });
			return;
		}

		const style = getComputedStyle(answer);
		const full = {
			height: `${answer.offsetHeight}px`,
			paddingTop: style.paddingTop,
			paddingBottom: style.paddingBottom,
			opacity: 1
		};
		details.classList.add('closing');
		const animation = answer.animate([full, folded], { duration, easing: 'ease-in-out' });
		animation.onfinish = () => {
			details.open = false;
			details.classList.remove('closing');
		};
	}

	/** Opens `target` and closes every other question, so only one answer is ever showing. */
	function show(target: HTMLDetailsElement) {
		for (const other of document.querySelectorAll<HTMLDetailsElement>('.questions details')) {
			if (other !== target) slide(other, false);
		}
		slide(target, true);
	}

	/** Opens the question the URL points at, so links and search results land on an expanded answer. */
	function reveal() {
		const target = location.hash && document.getElementById(location.hash.slice(1));
		if (!(target instanceof HTMLDetailsElement)) return;
		show(target);
		target.scrollIntoView({ block: 'start' });
	}

	onMount(() => {
		const onclick = (event: MouseEvent) => {
			const summary = (event.target as Element | null)?.closest('.questions summary');
			const details = summary?.parentElement;
			if (!(details instanceof HTMLDetailsElement)) return;
			event.preventDefault();
			if (details.open && !details.classList.contains('closing')) slide(details, false);
			else show(details);
		};

		document.addEventListener('click', onclick);
		addEventListener('hashchange', reveal);
		return () => {
			document.removeEventListener('click', onclick);
			removeEventListener('hashchange', reveal);
		};
	});

	afterNavigate(reveal);
</script>

<svelte:head>
	<title>FAQ · Sonora</title>
	<meta
		name="description"
		content="Fixes for the problems people run into most with Sonora on macOS, Windows and Linux."
	/>
</svelte:head>

<section class="section">
	<span class="cross start"></span>
	<span class="cross end"></span>

	<div class="page faq">
		<article class="prose">
			<span class="kicker">FAQ</span>
			<h1>Something's not working</h1>
			<p class="summary">
				The problems people run into most, and what fixes them. If yours isn't here, check the
				<a href="/docs/logs">log</a>. It usually names the culprit.
			</p>

			<div class="search"><Search /></div>

			<h2>Installing</h2>
			<div class="questions">
				<details id="macos-damaged">
					<summary>Why does macOS say Sonora is damaged?</summary>
					<div class="answer">
						<p>
							It isn't. Sonora isn't signed with an Apple developer certificate yet, so macOS
							quarantines it. Clear the flag once after installing.
						</p>
						<Code text="xattr -dr com.apple.quarantine /Applications/Sonora.app" />
						<p>
							Once in a while, macOS may show this dialog again even after whitelisting the app. Run
							this command again to get rid of it.
						</p>
					</div>
				</details>

				<details id="windows-warning">
					<summary>Why does Windows warn about an unknown publisher?</summary>
					<div class="answer">
						<p>
							The Windows builds aren't code-signed yet. We've applied to the SignPath Foundation
							for that. Until it comes through, click
							<MenuPath steps={['More info', 'Run anyway']} /> the first time.
						</p>
					</div>
				</details>

				<details id="blank-window">
					<summary>Why is the window blank, or why won't Sonora start?</summary>
					<div class="answer">
						<p>
							Sonora draws with Vulkan, and the Vulkan loader alone isn't enough. You need a driver
							for your GPU, such as <code>mesa-vulkan-drivers</code>, <code>vulkan-radeon</code>,
							<code>vulkan-intel</code> or the proprietary NVIDIA driver. Run
							<code>vulkaninfo --summary</code> to see whether one works.
						</p>
						<p>
							If Sonora starts but feels sluggish, <code>SONORA_BLUR=0</code> turns off the lyric blur,
							edge fades and visualizer.
						</p>
					</div>
				</details>

				<details id="linux-no-sound">
					<summary>Why is there no sound on Linux?</summary>
					<div class="answer">
						<p>
							Sonora plays through ALSA. If it says <strong>no audio output device</strong>, you're
							missing the ALSA bridge to your sound server. Install <code>pipewire-alsa</code> on
							PipeWire or <code>pulseaudio-alsa</code> on PulseAudio. The AppImage doesn't bundle it either.
						</p>
					</div>
				</details>
			</div>

			<h2>Signing in</h2>
			<div class="questions">
				<details id="spotify-sign-in">
					<summary>Why does Spotify sign-in fail?</summary>
					<div class="answer">
						<ul>
							<li>Free accounts don't get in. You need Premium.</li>
							<li>
								The sign-in window hands the session back to Sonora on <code>127.0.0.1:8989</code>.
								Close whatever else holds that port and try again.
							</li>
							<li>
								A region error means Spotify won't serve your account from where you're connecting.
							</li>
						</ul>
					</div>
				</details>

				<details id="sign-in-window">
					<summary>Why doesn't the sign-in window open on Linux?</summary>
					<div class="answer">
						<p>
							The login windows for YouTube Music, Apple Music and Deezer need WebKitGTK, either
							<code>webkit2gtk-4.1</code> or <code>4.0</code>. Without it Sonora says
							<strong>webkit2gtk is not installed</strong> and offers cookie pasting instead. That works
							just as well.
						</p>
					</div>
				</details>

				<details id="lastfm">
					<summary>Why won't Last.fm link?</summary>
					<div class="answer">
						<p>
							Sonora waits five minutes for Last.fm on <code>127.0.0.1:8990</code>. Make sure that
							port is free, then approve Sonora in the browser before the time runs out.
						</p>
					</div>
				</details>
			</div>

			<h2>Playback</h2>
			<div class="questions">
				<details id="spotify-playback-keys">
					<summary>Why won't Spotify play anything?</summary>
					<div class="answer">
						<p>
							If every track fails with <strong
								>Spotify is not granting this account playback keys</strong
							>, Spotify won't work for your account in Sonora. Sonora plays Spotify through
							librespot, and
							<a href="https://github.com/librespot-org/librespot/issues/1649"
								>librespot issue 1649</a
							> tracks the problem.
						</p>
					</div>
				</details>

				<details id="widevine">
					<summary>Why won't Apple Music play?</summary>
					<div class="answer">
						<p>
							Apple Music needs the Widevine module. When none of your browsers has a copy, Sonora
							offers to download it from Google. If you dismissed that or it never showed up, get it
							from <MenuPath steps={['Settings', 'Playback', 'Widevine module']} />.
						</p>
					</div>
				</details>

				<details id="skipping">
					<summary>Why did playback stop after a few tracks?</summary>
					<div class="answer">
						<p>
							When several tracks in a row fail, Sonora stops instead of burning through your whole
							queue. The log has the reason.
						</p>
					</div>
				</details>
			</div>

			<h2>Settings and themes</h2>
			<div class="questions">
				<details id="theme-greyed-out">
					<summary>Why is my custom theme greyed out?</summary>
					<div class="answer">
						<p>
							Turn off <strong>Adaptive theme</strong>. While it's on, you can only pick System,
							Dark and Light. See <a href="/docs/themes">Custom themes</a>.
						</p>
					</div>
				</details>

				<details id="settings-not-saved">
					<summary>Why don't my settings changes stick?</summary>
					<div class="answer">
						<p>
							You probably broke the formatting of settings.json. Sonora shows
							<strong>Fix line N of settings.json to save changes</strong> and won't save anything
							until you fix it. See <a href="/docs/settings">Settings file</a>.
						</p>
					</div>
				</details>
			</div>

			<p class="more">
				Still stuck? See <a href="/docs/help">Getting help</a>.
			</p>
		</article>
	</div>
</section>

<style>
	.faq {
		max-width: 800px;
		padding-top: 72px;
		padding-bottom: 96px;
	}

	.search {
		max-width: 320px;
		margin-bottom: 8px;
	}

	.questions {
		border: 1px solid var(--line);
		border-radius: var(--radius);
		overflow: hidden;
	}

	details {
		border-bottom: 1px solid var(--line);
		scroll-margin-top: calc(var(--header) + 24px);
	}

	details:last-child {
		border-bottom: none;
	}

	summary {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
		padding: 16px 18px;
		font-size: 15px;
		font-weight: 500;
		cursor: pointer;
		user-select: none;
		-webkit-tap-highlight-color: transparent;
		list-style: none;
	}

	summary::-webkit-details-marker {
		display: none;
	}

	summary::after {
		content: '';
		flex-shrink: 0;
		width: 7px;
		height: 7px;
		margin-right: 4px;
		border-right: 1.5px solid var(--dim);
		border-bottom: 1.5px solid var(--dim);
		transform: translateY(-2px) rotate(45deg);
		transition: transform 0.18s ease;
	}

	details[open]:not(.closing) summary::after {
		transform: translateY(2px) rotate(-135deg);
	}

	summary:hover {
		background: var(--secondary);
	}

	.answer {
		display: flex;
		flex-direction: column;
		gap: 14px;
		padding: 10px 18px 20px;
		overflow: hidden;
	}

	.more {
		margin-top: 24px;
	}

	@media (max-width: 900px) {
		.faq {
			padding-top: 48px;
			padding-bottom: 64px;
		}
	}
</style>
