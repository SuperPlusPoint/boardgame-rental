import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  increment,
  updateDoc,
  writeBatch,
} from 'firebase/firestore';
import { useCallback, useMemo, useState } from 'react';
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

  const { data = [] } = useQuery(
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
    (list: UserBoardGame[]) => {
      const batch = writeBatch(db);
      list.forEach((boardGame) => {
        if (boardGame.total > 0) {
          batch.set(doc(userBoardGameCollection, boardGame.id), boardGame);
        }
      });
      return batch.commit();
    },
    [userBoardGameCollection]
  );

  const updateBoardGame = useCallback(
    (boardGameId: string, rental: number, total: number) => {
      updateDoc(doc(userBoardGameCollection, boardGameId), {
        rental,
        total,
      });
    },
    [userBoardGameCollection]
  );

  const deleteBoardGame = useCallback(
    (boardGameId: string) => {
      deleteDoc(doc(userBoardGameCollection, boardGameId));
    },
    [userBoardGameCollection]
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
    (boardGameId: string) => {
      updateDoc(doc(userBoardGameCollection, boardGameId), {
        rental: increment(1),
      });
    },
    [userBoardGameCollection]
  );

  const returnBoardGame = useCallback(
    (boardGameId: string) => {
      updateDoc(doc(userBoardGameCollection, boardGameId), {
        rental: increment(-1),
      });
    },
    [userBoardGameCollection]
  );

  return {
    user,
    boardGames,
    setFilter,
    getBoardGame,
    addBoardGames,
    updateBoardGame,
    deleteBoardGame,
    rentBoardGame,
    returnBoardGame,
  };
};
