import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Grid,
  theme,
  Button,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { ColorModeSwitcher } from '../ColorModeSwitcher';

const Login = () => {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <Text>Login</Text>
          <Link
            to={`https://kauth.kakao.com/oauth/authorize?client_id=${
              process.env.REACT_APP_KAKAO_CLIENT_ID
            }&redirect_uri=${encodeURIComponent(
              'http://localhost:3000/login/kakao'
            )}&response_type=code`}
          >
            <Button>카카오 로그인</Button>
          </Link>
        </Grid>
      </Box>
    </ChakraProvider>
  );
};

export default Login;
