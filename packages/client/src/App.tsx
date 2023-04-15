import * as React from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import Router from './Router';

const theme = extendTheme({
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
