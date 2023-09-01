import React from 'react';
import { Flex, Grid, Text } from '@chakra-ui/react';
import ListItem from './ListItem';
import { BoardGame, UserBoardGame } from '../models/boardgame';
import GridItem from './GridItem';
import { View } from '../types/enums';

interface BoardGameListProps {
  boardGameList: UserBoardGame[];
  isLogin: boolean;
  view: View;
  filter: string;
  getBoardGame: (bid: string) => Promise<BoardGame>;
  rentBoardGame: (boardGame: UserBoardGame) => Promise<void>;
  returnBoardGame: (boardGame: UserBoardGame) => Promise<void>;
}

interface ContainerProps {
  children: React.ReactNode;
  view: View;
}
const Container: React.FC<ContainerProps> = ({ view, children }) => {
  if (view === View.List) {
    return (
      <Flex my={2} flex={1} alignSelf="stretch" direction="column">
        {children}
      </Flex>
    );
  }
  return (
    <Grid templateColumns="repeat(4, 1fr)" gap={2}>
      {children}
    </Grid>
  );
};

const BoardGameList: React.FC<BoardGameListProps> = ({
  boardGameList,
  view,
  isLogin,
  filter,
  getBoardGame,
  rentBoardGame,
  returnBoardGame,
}) => {
  return (
    <Container view={view}>
      {boardGameList.length === 0 ? (
        <Text mt={5} textAlign="center">
          {!filter ? '보드게임을 추가해주세요.' : '검색 결과가 없습니다.'}
        </Text>
      ) : (
        boardGameList.map((boardGame) =>
          view === View.List ? (
            <ListItem
              key={boardGame.id}
              userBoardGame={boardGame}
              isLogin={isLogin}
              getBoardGame={getBoardGame}
              rentBoardGame={rentBoardGame}
              returnBoardGame={returnBoardGame}
            />
          ) : (
            <GridItem
              key={boardGame.id}
              userBoardGame={boardGame}
              isLogin={isLogin}
              getBoardGame={getBoardGame}
              rentBoardGame={rentBoardGame}
              returnBoardGame={returnBoardGame}
            />
          )
        )
      )}
    </Container>
  );
};

export default BoardGameList;
