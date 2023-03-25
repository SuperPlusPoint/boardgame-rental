import React from 'react';
import { Box } from '@chakra-ui/react';
import ListItem from './ListItem';
import { BoardGame, UserBoardGame } from '../models/boardgame';

interface BoardGameListProps {
  boardGameList: UserBoardGame[];
  isLogin: boolean;
  getBoardGame: (bid: string) => Promise<BoardGame>;
  rentBoardGame: (bid: string) => Promise<void>;
  returnBoardGame: (bid: string) => Promise<void>;
}
const BoardGameList: React.FC<BoardGameListProps> = ({
  boardGameList,
  isLogin,
  getBoardGame,
  rentBoardGame,
  returnBoardGame,
}) => {
  return (
    <Box w="100%" maxHeight="68vh" overflow="scroll" mt={2}>
      {boardGameList.map((boardGame) => (
        <ListItem
          key={boardGame.id}
          userBoardGame={boardGame}
          isLogin={isLogin}
          getBoardGame={getBoardGame}
          rentBoardGame={rentBoardGame}
          returnBoardGame={returnBoardGame}
        />
      ))}
    </Box>
  );
};

export default BoardGameList;
