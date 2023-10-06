import * as React from 'react';
import { Flex, Spinner, Center, Text, Box } from '@chakra-ui/react';
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
        border="1px solid black"
        backgroundColor="white"
        my="5px"
        alignSelf="stretch"
        flexDirection="column"
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
    <Flex
      border="1px solid black"
      backgroundColor="white"
      my="5px"
      alignSelf="stretch"
      flexDirection="column"
      flex={1}
      overflowY="scroll"
    >
      {!isFetched && (
        <Text mt="39px" align="center" fontWeight="semibold" fontSize="14px">
          갖고 있는 보드게임을 검색한 후 추가해보세요!
        </Text>
      )}
      {isFetched &&
        (boardGameList.length === 0 ? (
          <Text mt="39px" align="center" fontWeight="semibold" fontSize="14px">
            검색 결과가 없습니다
          </Text>
        ) : (
          <>
            <Box borderBottom="1px solid black" pl="13px" py="9px">
              <Text
                align="center"
                fontWeight="semibold"
                fontSize="14px"
                textAlign="left"
              >
                추가할 보드게임을 선택하세요
              </Text>
            </Box>
            <Flex flexDirection="column" overflow="scroll">
              {boardGameList.map((boardGame) => (
                <SearchItem
                  key={boardGame.id}
                  boardGame={boardGame}
                  onSelect={selectBoardGame}
                />
              ))}
            </Flex>
          </>
        ))}
    </Flex>
  );
};

export default SearchList;
