import * as React from 'react';
import { Flex, Accordion, Spinner, Center } from '@chakra-ui/react';
import SearchItem from './SearchItem';
import { BoardGame } from '../models/boardgame';

interface SearchListProps {
  isLoading: boolean;
  boardGameList: BoardGame[];
  selectBoardGame: (boardGame: BoardGame) => void;
}

const SearchList: React.FC<SearchListProps> = ({
  isLoading,
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
          <Spinner />
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
    >
      <Accordion mt={3}>
        {boardGameList.map((boardGame) => (
          <SearchItem
            key={boardGame.id}
            boardGame={boardGame}
            onSelect={selectBoardGame}
          />
        ))}
      </Accordion>
    </Flex>
  );
};

export default SearchList;
