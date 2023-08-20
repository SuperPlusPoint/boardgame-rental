/* eslint-disable jsx-a11y/aria-proptypes */
import React from 'react';
import { Flex, Button } from '@chakra-ui/react';

interface SelectInputProps<T = any> {
  selected: T;
  options: { value: T; label: string }[];
  placeholder?: string;
  onChange?: (v: T) => void;
}

interface OptionProps {
  label: string;
  value?: any;
  isSelected?: boolean;
  onChange?: (v: any) => void;
}

const Option = ({
  label,
  value,
  onChange,
  isSelected = false,
}: OptionProps) => (
  <Button
    width="100%"
    height=""
    py="6px"
    isDisabled={!value}
    onClick={() => onChange?.(value)}
    borderRadius="none"
    border="0.5px black solid"
    bgColor={isSelected ? '#F0F0F0' : 'white'}
    color="black"
    fontSize="11px"
  >
    {label}
  </Button>
);

const SelectInput: React.FC<SelectInputProps> = ({
  selected,
  options = [],
  placeholder,
  onChange,
}) => {
  return (
    <Flex direction="column" alignItems="center" fontWeight="bold">
      {placeholder && <Option label={placeholder} />}
      {options.map(({ value, label }) => (
        <Option
          key={value}
          value={value}
          label={label}
          onChange={onChange}
          isSelected={value === selected}
        />
      ))}
    </Flex>
  );
};

export default SelectInput;
