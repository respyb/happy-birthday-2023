import { SerializableNotes, toRenderableNotes } from './notes';
import { Measure } from './score';
import { scoreHeader } from './scoreHeader';

export const rightNotes = [
	{ clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['G5'], duration: '8' },
	{ clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['B4'], duration: '8' },
	{ clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['G5'], duration: '8' },
	{ clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['A5'], duration: '8' },
	{ clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['G5'], duration: '8' },
	{ clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['B4'], duration: '8' },
	{ clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['G5'], duration: '8' },
	{ clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['A5'], duration: '8' },

	// { clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['C6'], duration: 'q' },
	// { clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['B5'], duration: 'q' },
	// { clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['G5'], duration: 'q' },
	// { clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['A5'], duration: 'q' },

	// { clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['G5'], duration: '8' },
	// { clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['B4'], duration: '8' },
	// { clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['G5'], duration: '8' },
	// { clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['A5'], duration: '8' },
	// { clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['G5'], duration: '8' },
	// { clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['B4'], duration: '8' },
	// { clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['G5'], duration: '8' },
	// { clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['A5'], duration: '8' },

	// { clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['C6'], duration: 'q' },
	// { clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['B5'], duration: 'q' },
	// { clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['G5'], duration: 'q' },
	// { clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['B5', 'G5'], duration: '8' },
	// { clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['C6', 'A5'], duration: '8' },

	// // // // 2ページ目
	// { clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['D6', 'B5'], duration: 'q' },
	// { clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['rest'], duration: '8' },
	// { clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['B5', 'G5'], duration: '8' },
	// { clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['A5', 'F#5'], duration: 'q' },
	// { clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['B5', 'G5'], duration: '8' },
	// { clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['C6', 'A5'], duration: '8' },

	// { clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['D6', 'B5'], duration: 'q' },
	// { clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['rest'], duration: '8' },
	// { clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['A5', 'F5'], duration: '8' },
	// { clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['G#5', 'E5'], duration: 'q' },
	// { clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['G5', 'A5'], duration: '8' },
	// { clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['B5', 'G5'], duration: '8' },

	// { clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['C6', 'A5'], duration: 'q' },
	// { clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['rest'], duration: '8' },
	// { clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['A5', 'E5'], duration: '8' },
	// { clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['C6', 'A5'], duration: 'q' },
	// { clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['rest'], duration: '8' },
	// { clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['A5'], duration: '8' },

	// { clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['C6'], duration: 'q' },
	// { clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['rest'], duration: '8' },
	// { clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['C6'], duration: '8' },
	// { clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['B5'], duration: '8' },
	// { clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['A5'], duration: '8' },
	// { clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['G5'], duration: '8' },
	// { clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['A5'], duration: '8' },

	// { clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['B4', 'F4'], duration: '8' },
	// { clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['rest'], duration: '8' },
	// { clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['rest'], duration: 'q' },
	// { clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['rest'], duration: 'h' },
	// // { clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['A5'], duration: '8' },
	// // { clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['A5'], duration: '8' },
	// // { clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['A5'], duration: '8' },
];

