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
import TableItem from './TableItem';

const ListTable = () => {
  return (
    <Box pos="fixed" bottom="7rem" w="85%" maxHeight="23vh" overflow="scroll">
      <TableContainer whiteSpace="normal" wordBreak="break-word">
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>이름</Th>
              <Th>수량</Th>
            </Tr>
          </Thead>
          <Tbody>
            <TableItem />
            <TableItem />
            <TableItem />
            <TableItem />
            <TableItem />
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ListTable;
