import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { UserBoardGame } from '../models/boardgame';
import EditableListItem from './EditableListItem';

interface EditableBoardGameListProps {
  boardGameList: UserBoardGame[];
  updateBoardGame: (bid: string, rental: number, total: number) => void;
  filter: string;
}
const EditableBoardGameList: React.FC<EditableBoardGameListProps> = ({
  boardGameList,
  updateBoardGame,
  filter,
}) => {
  return (
    <Flex
      border="1px solid black"
      backgroundColor="white"
      my="5px"
      alignSelf="stretch"
      flexDirection="column"
      flex={1}
      overflowY="scroll"
    >
      {boardGameList.length === 0 ? (
        <Text mt="39px" align="center" fontWeight="semibold" fontSize="14px">
          {!filter ? '보드게임을 추가해주세요' : '검색 결과가 없습니다'}
        </Text>
      ) : (
        <>
          <Box borderBottom="1px solid black" pl="13px" py="9px">
            <Text
              align="center"
              fontWeight="semibold"
              fontSize="14px"
              textAlign="left"
            >
              보유 중인 보드게임의 수량과 대여 현황을 관리해보세요
            </Text>
          </Box>
          <Flex flexDirection="column" overflow="scroll">
            {boardGameList.map((boardGame) => (
              <EditableListItem
                key={boardGame.id}
                userBoardGame={boardGame}
                updateBoardGame={updateBoardGame}
              />
            ))}
          </Flex>
        </>
      )}
    </Flex>
  );
};

export default EditableBoardGameList;
