/** `summary` is the one line the introduction shows for the page. */
export type DocPage = { slug: string; title: string; summary: string };

/** The docs pages in reading order, grouped for the sidebar. The first page is where /docs lands. */
export const groups: { label: string; pages: DocPage[] }[] = [
	{
		label: 'Start here',
		pages: [
			{
				slug: 'introduction',
				title: 'Introduction',
				summary: 'What the docs cover and where to start.'
			}
		]
	},
	{
		label: 'Using Sonora',
		pages: [
			{
				slug: 'providers',
				title: 'Providers',
				summary:
					'How signing in works for each service, their quirks, and the audio quality you get.'
			},
			{
				slug: 'shortcuts',
				title: 'Shortcuts',
				summary: 'Every keyboard shortcut, including the ones that only exist on macOS.'
			},
			{
				slug: 'scrobbling',
				title: 'Scrobbling',
				summary: 'Linking Last.fm, Libre.fm, ListenBrainz and Maloja, and when a play counts.'
			}
		]
	},
	{
		label: 'Customizing',
		pages: [
			{
				slug: 'settings',
				title: 'Settings file',
				summary: 'Where settings.json lives, editing it by hand, and the Home Manager module.'
			},
			{
				slug: 'themes',
				title: 'Custom themes',
				summary: 'Writing your own colour theme as a JSON file.'
			}
		]
	},
	{
		label: 'When something breaks',
		pages: [
			{
				slug: 'logs',
				title: 'Logs',
				summary: 'Where the log file is and how to get more detail for a bug report.'
			},
			{
				slug: 'help',
				title: 'Getting help',
				summary: 'Where to ask questions and what a good bug report needs.'
			}
		]
	}
];

export const pages = groups.flatMap((group) => group.pages);
