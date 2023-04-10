import React, { useEffect, useState } from 'react';
import { Flex, Image, Box, Text, Badge } from '@chakra-ui/react';
import { UserBoardGame } from '../models/boardgame';
import NumericInput from './NumericInput';
import { isNew } from '../utils/timestamp';

interface EditableListItemProps {
  userBoardGame: UserBoardGame;
  updateBoardGame: (bid: string, rental: number, total: number) => void;
}

const EditableListItem: React.FC<EditableListItemProps> = ({
  userBoardGame,
  updateBoardGame,
}) => {
  const [rental, setRental] = useState<number>(userBoardGame.rental);
  const [total, setTotal] = useState<number>(userBoardGame.total);

  useEffect(() => {
    updateBoardGame(userBoardGame.id, rental, total);
  }, [rental, total, updateBoardGame, userBoardGame.id]);

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
          {isNew(userBoardGame?.created?.toMillis()) && (
            <>
              <Badge colorScheme="red">New</Badge>{' '}
            </>
          )}
          {userBoardGame.name}
        </Text>
        <Box>
          <NumericInput
            label="대여"
            value={userBoardGame.rental}
            max={total}
            onChange={(v) => setRental(v)}
          />
          <NumericInput
            label="보유"
            value={userBoardGame.total}
            onChange={(v) => setTotal(v)}
          />
        </Box>
      </Box>
    </Flex>
  );
};

export default EditableListItem;
