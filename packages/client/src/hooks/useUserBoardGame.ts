import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  writeBatch,
} from 'firebase/firestore';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { db } from '../firebase';
import { BoardGame, UserBoardGame } from '../models/boardgame';

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

  const { data: user = defaultUser } = useQuery(
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

  const [filter, setFilter] = useState<string>('');
  const boardGames = useMemo(() => {
    if (!filter) {
      return data;
    }
    return data.filter(({ name }) => name.includes(filter));
  }, [data, filter]);

  const addBoardGames = useCallback(
    async (list: UserBoardGame[]) => {
      const batch = writeBatch(db);
      list.forEach((boardGame) => {
        if (boardGame.total > 0) {
          batch.set(doc(userBoardGameCollection, boardGame.id), boardGame);
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
    getBoardGame,
    addBoardGames,
    updateBoardGame,
    saveBoardGames,
    deleteBoardGame,
    rentBoardGame,
    returnBoardGame,
  };
};
