import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
} from '@chakra-ui/react';

const ModalInputKeyValue = (
  isNewData: boolean,
  isOpen: boolean,
  onClose: () => void,
  dataKey: string,
  dataValue: any,
  setDataKey: (key: string) => void,
  setDataValue: (value: any) => void,
  onSubmit: () => void
) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xs">
      <ModalOverlay />
      <ModalContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <ModalHeader>Edit</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
              <FormLabel>key</FormLabel>
              <Input
                id="key"
                type="text"
                placeholder="key"
                defaultValue={dataKey}
                onChange={(e) => {
                  e.preventDefault();
                  setDataKey(e.target.value);
                }}
                disabled={!isNewData}
              />
            </FormControl>
            <FormControl>
              <FormLabel>value</FormLabel>
              <Input
                id="value"
                type="text"
                placeholder="value"
                defaultValue={dataValue}
                onChange={(e) => {
                  e.preventDefault();
                  setDataValue(e.target.value);
                }}
              />
              <FormHelperText>key 와 value 를 입력하세요.</FormHelperText>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              취소
            </Button>
            <Button type="submit" colorScheme="blue">
              확인
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};
export default ModalInputKeyValue;
