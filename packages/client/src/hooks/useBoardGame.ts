import axios from 'axios';
import { useState } from 'react';
import { useQuery } from 'react-query';

export const useBoardGame = () => {
  const [keyword, setKeyword] = useState<string>('');
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

  const searchBoardGame = (k: string) => {
    setKeyword(k);
  };

  return {
    searchBoardGame,
    searchedBoardGameList,
  };
};
