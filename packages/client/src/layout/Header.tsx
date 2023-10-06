import * as React from 'react';
import { Flex, Heading } from '@chakra-ui/react';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <Flex justify="between" align="center" pt={67} pb={22}>
      <Heading as="h2" size="lg" lineHeight="tall" textAlign="center">
        {title}
      </Heading>
    </Flex>
  );
};

export default Header;
