export const platforms = [
	{
		id: 'macos',
		label: 'macOS',
		download: 'Download for macOS',
		prompt: '$',
		hero: 'brew install --cask nolight132/tap/sonora',
		steps: [
			{
				caption: 'Install with Homebrew',
				command: 'brew install --cask nolight132/tap/sonora'
			},
			{
				caption: 'Clear the quarantine flag',
				command: 'xattr -dr com.apple.quarantine /Applications/Sonora.app'
			}
		],
		note: 'Apple quarantines unsigned apps, so the second command is required after a first install.'
	},
	{
		id: 'arch',
		label: 'Arch',
		download: 'Download for Arch',
		prompt: '$',
		hero: 'yay -S sonora-bin',
		steps: [
			{ caption: 'Install from the AUR', command: 'yay -S sonora-bin' },
			{
				caption: 'Audio backend — match your sound server',
				command: 'pacman -S pipewire-alsa   # or pulseaudio-alsa'
			}
		],
		note: 'sonora-bin pulls the prebuilt release. sonora builds the same version from source against your own system libraries, which takes a while on a Rust and GPUI tree.'
	},
	{
		id: 'flatpak',
		label: 'Flatpak',
		download: 'Download the .flatpak',
		prompt: '$',
		hero: 'flatpak install --user https://sonorahq.github.io/sonora/sonora.flatpakref',
		steps: [
			{
				caption: 'Add the repository once, then update with flatpak update',
				command: 'flatpak install --user https://sonorahq.github.io/sonora/sonora.flatpakref'
			},
			{
				caption: 'Moving an older remote to the new address',
				command:
					'flatpak remote-modify --user \\\n  --url=https://sonorahq.github.io/sonora/repo sonora'
			}
		],
		note: 'A remote added before the move to the sonorahq organisation still points at the old address and fails to update. Standalone .flatpak bundles are attached to every release.'
	},
	{
		id: 'nix',
		label: 'Nix',
		download: 'Download for Nix',
		prompt: '$',
		hero: 'nix run github:sonorahq/sonora',
		steps: [
			{ caption: 'Run it straight from the flake', command: 'nix run github:sonorahq/sonora' },
			{
				caption: 'Home Manager module',
				command: `{
  imports = [ inputs.sonora.homeManagerModules.default ];
  programs.sonora = {
    enable = true;
    settings = {
      provider = "youtube";
      appearance.theme = "dark";
    };
  };
}`
			}
		],
		note: 'The flake packages the latest tagged release and exposes programs.sonora for Home Manager.'
	},
	{
		id: 'windows',
		label: 'Windows',
		download: 'Download for Windows',
		prompt: '>',
		hero: 'winget install Sonora',
		steps: [{ caption: 'Download and run the installer', command: 'Sonora-Setup.exe' }],
		note: 'Prefer no installer? Grab the latest windows-msvc.exe for your architecture from Releases and run it as-is.'
	}
];

export const languages = ['en-US', 'de', 'es', 'fr', 'it', 'id', 'ja', 'ru', 'uk', 'pl', 'pt-BR'];

export function detectPlatform() {
	const ua = navigator.userAgent;
	if (/Mac/i.test(ua)) return 'macos';
	if (/Win/i.test(ua)) return 'windows';
	if (/Linux|X11/i.test(ua)) return 'arch';
	return 'macos';
}
