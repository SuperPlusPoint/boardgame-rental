import React from 'react';
import {
  Flex,
  Text,
  NumberInput,
  NumberInputField,
  IconButton,
} from '@chakra-ui/react';
import SVGComponent, { Icon } from './common/SVGComponent';

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
    <Flex
      px="8px"
      py="12px"
      gap="11px"
      alignItems="center"
      fontSize="13px"
      fontWeight="bold"
    >
      {label && <Text fontSize="sm">{label}</Text>}
      <IconButton
        width="20px"
        minW="20px"
        height="20px"
        variant="unstyled"
        display="inline-flex"
        isDisabled={value - step < 0}
        onClick={() => onChange?.(value - step)}
        icon={
          <SVGComponent
            icon={Icon.Minus}
            color="black"
            width={20}
            height={20}
          />
        }
        aria-label="minus"
      />
      <NumberInput
        value={value}
        fontSize="13px"
        variant="unstyled"
        maxW="18px"
        min={0}
        max={max}
        step={step}
        onChange={(v) => onChange?.(Number(v))}
      >
        <NumberInputField padding="0" />
      </NumberInput>
      <IconButton
        width="20px"
        minW="20px"
        height="20px"
        variant="unstyled"
        display="inline-flex"
        onClick={() => onChange?.(value + step)}
        icon={
          <SVGComponent icon={Icon.Plus} color="black" width={20} height={20} />
        }
        aria-label="plus"
      />
    </Flex>
  );
};

export default NumericInput;
