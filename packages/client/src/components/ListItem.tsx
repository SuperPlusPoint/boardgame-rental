import React from 'react';
import {
  Flex,
  Image,
  Box,
  Text,
  Button,
  ButtonGroup,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';

type ListItemProps = {
  isLogin: boolean;
};

const ListItem = ({ isLogin }: ListItemProps): React.ReactElement => {
  const location = useLocation();
  let element = null;
  if (location.pathname === '/setting')
    element = (
      <Box>
        <Flex>
          <Text fontSize="sm">대여</Text>
          <NumberInput size="xs" w="4rem" defaultValue={1} min={0} ml={3}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Flex>
        <Flex>
          <Text fontSize="sm">보유</Text>
          <NumberInput size="xs" w="4rem" defaultValue={1} min={0} ml={3}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Flex>
      </Box>
    );
  else if (isLogin) {
    element = (
      <Box>
        <Text fontSize="xs">2-4 Players</Text>
        <ButtonGroup spacing={2}>
          <Button size="xs" colorScheme="blue">
            대여 처리
          </Button>
          <Button size="xs" colorScheme="red">
            반납 처리
          </Button>
        </ButtonGroup>
      </Box>
    );
  } else {
    element = (
      <Box>
        <Text fontSize="xs">2-4 Players</Text>
        <Button size="xs" colorScheme="red">
          대여 불가
        </Button>
        {/* <Button size="xs" colorScheme="blue">
          대여 가능
        </Button> */}
      </Box>
    );
  }

  return (
    <Flex justify="center" align="center" mb={3}>
      <Image
        boxSize="4rem"
        borderRadius="md"
        objectFit="cover"
        src="https://cf.geekdo-images.com/LeaLDlTTmeN639MfuflcMw__itemrep/img/x4GW0OJaN-pV8-K_b4RTSFioW6U=/fit-in/246x300/filters:strip_icc()/pic2286966.jpg"
        alt="Dan Abramov"
      />
      <Box ml={3}>
        <Text as="b" fontSize="sm" w="12rem" noOfLines={1}>
          RummikubRummikubRummikub
        </Text>
        {element}
      </Box>
    </Flex>
  );
};

export default ListItem;
