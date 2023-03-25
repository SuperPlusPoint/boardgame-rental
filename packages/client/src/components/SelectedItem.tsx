import React from 'react';
import { Tr, Td, Text } from '@chakra-ui/react';
import { UserBoardGame } from '../models/boardgame';
import NumericInput from './NumericInput';

interface SelectedItemProps {
  item: UserBoardGame;
  changeTotal: (boarGame: UserBoardGame, total: number) => void;
}
const SelectedItem: React.FC<SelectedItemProps> = ({ item, changeTotal }) => {
  return (
    <Tr>
      <Td>
        <Text w="10rem" maxHeight="2rem" overflow="hidden">
          {item.name}
        </Text>
      </Td>
      <Td>
        <NumericInput
          value={item.total}
          onChange={(value) => changeTotal(item, value)}
        />
      </Td>
    </Tr>
  );
};

export default SelectedItem;
