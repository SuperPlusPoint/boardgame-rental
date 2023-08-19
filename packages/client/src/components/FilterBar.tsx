import React from 'react';
import { MdFormatListBulleted, MdGridView } from 'react-icons/md';
import {
  Flex,
  Select,
  Text,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverCloseButton,
  PopoverTrigger,
  Button,
  IconButton,
  Icon,
} from '@chakra-ui/react';
import { Sort, View } from '../types/enums';
import NumericInput from './NumericInput';
import SVGComponent, { Icon as SVGIcon } from './common/SVGComponent';

interface FilterBarProps {
  count: number;
  playerNum: number;
  setPlayerNum: React.Dispatch<React.SetStateAction<number>>;
  startPlayingTime: number;
  setStartPlayingTime: React.Dispatch<React.SetStateAction<number>>;
  endPlayingTime: number;
  setEndPlayingTime: React.Dispatch<React.SetStateAction<number>>;
  sort: Sort;
  setSort: React.Dispatch<React.SetStateAction<Sort>>;
  view: View;
  setView: React.Dispatch<React.SetStateAction<View>>;
}

const FilterBar = ({
  count,
  playerNum,
  setPlayerNum,
  startPlayingTime,
  setStartPlayingTime,
  endPlayingTime,
  setEndPlayingTime,
  sort,
  setSort,
  view,
  setView,
}: FilterBarProps) => {
  return (
    <Flex alignItems="center" alignSelf="stretch" marginY="8px" gap="4px">
      <Popover placement="bottom-start" variant="responsive">
        <PopoverTrigger>
          <Button
            variant="outline"
            colorScheme="black"
            bgColor="white"
            borderRadius="5px"
            px="15px"
            height="23px"
            fontSize="11px"
          >
            인원
          </Button>
        </PopoverTrigger>
        <PopoverContent w="3xs">
          <PopoverCloseButton />
          <PopoverBody>
            <NumericInput
              label="인원"
              value={playerNum}
              onChange={setPlayerNum}
            />
          </PopoverBody>
        </PopoverContent>
      </Popover>
      <Popover placement="bottom-start" variant="responsive">
        <PopoverTrigger>
          <Button
            variant="outline"
            colorScheme="black"
            bgColor="white"
            borderRadius="5px"
            px="15px"
            height="23px"
            fontSize="11px"
          >
            시간
          </Button>
        </PopoverTrigger>
        <PopoverContent w="2xs">
          <PopoverCloseButton />
          <PopoverBody>
            <NumericInput
              label="최소 시간"
              value={startPlayingTime}
              onChange={setStartPlayingTime}
              step={10}
            />
            <NumericInput
              label="최대 시간"
              value={endPlayingTime}
              onChange={setEndPlayingTime}
              step={10}
            />
          </PopoverBody>
        </PopoverContent>
      </Popover>
      <Popover placement="bottom-start" variant="responsive">
        <PopoverTrigger>
          <Button
            variant="outline"
            colorScheme="black"
            bgColor="white"
            borderRadius="5px"
            px="15px"
            height="23px"
            fontSize="11px"
          >
            정렬
            <SVGComponent
              icon={SVGIcon.SelectArrow}
              width={6}
              height={3}
              color="black"
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent w="2xs">
          <PopoverCloseButton />
          <PopoverBody>
            <NumericInput
              label="최소 시간"
              value={startPlayingTime}
              onChange={setStartPlayingTime}
              step={10}
            />
            <NumericInput
              label="최대 시간"
              value={endPlayingTime}
              onChange={setEndPlayingTime}
              step={10}
            />
          </PopoverBody>
        </PopoverContent>
      </Popover>
      <Select
        bgColor="white"
        borderColor="black"
        borderRadius="5px"
        height="23px"
        verticalAlign="middle"
        fontSize="11px"
        width="63px"
        placeholder="정렬"
        marginRight="auto"
        icon={
          <SVGComponent
            icon={SVGIcon.SelectArrow}
            width={6}
            height={3}
            color="black"
          />
        }
        value={sort}
        onChange={(e) => setSort(e.target.value as Sort)}
      >
        <option value={Sort.Created}>추가순</option>
        <option value={Sort.Name}>이름순</option>
      </Select>
      <Text fontWeight="bold" fontSize="15px" height="18px" lineHeight="18px">
        🎲 {count}
      </Text>
      <IconButton
        width="24px"
        minW="24px"
        height="24px"
        variant="unstyled"
        display="inline-flex"
        bgColor={view === View.List ? '#F0F0F0' : 'transparent'}
        borderRadius={2}
        onClick={() => setView(View.List)}
        icon={<Icon as={MdFormatListBulleted} width="16px" height="16px" />}
        aria-label="list view"
      />
      <IconButton
        width="24px"
        minW="24px"
        height="24px"
        variant="unstyled"
        display="inline-flex"
        bgColor={view === View.Grid ? '#F0F0F0' : 'transparent'}
        borderRadius={2}
        onClick={() => setView(View.Grid)}
        icon={<Icon as={MdGridView} width="14px" height="14px" />}
        aria-label="grid view"
      />
    </Flex>
  );
};

export default FilterBar;
