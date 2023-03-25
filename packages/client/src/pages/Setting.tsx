import * as React from 'react';
import { Flex, Heading, Box, Button } from '@chakra-ui/react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import EditableBoardGameList from '../components/EditableBoardGameList';
import { UserBoardGame } from '../models/boardgame';

const Setting = () => {
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
        <Box w="100%" pos="sticky" top="3.5rem" zIndex={8}>
          <Heading as="h2" size="lg" lineHeight="tall" textAlign="center">
            보드게임 관리
          </Heading>
          <SearchBar onSearch={(value) => console.log(value)} />
        </Box>
        <EditableBoardGameList boardGameList={userBoardGameList} />
        <Button
          size="md"
          pos="fixed"
          bottom="0"
          width="60%"
          colorScheme="blue"
          my={2}
        >
          저장하기
        </Button>
      </Flex>
    </>
  );
};

export default Setting;
