import { Link } from 'react-router-dom';
import {
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  InfoIcon,
  SettingsIcon,
  LockIcon,
  PlusSquareIcon,
  UnlockIcon,
} from '@chakra-ui/icons';
import { useAuthContext } from '../AuthProvider';

const Header = () => {
  const { user, logout } = useAuthContext();
  return (
    <Box pos="fixed" zIndex={10} top="0" w="100%" p={2}>
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<HamburgerIcon />}
          colorScheme="blue"
        />
        <MenuList>
          <Link to="/">
            <MenuItem icon={<InfoIcon />}>About</MenuItem>
          </Link>

          {!user ? (
            <Link to="/login">
              <MenuItem icon={<LockIcon />}>Login</MenuItem>
            </Link>
          ) : (
            <Link to="/">
              <MenuItem icon={<UnlockIcon />} onClick={() => logout()}>
                LogOut
              </MenuItem>
            </Link>
          )}
          <Link to="/list/add">
            <MenuItem icon={<PlusSquareIcon />}>Add List</MenuItem>
          </Link>
          <Link to="/setting">
            <MenuItem icon={<SettingsIcon />}>Setting</MenuItem>
          </Link>
        </MenuList>
      </Menu>
    </Box>
  );
};

export default Header;
