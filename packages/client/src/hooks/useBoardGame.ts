import axios from 'axios';
import { useCallback, useState } from 'react';
import { useQuery } from 'react-query';
import { BoardGame, UserBoardGame } from '../models/boardgame';

const toUserBoardGame = (boardGame: BoardGame): UserBoardGame => ({
  id: boardGame.id,
  name: boardGame.koreanName || boardGame.name,
  thumbnail: boardGame.thumbnail,
  total: 1,
  rental: 0,
});

export const useBoardGame = () => {
  const [keyword, setKeyword] = useState<string>('');
  const [selectedBoardGameList, setSelectedBoardGameList] = useState<
    UserBoardGame[]
  >([]);

  const { data: searchedBoardGameList = [] } = useQuery(
    `/search/${keyword}`,
    async () => {
      const { data } = await axios.get(
        `${
          process.env.REACT_APP_FUNCTIONS_BASE_URL || ''
        }/search?keyword=${keyword}`
      );
      return data;
    },
    {
      enabled: !!keyword,
    }
  );

  const searchBoardGame = useCallback((k: string) => {
    setKeyword(k);
  }, []);

  const selectBoardGame = useCallback((boardGame: BoardGame) => {
    setSelectedBoardGameList((prevBoardGameList) => {
      const index = prevBoardGameList.findIndex(
        ({ id }) => id === boardGame.id
      );
      if (index === -1) {
        return [...prevBoardGameList, toUserBoardGame(boardGame)];
      }
      return [
        ...prevBoardGameList.slice(0, index),
        {
          ...prevBoardGameList[index],
          total: prevBoardGameList[index].total + 1,
        },
        ...prevBoardGameList.slice(index + 1),
      ];
    });
  }, []);

  const changeTotal = useCallback((boardGame: UserBoardGame, total: number) => {
    setSelectedBoardGameList((prevBoardGameList) => {
      const index = prevBoardGameList.findIndex(
        ({ id }) => id === boardGame.id
      );
      if (index === -1) {
        return [...prevBoardGameList];
      }
      return [
        ...prevBoardGameList.slice(0, index),
        {
          ...prevBoardGameList[index],
          total: Math.max(0, total),
        },
        ...prevBoardGameList.slice(index + 1),
      ];
    });
  }, []);

  return {
    searchedBoardGameList,
    selectedBoardGameList,
    searchBoardGame,
    selectBoardGame,
    changeTotal,
  };
};
