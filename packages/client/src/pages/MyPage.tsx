import React, { useCallback, useState } from 'react';
import {
  Flex,
  Button,
  useToast,
  Input,
  FormControl,
  FormHelperText,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useAuthContext } from '../AuthProvider';
import { useUserBoardGame } from '../hooks/useUserBoardGame';

const MyPage = () => {
  const { user, logout } = useAuthContext();
  const [name, setName] = useState(user?.name || '');
  const [isError, setIsError] = useState(false);
  const { updateUserName } = useUserBoardGame(user?.uid || 'no-login');
  const toast = useToast();

  const handleInput = useCallback(
    (e: React.ChangeEvent) => {
      const { value } = e.target as HTMLInputElement;
      if (value.length > 12) {
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
        h="100%"
        boxSizing="border-box"
        flexDirection="column"
        px={8}
        py={4}
      >
        <FormControl flex={1} isInvalid={isError}>
          <Input
            placeholder="이름"
            size="sm"
            borderRadius="md"
            variant="outline"
            type="text"
            value={name}
            onChange={handleInput}
          />
          {!isError ? (
            <FormHelperText>이름을 변경할 수 있습니다.</FormHelperText>
          ) : (
            <FormErrorMessage>
              이름은 최대 12자까지 설정할 수 있습니다.
            </FormErrorMessage>
          )}
        </FormControl>
        <Button
          isDisabled={isError}
          size="md"
          colorScheme="blue"
          my={2}
          type="submit"
        >
          저장하기
        </Button>
        <Button size="md" colorScheme="gray" my={2} onClick={logout}>
          로그아웃
        </Button>
      </Flex>
    </form>
  );
};

export default MyPage;
