import React, { useEffect } from 'react';
import { ChakraProvider, Box, Text, Grid, theme } from '@chakra-ui/react';
import axios from 'axios';
import { ColorModeSwitcher } from '../ColorModeSwitcher';

const KakaoLogin = () => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const code = window.location.search.split('code=').pop();
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
      .then(({ data }) => console.log(data));
  }, []);
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <Text>Login</Text>
        </Grid>
      </Box>
    </ChakraProvider>
  );
};

export default KakaoLogin;
