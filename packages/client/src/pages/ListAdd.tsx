import * as React from 'react';
import { Flex, Heading, Box, Button } from '@chakra-ui/react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import SelectedList from '../components/SelectedList';
import SearchList from '../components/SearchList';
import { UserBoardGame } from '../models/boardgame';
import { useBoardGame } from '../hooks/useBoardGame';

const ListAdd = () => {
  const { searchedBoardGameList, searchBoardGame } = useBoardGame();
  const selectedList: UserBoardGame[] = [
    {
      id: '1',
      name: '루미큐브',
      thumbnail:
        'https://cf.geekdo-images.com/LeaLDlTTmeN639MfuflcMw__itemrep/img/x4GW0OJaN-pV8-K_b4RTSFioW6U=/fit-in/246x300/filters:strip_icc()/pic2286966.jpg',
      total: 0,
      rental: 0,
    },
  ];
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
            보드게임 추가
          </Heading>
          <SearchBar onSearch={(value) => searchBoardGame(value)} />
        </Box>
        <SearchList boardGameList={searchedBoardGameList} />
        <SelectedList selectedList={selectedList} />
        <Button
          size="md"
          pos="fixed"
          bottom="0"
          width="60%"
          colorScheme="blue"
          my={9}
        >
          추가하기
        </Button>
      </Flex>
    </>
  );
};

export default ListAdd;
