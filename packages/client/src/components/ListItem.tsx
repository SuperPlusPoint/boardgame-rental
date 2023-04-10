import React from 'react';
import {
  Flex,
  Image,
  Box,
  Text,
  Button,
  ButtonGroup,
  Skeleton,
  SkeletonText,
  Badge,
} from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { BoardGame, UserBoardGame } from '../models/boardgame';
import { isNew } from '../utils/timestamp';

interface ListItemProps {
  userBoardGame: UserBoardGame;
  getBoardGame: (bid: string) => Promise<BoardGame>;
  isLogin: boolean;
  rentBoardGame: (boardGame: UserBoardGame) => Promise<void>;
  returnBoardGame: (boardGame: UserBoardGame) => Promise<void>;
}

const ListItem: React.FC<ListItemProps> = ({
  userBoardGame,
  isLogin,
  getBoardGame,
  rentBoardGame,
  returnBoardGame,
}) => {
  const { data: boardGame, isLoading } = useQuery(
    `/boardgame/${userBoardGame.id}`,
    () => getBoardGame(userBoardGame.id)
  );
  return (
    <Flex justify="center" align="center" mb={3}>
      <Skeleton isLoaded={!isLoading}>
        <Image
          boxSize="4rem"
          borderRadius="md"
          objectFit="cover"
          src={boardGame?.thumbnail}
          alt={`${boardGame?.name} thumbnail`}
        />
      </Skeleton>
      <Box ml={3} flex={1}>
        <Skeleton isLoaded={!isLoading}>
          <Text as="b" fontSize="sm" noOfLines={1}>
            {isNew(userBoardGame?.created?.toMillis()) && (
              <>
                <Badge colorScheme="red">New</Badge>{' '}
              </>
            )}
            {boardGame?.koreanName || boardGame?.name}
          </Text>
        </Skeleton>
        <Box>
          <SkeletonText isLoaded={!isLoading} noOfLines={1}>
            <Text fontSize="xs">
              {boardGame?.minPlayerNum}-{boardGame?.maxPlayerNum} Players
            </Text>
          </SkeletonText>
          <ButtonGroup spacing={2}>
            {isLogin ? (
              <>
                <Button
                  size="xs"
                  colorScheme="blue"
                  isDisabled={userBoardGame.rental === userBoardGame.total}
                  onClick={() => rentBoardGame(userBoardGame)}
                >
                  대여 하기
                </Button>
                <Button
                  size="xs"
                  colorScheme="red"
                  isDisabled={userBoardGame.rental < 1}
                  onClick={() => returnBoardGame(userBoardGame)}
                >
                  반납 하기
                </Button>
              </>
            ) : (
              <Button
                size="xs"
                colorScheme={
                  userBoardGame.rental < userBoardGame.total ? 'blue' : 'red'
                }
              >
                대여
                {userBoardGame.rental < userBoardGame.total ? '가능' : '불가'}
              </Button>
            )}
          </ButtonGroup>
        </Box>
      </Box>
    </Flex>
  );
};

export default ListItem;
