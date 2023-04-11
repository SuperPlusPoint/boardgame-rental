import React, { useMemo } from 'react';
import {
  Flex,
  Image,
  Text,
  Button,
  ButtonGroup,
  Skeleton,
  Badge,
  useDisclosure,
} from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { BoardGame, UserBoardGame } from '../models/boardgame';
import { isNew } from '../utils/timestamp';
import BoardGameDetail from './BoardGameDetail';

interface GridItemProps {
  userBoardGame: UserBoardGame;
  getBoardGame: (bid: string) => Promise<BoardGame>;
  isLogin: boolean;
  rentBoardGame: (boardGame: UserBoardGame) => Promise<void>;
  returnBoardGame: (boardGame: UserBoardGame) => Promise<void>;
}

const GridItem: React.FC<GridItemProps> = ({
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
      <Flex direction="column" justify="center" align="center" onClick={onOpen}>
        <Skeleton isLoaded={!isLoading}>
          <Image
            boxSize="6rem"
            borderRadius="md"
            objectFit="cover"
            src={boardGame?.thumbnail}
            alt={`${boardGame?.name} thumbnail`}
            fallbackSrc="https://via.placeholder.com/64"
          />
        </Skeleton>
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

export default GridItem;
