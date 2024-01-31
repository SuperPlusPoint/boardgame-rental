import {
  Firestore,
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteField,
} from 'firebase/firestore';
import { User } from '../models/user';

export const useAdmin = () => {
  const adminCSSProperties = {
    styleColumnCollection: {
      width: 200,
    },
    styleColumnList: {
      width: 500,
    },
    styleColumnField: {
      width: 500,
    },
    styleButtonCollection: {
      justifyContent: 'left',
      maxWidth: 200,
    },
    styleButtonList: {
      justifyContent: 'left',
      maxWidth: 500,
    },
  };

  const adminAuthorityList = ['MASTER', 'MANAGER'];
  const checkPageAuthority = (user: User | null): boolean => {
    return (
      user?.authority !== undefined &&
      adminAuthorityList.includes(user?.authority.toUpperCase())
    );
  };
  const collectionNames = {
    boardgamesTableName: 'boardgames',
    groupTableName: 'groups',
    userTableName: 'users',
  };
  async function getList(
    database: Firestore,
    collectionName: string
  ): Promise<{ [key: string]: any }[]> {
    const usersCol = collection(database, collectionName);
    const userSnapshot = await getDocs(usersCol);
    switch (collectionName) {
      case collectionNames.userTableName:
        return userSnapshot?.docs.map(
          (document) => document.data() as { [key: string]: any }
        );
        break;
      default:
        return userSnapshot?.docs.map(
          (document) =>
            Object.assign(document.data(), { id: document.id }) as {
              [key: string]: any;
            }
        );
        break;
    }
  }
  // user 권한 변경 시 관리자권한 체크
  const checkUpdateAuthority = (
    user: User | null,
    data: { [key: string]: any }
  ): boolean => {
    switch (user?.authority.toUpperCase()) {
      case adminAuthorityList[0]:
        return true;
      case adminAuthorityList[1]:
        return !Object.keys(data).includes('authority');
      default:
        return false;
    }
  };
  // 새로운 데이터 추가 시 이미 있는 key 인지 판단
  const checkExistKey = (
    existData: { [key: string]: any },
    newData: { [key: string]: any }
  ): boolean => {
    const existKeys: string[] = Object.keys(existData);
    const newKeys: string[] = Object.keys(newData);
    for (let i = 0; i < newKeys.length; i += 1) {
      if (existKeys.includes(newKeys[i])) {
        return true;
      }
    }
    return false;
  };
  async function updateField(
    user: User | null,
    database: Firestore,
    collectionName: string,
    listName: string,
    newData: { [key: string]: any },
    list: { [key: string]: any }[],
    setList: (list: { [key: string]: any }[]) => void,
    listIndex: number,
    addNew?: boolean
  ) {
    if (checkUpdateAuthority(user, newData)) {
      if (addNew && checkExistKey(list[listIndex], newData)) {
        alert('key가 이미 존재합니다');
        return;
      }
      const currentData = doc(database, collectionName, listName);
      await updateDoc(currentData, newData)
        .then(() => {
          const newList: { [key: string]: any }[] = list.map(
            (listData) => listData
          );
          newList[listIndex] = Object.assign(newList[listIndex], newData);
          setList(newList);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  async function deleteFieldData(
    user: User | null,
    database: Firestore,
    collectionName: string,
    listName: string,
    deleteKey: string,
    list: { [key: string]: any }[],
    setList: (list: { [key: string]: any }[]) => void,
    listIndex: number
  ) {
    if (checkUpdateAuthority(user, { [deleteKey]: null })) {
      const currentData = doc(database, collectionName, listName);
      await updateDoc(currentData, {
        [deleteKey]: deleteField(),
      }).then(() => {
        const newList: { [key: string]: any }[] = list.map(
          (listData) => listData
        );
        delete newList[listIndex][deleteKey];
        setList(newList);
      });
    }
  }

  return {
    adminCSSProperties,
    checkPageAuthority,
    collectionNames,
    getList,
    updateField,
    deleteFieldData,
  };
};
