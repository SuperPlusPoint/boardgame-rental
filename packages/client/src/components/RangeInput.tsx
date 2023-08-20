/* eslint-disable jsx-a11y/aria-proptypes */
import React from 'react';
import {
  Flex,
  Text,
  RangeSliderTrack,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
} from '@chakra-ui/react';

interface RangeInputProps {
  value: [number, number];
  min?: number;
  max?: number;
  step?: number;
  onChange?: (v: [number, number]) => void;
}

const RangeInput: React.FC<RangeInputProps> = ({
  value,
  min = 0,
  max = 300,
  step = 10,
  onChange,
}) => {
  return (
    <Flex
      px="14px"
      pt="23px"
      pb="17px"
      gap="11px"
      fontSize="0.5rem"
      alignItems="center"
      fontWeight="bold"
    >
      <RangeSlider
        position="relative"
        minWidth="100px"
        aria-label={['min', 'max']}
        defaultValue={[0, 300]}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
      >
        <RangeSliderTrack>
          <RangeSliderFilledTrack />
        </RangeSliderTrack>
        <RangeSliderThumb index={0} />
        <RangeSliderThumb index={1} />
        <Text position="absolute" left="-8px" bottom="12px">
          0분
        </Text>
        <Text position="absolute" right="-8px" bottom="12px">
          300분
        </Text>
      </RangeSlider>
    </Flex>
  );
};

export default RangeInput;
