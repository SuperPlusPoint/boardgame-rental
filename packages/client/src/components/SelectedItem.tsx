import React from 'react';
import { Tr, Td, Text } from '@chakra-ui/react';
import { UserBoardGame } from '../models/boardgame';
import NumericInput from './NumericInput';

interface SelectedItemProps {
  item: UserBoardGame;
}
const SelectedItem: React.FC<SelectedItemProps> = ({ item }) => {
  return (
    <Tr>
      <Td>
        <Text w="10rem" maxHeight="2rem" overflow="hidden">
          {item.name}
        </Text>
      </Td>
      <Td>
        <NumericInput value={item.total} />
      </Td>
    </Tr>
  );
};

export default SelectedItem;
