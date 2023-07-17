import { FC } from 'react';
import {
	heightPerStave, widthPerMeasure, widthOffSet,
	heightOffSet, numMeasuresPerLine, widthClef
} from './render';
import {	heightHeader } from './scoreHeader';

export const containerHeightOffset = 120;

export interface BarPosition {
	left: number;
	height: number;
	top: number;
}

interface BarPositionProps<BarPosition> {
	position: BarPosition
}

export const PlayingBar: FC<BarPositionProps<BarPosition>> = ({ position }) => {
	return (
		<div className="line" style={{
			left: `${ position.left }px`,
			height: `${ position.height }px`,
			top: `${ position.top }px` 
		}}></div>
	);
};

export interface PositionMaterial {
	m: number,
	numMeasure: number, 
	step: number,
	numStepPerMeasure: number,
	numLines: number,
	bpm: number
}

export const currentPosition = (
	mat: PositionMaterial
): BarPosition => {

	const r = Math.floor(mat.m / numMeasuresPerLine);
	const c = mat.m % numMeasuresPerLine;
	const height = heightPerStave * mat.numLines;
	const top = containerHeightOffset + heightOffSet + r * height + heightHeader;

	let left = c * widthPerMeasure + widthClef + widthOffSet;
	left += (mat.step/mat.numStepPerMeasure) * widthPerMeasure;

	return { left: left, height: height, top: top };
}