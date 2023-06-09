import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  updateDoc,
  writeBatch,
} from 'firebase/firestore';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { db } from '../firebase';
import { BoardGame, UserBoardGame } from '../models/boardgame';
import { Sort } from '../types/enums';

const defaultUser = {
  uid: 'no-login',
  name: '',
  boardGameList: [],
};

export const useUserBoardGame = (userId: string) => {
  const userRef = useMemo(() => doc(db, 'users', userId), [userId]);
  const userBoardGameCollection = useMemo(
    () => collection(userRef, 'boardgames'),
    [userRef]
  );

  const { data: user = defaultUser, refetch: userRefetch } = useQuery(
    `user/${userId}`,
    async () => {
      const userData = await getDoc(userRef);
      if (userData.exists()) {
        return userData.data();
      }
      return defaultUser;
    },
    {
      enabled: !!userId,
    }
  );

  const updateUserName = useCallback(
    async (name: string) => {
      await updateDoc(userRef, {
        name,
      });
      userRefetch();
    },
    [userRef, userRefetch]
  );

  const { data = [], refetch } = useQuery(
    `${userId}/boardgames`,
    async () => {
      const snapshot = await getDocs(userBoardGameCollection);
      const result: UserBoardGame[] = [];
      snapshot.forEach((d) => {
        if (d.exists()) {
          result.push(d.data() as UserBoardGame);
        }
      });
      return result;
    },
    {
      enabled: !!userId,
    }
  );
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState<string>('');
  const [sort, setSort] = useState<Sort>(Sort.Created);
  const [playerNum, setPlayerNum] = useState(0);
  const [startPlayingTime, setStartPlayingTime] = useState<number>(0);
  const [endPlayingTime, setEndPlayingTime] = useState<number>(0);

  const boardGames = useMemo(() => {
    let filteredData = [...data];
    filteredData.sort((a, b) => {
      if (sort === Sort.Created) {
        return b.created.toMillis() - a.created.toMillis();
      }
      return b.name > a.name ? -1 : 1;
    });

    if (filter) {
      filteredData = filteredData.filter(({ name }) => name.includes(filter));
    }

    const boardGameMap = filteredData.reduce((map, { id }) => {
      const boardGame = queryClient.getQueryData<BoardGame>(`/boardgame/${id}`);
      if (boardGame) {
        map.set(id, boardGame);
      }
      return map;
    }, new Map<string, BoardGame>());

    if (playerNum) {
      filteredData = filteredData.filter(({ id }) => {
        const boardGame = boardGameMap.get(id);
        if (!boardGame) {
          return false;
        }
        return (
          boardGame.minPlayerNum <= playerNum &&
          playerNum <= boardGame.maxPlayerNum
        );
      });
    }

    if (startPlayingTime) {
      filteredData = filteredData.filter(({ id }) => {
        const boardGame = boardGameMap.get(id);
        if (!boardGame) {
          return false;
        }
        return startPlayingTime <= boardGame.minPlayTime;
      });
    }

    if (endPlayingTime) {
      filteredData = filteredData.filter(({ id }) => {
        const boardGame = boardGameMap.get(id);
        if (!boardGame) {
          return false;
        }
        return endPlayingTime >= boardGame.maxPlayTime;
      });
    }

    return filteredData;
  }, [
    data,
    filter,
    sort,
    playerNum,
    startPlayingTime,
    endPlayingTime,
    queryClient,
  ]);

  const addBoardGames = useCallback(
    async (list: UserBoardGame[]) => {
      const batch = writeBatch(db);
      list.forEach((boardGame) => {
        if (boardGame.total > 0) {
          batch.set(doc(userBoardGameCollection, boardGame.id), {
            ...boardGame,
            created: serverTimestamp(),
          });
        }
      });
      await batch.commit();
      refetch();
    },
    [userBoardGameCollection, refetch]
  );

  const [allSettingBoardGames, setSettingBoardGames] = useState<
    UserBoardGame[]
  >([]);

  useEffect(() => {
    setSettingBoardGames(data);
  }, [data]);

  const settingBoardGames = useMemo(() => {
    return allSettingBoardGames.filter(({ id }) =>
      boardGames.find((b) => b.id === id)
    );
  }, [boardGames, allSettingBoardGames]);

  const updateBoardGame = useCallback(
    (boardGameId: string, rental: number, total: number) => {
      setSettingBoardGames((prev) => {
        const index = prev.findIndex(({ id }) => id === boardGameId);
        if (index === -1) {
          return [...prev];
        }
        return [
          ...prev.slice(0, index),
          {
            ...prev[index],
            rental,
            total,
          },
          ...prev.slice(index + 1),
        ];
      });
    },
    []
  );

  const saveBoardGames = useCallback(async () => {
    const batch = writeBatch(db);
    settingBoardGames.forEach((boardGame) => {
      if (boardGame.total > 0) {
        batch.update(doc(userBoardGameCollection, boardGame.id), {
          rental: boardGame.rental,
          total: boardGame.total,
        });
      } else {
        batch.delete(doc(userBoardGameCollection, boardGame.id));
      }
    });
    await batch.commit();
    refetch();
  }, [userBoardGameCollection, refetch, settingBoardGames]);

  const deleteBoardGame = useCallback(
    (boardGameId: string) => {
      deleteDoc(doc(userBoardGameCollection, boardGameId));
      refetch();
    },
    [userBoardGameCollection, refetch]
  );

  const getBoardGame = useCallback(async (bid: string) => {
    const boardGamesRef = doc(db, 'boardgames', bid);
    const boardGameData = await getDoc(boardGamesRef);
    if (boardGameData.exists()) {
      return boardGameData.data() as BoardGame;
    }
    return {} as BoardGame;
  }, []);

  const rentBoardGame = useCallback(
    async (boardGame: UserBoardGame) => {
      await updateDoc(doc(userBoardGameCollection, boardGame.id), {
        rental: Math.min(boardGame.total, boardGame.rental + 1),
      });
      refetch();
    },
    [userBoardGameCollection, refetch]
  );

  const returnBoardGame = useCallback(
    async (boardGame: UserBoardGame) => {
      await updateDoc(doc(userBoardGameCollection, boardGame.id), {
        rental: Math.max(0, boardGame.rental - 1),
      });
      refetch();
    },
    [userBoardGameCollection, refetch]
  );

  return {
    user,
    boardGames,
    settingBoardGames,
    filter,
    setFilter,
    sort,
    setSort,
    playerNum,
    setPlayerNum,
    startPlayingTime,
    setStartPlayingTime,
    endPlayingTime,
    setEndPlayingTime,
    updateUserName,
    getBoardGame,
    addBoardGames,
    updateBoardGame,
    saveBoardGames,
    deleteBoardGame,
    rentBoardGame,
    returnBoardGame,
  };
};
