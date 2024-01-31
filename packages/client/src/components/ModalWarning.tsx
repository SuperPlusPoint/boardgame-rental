import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';

const ModalWarning = (
  data: string,
  isOpen: boolean,
  onClose: () => void,
  onRun: () => void
) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xs">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>정말 삭제하시겠습니까?</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{data}</ModalBody>
        <ModalFooter>
          <Button
            variant="ghost"
            mr={3}
            onClick={() => {
              onClose();
            }}
          >
            취소
          </Button>
          <Button
            type="submit"
            colorScheme="red"
            onClick={() => {
              onRun();
              onClose();
            }}
          >
            삭제
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default ModalWarning;
