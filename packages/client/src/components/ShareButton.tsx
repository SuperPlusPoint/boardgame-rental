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
} from '@chakra-ui/react';
import { LinkIcon } from '@chakra-ui/icons';

const ShareButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
            <Button colorScheme="blue" variant="outline" mr={3}>
              링크로 공유하기
            </Button>
            <Button colorScheme="yellow" mr={3}>
              카카오톡으로 공유하기
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ShareButton;
