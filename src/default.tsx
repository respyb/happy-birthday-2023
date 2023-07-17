import { SerializableNotes } from './notes';
import { scoreHeader } from './scoreHeader';

const rightNotes = [
	{ clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['rest'], duration: 'w' },
];

const leftNotes = [
	{ clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['rest'], duration: 'w' },
];

const codeNotes = [
	{ clef: 'bass', keySignature: 'G', timeSignature: '4/4', code: 'rest', duration: 'w' },
];

export const defaultNotes = (): SerializableNotes => {	
	return {
		rightNotes: rightNotes,
		leftNotes: leftNotes,
		codeNotes: codeNotes,
	};
}
export const defaultHeader = (): scoreHeader => {
	return {
		title: "-",
		lyric: "-",
		composer: "-",
		arrangement: "-",
		bpm: 120,
	};
}

export const defaultPlayingBarLeft = 80;