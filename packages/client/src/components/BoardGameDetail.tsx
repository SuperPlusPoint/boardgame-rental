import React from 'react';
import {
  Image,
  Text,
  ButtonGroup,
  Badge,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Center,
  Icon,
  HStack,
} from '@chakra-ui/react';
import { MdAccessTime, MdPerson } from 'react-icons/md';
import { BoardGame, UserBoardGame } from '../models/boardgame';

interface BoardGameDetailProps {
  userBoardGame: UserBoardGame;
  boardGame: BoardGame;
  isNew: boolean;
  isOpen: boolean;
  onClose: () => void;
  footer: React.ReactNode;
}

const BoardGameDetail: React.FC<BoardGameDetailProps> = ({
  userBoardGame,
  boardGame,
  isNew,
  isOpen,
  onClose,
  footer,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {isNew && (
            <>
              <Badge colorScheme="red">New</Badge>{' '}
            </>
          )}
          {userBoardGame.name}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Center mb={2}>
            <Image
              boxSize="sm"
              borderRadius="md"
              objectFit="contain"
              src={boardGame?.image}
              alt={`${boardGame?.name} image`}
              fallbackSrc="https://via.placeholder.com/64"
            />
          </Center>
          <HStack>
            <Icon as={MdPerson} />
            <Text fontSize="lg">
              {boardGame?.minPlayerNum}-{boardGame?.maxPlayerNum} Players
            </Text>
          </HStack>
          <HStack>
            <Icon as={MdAccessTime} />
            <Text fontSize="lg">{boardGame?.playingTime} 분</Text>
          </HStack>
        </ModalBody>
        <ModalFooter>
          <ButtonGroup spacing={2}>{footer}</ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default BoardGameDetail;
