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
        alignSelf="stretch"
        flexDirection="column"
        my="auto"
        flex={1}
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
    <Flex alignSelf="stretch" flexDirection="column" flex={1} overflow="scroll">
      {!isFetched && (
        <Text mt={5} align="center">
          추가할 보드게임 이름을 검색하세요
        </Text>
      )}
      {isFetched && boardGameList.length === 0 ? (
        <Text mt={5} align="center">
          검색 결과가 없습니다.
        </Text>
      ) : (
        <Accordion mt={3}>
          {boardGameList.map((boardGame) => (
            <SearchItem
              key={boardGame.id}
              boardGame={boardGame}
              onSelect={selectBoardGame}
            />
          ))}
        </Accordion>
      )}
    </Flex>
  );
};

export default SearchList;
