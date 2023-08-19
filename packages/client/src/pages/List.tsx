import React, { useState } from 'react';
import { Flex, Heading } from '@chakra-ui/react';
import SearchBar from '../components/SearchBar';
import BoardGameList from '../components/BoardGameList';
import ShareButton from '../components/ShareButton';
import { useAuthContext } from '../AuthProvider';
import { useUserBoardGame } from '../hooks/useUserBoardGame';
import { useListParams } from '../hooks/useListParams';
import { View } from '../types/enums';
import Title from '../components/Title';
import FilterBar from '../components/FilterBar';

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
      <Flex
        zIndex={8}
        alignSelf="stretch"
        justifyContent="space-between"
        alignItems="center"
        marginBottom="7px"
      >
        <Heading as="h3" size="lg">
          Board Game List
        </Heading>
        <SearchBar onSearch={(value) => setFilter(value)} />
      </Flex>
      <FilterBar
        count={boardGames.length}
        playerNum={playerNum}
        setPlayerNum={setPlayerNum}
        startPlayingTime={startPlayingTime}
        setStartPlayingTime={setStartPlayingTime}
        endPlayingTime={endPlayingTime}
        setEndPlayingTime={setEndPlayingTime}
        sort={sort}
        setSort={setSort}
        view={view}
        setView={setView}
      />
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
