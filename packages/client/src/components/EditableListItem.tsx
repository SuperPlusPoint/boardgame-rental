import React, { useEffect, useState } from 'react';
import { Flex, Image, Box, Text } from '@chakra-ui/react';
import { UserBoardGame } from '../models/boardgame';
import NumericInput from './NumericInput';

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
    <Flex
      justify="center"
      align="center"
      padding="11px"
      p="11px"
      bgColor="white"
      borderBottom="1px solid black"
      position="relative"
    >
      <Image
        boxSize="72px"
        borderRadius="8px"
        objectFit="cover"
        src={userBoardGame?.thumbnail}
        alt={`${userBoardGame.name} thumbnail`}
      />
      <Flex flexDirection="column" ml={3} flex={1}>
        <Text as="b" fontSize="14px" noOfLines={1}>
          {userBoardGame.name}
        </Text>
        <Box>
          <NumericInput
            label="보유 수량"
            value={userBoardGame.total}
            onChange={(v) => setTotal(v)}
          />
          <NumericInput
            label="대여 수량"
            value={userBoardGame.rental}
            max={total}
            onChange={(v) => setRental(v)}
          />
        </Box>
      </Flex>
    </Flex>
  );
};

export default EditableListItem;
