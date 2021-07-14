import { configureStore } from "@reduxjs/toolkit";
import ingredientReducer from "./components/ingredients/ingredientsSlice";

export const store = configureStore({
  reducer: {
    ingredients: ingredientReducer
  },
});
