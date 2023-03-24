import React from 'react';
import {
  Tr,
  Td,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Text,
} from '@chakra-ui/react';

const TableItem = () => {
  return (
    <Tr>
      <Td>
        <Text w="10rem" maxHeight="2rem" overflow="hidden">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        </Text>
      </Td>
      <Td>
        <NumberInput size="xs" w="4rem" defaultValue={1} min={0} ml={3}>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </Td>
    </Tr>
  );
};

export default TableItem;
