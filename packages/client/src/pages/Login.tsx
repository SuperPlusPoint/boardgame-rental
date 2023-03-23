import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Grid,
  theme,
  IconButton,
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
        </Grid>
      </Box>
    </ChakraProvider>
  );
};

export default Login;
