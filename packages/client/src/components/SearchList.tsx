import * as React from 'react';
import { Flex, Accordion } from '@chakra-ui/react';
import SearchItem from './SearchItem';
import { BoardGame } from '../models/boardgame';

interface SearchListProps {
  boardGameList: BoardGame[];
}

const SearchList: React.FC<SearchListProps> = ({ boardGameList }) => {
  return (
    <Flex w="100%" flexDirection="column" mr="auto">
      <Accordion mt={3}>
        {boardGameList.map((boardGame) => (
          <SearchItem key={boardGame.id} boardGame={boardGame} />
        ))}
      </Accordion>
    </Flex>
  );
};

export default SearchList;
