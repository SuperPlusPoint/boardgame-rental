import React from 'react';
import { Flex, Heading, IconButton } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <Flex flexDirection="column" mt="3.5rem" textAlign="center">
      <Heading as="h2" size="xl" my="9rem">
        로그인
      </Heading>
      <Link
        to={`https://kauth.kakao.com/oauth/authorize?client_id=${
          process.env.REACT_APP_KAKAO_CLIENT_ID
        }&redirect_uri=${encodeURIComponent(
          process.env.REACT_APP_REDIRECT_URI || ''
        )}&response_type=code`}
      >
        <IconButton
          w="70%"
          aria-label="kakaologin"
          icon={
            <img
              src="/imges/kakao_login_large_wide.png"
              alt="/imges/kakao_login_large_wide.png"
            />
          }
        />
      </Link>
    </Flex>
  );
};

export default Login;
