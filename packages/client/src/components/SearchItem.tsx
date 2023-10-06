import React from 'react';
import { Box, Image, Flex, Text } from '@chakra-ui/react';
import { BoardGame } from '../models/boardgame';
import SVGComponent, { Icon } from './common/SVGComponent';
import CheckBox from './common/CheckBox';

interface SearchItemProps {
  boardGame: BoardGame;
  onSelect: (boardGame: BoardGame) => void;
}

const SearchItem: React.FC<SearchItemProps> = ({ boardGame, onSelect }) => {
  return (
    <Flex
      justify="center"
      align="center"
      padding="11px"
      onClick={() => onSelect(boardGame)}
      p="11px"
      bgColor="white"
      borderBottom="1px solid black"
      position="relative"
    >
      <CheckBox checked={false} onChange={() => {}} />
      <Image
        boxSize="60px"
        borderRadius="8px"
        border="1px solid black"
        objectFit="cover"
        src={boardGame?.thumbnail}
        alt={`${boardGame?.name} thumbnail`}
      />
      <Box ml="11px" flex={1} alignSelf="stretch" pt="7px" pb="6px">
        <Text as="b" fontSize="14px" noOfLines={1}>
          {boardGame?.koreanName || boardGame?.name}
        </Text>
        <Flex alignItems="center">
          <SVGComponent icon={Icon.User} width={8} height={6} color="black" />
          <Box noOfLines={1} marginLeft="3px" marginRight="6px">
            <Text fontSize="11px">
              {boardGame?.minPlayerNum}-{boardGame?.maxPlayerNum} players
            </Text>
          </Box>
          <SVGComponent icon={Icon.Clock} width={6} height={6} color="black" />
          <Box noOfLines={1} marginLeft="3px">
            <Text fontSize="11px">{boardGame?.playingTime} min</Text>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};

export default SearchItem;
