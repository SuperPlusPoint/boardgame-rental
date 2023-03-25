import React from 'react';
import { Box } from '@chakra-ui/react';
import ListItem from './ListItem';
import { UserBoardGame } from '../models/boardgame';

interface BoardGameListProps {
  boardGameList: UserBoardGame[];
}
const BoardGameList: React.FC<BoardGameListProps> = ({ boardGameList }) => {
  const isLogin = true;
  return (
    <Box w="100%" maxHeight="68vh" overflow="scroll" mt={2}>
      {boardGameList.map((boardGame) => (
        <ListItem
          key={boardGame.id}
          userBoardGame={boardGame}
          isLogin={isLogin}
        />
      ))}
    </Box>
  );
};

export default BoardGameList;
