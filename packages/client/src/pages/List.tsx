import * as React from 'react';
import { Flex, Heading, Highlight, Box } from '@chakra-ui/react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import BoardGameList from '../components/BoardGameList';
import ShareButton from '../components/ShareButton';
import { UserBoardGame } from '../models/boardgame';

const List = () => {
  const name = '박은우 ethan';
  const userBoardGameList: UserBoardGame[] = [
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
        <Box w="100%" pos="sticky" top="3.5rem" bg="white" zIndex={8}>
          <Heading as="h2" size="lg" lineHeight="tall" textAlign="center">
            <Highlight query={name} styles={{ color: '#3182ce' }}>
              {name}
            </Highlight>
            님의 보드게임 목록
          </Heading>
          <SearchBar onSearch={(value) => console.log(value)} />
        </Box>
        <BoardGameList boardGameList={userBoardGameList} />
        <ShareButton />
      </Flex>
    </>
  );
};

export default List;
