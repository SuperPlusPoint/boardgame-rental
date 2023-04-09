import * as React from 'react';
import { Flex, Heading, Highlight, Box } from '@chakra-ui/react';
import SearchBar from '../components/SearchBar';
import BoardGameList from '../components/BoardGameList';
import ShareButton from '../components/ShareButton';
import { useAuthContext } from '../AuthProvider';
import { useUserBoardGame } from '../hooks/useUserBoardGame';
import { useListParams } from '../hooks/useListParams';

const List = () => {
  const { user } = useAuthContext();
  const { userId } = useListParams();
  const {
    user: { uid, name },
    filter,
    boardGames,
    getBoardGame,
    rentBoardGame,
    returnBoardGame,
    setFilter,
  } = useUserBoardGame(userId as string);

  return (
    <Flex
      pos="relative"
      h="100%"
      flexDirection="column"
      justify="center"
      align="center"
      mx={10}
    >
      <Box w="100%" pos="sticky" top="3.5rem" bg="white" zIndex={8}>
        <Heading as="h2" size="lg" lineHeight="tall" textAlign="center">
          <Highlight query={name} styles={{ color: '#3182ce' }}>
            {name}
          </Highlight>
          님의{name.length > 7 ? <br /> : ' '}보드게임 목록
        </Heading>
        <SearchBar onSearch={(value) => setFilter(value)} />
      </Box>
      <BoardGameList
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
