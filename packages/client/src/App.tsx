import * as React from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import Router from './Router';
import './App.css';

const theme = extendTheme({
  fonts: {
    heading: 'Pretendard',
    body: 'Pretendard',
  },
  components: {
    Popover: {
      variants: {
        responsive: {
          popper: {
            maxWidth: 'unset',
            width: 'unset',
          },
        },
      },
    },
  },
});

export const App = () => (
  <ChakraProvider theme={theme}>
    <Router />
  </ChakraProvider>
);
