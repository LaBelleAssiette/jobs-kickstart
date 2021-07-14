import React from "react";
import { useSelector } from "react-redux";
import { Center, Container, Spinner, Input, Text, InputGroup, InputLeftAddon, Icon } from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";

import { selectAllIngredients, selectIngredientsIds} from "./ingredientsSlice";
import useSearchable from "../hooks/useSearchable";
import useUserInput from "../hooks/useUserInput";
import IngredientTable from "./IngredientTable";
import IngredientExcerpt from "./IngredientExcerpt";


const IngredientsList = () => {
  const ingredients = useSelector(selectAllIngredients);
  const ingredientsIds = useSelector(selectIngredientsIds);
  const ingredientStatus = useSelector((state) => state.ingredients.status);

  const searchInput = useUserInput("");
  const searchedIngredients = useSearchable(ingredients, searchInput.value, (ingredient) => [ingredient.name]);
  let content;

  if (ingredientStatus === "loading") {
    content = <Center><Spinner size="xl" color="red.500"/></Center>;
  } else if (ingredientStatus === "succeeded") {
    content =
        <>
          <Container maxW='md' mt='5' mb='5'>
            <InputGroup>
              <InputLeftAddon children={<Icon as={Search2Icon}/>}/>
              <Input
                type="text"
                placeholder="Type a name..."
                {...searchInput}
              />
            </InputGroup>
          </Container>
          <Text color="gray" mb='2'>{searchedIngredients?.length ? `(${searchedIngredients.length}) ingredients` : "(0) ingredients"}</Text>
          {searchInput.value.length
            ?   (
              <IngredientTable>
                {searchedIngredients.map( (ingredient) => (
                  <IngredientExcerpt key={ingredient._id} ingredientId={ingredient._id} />
                ))}
              </IngredientTable>
            )
            :   (
              <IngredientTable>
                {ingredientsIds.map( (ingredientId) => (
                  <IngredientExcerpt key={ingredientId} ingredientId={ingredientId} />
                ))}
              </IngredientTable>
            )
          }
        </>;
  } else if (ingredientStatus === "error") {
    content = <Center><strong>Can not connect to the server right now, try again later...</strong></Center>;
  }

  return (content);
};

export default IngredientsList;