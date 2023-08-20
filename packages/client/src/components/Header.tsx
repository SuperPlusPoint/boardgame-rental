import { Link, useLocation } from 'react-router-dom';
import { Flex, Tabs, TabList, Tab, TabIndicator } from '@chakra-ui/react';
import { useMemo } from 'react';
import SVGComponent, { Icon } from './common/SVGComponent';

const TABS = ['/list', '/add', '/my', '/setting'];

const Header = () => {
  const { pathname } = useLocation();
  const index = useMemo(
    () => TABS.findIndex((p) => pathname.startsWith(p)),
    [pathname]
  );
  return (
    <Flex p={4} backgroundColor="black" position="relative" overflow="hidden">
      <Tabs variant="unstyled" index={index} width="100%">
        <TabList justifyContent="space-between" paddingX={11}>
          <Link to="/list">
            <Tab>
              <SVGComponent icon={Icon.Category} />
            </Tab>
          </Link>
          <Link to="/add">
            <Tab>
              <SVGComponent icon={Icon.Add} />
            </Tab>
          </Link>
          <Link to="/my">
            <Tab>
              <SVGComponent icon={Icon.Profile} />
            </Tab>
          </Link>
          <Link to="/setting">
            <Tab>
              <SVGComponent icon={Icon.Setting} />
            </Tab>
          </Link>
        </TabList>
        <TabIndicator
          top="-10px"
          marginLeft="22.5px"
          maxWidth="17px"
          width="17px"
          height="20px"
          bg="#FFD951"
          borderRadius="0 0 50% 50%"
        />
      </Tabs>
    </Flex>
  );
};

export default Header;
