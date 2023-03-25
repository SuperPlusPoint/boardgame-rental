/* eslint-disable @typescript-eslint/no-unused-vars */
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
  const { login } = useAuthContext();

  useEffect(() => {
    if (!code) {
      navigate('/login');
    }
    login(code as string).then(({ uid }) => {
      navigate(`/list/${uid}`);
    });
  }, [code, login, navigate]);

  return <Spinner />;
};

export default KakaoLogin;
