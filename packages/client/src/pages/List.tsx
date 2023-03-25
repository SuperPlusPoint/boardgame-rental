import * as React from 'react';
import { useParams } from 'react-router-dom';
import { Flex, Heading, Highlight, Box } from '@chakra-ui/react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import BoardGameList from '../components/BoardGameList';
import ShareButton from '../components/ShareButton';
import { useAuthContext } from '../AuthProvider';
import { useUserBoardGame } from '../hooks/useUserBoardGame';

const List = () => {
  const { user } = useAuthContext();
  const { userId } = useParams();
  const {
    user: { uid, name },
    boardGames,
    getBoardGame,
  } = useUserBoardGame(userId as string);

  return (
    <>
      <Header isLogin />
      <Flex
        pos="relative"
        top="3.5rem"
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
            님의 보드게임 목록
          </Heading>
          <SearchBar onSearch={(value) => console.log(value)} />
        </Box>
        <BoardGameList
          boardGameList={boardGames}
          isLogin={user?.uid === uid}
          getBoardGame={getBoardGame}
        />
        <ShareButton />
      </Flex>
    </>
  );
};

export default List;
