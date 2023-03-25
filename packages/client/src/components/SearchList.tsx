import * as React from 'react';
import { Flex, Accordion, Spinner, Center, Text } from '@chakra-ui/react';
import SearchItem from './SearchItem';
import { BoardGame } from '../models/boardgame';

interface SearchListProps {
  isLoading: boolean;
  isFetched: boolean;
  boardGameList: BoardGame[];
  selectBoardGame: (boardGame: BoardGame) => void;
}

const SearchList: React.FC<SearchListProps> = ({
  isLoading,
  isFetched,
  boardGameList,
  selectBoardGame,
}) => {
  if (isLoading) {
    return (
      <Flex
        w="100%"
        flexDirection="column"
        mr="auto"
        maxHeight="48vh"
        overflow="scroll"
      >
        <Center mt={3}>
          <Spinner
            thickness="3px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="md"
          />
        </Center>
      </Flex>
    );
  }

  return (
    <Flex
      w="100%"
      flexDirection="column"
      mr="auto"
      maxHeight="48vh"
      overflow="scroll"
      textAlign="center"
    >
      <Accordion mt={3}>
        {!isFetched && <Text mt={5}>추가할 보드게임 이름을 검색하세요</Text>}
        {isFetched && boardGameList.length === 0 ? (
          <Text mt={5}>검색 결과가 없습니다.</Text>
        ) : (
          boardGameList.map((boardGame) => (
            <SearchItem
              key={boardGame.id}
              boardGame={boardGame}
              onSelect={selectBoardGame}
            />
          ))
        )}
      </Accordion>
    </Flex>
  );
};

export default SearchList;
