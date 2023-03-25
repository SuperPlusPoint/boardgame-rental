import axios from 'axios';
import { doc, getDoc } from 'firebase/firestore';
import { useCallback, useEffect, useState } from 'react';
import { db } from '../firebase';
import { User } from '../models/user';

const refreshAccessToken = async (refreshToken: string) => {
  const { data } = await axios.post(
    `https://kauth.kakao.com/oauth/token`,
    {
      grant_type: 'refresh_token',
      client_id: process.env.REACT_APP_KAKAO_CLIENT_ID,
      refresh_token: refreshToken,
    },
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    }
  );
  return data.access_token;
};

const getUserId = async (accessToken: string): Promise<number> => {
  const { data } = await axios.get(
    `https://kapi.kakao.com/v1/user/access_token_info`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return data.id;
};

const loginCheck = async (
  accessToken: string | null,
  refreshToken: string | null
): Promise<number | null> => {
  // accessToken이 없으면 로그인 x
  if (!accessToken || !refreshToken) {
    return null;
  }

  try {
    // accessToken 검증
    const id = await getUserId(accessToken);
    return id;
  } catch (e) {
    // 신규 accessToken 발급
    const newAccessToken = await refreshAccessToken(refreshToken);
    localStorage.setItem('access_token', newAccessToken);
    // 신규 accessToken 검증
    const id = await getUserId(newAccessToken);
    return id;
  }
};

const getUser = async (userId: string): Promise<User | null> => {
  const userRef = doc(db, 'users', userId);
  const userDoc = await getDoc(userRef);
  if (!userDoc.exists()) {
    return null;
  }
  return userDoc.data() as User;
};

export const useAuth = () => {
  const [userId, setUserId] = useState<number | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setIsLoading(true);
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');

    loginCheck(accessToken, refreshToken).then((id) => {
      if (!id) {
        setIsLoading(false);
      }
      setUserId(id);
    });
  }, []);

  useEffect(() => {
    if (!userId) {
      return;
    }
    getUser(`${userId}`)
      .then((u) => setUser(u))
      .then(() => setIsLoading(false));
  }, [userId]);

  const login = useCallback(async (code: string) => {
    setIsLoading(true);
    const {
      data: { access_token: accessToken, refresh_token: refreshToken },
    } = await axios.post(
      'https://kauth.kakao.com/oauth/token',
      {
        grant_type: 'authorization_code',
        client_id: process.env.REACT_APP_KAKAO_CLIENT_ID,
        redirect_uri: process.env.REACT_APP_REDIRECT_URI || '',
        code,
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      }
    );
    const { data } = await axios.post(
      `${process.env.REACT_APP_FUNCTIONS_BASE_URL || ''}/auth/kakao`,
      { accessToken },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
    setUser(data as User);
    setIsLoading(false);
    return data;
  }, []);

  const logout = useCallback(async () => {
    const accessToken = localStorage.getItem('access_token');
    await axios.get(`https://kapi.kakao.com/v1/user/logout`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setUser(null);
  }, []);

  return {
    user,
    isLoading,
    login,
    logout,
  };
};
