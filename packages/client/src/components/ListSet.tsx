import React from 'react';
import { Box, Skeleton } from '@chakra-ui/react';
import ListItem from './ListItem';

const ListSet = () => {
  const isLoging = false;
  return (
    <Box w="100%" maxHeight="68vh" overflow="scroll" mt={2}>
      {isLoging ? (
        <Skeleton h="4.25rem" mb={3} borderRadius="md">
          <ListItem isLogin={false} />
        </Skeleton>
      ) : (
        <ListItem isLogin={false} />
      )}
      <ListItem isLogin={false} />
      <ListItem isLogin={false} />
      <ListItem isLogin={false} />
    </Box>
  );
};

export default ListSet;
