export const installer =
	'https://github.com/sonorahq/sonora/releases/latest/download/Sonora-Setup.exe';

export const installerArm =
	'https://github.com/sonorahq/sonora/releases/latest/download/Sonora-Setup-arm64.exe';

export type Step = { caption: string; command: string; link?: string; hint?: string };

export const platforms: {
	id: string;
	mark: string;
	label: string;
	prompt: string;
	hero: string;
	pending?: string;
	steps: Step[];
	note: string;
}[] = [
	{
		id: 'macos',
		mark: 'apple',
		label: 'macOS',
		prompt: '$',
		hero: 'brew install --cask nolight132/tap/sonora',
		steps: [
			{
				caption: 'Install with Homebrew',
				command: 'brew install --cask nolight132/tap/sonora'
			},
			{
				caption: 'Clear the quarantine flag',
				command: 'xattr -dr com.apple.quarantine /Applications/Sonora.app',
				hint: 'The app is not signed yet, so macOS quarantines it on the first install.'
			}
		],
		note: 'Code signing through SignPath Foundation is applied for. Until it lands, the second command is needed once.'
	},
	{
		id: 'arch',
		mark: 'arch',
		label: 'Arch',
		prompt: '$',
		hero: 'yay -S sonora-bin',
		steps: [
			{ caption: 'Install from the AUR', command: 'yay -S sonora-bin' },
			{
				caption: 'Add the ALSA plugin for your sound server',
				command: 'pacman -S pipewire-alsa',
				hint: 'On PulseAudio install pulseaudio-alsa instead.'
			}
		],
		note: 'sonora-bin ships the prebuilt release. The sonora package builds the same version from source against your own system libraries, which takes a while.'
	},
	{
		id: 'flatpak',
		mark: 'flatpak',
		label: 'Flatpak',
		prompt: '$',
		hero: 'flatpak install --user https://sonorahq.github.io/sonora/sonora.flatpakref',
		steps: [
			{
				caption: 'Add the repository and install',
				command: 'flatpak install --user https://sonorahq.github.io/sonora/sonora.flatpakref',
				hint: 'Updates arrive with flatpak update.'
			},
			{
				caption: 'Point an older remote at the new address',
				command:
					'flatpak remote-modify --user \\\n  --url=https://sonorahq.github.io/sonora/repo sonora',
				hint: 'Only needed if you added the remote before the move to the sonorahq organisation.'
			}
		],
		note: 'Standalone .flatpak bundles are attached to every release.'
	},
	{
		id: 'nix',
		mark: 'nix',
		label: 'Nix',
		prompt: '$',
		hero: 'nix run github:sonorahq/sonora',
		steps: [
			{ caption: 'Run it from the flake', command: 'nix run github:sonorahq/sonora' },
			{
				caption: 'Or manage it with Home Manager',
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
		mark: 'windows',
		label: 'Windows',
		prompt: '>',
		hero: '',
		pending: 'winget install sonora',
		steps: [
			{
				caption: 'Download and run the installer',
				link: installer,
				command: 'Sonora-Setup.exe'
			},
			{
				caption: 'On Windows on ARM, take the ARM build',
				link: installerArm,
				command: 'Sonora-Setup-arm64.exe'
			},
			{
				caption: 'Portable build',
				link: 'https://github.com/sonorahq/sonora/releases/latest',
				command: 'windows-msvc.exe',
				hint: 'Pick the file for your architecture on the releases page and run it as-is.'
			}
		],
		note: 'A winget package is coming soon. For now, download the installer.'
	}
];

export function detectPlatform() {
	const ua = navigator.userAgent;
	if (/Mac/i.test(ua)) return 'macos';
	if (/Win/i.test(ua)) return 'windows';
	if (/Linux|X11/i.test(ua)) return 'arch';
	return 'macos';
}
