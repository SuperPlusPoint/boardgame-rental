import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  increment,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { useCallback, useMemo } from 'react';
import { useQuery } from 'react-query';
import { db } from '../firebase';
import { UserBoardGame } from '../models/boardgame';

export const useUserBoardGame = (userId: string) => {
  const userRef = useMemo(() => doc(db, 'users', userId), [userId]);
  const userBoardGameCollection = useMemo(
    () => collection(userRef, 'boardgames'),
    [userRef]
  );

  const { data: boardGames } = useQuery(
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

  const addBoardGame = useCallback(
    (boardGameId: string, total: number) => {
      setDoc(doc(userBoardGameCollection, boardGameId), {
        id: boardGameId,
        rental: 0,
        total,
      });
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
    boardGames,
    addBoardGame,
    updateBoardGame,
    deleteBoardGame,
    rentBoardGame,
    returnBoardGame,
  };
};
