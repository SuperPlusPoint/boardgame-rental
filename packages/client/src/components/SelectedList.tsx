import React from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
} from '@chakra-ui/react';
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
    <Box alignSelf="stretch" overflow="scroll" mt={4} maxH="150px">
      <TableContainer whiteSpace="normal" wordBreak="break-word">
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>이름</Th>
              <Th>수량</Th>
            </Tr>
          </Thead>
          <Tbody>
            {selectedList.map((item) => (
              <SelectedItem
                key={item.id}
                item={item}
                changeTotal={changeTotal}
              />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default SelectedList;
