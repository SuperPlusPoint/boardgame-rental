import React, { useState } from 'react';
import { MdFormatListBulleted, MdGridView } from 'react-icons/md';
import {
  Flex,
  Select,
  Box,
  Badge,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverCloseButton,
  PopoverTrigger,
  ButtonGroup,
  Button,
  IconButton,
  Icon,
} from '@chakra-ui/react';
import SearchBar from '../components/SearchBar';
import BoardGameList from '../components/BoardGameList';
import ShareButton from '../components/ShareButton';
import { useAuthContext } from '../AuthProvider';
import { useUserBoardGame } from '../hooks/useUserBoardGame';
import { useListParams } from '../hooks/useListParams';
import { Sort, View } from '../types/enums';
import NumericInput from '../components/NumericInput';
import Title from '../components/Title';

const List = () => {
  const { user } = useAuthContext();
  const { userId } = useListParams();
  const {
    user: { uid, name },
    filter,
    sort,
    boardGames,
    getBoardGame,
    rentBoardGame,
    returnBoardGame,
    playerNum,
    setPlayerNum,
    startPlayingTime,
    setStartPlayingTime,
    endPlayingTime,
    setEndPlayingTime,
    setFilter,
    setSort,
  } = useUserBoardGame(userId as string);
  const [view, setView] = useState<View>(View.List);

  return (
    <Flex
      pos="relative"
      h="100%"
      flexDirection="column"
      align="center"
      px={8}
      pt="40px"
      pb={8}
    >
      <Title name={name} />
      <Box zIndex={8} alignSelf="stretch">
        <Badge>총 보유수 {boardGames.length}개</Badge>
        <SearchBar onSearch={(value) => setFilter(value)} />
      </Box>
      <Flex justify="space-between" alignSelf="stretch" gap={1}>
        <Popover placement="bottom-start" variant="responsive">
          <PopoverTrigger>
            <Button size="sm" variant="outline" px={4}>
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
            <Button size="sm" variant="outline" px={4}>
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
        <Select
          width="6em"
          placeholder="정렬"
          size="sm"
          value={sort}
          onChange={(e) => setSort(e.target.value as Sort)}
        >
          <option value={Sort.Created}>추가순</option>
          <option value={Sort.Name}>이름순</option>
        </Select>
        <ButtonGroup spacing={2} alignSelf="end" mb={1} ml="auto">
          <IconButton
            size="sm"
            variant="outline"
            isActive={view === View.List}
            onClick={() => setView(View.List)}
            icon={<Icon as={MdFormatListBulleted} />}
            aria-label="list view"
          />
          <IconButton
            size="sm"
            variant="outline"
            isActive={view === View.Grid}
            onClick={() => setView(View.Grid)}
            icon={<Icon as={MdGridView} />}
            aria-label="grid view"
          />
        </ButtonGroup>
      </Flex>
      <BoardGameList
        view={view}
        boardGameList={boardGames}
        isLogin={user?.uid === uid}
        getBoardGame={getBoardGame}
        rentBoardGame={rentBoardGame}
        returnBoardGame={returnBoardGame}
        filter={filter}
      />
      <ShareButton />
    </Flex>
  );
};

export default List;
