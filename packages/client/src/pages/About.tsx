import * as React from 'react';
import { Link } from 'react-router-dom';
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
          갖고 있는 보드게임 목록을 만들고 공유해보세요!
        </Text>
        <Link to="login">
          <Button size="md" width="200px" colorScheme="blue" mt={9}>
            시작하기
          </Button>
        </Link>
      </Flex>
    </>
  );
};

export default About;
