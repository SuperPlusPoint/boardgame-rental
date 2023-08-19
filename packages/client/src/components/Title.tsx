import React from 'react';
import { Heading, Box } from '@chakra-ui/react';
import SVGComponent, { Icon } from './common/SVGComponent';

interface TitleProps {
  name: string;
}

const Title = ({ name }: TitleProps) => {
  return (
    <Box zIndex={8} alignSelf="stretch">
      <Heading
        as="h2"
        size="lg"
        lineHeight="tall"
        textAlign="center"
        position="relative"
      >
        <SVGComponent
          icon={Icon.Menu}
          width={30}
          height={30}
          color="#1B1B1D"
          style={{ position: 'absolute', top: 23, left: -10 }}
        />
        <SVGComponent
          icon={Icon.Title}
          width={277}
          height={96}
          style={{ margin: 'auto' }}
        />
        <Box
          position="absolute"
          top="28px"
          left="50%"
          transform="translateX(-50%)"
        >
          {name}'s Store
        </Box>
      </Heading>
    </Box>
  );
};

export default Title;
