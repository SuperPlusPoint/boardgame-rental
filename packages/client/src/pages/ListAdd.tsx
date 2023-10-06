import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Flex, Button } from '@chakra-ui/react';
import SearchBar from '../components/SearchBar';
import SelectedList from '../components/SelectedList';
import SearchList from '../components/SearchList';
import { useBoardGame } from '../hooks/useBoardGame';
import { useUserBoardGame } from '../hooks/useUserBoardGame';
import { useAuthContext } from '../AuthProvider';
import Header from '../layout/Header';

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
      px="16px"
      pb="15px"
      h="100%"
    >
      <Header title="보드게임 추가" />
      <SearchBar full onSearch={(value) => searchBoardGame(value)} />
      <SearchList
        isLoading={isLoading}
        isFetched={isFetched}
        boardGameList={searchedBoardGameList}
        selectBoardGame={selectBoardGame}
      />
      {selectedBoardGameList.length > 0 && (
        <SelectedList
          selectedList={selectedBoardGameList}
          changeTotal={changeTotal}
        />
      )}
      <Button
        alignSelf="stretch"
        isDisabled={selectedBoardGameList.length === 0}
        backgroundColor="#D5F479"
        fontSize="20px"
        borderRadius="12"
        border="1px solid black"
        py="18px"
        mt="10px"
        height=""
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
