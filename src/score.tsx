import { RawNote, cmpKey, Order } from './notes';

interface Notes {
	body: string;
	flgBeam: boolean;
	stem?: string;
}

interface Stave {
	clef: string;
	keySignature: string;
	timeSignature: string;
	notes: Notes[];
}

export interface Measure {
	staves: Stave[];
}

const durationToRatio: { [duration: string]: number } = {
	'w': 1,
	'h': 0.5,
	'q': 0.25,
	'8': 0.125,
	'16': 0.0625,
	'32': 0.03125,
}

class StaveGrouper {
	rawNotes: RawNote[];
	acc: RawNote[];
	grouped: Notes[];

	constructor(rawNotes: RawNote[]) {
		this.rawNotes = rawNotes;
		this.acc = [];
		this.grouped = [];
	}

	group(): Notes[] {
		this.rawNotes.forEach((rawNote, index) => {
			switch (rawNote.duration) {
				case 'w':
					this.acc.push(rawNote);
					this.flush();
					break;
				case 'h':
					this.acc.push(rawNote);
					this.flush();
					break;
				case 'q':
					this.acc.push(rawNote);
					this.flush();
					break;
				default:
					if (rawNote.scales.length >= 2) {
						this.acc.push(rawNote);
						this.flush();
						break;
					}
					if (rawNote.scales[0] === 'rest') {
						this.acc.push(rawNote);
						this.flush();
						break;
					}
					if (this.peek(index) !== null && this.peek(index)!.scales[0] === 'rest') {
						this.acc.push(rawNote);
						this.flush();
						break;
					}
					if (this.peek(index) === null) {
						this.acc.push(rawNote);
						this.flush();
						break;
					}
					if (rawNote.duration === this.peek(index)!.duration) {
						this.acc.push(rawNote);
						if (this.acc.length >= 4) {
							this.flush();
						}
						break;
					} else {
						this.acc.push(rawNote);
						this.flush();
						break;
					}
			}
		});
		return this.grouped;
	}

	flush(): void {
		if (this.acc.length === 1) {
			this.grouped.push({
				body: this.generateBodySingleNote(),
				flgBeam: false
			});
		} else {
			this.grouped.push({
				body: this.generateBodyMultiNotes(),
				flgBeam: true,
				stem: this.stem()
			});
		}
		this.acc = [];
	}

	peek(cur: number): RawNote | null {
		if (cur + 1 >= this.rawNotes.length) {
			return null;
		}
		return this.rawNotes[cur + 1];
	}

	generateBodySingleNote(): string {
		const rawNote = this.acc[0];
		let body = ''
		if (rawNote.scales.length === 1) {
			if (rawNote.scales[0] === 'rest') {
				if (rawNote.clef === 'treble') {
					body = 'B4/' + rawNote.duration + '/r';
				} else {
					body = 'D3/' + rawNote.duration + '/r';
				}
			} else {
				body = rawNote.scales[0] + '/' + rawNote.duration;
			}
		} else {
			body = '(' + rawNote.scales.join(' ') + ')/' + rawNote.duration;
		}

		return body;
	}

	generateBodyMultiNotes(): string {
		let scores: string[] = [];
		this.acc.forEach((rawNote) => {
			scores.push(rawNote.scales[0]+ '/' + rawNote.duration)
		});

		return scores.join(',');
	}

	stem(): string {
		function uniq(array: Order[]) {
			const knownElements = new Map();
			for (const elem of array) {
				knownElements.set(elem, true);
			}
			return Array.from(knownElements.keys());
		}

		function localPeek(array: RawNote[], cur: number): RawNote | null {
			if (cur + 1 >= array.length) {
				return null;
			}
			return array[cur + 1];
		}

		let cmps: Order[] = [];
		this.acc.forEach((rawNote, index) => {
			if (localPeek(this.acc, index) !== null) {
				cmps.push(cmpKey(rawNote.scales[0], localPeek(this.acc, index)!.scales[0]));
			}
		});

		if (uniq(cmps).length === 1) {
			if (cmps[0] === 'greater') {
				return 'up';
			} else if (cmps[0] === 'less') {
				return 'down';
			}
		}
		return 'auto';
	}
}

export const rawNotesToStaves = (rawNotes: RawNote[]): Stave[] => {
	let rawNotesPerStave: { [index: number]: RawNote[] } = {};

	let acc = 0;
	rawNotes.forEach((rawNote, _index) => {
		const i = Math.floor(acc);
		if (!rawNotesPerStave[i]) {
			rawNotesPerStave[i] = [rawNote];
		} else {
			rawNotesPerStave[i].push(rawNote);
		}
		acc += durationToRatio[rawNote.duration];
	});

	let keys = Object.keys(rawNotesPerStave).map((key) => parseInt(key));
	return keys.map((key) => {
		const stave: RawNote[] = rawNotesPerStave[key];
		const sg = new StaveGrouper(stave);
		return {
			clef: stave[0].clef,
			keySignature: stave[0].keySignature,
			timeSignature: stave[0].timeSignature,
			notes: sg.group()
		}
	});
}

export const stavesToMeasures = (stavess: Stave[][]): Measure[] => {
	let res: Measure[] = [];

	stavess.forEach((staves) => {
		staves.forEach((stave, index) => {
			if (!res[index]) {
				res[index] = {
					staves: [stave]
				}
			} else {
				res[index].staves.push(stave);
			}
		});
	})

	return res;
}
