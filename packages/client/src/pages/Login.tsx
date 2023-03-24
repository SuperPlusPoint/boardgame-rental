import React from 'react';
import { Flex, Heading, IconButton } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

const Login = () => {
  return (
    <>
      <Header isLogin={false} />
      <Flex flexDirection="column" align="center" mt="3.5rem">
        <Heading as="h2" size="xl" my="9rem">
          로그인
        </Heading>
        <Link
          to={`https://kauth.kakao.com/oauth/authorize?client_id=${
            process.env.REACT_APP_KAKAO_CLIENT_ID
          }&redirect_uri=${encodeURIComponent(
            'http://localhost:3000/login/kakao'
          )}&response_type=code`}
        >
          <IconButton
            aria-label="kakaologin"
            icon={
              <img
                src="/imges/kakao_login_medium_wide.png"
                alt="/imges/kakao_login_medium_wide.png"
              />
            }
          />
        </Link>
      </Flex>
    </>
  );
};

export default Login;
