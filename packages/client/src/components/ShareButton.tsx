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
import SVGComponent, { Icon } from './common/SVGComponent';

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
        pos="absolute"
        bottom="19px"
        right="19px"
        backgroundColor="#FFD951"
        borderWidth={2}
        borderStyle="solid"
        borderColor="black"
        borderRadius="full"
        width={42}
        height={42}
        zIndex={2}
        aria-label="Share"
        icon={
          <SVGComponent icon={Icon.Link} width={37} height={37} color="black" />
        }
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
