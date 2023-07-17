import { Flow as VF } from 'vexflow';
import { toRenderableNotes, SerializableNotes } from './notes';

export const heightPerStave = 110;
export const widthPerMeasure = 220;
export const widthOffSet = 50;
export const heightOffSet = 10;
export const numMeasuresPerLine = 4;
export const spaceBetweenStaves = 10;
export const widthClef = 90;

const widthCanvas = 2 * widthOffSet + numMeasuresPerLine * widthPerMeasure + widthClef;

const concat = (a: any[], b: any[]): any[] => a.concat(b);

const clean = (elementId: string) => {
	const parent = document.getElementById(elementId);
	parent?.childNodes.forEach((child) => {
		parent.removeChild(child);
	});
}

// FIXME: use React component.
export const render = (serializable: SerializableNotes, elementId: string) => {
	clean(elementId);
	const measures = toRenderableNotes(serializable);
	const numLines = Math.ceil(measures.length / numMeasuresPerLine);
	const numStavesPerLine = measures[0].staves.length;
	const heightPerMeasure = heightPerStave * numStavesPerLine;

	const heightCanvas = 2 * heightOffSet + numLines * heightPerMeasure + (numLines - 1) * spaceBetweenStaves;
	const f = new VF.Factory({renderer: {
		elementId: elementId,
		width: widthCanvas,
		height: heightCanvas
	}});

	const score = f.EasyScore({ throwOnError: true });
	const voice = score.voice.bind(score);
	const notes = score.notes.bind(score);
	const beam = score.beam.bind(score);

	score.set({ time: '4/4' });

	measures.forEach((measure, indexOfMeasure) => {
		let x = (indexOfMeasure % numMeasuresPerLine) * widthPerMeasure + widthOffSet;
		if ((indexOfMeasure % numMeasuresPerLine) !== 0) {
			x += widthClef;
		}

		let system = f.System({
			x: x,
			y: Math.floor(indexOfMeasure / numMeasuresPerLine) * heightPerMeasure + heightOffSet,
			width: indexOfMeasure % numMeasuresPerLine === 0 ? widthPerMeasure+widthClef : widthPerMeasure,
			spaceBetweenStaves: spaceBetweenStaves
		});

		measure.staves.forEach((stave, _index) => {
			const stv = system.addStave({
				voices: [
					voice(stave.notes.map((ns) => {
						if (!ns.flgBeam) {
							return notes(ns.body, { clef: stave.clef, autoStem: true })
						}
						return beam(notes(ns.body, { clef: stave.clef, stem: ns.stem! }))
					}).reduce(concat)),
				]
			});
			if (indexOfMeasure % numMeasuresPerLine === 0) {
				stv
					.addClef(stave.clef)
					// .addKeySignature(stave.keySignature) // FIXME: keySignature is not supported yet.
					.addTimeSignature(stave.timeSignature)
			}
		});
		system.addConnector('singleRight');
		system.addConnector('singleLeft');
	});

	f.draw();
}
