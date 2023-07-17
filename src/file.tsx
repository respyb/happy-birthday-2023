import { FC } from 'react';
import { Box, Button } from "@chakra-ui/react";

import { SerializableNotes } from './notes';
import { scoreHeader } from './scoreHeader';

export const loadLocalJson = (file: Blob): Promise<String> => {
	return new Promise<String>((resolve, reject) => {
		const r = new FileReader();
		r.onerror = () => reject(r.error);
		r.onload = () => resolve(r.result as String);
		r.readAsText(file);
	});
};

export interface SerializableScore {
	header: scoreHeader;
	body: SerializableNotes;
}

interface DownloadJsonButtonProps<T> {
  data: T;
}

export const DownloadJsonButton: FC<DownloadJsonButtonProps<SerializableScore>> = ({ data }) => {
	const download = () => {
		const json = JSON.stringify(data, null, '\t');
		const blob = new Blob([json], { type: 'application/json' });
		const url = URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.href = url;
		link.download = 'data.json';
		link.click();
	};

	return (
		<Box>
			<Button colorScheme='yellow' variant='outline' onClick={ download }>楽曲をファイルに保存</Button>
		</Box>
	)
};
