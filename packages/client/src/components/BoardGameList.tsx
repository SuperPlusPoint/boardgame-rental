import React, { useState } from 'react';
import {
  Flex,
  Grid,
  Text,
  ButtonGroup,
  IconButton,
  Icon,
} from '@chakra-ui/react';
import { MdFormatListBulleted, MdGridView } from 'react-icons/md';
import ListItem from './ListItem';
import { BoardGame, UserBoardGame } from '../models/boardgame';
import GridItem from './GridItem';

interface BoardGameListProps {
  boardGameList: UserBoardGame[];
  isLogin: boolean;
  filter: string;
  getBoardGame: (bid: string) => Promise<BoardGame>;
  rentBoardGame: (boardGame: UserBoardGame) => Promise<void>;
  returnBoardGame: (boardGame: UserBoardGame) => Promise<void>;
}

enum View {
  List = 'list',
  'Grid' = 'grid',
}

interface ContainerProps {
  children: React.ReactNode;
  view: View;
}
const Container: React.FC<ContainerProps> = ({ view, children }) => {
  if (view === View.List) {
    return (
      <Flex
        overflow="scroll"
        my={2}
        flex={1}
        alignSelf="stretch"
        direction="column"
      >
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
  isLogin,
  filter,
  getBoardGame,
  rentBoardGame,
  returnBoardGame,
}) => {
  const [view, setView] = useState<View>(View.List);
  return (
    <>
      <ButtonGroup spacing={2} alignSelf="end" mb={1}>
        <IconButton
          size="sm"
          variant="outline"
          isActive={view === View.List}
          onClick={() => setView(View.List)}
          icon={<Icon as={MdFormatListBulleted} />}
          aria-label="list view"
        />
        <IconButton
          size="sm"
          variant="outline"
          isActive={view === View.Grid}
          onClick={() => setView(View.Grid)}
          icon={<Icon as={MdGridView} />}
          aria-label="grid view"
        />
      </ButtonGroup>
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
    </>
  );
};

export default BoardGameList;
