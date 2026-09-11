import { catalogue } from './album';

type Line = [number, number, string];

const rover: Line[] = [
	[9.6, 13.0, "I've been a wild rover for many a year"],
	[13.4, 16.8, 'And I spent all my money on whiskey and beer'],
	[17.2, 20.6, "But now I'm returning with gold in great store"],
	[21.0, 24.4, 'And I never will play the wild rover no more'],
	[25.2, 26.9, "And it's no, nay, never"],
	[27.3, 29.2, 'No, nay, never no more'],
	[29.6, 31.6, 'Will I play the wild rover'],
	[32.0, 34.0, 'No never, no more'],
	[35.6, 39.0, 'I went into an alehouse I used to frequent'],
	[39.4, 42.8, 'And I told the landlady my money was spent'],
	[43.2, 46.6, 'I asked her for credit, she answered me nay'],
	[47.0, 50.4, 'Such a custom as yours I could have any day'],
	[51.2, 52.9, "And it's no, nay, never"],
	[53.3, 55.2, 'No, nay, never no more'],
	[55.6, 57.6, 'Will I play the wild rover'],
	[58.0, 60.0, 'No never, no more'],
	[61.6, 65.0, 'I took from my pocket ten sovereigns bright'],
	[65.4, 68.8, "And the landlady's eyes opened wide with delight"],
	[69.2, 72.6, 'She said I have whiskey and wines of the best'],
	[73.0, 76.4, 'And the words that I spoke sure were only in jest'],
	[77.2, 78.9, "And it's no, nay, never"],
	[79.3, 81.2, 'No, nay, never no more'],
	[81.6, 83.6, 'Will I play the wild rover'],
	[84.0, 86.0, 'No never, no more']
];

const water: Line[] = [
	[8.0, 12.2, 'The water is wide, I cannot get over'],
	[12.8, 17.0, 'And neither have I wings to fly'],
	[17.6, 21.8, 'Give me a boat that can carry two'],
	[22.4, 26.8, 'And both shall row, my love and I'],
	[29.0, 33.2, 'A ship there is and she sails the sea'],
	[33.8, 38.0, "She's loaded deep as deep can be"],
	[38.6, 42.8, 'But not so deep as the love I am in'],
	[43.4, 47.8, 'I know not if I sink or swim'],
	[50.0, 54.2, 'I leaned my back against an oak'],
	[54.8, 59.0, 'Thinking it was a trusty tree'],
	[59.6, 63.8, 'But first it bent and then it broke'],
	[64.4, 68.8, 'So did my love prove false to me'],
	[71.0, 75.2, 'Oh love is handsome and love is fine'],
	[75.8, 80.0, 'And love is a jewel when it is new'],
	[80.6, 84.8, 'But love grows old and waxes cold'],
	[85.4, 90.0, 'And fades away like morning dew']
];

const scarborough: Line[] = [
	[7.0, 10.6, 'Are you going to Scarborough Fair?'],
	[11.0, 14.6, 'Parsley, sage, rosemary and thyme'],
	[15.0, 18.6, 'Remember me to one who lives there'],
	[19.0, 22.8, 'She once was a true love of mine'],
	[25.0, 28.6, 'Tell her to make me a cambric shirt'],
	[29.0, 32.6, 'Parsley, sage, rosemary and thyme'],
	[33.0, 36.6, 'Without no seam nor needlework'],
	[37.0, 40.8, "Then she'll be a true love of mine"],
	[43.0, 46.6, 'Tell her to wash it in yonder well'],
	[47.0, 50.6, 'Parsley, sage, rosemary and thyme'],
	[51.0, 54.6, 'Where never sprung water nor rain ever fell'],
	[55.0, 58.8, "Then she'll be a true love of mine"],
	[61.0, 64.6, 'Tell her to dry it on yonder thorn'],
	[65.0, 68.6, 'Parsley, sage, rosemary and thyme'],
	[69.0, 72.6, 'Which never bore blossom since Adam was born'],
	[73.0, 76.8, "Then she'll be a true love of mine"]
];

const lomond: Line[] = [
	[8.4, 12.4, 'By yon bonnie banks and by yon bonnie braes'],
	[12.8, 16.8, 'Where the sun shines bright on Loch Lomond'],
	[17.2, 21.2, 'Where me and my true love were ever wont to gae'],
	[21.6, 25.8, "On the bonnie, bonnie banks o' Loch Lomond"],
	[27.4, 29.4, "Oh, ye'll tak' the high road"],
	[29.8, 31.8, "And I'll tak' the low road"],
	[32.2, 35.4, "And I'll be in Scotland afore ye"],
	[35.8, 39.8, 'But me and my true love will never meet again'],
	[40.2, 44.4, "On the bonnie, bonnie banks o' Loch Lomond"],
	[46.4, 50.4, "'Twas there that we parted in yon shady glen"],
	[50.8, 54.8, "On the steep, steep side o' Ben Lomond"],
	[55.2, 59.2, 'Where in purple hue the Highland hills we view'],
	[59.6, 63.8, 'And the moon coming out in the gloaming'],
	[65.4, 67.4, "Oh, ye'll tak' the high road"],
	[67.8, 69.8, "And I'll tak' the low road"],
	[70.2, 73.4, "And I'll be in Scotland afore ye"],
	[73.8, 77.8, 'But me and my true love will never meet again'],
	[78.2, 82.4, "On the bonnie, bonnie banks o' Loch Lomond"]
];

const gardens: Line[] = [
	[9.0, 13.0, 'Down by the salley gardens my love and I did meet'],
	[13.4, 17.4, 'She passed the salley gardens with little snow-white feet'],
	[17.8, 21.8, 'She bid me take love easy, as the leaves grow on the tree'],
	[22.2, 26.4, 'But I, being young and foolish, with her would not agree'],
	[29.0, 33.0, 'In a field by the river my love and I did stand'],
	[33.4, 37.4, 'And on my leaning shoulder she laid her snow-white hand'],
	[37.8, 41.8, 'She bid me take life easy, as the grass grows on the weirs'],
	[42.2, 46.4, 'But I was young and foolish, and now am full of tears']
];

const timed = (lines: Line[]) =>
	lines.map(([start, end, text]) => {
		const parts = text
			.split(' ')
			.map((word, spot, all) => (spot + 1 < all.length ? `${word} ` : word));
		const weight = parts.reduce((sum, part) => sum + part.length, 0);
		let cursor = start;
		const words = parts.map((part) => {
			const span = (part.length / weight) * (end - start);
			const at = cursor;
			cursor += span;
			return { word: part, start: at, end: cursor };
		});
		return { start, end, text, words };
	});

export type Sheet = { lines: ReturnType<typeof timed>; by: string; source: string };

const presets: Sheet[] = [
	{ lines: timed(rover), by: 'Traditional', source: 'LRCLIB' },
	{ lines: timed(water), by: 'Traditional', source: 'LRCLIB' },
	{ lines: timed(scarborough), by: 'Traditional', source: 'LRCLIB' },
	{ lines: timed(lomond), by: 'Traditional', source: 'LRCLIB' },
	{ lines: timed(gardens), by: 'W. B. Yeats', source: 'LRCLIB' }
];

const order = [...catalogue.keys()];

let lastId = '';
let lastPreset = -1;

/** Every track gets a preset by its place in the catalogue; a switch never lands on the sheet that was just showing. */
export function lyricsFor(id: string): Sheet {
	let preset = Math.max(order.indexOf(id), 0) % presets.length;
	if (id !== lastId && preset === lastPreset) preset = (preset + 1) % presets.length;
	lastId = id;
	lastPreset = preset;
	return presets[preset];
}
