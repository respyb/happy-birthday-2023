import { FC } from 'react';
import { Box, Text, Flex, VStack } from "@chakra-ui/react";

export const heightHeader = 75;

export interface scoreHeader {
  title: string;
  lyric: string;
  composer: string;
  arrangement: string;
  bpm: number;
}

interface ScoreHeaderProps<scoreHeader> {
	header: scoreHeader
}

export const ScoreHeader: FC<ScoreHeaderProps<scoreHeader>> = ({ header }) => {
	return (
		<Box marginTop='20px'>
			<VStack id="score-title"><Text fontSize='4xl'>{ header.title }</Text></VStack>
			<Flex id="score-header" marginTop='10px' marginLeft='40px' marginRight='40px' justifyContent='space-between'>
				<Box id="score-lyric"><Text fontSize='2xl'>作詞: { header.lyric }</Text></Box>
				<Box id="score-compose"><Text fontSize='2xl'>作曲: { header.composer }</Text></Box>
				<Box id="score-arrangement"><Text fontSize='2xl'>編曲: { header.arrangement }</Text></Box>
			</Flex>
			<Flex id="score-bpm" marginLeft='40px'><Text fontSize='xl'>♩= { header.bpm }</Text></Flex>
		</Box>
	);
};