import * as React from 'react';
import { Flex, Heading, Button } from '@chakra-ui/react';
import { WarningIcon } from '@chakra-ui/icons';
import Header from '../components/Header';

const NotFound = () => (
  <>
    <Header />
    <Flex
      h="70vh"
      flexDirection="column"
      justify="center"
      alignItems="center"
      mt="3.5rem"
    >
      <Heading as="h2" size="xl">
        <WarningIcon w={10} h={10} color="red.500" mb={4} />
        <br />
        페이지를
        <br />
        찾을 수 없어요 :-(
      </Heading>
      <Button size="md" width="13rem" colorScheme="blue" mt={12}>
        뒤로가기
      </Button>
    </Flex>
  </>
);

export default NotFound;
