import React, { useCallback, useState } from 'react';
import {
  Flex,
  Button,
  useToast,
  Input,
  FormControl,
  FormHelperText,
  FormErrorMessage,
  Heading,
} from '@chakra-ui/react';
import { useAuthContext } from '../AuthProvider';
import { useUserBoardGame } from '../hooks/useUserBoardGame';
import Header from '../layout/Header';

const MyPage = () => {
  const { user, logout } = useAuthContext();
  const [name, setName] = useState(user?.name || '');
  const [isError, setIsError] = useState(false);
  const { updateUserName } = useUserBoardGame(user?.uid || 'no-login');
  const toast = useToast();

  const handleInput = useCallback(
    (e: React.ChangeEvent) => {
      const { value } = e.target as HTMLInputElement;
      if (value.length > 6) {
        setIsError(true);
      } else {
        setIsError(false);
      }
      setName(value);
    },
    [setName, setIsError]
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      updateUserName(name);
      toast({
        title: '저장 성공',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    },
    [name, updateUserName, toast]
  );

  return (
    <form style={{ height: '100%' }} onSubmit={handleSubmit}>
      <Flex
        pos="relative"
        flexDirection="column"
        justify="center"
        align="center"
        px="16px"
        pb="15px"
        h="100%"
      >
        <Header title="마이페이지" />
        <Flex flex="1" flexDirection="column" justify="center" align="center">
          <Heading
            as="h3"
            size="lg"
            fontFamily="WendyOne"
            fontWeight="normal"
            fontSize="33px"
          >
            My Nickname is
          </Heading>
          <FormControl isInvalid={isError} textAlign="center" width="175px">
            <Input
              placeholder="이름"
              width="175px"
              height="32px"
              paddingLeft="10px"
              backgroundColor="white"
              border="1px solid black"
              fontFamily="Recipekorea"
              variant="outline"
              borderRadius=""
              maxLength={6}
              type="text"
              value={name}
              onChange={handleInput}
            />
            {!isError ? (
              <FormHelperText
                textAlign="left"
                fontSize="8px"
                style={{ zoom: 0.8 }}
              >
                닉네임을 변경할 수 있습니다. (최대 6글자)
              </FormHelperText>
            ) : (
              <FormErrorMessage>
                이름은 최대 6글자까지 설정할 수 있습니다.
              </FormErrorMessage>
            )}
          </FormControl>
        </Flex>
        <Button
          alignSelf="stretch"
          backgroundColor="#D5F479"
          isDisabled={isError}
          fontSize="20px"
          borderRadius="12"
          border="1px solid black"
          py="18px"
          mt="10px"
          height=""
          type="submit"
        >
          저장하기
        </Button>
        <Button
          alignSelf="stretch"
          backgroundColor="#D5F479"
          fontSize="20px"
          borderRadius="12"
          border="1px solid black"
          py="18px"
          mt="10px"
          height=""
          onClick={logout}
        >
          로그아웃
        </Button>
      </Flex>
    </form>
  );
};

export default MyPage;
