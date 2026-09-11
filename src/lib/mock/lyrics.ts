const rover: [number, number, string][] = [
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

const timed = (lines: [number, number, string][]) =>
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

export const lyrics = new Map([['t2', timed(rover)]]);

export const writers = { source: 'LRCLIB', by: 'Traditional' };
