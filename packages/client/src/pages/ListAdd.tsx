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
      flexDirection="column"
      justify="center"
      align="center"
      px={10}
      pb={8}
      h="100%"
    >
      <Box alignSelf="stretch" zIndex={8}>
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
        alignSelf="stretch"
        colorScheme="blue"
        mt={4}
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
