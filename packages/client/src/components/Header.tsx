import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, IconButton, Button } from '@chakra-ui/react';
import { InfoIcon, SettingsIcon } from '@chakra-ui/icons';

type HeaderProps = {
  isLogin: boolean;
};

const Header = ({ isLogin }: HeaderProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [path, setPath] = useState('');
  const goToAbout = () => {
    navigate('/');
  };
  const goToLogin = () => {
    navigate('/login');
  };
  const goToSetting = () => {
    navigate('/setting');
  };

  useEffect(() => {
    setPath(location.pathname);
  }, [location]);

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
          <IconButton
            onClick={goToAbout}
            color="white"
            colorScheme="none"
            aria-label="Information"
            icon={<InfoIcon />}
          />
          <IconButton
            onClick={goToSetting}
            color="white"
            colorScheme="none"
            aria-label="Setting"
            icon={<SettingsIcon />}
          />
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
          <IconButton
            onClick={goToAbout}
            color="white"
            colorScheme="none"
            aria-label="Information"
            icon={<InfoIcon />}
          />
          {path === '/setting' ? (
            <Button onClick={goToAbout} colorScheme="#3182CE">
              로그아웃
            </Button>
          ) : (
            <Button onClick={goToLogin} colorScheme="#3182CE">
              로그인
            </Button>
          )}
        </Box>
      )}
    </Box>
  );
};

export default Header;
