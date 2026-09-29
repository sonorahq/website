export type DocPage = { slug: string; title: string };

/** The docs pages in reading order, grouped for the sidebar. The first page is where /docs lands. */
export const groups: { label: string; pages: DocPage[] }[] = [
	{
		label: 'Using Sonora',
		pages: [
			{ slug: 'providers', title: 'Providers' },
			{ slug: 'shortcuts', title: 'Shortcuts' },
			{ slug: 'scrobbling', title: 'Scrobbling' }
		]
	},
	{
		label: 'Customizing',
		pages: [
			{ slug: 'settings', title: 'Settings file' },
			{ slug: 'themes', title: 'Custom themes' }
		]
	},
	{
		label: 'When something breaks',
		pages: [
			{ slug: 'logs', title: 'Logs' },
			{ slug: 'help', title: 'Getting help' }
		]
	}
];

export const pages = groups.flatMap((group) => group.pages);
