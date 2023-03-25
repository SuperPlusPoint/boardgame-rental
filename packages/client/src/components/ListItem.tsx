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
} from '@chakra-ui/react';
import { UserBoardGame } from '../models/boardgame';

interface ListItemProps {
  userBoardGame: UserBoardGame;
  isLogin: boolean;
}

const ListItem: React.FC<ListItemProps> = ({ userBoardGame, isLogin }) => {
  const isLoading = true;
  const boardGame = {
    id: '1',
    publishedYear: 2002,
    minPlayerNum: 2,
    maxPlayerNum: 5,
    playingTime: 30,
    minPlayTime: 30,
    maxPlayTime: 50,
    age: 10,
    name: 'RumiCube',
    koreanName: '루미큐브',
    thumbnail:
      'https://cf.geekdo-images.com/LeaLDlTTmeN639MfuflcMw__itemrep/img/x4GW0OJaN-pV8-K_b4RTSFioW6U=/fit-in/246x300/filters:strip_icc()/pic2286966.jpg',
    image: '',
  };

  return (
    <Flex justify="center" align="center" mb={3}>
      <Skeleton isLoaded={!isLoading}>
        <Image
          boxSize="4rem"
          borderRadius="md"
          objectFit="cover"
          src={boardGame.thumbnail}
          alt={`${boardGame.name} thumbnail`}
        />
      </Skeleton>
      <Box ml={3} flex={1}>
        <Skeleton isLoaded={!isLoading}>
          <Text as="b" fontSize="sm" noOfLines={1}>
            {boardGame.koreanName || boardGame.name}
          </Text>
        </Skeleton>
        <Box>
          <SkeletonText isLoaded={!isLoading} noOfLines={1}>
            <Text fontSize="xs">
              {boardGame.minPlayerNum}-{boardGame.maxPlayerNum} Players
            </Text>
          </SkeletonText>
          <ButtonGroup spacing={2}>
            {isLogin ? (
              <>
                <Button size="xs" colorScheme="blue">
                  대여 하기
                </Button>
                <Button size="xs" colorScheme="red">
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
                대여{' '}
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
