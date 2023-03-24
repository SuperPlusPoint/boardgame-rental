import * as React from 'react';
import { Flex, Heading, Highlight, Box } from '@chakra-ui/react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import ListSet from '../components/ListSet';
import ShareButton from '../components/ShareButton';

const List = () => {
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
            <Highlight query="은우" styles={{ color: '#3182ce' }}>
              은우
            </Highlight>
            님의 보드게임 목록
          </Heading>
          <SearchBar onSearch={(value) => console.log(value)} />
        </Box>
        <ListSet />
        <ShareButton />
      </Flex>
    </>
  );
};

export default List;
