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
  max?: number;
  step?: number;
  onChange?: (v: number) => void;
}

const NumericInput: React.FC<NumericInputProps> = ({
  label,
  value,
  max,
  step = 1,
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
        max={max}
        ml={3}
        step={step}
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
