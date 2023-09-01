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
  useDisclosure,
} from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { BoardGame, UserBoardGame } from '../models/boardgame';
import { isNew } from '../utils/timestamp';
import BoardGameDetail from './BoardGameDetail';
import SVGComponent, { Icon } from './common/SVGComponent';

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
              padding="7px 23px"
              fontSize="9px"
              fontWeight="400"
              borderRadius="7px"
              border="1px solid black"
              bgColor="#D5F479"
              isDisabled={userBoardGame.rental === userBoardGame.total}
              onClick={() => rentBoardGame(userBoardGame)}
            >
              대여하기
            </Button>
            <Button
              size="xs"
              padding="7px 23px"
              fontSize="9px"
              fontWeight="400"
              borderRadius="7px"
              border="1px solid black"
              bgColor="#FF6F5F"
              isDisabled={userBoardGame.rental < 1}
              onClick={() => returnBoardGame(userBoardGame)}
            >
              반납하기
            </Button>
          </>
        ) : (
          <Button
            size="xs"
            padding="7px 23px"
            fontSize="9px"
            fontWeight="400"
            borderRadius="7px"
            border="1px solid black"
            bgColor={
              userBoardGame.rental < userBoardGame.total ? '#D5F479' : '#FF6F5F'
            }
          >
            대여
            {userBoardGame.rental < userBoardGame.total ? '하기' : '불가'}
          </Button>
        )}
      </ButtonGroup>
    ),
    [isLogin, userBoardGame, rentBoardGame, returnBoardGame]
  );

  return (
    <>
      <Flex
        justify="center"
        align="center"
        padding="11px"
        mb="9px"
        onClick={onOpen}
        bgColor="white"
        border="1px solid black"
        borderRadius="12px"
        position="relative"
      >
        <Skeleton isLoaded={!isLoading}>
          <Image
            boxSize="78px"
            borderRadius="8px"
            border="1px solid black"
            objectFit="cover"
            src={boardGame?.thumbnail}
            alt={`${boardGame?.name} thumbnail`}
            fallbackSrc="https://via.placeholder.com/64"
          />
        </Skeleton>
        {isNewBoardGame || (
          <Box
            bgColor="#FFD951"
            width="78px"
            height="23px"
            border="1px solid black"
            position="absolute"
            top="-2px"
            right="-8.6px"
            textAlign="center"
            fontWeight="bold"
            fontSize="10px"
            lineHeight="23px"
            verticalAlign="bottom"
            transform="rotate(17deg)"
          >
            NEW
          </Box>
        )}
        <Box ml="19px" flex={1} alignSelf="stretch" pt="7px" pb="6px">
          <Skeleton isLoaded={!isLoading}>
            <Text as="b" fontSize="18px" noOfLines={1}>
              {boardGame?.koreanName || boardGame?.name}
            </Text>
          </Skeleton>
          <Flex alignItems="center">
            <SVGComponent icon={Icon.User} width={8} height={6} color="black" />
            <SkeletonText
              isLoaded={!isLoading}
              noOfLines={1}
              marginLeft="3px"
              marginRight="6px"
            >
              <Text fontSize="6px">
                {boardGame?.minPlayerNum}-{boardGame?.maxPlayerNum} players
              </Text>
            </SkeletonText>
            <SVGComponent
              icon={Icon.Clock}
              width={6}
              height={6}
              color="black"
            />
            <SkeletonText isLoaded={!isLoading} noOfLines={1} marginLeft="3px">
              <Text fontSize="6px">{boardGame?.playingTime} min</Text>
            </SkeletonText>
          </Flex>
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
