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
  px?: string;
  py?: string;
  onChange?: (v: number) => void;
}

const NumericInput: React.FC<NumericInputProps> = ({
  label,
  value,
  max,
  step = 1,
  onChange,
  px,
  py,
}) => {
  return (
    <Flex
      px={label && px}
      py={label && py}
      gap="11px"
      alignItems="center"
      fontSize="13px"
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
        textAlign="center"
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
