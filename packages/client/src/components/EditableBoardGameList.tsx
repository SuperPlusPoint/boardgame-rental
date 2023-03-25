import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { UserBoardGame } from '../models/boardgame';
import EditableListItem from './EditableListItem';

interface EditableBoardGameListProps {
  boardGameList: UserBoardGame[];
  updateBoardGame: (bid: string, rental: number, total: number) => void;
  filter: string;
}
const EditableBoardGameList: React.FC<EditableBoardGameListProps> = ({
  boardGameList,
  updateBoardGame,
  filter,
}) => {
  return (
    <Box w="100%" maxHeight="68vh" overflow="scroll" mt={2}>
      {boardGameList.length === 0 ? (
        filter.length !== 0 ? (
          <Text mt={5} textAlign="center">
            검색 결과가 없습니다.
          </Text>
        ) : (
          <Text mt={5} textAlign="center">
            보드게임을 추가해주세요.
          </Text>
        )
      ) : (
        boardGameList.map((boardGame) => (
          <EditableListItem
            key={boardGame.id}
            userBoardGame={boardGame}
            updateBoardGame={updateBoardGame}
          />
        ))
      )}
    </Box>
  );
};

export default EditableBoardGameList;
