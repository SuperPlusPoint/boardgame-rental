import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Flex, Heading, Box, Button } from '@chakra-ui/react';
import SearchBar from '../components/SearchBar';
import SelectedList from '../components/SelectedList';
import SearchList from '../components/SearchList';
import { useBoardGame } from '../hooks/useBoardGame';
import { useUserBoardGame } from '../hooks/useUserBoardGame';
import { useAuthContext } from '../AuthProvider';

const ListAdd = () => {
  const { user } = useAuthContext();
  const {
    isLoading,
    isFetched,
    searchedBoardGameList,
    selectedBoardGameList,
    searchBoardGame,
    selectBoardGame,
    changeTotal,
  } = useBoardGame();
  const { addBoardGames } = useUserBoardGame(user?.uid || 'no-login');
  const navigate = useNavigate();

  return (
    <Flex
      pos="relative"
      top="3.5rem"
      flexDirection="column"
      justify="center"
      align="center"
      mx={10}
    >
      <Box w="100%" pos="sticky" top="3.5rem" zIndex={8}>
        <Heading as="h2" size="lg" lineHeight="tall" textAlign="center">
          보드게임 추가
        </Heading>
        <SearchBar onSearch={(value) => searchBoardGame(value)} />
      </Box>
      <SearchList
        isLoading={isLoading}
        isFetched={isFetched}
        boardGameList={searchedBoardGameList}
        selectBoardGame={selectBoardGame}
      />
      <SelectedList
        selectedList={selectedBoardGameList}
        changeTotal={changeTotal}
      />
      <Button
        size="md"
        pos="fixed"
        bottom="0"
        width="60%"
        colorScheme="blue"
        my={9}
        onClick={() =>
          addBoardGames(selectedBoardGameList).then(() => navigate('/setting'))
        }
      >
        추가하기
      </Button>
    </Flex>
  );
};

export default ListAdd;
