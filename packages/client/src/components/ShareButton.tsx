import {
  Button,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { LinkIcon } from '@chakra-ui/icons';

const ShareButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const copyClipboard = async (
    text: string,
    successAction?: () => void,
    failAction?: () => void
  ) => {
    try {
      await navigator.clipboard.writeText(text);
      return successAction && successAction();
    } catch (error) {
      return failAction && failAction();
    }
  };

  return (
    <>
      <IconButton
        pos="fixed"
        bottom="2rem"
        right="2rem"
        colorScheme="yellow"
        borderRadius="full"
        zIndex={2}
        aria-label="Share"
        icon={<LinkIcon />}
        onClick={onOpen}
      />

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="xs"
        isCentered
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>공유하기</ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" flexDirection="column" gap={2} mb={3}>
            <Button
              colorScheme="blue"
              variant="outline"
              mr={3}
              onClick={() =>
                copyClipboard(
                  window.location.href,
                  () =>
                    toast({
                      title: '링크가 클립보드에 저장되었습니다.',
                      status: 'success',
                      duration: 1000,
                      isClosable: true,
                    }),
                  () =>
                    toast({
                      title: '다시 시도해주세요.',
                      status: 'success',
                      duration: 1000,
                      isClosable: true,
                    })
                )
              }
            >
              링크로 공유하기
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ShareButton;
