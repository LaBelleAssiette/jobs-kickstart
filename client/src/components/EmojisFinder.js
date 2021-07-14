import React from "react";
import {
  Button, Stack, Box,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  FormControl,
  Input,
  useDisclosure
} from "@chakra-ui/react";

import { convertUnicode } from "../helpers/emoji.helper";

const EmojisFinder = ({ emoji, setEmoji, emojiInput, fetchedEmojis, onChangeInput }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={() => { onOpen(); }}>{emoji ? convertUnicode(emoji) : "😀"}</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <FormControl>
              <Box d="flex" justifyContent="space-around" mb='2'>
                <p>Find an emoji</p>
                <Button size="xs" variant="outline" onClick={() => { setEmoji(""); onClose(); }}>No emoji</Button>
              </Box>
              <Input value={emojiInput} onChange={onChangeInput} placeholder="Type an name..." />
            </FormControl>
          </ModalHeader>
          <ModalBody>
            {fetchedEmojis.map((emoji) => (
              <Box key={emoji.id}>
                <Stack direction="row" align="center">
                  <p>{emoji.name}</p>
                  <Button onClick={() => { setEmoji(emoji.unicode); onClose(); }}>{emoji.emoji}</Button>
                </Stack>
              </Box>
            ))}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EmojisFinder;