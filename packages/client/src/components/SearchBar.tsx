import { useState } from 'react';
import { FormControl, Box, Input, IconButton } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

type SearchBarProps = {
  onSearch: (val: string) => void;
};

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [value, setValue] = useState('');
  const handleValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inpVal = e.target.value;
    setValue(inpVal);
  };

  return (
    <FormControl w="100%">
      <Box display="flex" gap={2} my={3}>
        <Input
          placeholder="검색"
          size="sm"
          borderRadius="md"
          variant="outline"
          type="text"
          onChange={handleValue}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onSearch(value);
            }
          }}
        />
        <IconButton
          size="sm"
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
