import React, { useMemo } from 'react';
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
  useDisclosure,
} from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { BoardGame, UserBoardGame } from '../models/boardgame';
import { isNew } from '../utils/timestamp';
import BoardGameDetail from './BoardGameDetail';

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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isNewBoardGame = useMemo(
    () => isNew(userBoardGame?.created?.toMillis()),
    [userBoardGame]
  );
  const buttonGroup = useMemo(
    () => (
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
    ),
    [isLogin, userBoardGame, rentBoardGame, returnBoardGame]
  );

  return (
    <>
      <Flex justify="center" align="center" mb={3} onClick={onOpen}>
        <Skeleton isLoaded={!isLoading}>
          <Image
            boxSize="4rem"
            borderRadius="md"
            objectFit="cover"
            src={boardGame?.thumbnail}
            alt={`${boardGame?.name} thumbnail`}
            fallbackSrc="https://via.placeholder.com/64"
          />
        </Skeleton>
        <Box ml={3} flex={1}>
          <Skeleton isLoaded={!isLoading}>
            <Text as="b" fontSize="sm" noOfLines={1}>
              {isNewBoardGame && (
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
          </Box>
          {buttonGroup}
        </Box>
      </Flex>
      {boardGame && (
        <BoardGameDetail
          userBoardGame={userBoardGame}
          boardGame={boardGame}
          isOpen={isOpen}
          isNew={isNewBoardGame}
          footer={buttonGroup}
          onClose={onClose}
        />
      )}
    </>
  );
};

export default ListItem;
