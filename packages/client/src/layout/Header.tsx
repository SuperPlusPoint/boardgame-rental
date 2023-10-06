import * as React from 'react';
import { Flex, Heading } from '@chakra-ui/react';

interface HeaderProps {
  title: string;
  mt?: string;
  mb?: string;
}

const Header: React.FC<HeaderProps> = ({ title, mt = 67, mb = 27 }) => {
  return (
    <Flex justify="between" align="center" mt={mt} mb={mb}>
      <Heading as="h2" size="lg" lineHeight="tall" textAlign="center">
        {title}
      </Heading>
    </Flex>
  );
};

export default Header;
