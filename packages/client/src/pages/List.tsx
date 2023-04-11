import React, { useState } from 'react';
import { MdFormatListBulleted, MdGridView } from 'react-icons/md';
import {
  Flex,
  Heading,
  Highlight,
  Select,
  Box,
  Badge,
  ButtonGroup,
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
      px={10}
      pb={8}
    >
      <Box bg="white" zIndex={8} alignSelf="stretch">
        <Heading as="h2" size="lg" lineHeight="tall" textAlign="center">
          <Highlight query={name} styles={{ color: '#3182ce' }}>
            {name}
          </Highlight>
          님의{name.length > 7 ? <br /> : ' '}보드게임 목록
        </Heading>
        <Badge>총 보유수 {boardGames.length}개</Badge>
        <SearchBar onSearch={(value) => setFilter(value)} />
      </Box>
      <Flex justify="space-between">
        <Select
          placeholder="정렬"
          size="sm"
          value={sort}
          onChange={(e) => setSort(e.target.value as Sort)}
        >
          <option value={Sort.Created}>추가순</option>
          <option value={Sort.Name}>이름순</option>
        </Select>
        <ButtonGroup spacing={2} alignSelf="end" mb={1}>
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
