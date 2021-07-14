import React from "react";
import { useSelector } from "react-redux";
import { Tr, Th, Td} from "@chakra-ui/react";

import EditableName from "./EditableName";
import EditQuantity from "./EditQuantity";
import DeleteIngredient from "./DeleteIngredient";
import { selectIngredientById } from "./ingredientsSlice";

const IngredientExcerpt = ({ ingredientId }) => {
  const ingredient = useSelector((state) => selectIngredientById(state, ingredientId));

  return (
    <Tr key={ingredient._id}>
      <Th><EditableName ingredient={ingredient}/></Th>
      <Td>{ingredient.quantity}</Td>
      <Td><EditQuantity ingredient={ingredient}/></Td>
      <Td><DeleteIngredient ingredient={ingredient}/></Td>
    </Tr>
  );
};

export default IngredientExcerpt;