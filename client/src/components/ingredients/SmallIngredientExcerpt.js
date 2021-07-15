import  React from "react";
import { useSelector } from "react-redux";
import { Box, Stack, Divider} from "@chakra-ui/react";

import EditableName from "./EditableName";
import EditQuantity from "./EditQuantity";
import DeleteIngredient from "./DeleteIngredient";
import { selectIngredientById } from "./ingredientsSlice";

const SmallIngredientExcerpt = ({ ingredientId }) => {
  const ingredient = useSelector((state) => selectIngredientById(state, ingredientId));

  return (
    <>
      <Stack mt="3" bg="orange.50" direction="row" align="center">
        <Stack direction="column" align="center" w="50%">
          <Box><EditableName ingredient={ingredient}/></Box>
          <Box>{ingredient.quantity}</Box>
        </Stack>

        <Box w="40%"><EditQuantity ingredient={ingredient}/></Box>
        <Box w="10%"><DeleteIngredient ingredient={ingredient}/></Box>
      </Stack>
      <Divider mb="2" mt="2"/>
    </>
  );
};

export default SmallIngredientExcerpt;