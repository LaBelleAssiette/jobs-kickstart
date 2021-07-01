import React, { useState, useEffect } from 'react'
import { Button, Stack, Box, Modal, ModalContent, ModalOverlay, ModalHeader, ModalBody, FormControl, Input, FormLabel, useDisclosure } from '@chakra-ui/react'
import axios from 'axios'

const EmojisFinder = ({ name, setEmoji }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [ input, setInput ] = useState("")
    const [ fetchedEmojis, setfetchedEmojis ] = useState([])
    const [ preview, setPreview ] = useState("")

    const onChangeInput = async e => setInput(e.target.value)

    useEffect( () => {
        async function fetchEmojis() {
          try {
              if (input) {
                  const res = await axios.get(`https://api.emojisworld.io/v1/search?q=${input}`)
                  if (res.data.totals > 0) {
                      setfetchedEmojis(res.data.results)
                    }
                }
          }
          catch(e) {
            console.log(e);
          }
        }
        fetchEmojis()
      }, [input])

    return (
        <>
            <Button onClick={() => { onOpen(); setInput(name)}}>{preview ? preview : "😀"}</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>
                        <FormControl>
                            <FormLabel textAlign="center">Find an emoji</FormLabel>
                            <Input value={input} onChange={onChangeInput} placeholder="Type an name..."/>
                        </FormControl>
                    </ModalHeader>
                    <ModalBody>
                            {fetchedEmojis.map( (emoji) => (
                                <Box key={emoji.id}>
                                    <Stack direction ="row" align="center">
                                        <p>{emoji.name}</p>
                                        <Button onClick={() => { setEmoji(emoji.unicode); setPreview(emoji.emoji); onClose() }}>{emoji.emoji}</Button>
                                    </Stack>
                                </Box>
                            ))}
                
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default EmojisFinder