import React, { useMemo } from 'react';
import {
  Flex,
  Image,
  Text,
  Skeleton,
  useDisclosure,
  Box,
  SkeletonText,
} from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { BoardGame, UserBoardGame } from '../models/boardgame';
import { isNew } from '../utils/timestamp';
import BoardGameDetail from './BoardGameDetail';
import SVGComponent, { Icon } from './common/SVGComponent';

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

  return (
    <>
      <Flex
        direction="column"
        justify="center"
        align="center"
        padding="11px"
        maxW="114px"
        onClick={onOpen}
        bgColor="white"
        border="1px solid black"
        borderRadius="12px"
        position="relative"
      >
        {isNewBoardGame && (
          <Box
            bgColor="#FFD951"
            width="78px"
            height="23px"
            border="1px solid black"
            position="absolute"
            top="-2px"
            left="-8.6px"
            textAlign="center"
            fontWeight="bold"
            fontSize="10px"
            lineHeight="23px"
            verticalAlign="bottom"
            transform="rotate(-17deg)"
          >
            NEW
          </Box>
        )}
        <Skeleton isLoaded={!isLoading}>
          <Image
            boxSize="92px"
            borderRadius="8px"
            border="1px solid black"
            objectFit="cover"
            src={boardGame?.thumbnail}
            alt={`${boardGame?.name} thumbnail`}
          />
        </Skeleton>
        <Skeleton isLoaded={!isLoading}>
          <Text
            as="b"
            fontSize="12px"
            noOfLines={1}
            alignSelf="start"
            marginTop="8px"
          >
            {boardGame?.koreanName || boardGame?.name}
          </Text>
        </Skeleton>
        <Flex alignItems="center" alignSelf="start">
          <SVGComponent icon={Icon.User} width={8} height={6} color="black" />
          <SkeletonText
            isLoaded={!isLoading}
            noOfLines={1}
            marginLeft="3px"
            marginRight="6px"
          >
            <Text fontSize="6px" style={{ zoom: 0.6 }}>
              {boardGame?.minPlayerNum}-{boardGame?.maxPlayerNum} players
            </Text>
          </SkeletonText>
          <SVGComponent icon={Icon.Clock} width={6} height={6} color="black" />
          <SkeletonText isLoaded={!isLoading} noOfLines={1} marginLeft="3px">
            <Text fontSize="6px" style={{ zoom: 0.6 }}>
              {boardGame?.playingTime} min
            </Text>
          </SkeletonText>
        </Flex>
      </Flex>
      {boardGame && (
        <BoardGameDetail
          userBoardGame={userBoardGame}
          boardGame={boardGame}
          isOpen={isOpen}
          returnBoardGame={returnBoardGame}
          rentBoardGame={rentBoardGame}
          onClose={onClose}
          isLogin={isLogin}
        />
      )}
    </>
  );
};

export default GridItem;
