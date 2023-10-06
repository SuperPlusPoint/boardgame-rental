import React from 'react';
import { Flex } from '@chakra-ui/react';
import SelectedItem from './SelectedItem';
import { UserBoardGame } from '../models/boardgame';

interface SelectedListProps {
  selectedList: UserBoardGame[];
  changeTotal: (boarGame: UserBoardGame, total: number) => void;
}

const SelectedList: React.FC<SelectedListProps> = ({
  selectedList,
  changeTotal,
}) => {
  return (
    <Flex
      backgroundColor="white"
      border="1px solid black"
      alignSelf="stretch"
      overflowY="scroll"
      height="222px"
      flexDirection="column"
    >
      {selectedList.map((item) => (
        <SelectedItem key={item.id} item={item} changeTotal={changeTotal} />
      ))}
    </Flex>
  );
};

export default SelectedList;
