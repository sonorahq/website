/** @type {[number, number, string][]} */
const parting = [
	[12, 18.2, "Of all the money that e'er I had"],
	[19, 25, 'I spent it in good company'],
	[26, 32.2, "And all the harm that e'er I've done"],
	[33, 39, 'Alas it was to none but me'],
	[41, 47.2, "And all I've done for want of wit"],
	[48, 54, "To memory now I can't recall"],
	[55, 61.5, 'So fill to me the parting glass'],
	[62.5, 69.5, 'Good night and joy be with you all'],
	[74, 80.5, "Oh all the comrades that e'er I had"],
	[81.5, 87.5, "They're sorry for my going away"],
	[88.5, 95, "And all the sweethearts that e'er I had"],
	[96, 102.5, "They'd wish me one more day to stay"],
	[104, 110, 'But since it falls unto my lot'],
	[111, 117.5, 'That I should rise and you should not'],
	[118.5, 125, "I'll gently rise and softly call"],
	[126, 133, 'Good night and joy be with you all'],
	[138, 144.5, 'A man may drink and not be drunk'],
	[145.5, 151.5, 'A man may fight and not be slain'],
	[152.5, 159, 'A man may court a pretty girl'],
	[160, 167, 'And perhaps be welcomed back again'],
	[171, 177.5, 'But since it has so ought to be'],
	[178.5, 185, 'By a time to rise and a time to fall'],
	[186, 192.5, 'Come fill to me the parting glass'],
	[193.5, 201, 'Good night and joy be with you all']
];

export const lyrics = new Map([
	['t2', parting.map(([start, end, text]) => ({ start, end, text }))]
]);

export const writers = { source: 'LRCLIB', by: 'Traditional' };
