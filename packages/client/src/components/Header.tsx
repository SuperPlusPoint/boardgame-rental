import { Link, useLocation } from 'react-router-dom';
import { Flex, Tabs, TabList, Tab, Text, TabIndicator } from '@chakra-ui/react';
import { useMemo } from 'react';

const TABS = ['/list', '/add', '/setting', '/my'];

const Header = () => {
  const { pathname } = useLocation();
  const index = useMemo(
    () => TABS.findIndex((p) => pathname.startsWith(p)),
    [pathname]
  );
  return (
    <Flex p={2}>
      <Link to="/">
        <Text fontSize="3xl" paddingRight="1rem">
          🎲
        </Text>
      </Link>
      <Tabs variant="unstyled" index={index}>
        <TabList>
          <Link to="/list">
            <Tab>목록</Tab>
          </Link>
          <Link to="/add">
            <Tab>추가</Tab>
          </Link>
          <Link to="/setting">
            <Tab>관리</Tab>
          </Link>
          <Link to="/my">
            <Tab>마이</Tab>
          </Link>
        </TabList>
        <TabIndicator
          mt="-1.5px"
          height="2px"
          bg="blue.500"
          borderRadius="1px"
        />
      </Tabs>
    </Flex>
  );
};

export default Header;
