import React from 'react';
import { Flex, Spinner } from '@chakra-ui/react';

const Loading = () => {
  return (
    <Flex pos="relative" justify="center" height="100vh">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
        pos="absolute"
        top="50%"
      />
    </Flex>
  );
};

export default Loading;
