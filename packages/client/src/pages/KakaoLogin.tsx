import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../AuthProvider';
import Loading from '../components/Loading';

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

  return <Loading />;
};

export default KakaoLogin;
