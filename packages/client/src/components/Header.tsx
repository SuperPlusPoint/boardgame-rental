import { useLocation, Link } from 'react-router-dom';
import { Box, IconButton, Button } from '@chakra-ui/react';
import { InfoIcon, SettingsIcon } from '@chakra-ui/icons';

type HeaderProps = {
  isLogin: boolean;
};

const Header = ({ isLogin }: HeaderProps) => {
  const location = useLocation();

  return (
    <Box>
      {isLogin ? (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          w="100%"
          p={2}
          bg="#3182CE"
        >
          <Link to="/">
            <IconButton
              color="white"
              colorScheme="none"
              aria-label="Information"
              icon={<InfoIcon />}
            />
          </Link>
          {location.pathname === '/setting' ? (
            <Link to="/login">
              <Button colorScheme="#3182CE">로그아웃</Button>
            </Link>
          ) : (
            <Link to="/setting">
              <IconButton
                color="white"
                colorScheme="none"
                aria-label="Setting"
                icon={<SettingsIcon />}
              />
            </Link>
          )}
        </Box>
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          w="100%"
          p={2}
          bg="#3182CE"
          color="white"
        >
          <Link to="/">
            <IconButton
              color="white"
              colorScheme="none"
              aria-label="Information"
              icon={<InfoIcon />}
            />
          </Link>
          <Link to="/login">
            <Button colorScheme="#3182CE">로그인</Button>
          </Link>
        </Box>
      )}
    </Box>
  );
};

export default Header;
