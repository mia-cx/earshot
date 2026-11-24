/**
 * How the narration says words the voice can't read off the page, mostly X handles: read as written,
 * "@kunalvg" comes out as one rushed mumble. Keys are handles without the `@`, matched case-insensitively.
 * A handle missing here is read without its `@`, underscores as spaces. Editing an entry re-records
 * only the sections that say it, since a recording is keyed by the text it reads.
 */
const HANDLES: Record<string, string> = {
	'2whazzuup': 'Two Whazzup',
	asaio87: 'Asaio eighty-seven',
	bloggersarvesh: 'Blogger Sarvesh',
	borjafat: 'Borja Fat',
	coldemailchris: 'Cold Email Chris',
	dinscales26: 'Din Scales twenty-six',
	dsqjaffa: 'D S Q Jaffa',
	eianlu: 'Eian Lu',
	handles: 'handles',
	huntkyle: 'Hunt Kyle',
	jordanodinsky: 'Jordan Odinsky',
	korzhov_dm: 'Korzhov D M',
	kunalvg: 'Kunal V G',
	leodev: 'Leo Dev',
	leomeethewoo: 'Leo Mee the Woo',
	mati_honorato: 'Mati Honorato',
	mentions: 'mentions',
	nicholasdulait: 'Nicholas Dulait',
	notkvtwts: 'Not K V Tweets',
	ryangrowthh: 'Ryan Growth',
	solyatic: 'Solyatic',
	suraj_sharma14: 'Suraj Sharma fourteen',
	tuanle: 'Tuan Le',
	wespreadjam: 'We Spread Jam',
	yegg: 'Yegg'
};

/** A word as the narration says it: every handle in it replaced by its spoken form. */
export const say = (word: string) =>
	word.replace(
		/@([A-Za-z0-9_]+)/g,
		(_, handle: string) => HANDLES[handle.toLowerCase()] ?? handle.replaceAll('_', ' ')
	);
