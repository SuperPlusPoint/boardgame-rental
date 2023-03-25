import * as React from 'react';
import { Flex, Heading, Box, Button } from '@chakra-ui/react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import EditableBoardGameList from '../components/EditableBoardGameList';
import { useAuthContext } from '../AuthProvider';
import { useUserBoardGame } from '../hooks/useUserBoardGame';

const Setting = () => {
  const { user } = useAuthContext();
  const { settingBoardGames, setFilter, updateBoardGame, saveBoardGames } =
    useUserBoardGame(user?.uid || 'no-login');

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
        <Box w="100%" pos="sticky" top="3.5rem" zIndex={8}>
          <Heading as="h2" size="lg" lineHeight="tall" textAlign="center">
            보드게임 관리
          </Heading>
          <SearchBar onSearch={(value) => setFilter(value)} />
        </Box>
        <EditableBoardGameList
          boardGameList={settingBoardGames}
          updateBoardGame={updateBoardGame}
        />
        <Button
          size="md"
          pos="fixed"
          bottom="0"
          width="60%"
          colorScheme="blue"
          my={2}
          onClick={() => saveBoardGames()}
        >
          저장하기
        </Button>
      </Flex>
    </>
  );
};

export default Setting;
