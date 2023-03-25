import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import ListItem from './ListItem';
import { BoardGame, UserBoardGame } from '../models/boardgame';

interface BoardGameListProps {
  boardGameList: UserBoardGame[];
  isLogin: boolean;
  filter: string;
  getBoardGame: (bid: string) => Promise<BoardGame>;
  rentBoardGame: (boardGame: UserBoardGame) => Promise<void>;
  returnBoardGame: (boardGame: UserBoardGame) => Promise<void>;
}
const BoardGameList: React.FC<BoardGameListProps> = ({
  boardGameList,
  isLogin,
  filter,
  getBoardGame,
  rentBoardGame,
  returnBoardGame,
}) => {
  return (
    <Box w="100%" maxHeight="68vh" overflow="scroll" mt={2}>
      {boardGameList.length === 0 ? (
        <Text mt={5} textAlign="center">
          {!filter ? '보드게임을 추가해주세요.' : '검색 결과가 없습니다.'}
        </Text>
      ) : (
        boardGameList.map((boardGame) => (
          <ListItem
            key={boardGame.id}
            userBoardGame={boardGame}
            isLogin={isLogin}
            getBoardGame={getBoardGame}
            rentBoardGame={rentBoardGame}
            returnBoardGame={returnBoardGame}
          />
        ))
      )}
    </Box>
  );
};

export default BoardGameList;
