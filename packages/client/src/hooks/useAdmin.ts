import { Firestore, collection, getDocs } from 'firebase/firestore';
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

  return {
    adminCSSProperties,
    checkPageAuthority,
    collectionNames,
    getList,
  };
};
