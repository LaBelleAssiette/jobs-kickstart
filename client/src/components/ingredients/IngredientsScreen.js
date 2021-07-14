import React from "react";
import { Container } from "@chakra-ui/react";

import AddIngredientForm from "./AddIngredientForm";
import IngredientsList from "./IngredientsList";

const IngredientsScreen = () => {
  return (
    <Container maxW="container.xl">
      <AddIngredientForm />
      <IngredientsList/>
    </Container>
  );
};

export default IngredientsScreen;