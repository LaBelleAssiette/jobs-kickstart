import React, { useState } from "react";
import { useDispatch } from 'react-redux'
import { unwrapResult } from "@reduxjs/toolkit";
import { ScaleFade, useToast, useDisclosure, Stack, Input, InputGroup, InputLeftAddon, Button, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Spinner} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'

import { addNewIngredient } from "./ingredientsSlice";
import EmojisFinder from '../EmojisFinder'

const AddIngredientForm = () => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [ emoji, setEmoji ] = useState("")
  const [ showForm, setShowForm ] = useState(false)
  const [ addRequestStatus, setAddRequestStatus ] = useState("idle")

  const onChangeName = (e) => setName(e.target.value);
  const onChangeQuantity = (quantity) => setQuantity(quantity);

  const canSave = [name, quantity].every(Boolean) && addRequestStatus === "idle"

  const dispatch = useDispatch()
  const toast = useToast()
  const { isOpen, onToggle } = useDisclosure()

  const addNewItem = async (e) => {
    e.preventDefault();
    try {
      setAddRequestStatus("pending")
      const resultAction = await dispatch(
        addNewIngredient({name: name, quantity: quantity, emoji: emoji})
      )
      unwrapResult(resultAction)
      setName("")
      setQuantity("")
      toast({position: "top", duration: 3000, status: "success", title: `${name} added to stock !`})
    } catch(e) {
        toast({position: "top", duration: 3000, status:"error", title:"Failed to save : " + e.message})
    } finally {
      setAddRequestStatus("idle")
    }
  };

  return (
    <>
      <Stack direction="row" mt='3'>
        <Button _active={{transform: "scale(1.05)"}} leftIcon={<AddIcon/>} onClick={() => {onToggle(); setShowForm(!showForm) }} colorScheme="green" variant="outline" mb='2' >New ingredient</Button>
        {showForm ? (
        <ScaleFade initialScale={0.9} in={isOpen}>
          <form onSubmit={addNewItem}>
            <Stack direction={["column", "row"]}>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Name"
                  value={name}
                  onChange={onChangeName}
                  maxW='200px'
                  autoFocus
                  />
                <InputGroup maxW='200px'>
                  <InputLeftAddon children="Quantity" />
                  <NumberInput
                    type="number"
                    name="quantity"
                    id="quantity"
                    value={quantity}
                    onChange={onChangeQuantity}
                    >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </InputGroup>

                <EmojisFinder name={name} setEmoji={setEmoji}/>

                <Button maxW='200px' type="submit" disabled={!canSave} colorScheme="green">
                  {addRequestStatus === "pending" && ( <Spinner size='xs' />)}
                  Save
                  </Button>
              </Stack>
          </form>
        </ScaleFade >
        ) : ( null )}
        </Stack>

    </>
  );
};

export default AddIngredientForm;
