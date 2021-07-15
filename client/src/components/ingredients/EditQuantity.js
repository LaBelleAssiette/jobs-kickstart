import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { Box, Spinner, useToast, Icon,  InputGroup, InputLeftAddon, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper} from "@chakra-ui/react";
import { AddIcon, MinusIcon} from "@chakra-ui/icons";

import { updateIngredient } from "./ingredientsSlice";

const EditQuantity = ({ ingredient }) => {
  const [ loading, setLoading ] = useState(false);
  const [ addAmount, setAddAmount ] = useState("");
  let addValue = Number(addAmount) || 0;

  const toast = useToast();
  const dispatch = useDispatch();

  const canSave = addAmount.length;

  const onChangeQuantity = quantity => setAddAmount(quantity);

  const onQuantitySubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const finalQuantity = ingredient.quantity + addValue;
      const resultAction = await dispatch(updateIngredient({id: ingredient._id, quantity: finalQuantity}));
      unwrapResult(resultAction);
      setAddAmount("");
    } catch(e) {
      toast({position: "top", duration: 3000, status: "error", title: "Failed to update quantity : " + e.message});
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onQuantitySubmit}>
      <InputGroup maxW='180px'>
        <InputLeftAddon
          children={
            !loading
              ?   (
                <Box as="button" type="submit" width='20px' disabled={!canSave}>
                  <Icon as={AddIcon} w={2}/>
                                /
                  <Icon as={MinusIcon} w={2}/>
                </Box>
              )
              :   (
                <Box w='30px'>
                  <Spinner size="md" />
                </Box>
              )
          }
        />
        <NumberInput
          type="number"
          name="quantity"
          aria-label="Set add amount"
          value={addAmount}
          onChange={onChangeQuantity}
          w='170px'
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </InputGroup>
    </form>
  );
};

export default EditQuantity;