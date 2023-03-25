import * as React from 'react';
import { Flex, Heading, Text, Button } from '@chakra-ui/react';
import Header from '../components/Header';

const About = () => {
  return (
    <>
      <Header />
      <Flex flexDirection="column" align="center" mt="3.5rem">
        <Heading as="h2" size="xl" mt={9}>
          서비스 소개
        </Heading>
        <Text fontSize="lg" mt={9} mx={9}>
          밝은 있는 내는 싹이 얼음에 동력은 꾸며 튼튼하며, 착목한는 봄바람이다.
          우리 이상의 목숨을 위하여서. 영원히 같은 이상을 그리하였는가? 동력은
          않는 간에 주는 청춘이 하는 뿐이다. 우리는 용기가 이는 청춘의 품었기
          가진 봄바람을 같이 때문이다. 그들을 이것을 스며들어 그리하였는가? 끝에
          있음으로써 끓는 천자만홍이 남는 피에 봄날의 때문이다. 가치를 이상은
          온갖 그들의 끓는다. 어디 꽃이 시들어 석가는 듣기만 것이다. 눈에
          노래하며 날카로우나 무엇을 이상은 칼이다.
        </Text>
        <Button size="md" width="200px" colorScheme="blue" mt={9}>
          시작하기
        </Button>
      </Flex>
    </>
  );
};

export default About;
