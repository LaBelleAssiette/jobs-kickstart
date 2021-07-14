import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from "@reduxjs/toolkit";
import axios from 'axios';
import { AddIcon } from '@chakra-ui/icons';
import {
  Container, Box, ScaleFade,
  useToast,
  useDisclosure,
  Stack,
  Input,
  InputGroup,
  InputLeftAddon,
  Button,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Spinner
} from '@chakra-ui/react';

import { addNewIngredient, updateIngredient, selectIngredientByName } from "./ingredientsSlice";
import EmojisFinder from '../EmojisFinder';

const AddIngredientForm = () => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [emoji, setEmoji] = useState("");
  const [emojiInput, setEmojiInput] = useState("");
  const [fetchedEmojis, setfetchedEmojis] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const existingIngredient = useSelector((state) => selectIngredientByName(state, name));

  const dispatch = useDispatch();
  const { isOpen, onToggle } = useDisclosure();
  const toast = useToast();

  const canSave = [name, quantity].every(Boolean) && addRequestStatus === "idle" && /\S/.test(name) && /\S/.test(quantity);

  const onChangeInput = async e => setEmojiInput(e.target.value);

  const onChangeName = (e) => {
    setName(e.target.value);
    setEmojiInput(e.target.value);
  };

  const onChangeQuantity = (quantity) => {
    setQuantity(quantity);
    if (quantity.includes("-")) {
      setQuantity(quantity.replace(/[^\w\s]/gi, ""))
    }
  };

  React.useEffect(() => {
    async function fetchEmojis() {
      try {
        if (emojiInput) {
          const res = await axios.get(`https://api.emojisworld.io/v1/search?q=${emojiInput}`)
          if (res.data.totals > 0) {
            setfetchedEmojis(res.data.results)
            setEmoji(res.data.results[0].unicode)
          }
        }
      }
      catch (e) {
        console.log(e);
      }
    }
    fetchEmojis()
  }, [emojiInput]);

  const addNewItem = async (e) => {
    e.preventDefault();
    setAddRequestStatus("pending");
    try {
      if (existingIngredient.length) {
        const addValue = Number(quantity);
        const finalQuantity = existingIngredient[0].quantity + addValue;
        dispatch(updateIngredient({ id: existingIngredient[0]._id, quantity: finalQuantity }));
      } else {
        const resultAction = dispatch(
          addNewIngredient({ name: name, quantity: quantity, emoji: emoji })
        );
        unwrapResult(resultAction);
      }
      setName("");
      setQuantity("");
      toast({ position: "top", duration: 3000, status: "success", title: `${name} added to stock !` })
    } catch (e) {
      toast({ position: "top", duration: 3000, status: "error", title: "Failed to save : " + e.message })
    } finally {
      setAddRequestStatus("idle");
    }
  };

  return (
    <>
      <Container maxW="full">
        <Button
          _active={{ transform: "scale(1.05)" }}
          leftIcon={<AddIcon />}
          onClick={() => { onToggle(); setShowForm(!showForm) }}
          colorScheme="teal" variant="outline" mb='2'
        >
          New ingredient
        </Button>
        {showForm ?
          <ScaleFade initialScale={0.9} in={isOpen}>
            <Box as="form" onSubmit={addNewItem} w='70%' margin='auto'>
              <Stack
                direction={["column", "column", "row", "row"]}
                bg="gray.50"
                boxShadow="md"
                borderRadius="xl"
                p='2'
              >
                <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Name"
                  value={name}
                  onChange={onChangeName}
                  autoFocus
                />
                <InputGroup w='100%'>
                  <InputLeftAddon children="Quantity" />
                  <NumberInput
                    type="number"
                    name="quantity"
                    id="quantity"
                    value={quantity}
                    onChange={onChangeQuantity}
                    w='100%'
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </InputGroup>

                <EmojisFinder emoji={emoji} setEmoji={setEmoji} emojiInput={emojiInput} fetchedEmojis={fetchedEmojis} onChangeInput={onChangeInput} />

                <Button type="submit" disabled={!canSave} colorScheme="green">
                  {addRequestStatus === "pending" && (<Spinner size='xs' />)}
                  Save
                </Button>
              </Stack>
            </Box>
          </ScaleFade >
          : <></>}
      </Container>
    </>
  );
};

export default AddIngredientForm;