import React from 'react';
import {
  Image,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Box,
  Flex,
  Heading,
  Button,
} from '@chakra-ui/react';
import { BoardGame, UserBoardGame } from '../models/boardgame';
import Header from '../layout/Header';
import SVGComponent, { Icon } from './common/SVGComponent';

interface BoardGameDetailProps {
  userBoardGame: UserBoardGame;
  boardGame: BoardGame;
  isOpen: boolean;
  onClose: () => void;
  isLogin: boolean;
  rentBoardGame: (boardGame: UserBoardGame) => Promise<void>;
  returnBoardGame: (boardGame: UserBoardGame) => Promise<void>;
}

const BoardGameDetail: React.FC<BoardGameDetailProps> = ({
  userBoardGame,
  boardGame,
  isOpen,
  onClose,
  isLogin,
  rentBoardGame,
  returnBoardGame,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full">
      <ModalOverlay />
      <ModalContent backgroundColor="#F9F5F2" borderRadius="">
        <ModalHeader padding="0" textAlign="center">
          <Header title="보드게임" />
        </ModalHeader>
        <Box pos="fixed" top="72px" left="8px" onClick={onClose}>
          <SVGComponent icon={Icon.LeftArrow} />
        </Box>
        <ModalBody>
          <Flex flexDirection="column" align="center">
            <Image
              boxSize="310px"
              borderRadius="8px"
              objectFit="cover"
              src={boardGame?.image}
              alt={`${boardGame?.name} image`}
            />
            <Heading as="h3" mt="17px" alignSelf="start">
              {userBoardGame.name}
            </Heading>
            <Flex gap="7px" mt="17px">
              <Flex
                background="white"
                border="1px solid black"
                width="154px"
                height="44px"
                textAlign="center"
                align="center"
                justify="start"
                paddingLeft="10px"
              >
                <Text fontSize="16px">
                  {boardGame?.minPlayerNum}-{boardGame?.maxPlayerNum} Players
                </Text>
              </Flex>
              <Flex
                background="white"
                border="1px solid black"
                width="154px"
                height="44px"
                textAlign="center"
                align="center"
                justify="start"
                paddingLeft="10px"
              >
                <Text fontSize="16px">{boardGame?.playingTime} min</Text>
              </Flex>
            </Flex>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Flex flexDirection="column" width="100%">
            {isLogin ? (
              <>
                <Button
                  alignSelf="stretch"
                  backgroundColor="#D5F479"
                  fontSize="20px"
                  borderRadius="12"
                  border="1px solid black"
                  py="18px"
                  mt="10px"
                  height=""
                  isDisabled={userBoardGame.rental === userBoardGame.total}
                  onClick={() => rentBoardGame(userBoardGame)}
                >
                  대여 하기
                </Button>
                <Button
                  alignSelf="stretch"
                  backgroundColor="#FF6F5F"
                  fontSize="20px"
                  borderRadius="12"
                  border="1px solid black"
                  py="18px"
                  mt="10px"
                  height=""
                  isDisabled={userBoardGame.rental < 1}
                  onClick={() => returnBoardGame(userBoardGame)}
                >
                  반납 하기
                </Button>
              </>
            ) : (
              <Button
                alignSelf="stretch"
                backgroundColor={
                  userBoardGame.rental < userBoardGame.total
                    ? '#D5F479'
                    : '#FF6F5F'
                }
                fontSize="20px"
                borderRadius="12"
                border="1px solid black"
                py="18px"
                mt="10px"
                height=""
              >
                대여
                {userBoardGame.rental < userBoardGame.total ? '가능' : '불가'}
              </Button>
            )}
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default BoardGameDetail;
