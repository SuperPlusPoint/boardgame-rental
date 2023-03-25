import React from 'react';
import { Box } from '@chakra-ui/react';
import { UserBoardGame } from '../models/boardgame';
import EditableListItem from './EditableListItem';

interface EditableBoardGameListProps {
  boardGameList: UserBoardGame[];
  updateBoardGame: (bid: string, rental: number, total: number) => void;
}
const EditableBoardGameList: React.FC<EditableBoardGameListProps> = ({
  boardGameList,
  updateBoardGame,
}) => {
  return (
    <Box w="100%" maxHeight="68vh" overflow="scroll" mt={2}>
      {boardGameList.map((boardGame) => (
        <EditableListItem
          key={boardGame.id}
          userBoardGame={boardGame}
          updateBoardGame={updateBoardGame}
        />
      ))}
    </Box>
  );
};

export default EditableBoardGameList;
