import * as React from 'react';
import { Flex, Heading, Box, Button, Accordion } from '@chakra-ui/react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import ListTable from '../components/ListTable';
import AddItem from '../components/AddItem';

const ListAdd = () => {
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
          <SearchBar onSearch={(value) => console.log(value)} />
        </Box>
        <Flex w="100%" flexDirection="column" mr="auto">
          <Accordion mt={3}>
            <AddItem />
            <AddItem />
            <AddItem />
            <AddItem />
            <AddItem />
            <AddItem />
          </Accordion>
        </Flex>
        <ListTable />
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
