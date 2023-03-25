import React from 'react';
import { Flex, Image, Box, Text } from '@chakra-ui/react';
import { UserBoardGame } from '../models/boardgame';
import NumericInput from './NumericInput';

interface EditableListItemProps {
  userBoardGame: UserBoardGame;
}

const EditableListItem: React.FC<EditableListItemProps> = ({
  userBoardGame,
}) => {
  return (
    <Flex justify="center" align="center" mb={3}>
      <Image
        boxSize="4rem"
        borderRadius="md"
        objectFit="cover"
        src={userBoardGame.thumbnail}
        alt={`${userBoardGame.name} thumbnail`}
      />
      <Box ml={3} flex={1}>
        <Text as="b" fontSize="sm" w="12rem" noOfLines={1}>
          {userBoardGame.name}
        </Text>
        <Box>
          <NumericInput label="대여" value={userBoardGame.rental} />
          <NumericInput label="보유" value={userBoardGame.total} />
        </Box>
      </Box>
    </Flex>
  );
};

export default EditableListItem;