export const leftNotes = [
	{ clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['G4'], duration: '8' },
	{ clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['D4'], duration: '8' },
	{ clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['G4'], duration: '8' },
	{ clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['A4'], duration: '8' },
	{ clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['G4'], duration: '8' },
	{ clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['D4'], duration: '8' },
	{ clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['G4'], duration: '8' },
	{ clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['A4'], duration: '8' },

	// { clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['C5'], duration: 'q' },
	// { clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['B4'], duration: 'q' },
	// { clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['G4'], duration: 'q' },
	// { clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['A4'], duration: 'q' },

	// { clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['G4'], duration: '8' },
	// { clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['D4'], duration: '8' },
	// { clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['G4'], duration: '8' },
	// { clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['A4'], duration: '8' },
	// { clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['G4'], duration: '8' },
	// { clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['D4'], duration: '8' },
	// { clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['G4'], duration: '8' },
	// { clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['A4'], duration: '8' },

	// { clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['C5'], duration: 'q' },
	// { clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['B4'], duration: 'q' },
	// { clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['G4'], duration: 'q' },
	// { clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['B4'], duration: '8' },
	// { clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['C5'], duration: '8' },

	// // // // 2ページ目
	// { clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['D5'], duration: 'q' },
	// { clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['rest'], duration: '8' },
	// { clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['B4'], duration: '8' },
	// { clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['A4'], duration: 'q' },
	// { clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['B4'], duration: '8' },
	// { clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['C5'], duration: '8' },

	// { clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['D5'], duration: 'q' },
	// { clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['rest'], duration: '8' },
	// { clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['A4'], duration: '8' },
	// { clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['G#4'], duration: 'q' },
	// { clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['A4'], duration: '8' },
	// { clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['B4'], duration: '8' },

	// { clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['C5'], duration: 'q' },
	// { clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['rest'], duration: '8' },
	// { clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['A4'], duration: '8' },
	// { clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['C5'], duration: 'q' },
	// { clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['rest'], duration: '8' },
	// { clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['A4'], duration: '8' },

	// { clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['C5'], duration: 'q' },
	// { clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['rest'], duration: '8' },
	// { clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['C5'], duration: '8' },
	// { clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['B4'], duration: '8' },
	// { clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['A4'], duration: '8' },
	// { clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['G4'], duration: '8' },
	// { clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['A4'], duration: '8' },

	// { clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['G5', 'G4'], duration: '8' },
	// { clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['rest'], duration: '8' },
	// { clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['rest'], duration: 'q' },
	// { clef: 'treble', keySignature: 'G', timeSignature: '4/4', scales: ['rest'], duration: 'h' },
];

export const codeNotes = [
	{ clef: 'bass', keySignature: 'G', timeSignature: '4/4', code: 'G', duration: 'w' },
	// { clef: 'bass', keySignature: 'G', timeSignature: '4/4', code: 'B', duration: 'w' },
	// { clef: 'bass', keySignature: 'G', timeSignature: '4/4', code: 'Em', duration: 'w' },
	// { clef: 'bass', keySignature: 'G', timeSignature: '4/4', code: 'G7', duration: 'w' },

	// // // 2ページ目
	// { clef: 'bass', keySignature: 'G', timeSignature: '4/4', code: 'Am7', duration: 'h' },
	// { clef: 'bass', keySignature: 'G', timeSignature: '4/4', code: 'D7(b9)', duration: 'h' },

	// { clef: 'bass', keySignature: 'G', timeSignature: '4/4', code: 'Bm7-5', duration: 'h' },
	// { clef: 'bass', keySignature: 'G', timeSignature: '4/4', code: 'E7', duration: 'h' },

	// { clef: 'bass', keySignature: 'G', timeSignature: '4/4', code: 'Am7', duration: 'w' },

	// { clef: 'bass', keySignature: 'G', timeSignature: '4/4', code: 'D7(b9)', duration: 'w' },

	// // { clef: 'bass', keySignature: 'G', timeSignature: '4/4', code: 'G7omit5', duration: 'h' },
	// // { clef: 'bass', keySignature: 'G', timeSignature: '4/4', code: 'rest', duration: 'h' },
];

export const kurakutoNotes = (): SerializableNotes => {	
	return {
		rightNotes: rightNotes,
		leftNotes: leftNotes,
		codeNotes: codeNotes,
	};
}

export const _tmpMeasures: Measure[] = toRenderableNotes(kurakutoNotes());

export const kurakutoHeader = (): scoreHeader => {
	return {
		title: "クラクトリトルプライド_debug",
		lyric: "夏川椎菜_debug",
		composer: "田淵智也_debug",
		arrangement: "HAMA-kgn_debug",
		bpm: 200,
	};
}