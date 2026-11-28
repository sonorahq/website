const releases = 'https://github.com/sonorahq/sonora/releases';

/** Assets of the nightly prerelease, which keep their names from one night to the next. */
const nightly = `${releases}/download/nightly-build`;

/** A file to download. `detail` names the machines it runs on. */
export type Download = { label: string; href: string; detail?: string };

/** Another way to install: a `command` to copy, several `links` side by side, or one `href` for the whole row. */
export type Option = {
	title: string;
	command?: string;
	href?: string;
	links?: { label: string; href: string }[];
};

export type Platform = {
	id: 'windows' | 'macos' | 'linux';
	label: string;
	mark: string;
	/** The main button. */
	main: Download;
	/** A smaller link under the main button, such as the build for another architecture. */
	alternate?: Download;
	options: Option[];
};

/**
 * The install choices for each system, in the order the tabs show them. Release assets with the
 * version in their name link to the releases page until the latest tag is known.
 */
export function platforms(version: string | null): Platform[] {
	const asset = (name: string) =>
		version ? `${releases}/download/${version}/sonora-${version}-${name}` : `${releases}/latest`;

	return [
		{
			id: 'windows',
			label: 'Windows',
			mark: 'windows',
			main: {
				label: 'Download for Windows',
				href: `${releases}/latest/download/Sonora-Setup.exe`,
				detail: '64-bit'
			},
			alternate: {
				label: 'ARM installer',
				href: `${releases}/latest/download/Sonora-Setup-arm64.exe`
			},
			options: [
				{ title: 'WinGet', command: 'winget install SonoraHQ.Sonora' },
				{ title: 'Portable', href: `${releases}/latest` },
				{ title: 'Nightly', href: `${nightly}/Sonora-Setup.exe` }
			]
		},
		{
			id: 'macos',
			label: 'macOS',
			mark: 'apple',
			main: {
				label: 'Download for Mac',
				href: asset('macos.dmg'),
				detail: 'Apple silicon and Intel, macOS 11 or later'
			},
			options: [
				{ title: 'Homebrew', command: 'brew install --cask nolight132/tap/sonora' },
				{ title: 'Nightly', href: `${nightly}/sonora-nightly-macos.dmg` }
			]
		},
		{
			id: 'linux',
			label: 'Linux',
			mark: 'linux',
			main: {
				label: 'Install with Flatpak',
				href: 'https://sonorahq.github.io/sonora/sonora.flatpakref'
			},
			options: [
				{
					title: 'Flatpak',
					command: 'flatpak install --user https://sonorahq.github.io/sonora/sonora.flatpakref'
				},
				{ title: 'AUR', command: 'yay -S sonora-bin' },
				{ title: 'Nix', command: 'nix run github:sonorahq/sonora/stable' },
				{ title: 'Snap', command: 'sudo snap install sonora' },
				{
					title: 'AppImage',
					links: [
						{ label: '64-bit', href: asset('x86_64.AppImage') },
						{ label: 'ARM', href: asset('aarch64.AppImage') }
					]
				},
				{ title: 'Other', href: 'https://repology.org/project/sonora/versions' },
				{ title: 'Nightly', href: `${releases}/tag/nightly-build` }
			]
		}
	];
}

/** Picks the install tab for the visitor's OS, falling back to Windows. */
export function detectPlatform(): Platform['id'] {
	const hint =
		(navigator as Navigator & { userAgentData?: { platform?: string } }).userAgentData?.platform ??
		'';
	const ua = navigator.userAgent;
	if (/Windows/i.test(hint) || /Windows/i.test(ua)) return 'windows';
	if (/macOS/i.test(hint) || (/Macintosh|Mac OS/i.test(ua) && !/iPhone|iPad|iPod/i.test(ua)))
		return 'macos';
	if (/Linux|Chrome OS|X11/i.test(hint) || /Linux|X11/i.test(ua)) return 'linux';
	return 'windows';
}
