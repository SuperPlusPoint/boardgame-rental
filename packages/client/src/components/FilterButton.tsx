import React from 'react';
import {
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Button,
  Box,
} from '@chakra-ui/react';

interface FilterButtonProps {
  label: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const FilterButton = ({ label, icon, children }: FilterButtonProps) => {
  return (
    <Popover placement="bottom-start" variant="responsive">
      <PopoverTrigger>
        <Button
          variant="outline"
          colorScheme="black"
          bgColor="white"
          borderRadius="5px"
          px={icon ? '12px' : '15px'}
          height="23px"
          fontSize="11px"
        >
          {label}
          <Box ml="4px">{icon}</Box>
        </Button>
      </PopoverTrigger>
      <PopoverContent width="" border="1px solid black" borderRadius="5px">
        <PopoverBody p="0">{children}</PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default FilterButton;
