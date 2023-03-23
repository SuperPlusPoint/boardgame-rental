import { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Box,
  Input,
  IconButton,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

interface SearchBarProps {
  onSearch: (val: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [value, setValue] = useState('');
  const handleValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inpVal = e.target.value;
    setValue(inpVal);
  };

  return (
    <FormControl>
      <Box display="flex" gap={3} mt={9} mx={9}>
        <FormLabel />
        <Input
          placeholder="검색"
          size="md"
          variant="outline"
          type="text"
          onChange={handleValue}
        />
        <IconButton
          color="white"
          colorScheme="blue"
          aria-label="Search"
          icon={<SearchIcon />}
          onClick={() => onSearch(value)}
        />
      </Box>
    </FormControl>
  );
};

export default SearchBar;
