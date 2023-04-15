import React from 'react';
import {
  Box,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  UnorderedList,
  ListItem,
  Image,
} from '@chakra-ui/react';
import { BoardGame } from '../models/boardgame';

interface SearchItemProps {
  boardGame: BoardGame;
  onSelect: (boardGame: BoardGame) => void;
}

const SearchItem: React.FC<SearchItemProps> = ({ boardGame, onSelect }) => {
  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box as="b" flex="1" textAlign="left" fontSize="sm">
            {boardGame.koreanName || boardGame.name}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4} onClick={() => onSelect(boardGame)}>
        <UnorderedList
          fontSize="sm"
          display="flex"
          whiteSpace="normal"
          wordBreak="break-word"
        >
          <Image
            boxSize="4rem"
            borderRadius="md"
            objectFit="cover"
            src={boardGame?.thumbnail}
            alt={`${boardGame.name} thumbnail`}
            fallbackSrc="https://via.placeholder.com/64"
          />
          <Box ml={5}>
            <ListItem>
              {boardGame.minPlayerNum}-{boardGame.maxPlayerNum} Players
            </ListItem>
            <ListItem>Playing Time : {boardGame.playingTime} Min</ListItem>
          </Box>
        </UnorderedList>
      </AccordionPanel>
    </AccordionItem>
  );
};

export default SearchItem;
