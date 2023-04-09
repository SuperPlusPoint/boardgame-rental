import { Link } from 'react-router-dom';
import { Flex, Tabs, TabList, Tab, Text } from '@chakra-ui/react';

const Header = () => {
  return (
    <Flex p={2}>
      <Link to="/">
        <Text fontSize="3xl" paddingRight="1rem">
          🎲
        </Text>
      </Link>
      <Tabs>
        <TabList>
          <Link to="/list">
            <Tab>목록</Tab>
          </Link>
          <Link to="/list/add">
            <Tab>추가</Tab>
          </Link>
          <Link to="/setting">
            <Tab>관리</Tab>
          </Link>
          <Link to="/setting">
            <Tab>마이</Tab>
          </Link>
        </TabList>
      </Tabs>
    </Flex>
  );
};

export default Header;
