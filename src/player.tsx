import { useState, useEffect, useRef } from "react";
import { Box, ButtonGroup, Button, Input, Text } from "@chakra-ui/react";

import { keyToFrequency, PlayableNote, toPlayableNotes, toNumDuratioX, SerializableNotes, calcNumMeasure } from './notes';
import { loadLocalJson, DownloadJsonButton, SerializableScore } from "./file";
import { render, heightPerStave, heightOffSet } from "./render";
import { ScoreHeader, scoreHeader, heightHeader } from "./scoreHeader";
import { PlayingBar, BarPosition, currentPosition, containerHeightOffset } from "./playingBar";
import { defaultHeader, defaultNotes, defaultPlayingBarLeft } from "./default";

const context = new (window.AudioContext || window.AudioContext)();
const scoreElementId = 'container';

const playSound = (frequency: number, duration: number) => {
	const oscillator = context.createOscillator();
	const gainNode = context.createGain();

	oscillator.type = 'square';
	oscillator.frequency.value = frequency;
	oscillator.connect(gainNode);
	gainNode.connect(context.destination);
	gainNode.gain.setValueAtTime(0.5, context.currentTime);

	oscillator.start();
	setTimeout(() => {
		oscillator.stop();
	}, duration);
}

export const Player = () => {
	const inputRef = useRef<HTMLInputElement>(null);

	const[serializableNotes, setSerializableNotes] = useState<SerializableNotes>(defaultNotes());
	const[header, setHeader] = useState<scoreHeader>(defaultHeader());
	const[multiNotes, setMultiNotes] = useState<PlayableNote[][]>(toPlayableNotes(serializableNotes, header.bpm));
	const[timeIds, setTimeIds] = useState<NodeJS.Timeout[]>([]);

	const defaultPosition = {
		left: defaultPlayingBarLeft,
		height: multiNotes.length * heightPerStave,
		top: containerHeightOffset + heightOffSet + heightHeader
	};
	const[position, setPosition] = useState<BarPosition>(defaultPosition);

	useEffect(() => {
		render(serializableNotes, scoreElementId);
	}, [serializableNotes]);

	const loadLocalMusic = (event: React.ChangeEvent<HTMLInputElement>) => {
		const target = event.target as HTMLInputElement;
		const file = (target.files as FileList)[0];
		const promise = loadLocalJson(file);

		promise.then((res) => {
			const serializable: SerializableScore = JSON.parse(res as string);
			setHeader(serializable.header);
			setSerializableNotes(serializable.body);
			setMultiNotes(toPlayableNotes(serializable.body, serializable.header.bpm));
			render(serializable.body, scoreElementId);
			setPosition(defaultPosition);
		});
	};

	const onClickInputFileButton = () => {
		inputRef.current?.click();
	}

	const Play = () => {
		let timeIds: NodeJS.Timeout[] = [];
		multiNotes.forEach((notes) => {
			notes.forEach((note) => {
				const timeId = setTimeout(() => {
					note.scales?.forEach((scale) => {
						playSound(keyToFrequency(scale), toNumDuratioX(note.duration, header.bpm));
					})
				}, note.waitTime);
				timeIds.push(timeId);
			});
		});

		const numMeasure = calcNumMeasure(multiNotes, header.bpm);
		const numStepPerMeasure = 100;
		for (let m = 0; m < numMeasure; m++) {
			for (let step = 0; step < numStepPerMeasure; step++) {
				const timeId = setTimeout(() => {
					setPosition(currentPosition({
						m: m,
						numMeasure: numMeasure, 
						step: step,
						numStepPerMeasure: numStepPerMeasure,
						numLines: multiNotes.length,
						bpm: header.bpm
					}));
				}, (4*1000*60/header.bpm)*(m + step/numStepPerMeasure));
				timeIds.push(timeId);
			}
		}

		setTimeIds(timeIds);
	}

	const Stop = () => {
		timeIds.forEach((timeId) => {
			clearTimeout(timeId);
		})
	}

	return (<Box>
		<ButtonGroup colorScheme='yellow' variant='outline' size='lg' spacing='2' marginTop='10px' marginLeft='10px'>
			<Button fontSize='lg' onClick={ Play } >
				<Text fontSize='2xl'>▶</Text>
			</Button>
			<Button onClick={ Stop } >
				<Text fontSize='2xl'>◼</Text>
			</Button>
			<Box>
				<Input type="file" id="musicfile" accept=".json" ref={ inputRef } onChange={ loadLocalMusic } hidden/>
				<Button onClick={ onClickInputFileButton }>
					<Text>楽曲読み込み</Text>
				</Button>
			</Box>
			<DownloadJsonButton data={ { header: header, body: serializableNotes }} />
		</ButtonGroup>
		<ScoreHeader header={ header }/>
		<PlayingBar position={ position } />
		<div id={ scoreElementId }></div>
	</Box>
	);
}