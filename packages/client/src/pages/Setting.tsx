import * as React from 'react';
import { Flex, Text, Button, useToast } from '@chakra-ui/react';
import SearchBar from '../components/SearchBar';
import EditableBoardGameList from '../components/EditableBoardGameList';
import { useAuthContext } from '../AuthProvider';
import { useUserBoardGame } from '../hooks/useUserBoardGame';
import Header from '../layout/Header';

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
      flexDirection="column"
      justify="center"
      align="center"
      px="16px"
      pb="15px"
      h="100%"
    >
      <Header title="보드게임 관리" mb="16px" />
      <Text
        fontWeight="bold"
        fontSize="15px"
        height="18px"
        lineHeight="18px"
        marginLeft="auto"
        marginBottom="10px"
      >
        🎲 {boardGames.length}
      </Text>
      <SearchBar full onSearch={(value) => setFilter(value)} />
      <EditableBoardGameList
        boardGameList={settingBoardGames}
        updateBoardGame={updateBoardGame}
        filter={filter}
      />
      <Button
        alignSelf="stretch"
        backgroundColor="#D5F479"
        fontSize="20px"
        borderRadius="12"
        border="1px solid black"
        py="18px"
        mt="10px"
        height=""
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
