import { useState } from 'react';
import { FormControl, Box, Input, IconButton } from '@chakra-ui/react';
import SVGComponent, { Icon } from './common/SVGComponent';

type SearchBarProps = {
  onSearch: (val: string) => void;
  full?: boolean;
};

const SearchBar = ({ full = false, onSearch }: SearchBarProps) => {
  const [value, setValue] = useState('');
  const handleValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inpVal = e.target.value;
    setValue(inpVal);
  };

  return (
    <FormControl w={full ? '100%' : ''}>
      <Box
        display="flex"
        backgroundColor="white"
        border="1px solid black"
        width={full ? '100%' : '116px'}
      >
        <Input
          placeholder="Search"
          fontSize="0.5rem"
          height={full ? '30px' : '20px'}
          paddingLeft={full ? '8px' : '6px'}
          variant="unstyled"
          type="text"
          onChange={handleValue}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onSearch(value);
            }
          }}
        />
        <IconButton
          width={full ? '30px' : '20px'}
          height={full ? '30px' : '20px'}
          color="white"
          colorScheme="white"
          aria-label="Search"
          icon={
            <SVGComponent
              icon={Icon.Search}
              width={12}
              height={12}
              color="black"
            />
          }
          onClick={() => onSearch(value)}
        />
      </Box>
    </FormControl>
  );
};

export default SearchBar;
