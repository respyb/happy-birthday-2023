import { rawNotesToStaves, stavesToMeasures, Measure } from './score';

export const initialWaitTime = 200;

type Key = string;
type Scale = string;
type Code = string;

export const keyToFrequency = (key: Key): number => {
	const frequencies: { [key: Key]: number } = {
		'rest': 0.0,
		'G#3': 207.652,
		'G#4': 415.305,
		'G#5': 830.609,
		'A3': 220.000,
		'A4': 440.000,
		'A5': 880.000,
		'A#3': 233.082,
		'A#4': 466.164,
		'A#5': 932.328,
		'B3': 246.942,
		'B4': 493.883,
		'B5': 987.767,
		'C3': 130.813,
		'C4': 261.626,
		'C5': 523.251,
		'C6': 1046.502,
		'C#3': 138.591,
		'C#4': 277.183,
		'C#5': 554.365,
		'C#6': 1108.731,
		'D3': 146.832,
		'D4': 293.665,
		'D5': 587.330,
		'D6': 1174.659,
		'D#3': 155.563,
		'D#4': 311.127,
		'D#5': 622.254,
		'D#6': 1244.508,
		'E3': 164.814,
		'E4': 329.628,
		'E5': 659.255,
		'E6': 1318.510,
		'F3': 174.614,
		'F4': 349.228,
		'F5': 698.456,
		'F6': 1396.913,
		'F#3': 184.997,
		'F#4': 369.994,
		'F#5': 739.989,
		'F#6': 1479.978,
		'G3': 195.998,
		'G4': 391.995,
		'G5': 783.991
	};

	if (key in frequencies) {
		return frequencies[key];
	} else {
		console.error('key is not in frequencies: ' + key);
		return 0.0;
	}
};

export type Order = "eq" | "greater" | "less"

export const cmpKey = (key1: Key, key2: Key): Order => {
	if (keyToFrequency(key1) === keyToFrequency(key2)) {
		return "eq";
	} else if (keyToFrequency(key1) > keyToFrequency(key2)) {
		return "less";
	} else {
		return "greater";
	}
}

export const toNumDuratioX = (duration: string, bpm: number): number => {
	// const temporalSpaceToNextSound = 20;
	const temporalSpaceToNextSound = 0;

	let nDuration = 60/bpm * 1000;
	switch (duration) {
		case 'w':
			nDuration *= 4;
			break;
		case 'h':
			nDuration *= 2;
			break;
		case 'q':
			nDuration *= 1;
			break;
		case '8':
			nDuration /= 2;
			break;
		case '16':
			nDuration /= 4;
			break;
	}
	return nDuration - temporalSpaceToNextSound;
}

export interface SerializableNotes {
	rightNotes: RawNote[];
	leftNotes: RawNote[];
	codeNotes: CodeNote[];
}

interface CodeNote {
	clef: string;
	keySignature: string;
	timeSignature: string;
	code: Code;
	duration: string;
}

export const toRawNote = (codeNote: CodeNote): RawNote => {
	const codeToScales: { [code: Code]: Scale[] } = {
		'Am': ['A3', 'C4', 'E4'],
		'Am7': ['A3', 'C4', 'E4', 'G4'],
		'B': ['B3', 'D#4', 'F#4'],
		'B7': ['B3', 'D#4', 'F#4', "A#4"],
		'Bm': ['B3', 'D4', 'F#4'],
		'Bm7': ['B3', 'D4', 'F#4', 'A4'],
		'Bm7-5': ['B3', 'D4', 'F4', 'A4'],
		'BbmM7': ['A#3', 'C#4', 'F4', 'A4'],
		'Bbdim7': ['A#3', 'C#4', 'E4', 'G4'],
		'CM7': ['C4', 'E4', 'G4', 'B4'],
		'C#m7-5': ['C#3', 'E3', 'G3', 'B3'],
		'Cm': ['C4', 'D#4', 'G4'],
		'Cm/Eb': ['D#3', 'C4', 'G4'],
		'D': ['D3', 'F#3', 'A3'],
		'Dm7': ['D3', 'F3', 'A3', 'C4'],
		'Dm7/C': ['C3', 'D3', 'F3', 'A3'],
		'D/F#': ['F#3', 'A3', 'D4'],
		'D7(b9)': ['D3', 'F#3', 'A3', 'C4', 'D#4'],
		'D7sus4': ['D3', 'G3', 'A3', 'C4'],
		'D#' : ['D#3', 'G3', 'A#3'],
		'Em': ['G3', 'B3', 'E4'],
		'Em7': ['E3','G3','B3','D4'],
		'E7': ['E4', 'G#4', 'B4', 'D5'],
		'F': ['F3', 'A3', 'C4'],
		'F7': ['F3', 'A3', 'C4', 'D#4'],
		'F7(9)': ['F3', 'A3', 'C4', 'D#4', 'G4'],
		'F7omit5': ['F3', 'A3', 'D#4'],
		'G': ['G3', 'B3', 'D4'],
		'G7': ['G3', 'B3', 'D4', 'F4'],
		'G7omit5': ['G3', 'B3', 'F4'],
		'rest': ['rest'],
	};

	return {
		...codeNote,
		scales: codeToScales[codeNote.code],
		duration: codeNote.duration
	}
}

export interface RawNote {
	clef: string;
	keySignature: string;
	timeSignature: string;
	scales: Scale[];
	duration: string;
}

export interface PlayableNote {
	scales: string[];
	duration: string;
	waitTime: number;
}

export const rawToPlayableNotes = (notes: RawNote[], bpm: number): PlayableNote[] => {
	let acc = initialWaitTime;

	let res: PlayableNote[] = [];
	notes.forEach((note, _index) => {
		res.push({ ...note, waitTime: acc });
		acc += toNumDuratioX(note.duration, bpm);
	})

	return res;
}

// BACKLOG: merge toPlayableNotes and toRenderableNotes with closure function
export const toPlayableNotes = (serializable: SerializableNotes, bpm: number): PlayableNote[][] => {
	const codeNotes: CodeNote[] = serializable.codeNotes;
	const rawCodeNotes = codeNotes.map(codeNote => toRawNote(codeNote));

	const multiRawNotes = [
		serializable.rightNotes,
		serializable.leftNotes,
		rawCodeNotes,
	];

	return multiRawNotes.map(rawNotes => rawToPlayableNotes(rawNotes, bpm));
}

export const toRenderableNotes = (serializable: SerializableNotes): Measure[] => {
	const codeNotes: CodeNote[] = serializable.codeNotes;
	const rawCodeNotes = codeNotes.map(codeNote => toRawNote(codeNote));

	const multiRawNotes = [
		serializable.rightNotes,
		serializable.leftNotes,
		rawCodeNotes,
	];

	return stavesToMeasures(multiRawNotes.map(rawNotes => rawNotesToStaves(rawNotes)));
}

export const calcNumMeasure = (multiNotes: PlayableNote[][], bpm: number): number => {
	const calcNumMeasurePerLine = (notes: PlayableNote[], bpm: number): number => {
		if (notes.length === 0) {
			console.error('notes is empty');
		}

		const lastNote = notes[notes.length-1];
		const t = lastNote.waitTime + toNumDuratioX(lastNote.duration, bpm) - initialWaitTime;
		const n = Math.floor(t / (60/bpm * 1000 * 4));
		return n;
	}

	const lastNotes = multiNotes.map((notes) => {
		return calcNumMeasurePerLine(notes, bpm);
	});

	return Math.max(...lastNotes);
}