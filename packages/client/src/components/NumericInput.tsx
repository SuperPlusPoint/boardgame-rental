import React from 'react';
import {
  Flex,
  Text,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberIncrementStepper,
} from '@chakra-ui/react';

interface NumericInputProps {
  label?: string;
  value: number;
  onChange?: (v: number) => void;
}

const NumericInput: React.FC<NumericInputProps> = ({
  label,
  value,
  onChange,
}) => {
  return (
    <Flex>
      {label && <Text fontSize="sm">{label}</Text>}
      <NumberInput
        size="xs"
        w="4rem"
        value={value}
        min={0}
        ml={3}
        onChange={(v) => onChange?.(Number(v))}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </Flex>
  );
};

export default NumericInput;
