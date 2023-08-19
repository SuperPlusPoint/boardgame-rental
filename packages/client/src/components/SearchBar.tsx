import { useState } from 'react';
import { FormControl, Box, Input, IconButton } from '@chakra-ui/react';
import SVGComponent, { Icon } from './common/SVGComponent';

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
    <FormControl w="">
      <Box
        display="flex"
        backgroundColor="white"
        border="1px solid black"
        width="116px"
      >
        <Input
          placeholder="Search"
          fontSize="0.5rem"
          height="20px"
          paddingLeft="6px"
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
          width="20px"
          height="20px"
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
