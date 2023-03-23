import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Spinner } from '@chakra-ui/react';
import { useAuthContext } from '../AuthProvider';

const KakaoLogin = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const code = searchParams.get('code');
  const navigate = useNavigate();

  const { data } = useQuery(
    '/auth/kakao/token',
    () =>
      axios
        .post(
          'https://kauth.kakao.com/oauth/token',
          {
            grant_type: 'authorization_code',
            client_id: process.env.REACT_APP_KAKAO_CLIENT_ID,
            redirect_uri: 'http://localhost:3000/login/kakao',
            code,
          },
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
          }
        )
        .then((res) => res.data),
    {
      enabled: !!code,
    }
  );

  useEffect(() => {
    if (data) {
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token);
    }
  }, [data]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: user } = useQuery(
    '/auth/kakao/user',
    () =>
      axios
        .post(
          'http://localhost:5001/boardgame-rental/asia-northeast3/api/auth/kakao',
          {
            accessToken: data.access_token,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        .then((res) => res.data),
    {
      enabled: !!data,
    }
  );

  const { login } = useAuthContext();
  useEffect(() => {
    if (user) {
      login(user);
      navigate(`/list/${user.uid}`);
    }
  }, [user, login, navigate]);

  if (!code) {
    return <Navigate to="/login" />;
  }

  return <Spinner />;
};

export default KakaoLogin;
