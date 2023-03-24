import React from 'react';
import {
  Box,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  UnorderedList,
  ListItem,
  Image,
} from '@chakra-ui/react';

const AddItem = () => {
  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box as="b" flex="1" textAlign="left" fontSize="sm">
            루미큐브
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <UnorderedList
          fontSize="sm"
          display="flex"
          whiteSpace="normal"
          wordBreak="break-word"
        >
          <Image
            boxSize="4rem"
            borderRadius="md"
            objectFit="cover"
            src="https://cf.geekdo-images.com/LeaLDlTTmeN639MfuflcMw__itemrep/img/x4GW0OJaN-pV8-K_b4RTSFioW6U=/fit-in/246x300/filters:strip_icc()/pic2286966.jpg"
            alt="Dan Abramov"
          />
          <Box ml={5}>
            <ListItem>2-4 Players</ListItem>
            <ListItem>Playing Time : 60 Min</ListItem>
          </Box>
        </UnorderedList>
      </AccordionPanel>
    </AccordionItem>
  );
};

export default AddItem;
