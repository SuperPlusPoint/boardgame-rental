import * as React from 'react';
import { Flex, Heading, Box, Button, useToast, Badge } from '@chakra-ui/react';
import SearchBar from '../components/SearchBar';
import EditableBoardGameList from '../components/EditableBoardGameList';
import { useAuthContext } from '../AuthProvider';
import { useUserBoardGame } from '../hooks/useUserBoardGame';

const Setting = () => {
  const { user } = useAuthContext();
  const {
    boardGames,
    settingBoardGames,
    filter,
    setFilter,
    updateBoardGame,
    saveBoardGames,
  } = useUserBoardGame(user?.uid || 'no-login');
  const toast = useToast();
  return (
    <Flex
      pos="relative"
      h="100%"
      flexDirection="column"
      align="center"
      px={10}
      pb={8}
    >
      <Box zIndex={8} alignSelf="stretch">
        <Heading as="h2" size="lg" lineHeight="tall" textAlign="center">
          보드게임 관리
        </Heading>
        <Badge>총 보유수 {boardGames.length}개</Badge>
        <SearchBar onSearch={(value) => setFilter(value)} />
      </Box>
      <EditableBoardGameList
        boardGameList={settingBoardGames}
        updateBoardGame={updateBoardGame}
        filter={filter}
      />
      <Button
        size="md"
        my={2}
        alignSelf="stretch"
        colorScheme="blue"
        onClick={() => {
          toast({
            title: '저장되었습니다.',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
          saveBoardGames();
        }}
      >
        저장하기
      </Button>
    </Flex>
  );
};

export default Setting;
