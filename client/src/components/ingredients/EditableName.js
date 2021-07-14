import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit';
import {
    Popover,
    PopoverTrigger,
    useDisclosure,
    PopoverArrow,
    PopoverCloseButton,
    Input,
    Button,
    ButtonGroup,
    Stack,
    Container,
    PopoverContent,
    useToast,
    Spinner,
    Text
  } from "@chakra-ui/react";
import  FocusLock from "react-focus-lock";
import { EditIcon } from '@chakra-ui/icons';

import { updateIngredient } from './ingredientsSlice';
import { convertUnicode } from '../../helpers/emoji.helper'

const EditableName = ({ ingredient }) => {
    const [ name, setName ] = useState("")
    const [ addRequestStatus, setAddRequestStatus ] = useState('idle')

    const dispatch = useDispatch()
    const toast = useToast()

    const { onOpen, onClose, isOpen } = useDisclosure()
    const firstFieldRef = React.useRef(null)

    const canSave = [name].every(Boolean) && addRequestStatus === "idle"

    const onChangeName = e => setName(e.target.value)

    const onSubmitName = async (e) => {
        e.preventDefault()
        try {
            setAddRequestStatus("pending")
            const resultAction = await dispatch(
                updateIngredient({id: ingredient._id, name: name})
            )
            unwrapResult(resultAction)
            toast({position: "top", duration: 3000, status: "success", title: "Name updated !"})
        } catch(e) {
                toast({position: "top", duration: 3000, status:"error", title:"Failed to update name : " + e.message})
        } finally {
            setAddRequestStatus("idle")
            onClose()
        }
    }

    return (
        <>
            <Popover isOpen={isOpen} initialFocusRef={firstFieldRef} onOpen={onOpen} onClose={onClose} placement="bottom">
                <PopoverTrigger>
                    <Stack direction="row" align="center" className="pointer">
                        <p>{convertUnicode(ingredient.emoji)}</p>
                        <Text>{ingredient.name}</Text>
                        <EditIcon/>
                    </Stack>
                </PopoverTrigger>
                <PopoverContent p={5}>
                    <Container>
                        <FocusLock returnFocus persistentFocus={false}>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <form onSubmit={onSubmitName}>
                                <Stack>
                                    <Input ref={firstFieldRef} defaultValue={ingredient.name} onChange={onChangeName}/>
                                    <ButtonGroup d="flex" justifyContent="flex-end">
                                        <Button onClick={onClose}>Cancel</Button>
                                        <Button type="submit" colorScheme="green" disabled={!canSave}>
                                            {addRequestStatus === "pending" && (
                                                <Spinner size="xs"/>
                                            )}
                                            Save
                                        </Button>
                                    </ButtonGroup>
                                </Stack>
                            </form>
                        </FocusLock>
                    </Container>
                </PopoverContent>
            </Popover>
        </>
    )
}

export default EditableName