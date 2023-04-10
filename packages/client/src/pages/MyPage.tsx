import React, { useCallback, useState } from 'react';
import {
  Flex,
  Button,
  useToast,
  Input,
  FormControl,
  FormHelperText,
} from '@chakra-ui/react';
import { useAuthContext } from '../AuthProvider';
import { useUserBoardGame } from '../hooks/useUserBoardGame';

const MyPage = () => {
  const { user, logout } = useAuthContext();
  const [name, setName] = useState(user?.name || '');
  const { updateUserName } = useUserBoardGame(user?.uid || 'no-login');
  const toast = useToast();
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      updateUserName(name);
      toast({
        title: '저장되었습니다.',
        status: 'success',
        duration: 9000,
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
        px={10}
        py={4}
      >
        <FormControl flex={1}>
          <Input
            placeholder="이름"
            size="sm"
            borderRadius="md"
            variant="outline"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <FormHelperText>이름을 변경할 수 있습니다.</FormHelperText>
        </FormControl>
        <Button size="md" colorScheme="blue" my={2} type="submit">
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
