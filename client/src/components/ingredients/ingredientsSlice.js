import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios'

const ingredientsAdapter = createEntityAdapter({
    selectId: (ingredient) => ingredient._id,
    sortComparer: (a, b) => b.date.localeCompare(a.date)
})

const initialState = ingredientsAdapter.getInitialState({
    status: 'idle',
    error: null
})

export const fetchIngredients = createAsyncThunk('ingredients/fetchIngredients', 
    async () => {
        const response = await axios.get('/api/ingredients')
        return response.data
    }
)

export const addNewIngredient = createAsyncThunk('/ingredients/addNewIngredient',
    async data => {
        const response = await axios.post('/api/ingredient', data)
        return response.data
    }
)

export const updateIngredient = createAsyncThunk('/ingredient/updateIngredient',
async (ingredientData) => {
    const { id, ...data } = ingredientData
    const response = await axios.put(`/api/ingredient/${id}`, data) 
    return response.data
})

export const deleteIngredient = createAsyncThunk('/ingredients/deleteIngredient',
    async id => {
        await axios.delete(`/api/ingredient/${id}`)
        return id
    }
)

const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState,
    reducers : {},
    extraReducers: {
        [fetchIngredients.pending]: (state, action) => {
            state.status = "loading"
        },
        [fetchIngredients.fulfilled] : (state, action) => {
            state.status = "succeeded"
            ingredientsAdapter.upsertMany(state, action.payload)
        },
        [fetchIngredients.rejected] : (state, action) => {
            state.status = "error"
            state.error = action.error.message
        },

        [addNewIngredient.fulfilled]: ingredientsAdapter.addOne,
        [updateIngredient.fulfilled]: ingredientsAdapter.upsertOne,
        [deleteIngredient.fulfilled]: ingredientsAdapter.removeOne
    }
})

export default ingredientsSlice.reducer

export const { 
    selectAll: selectAllIngredients, 
    selectById: selectIngredientById, 
    selectIds: selectIngredientsIds
} = ingredientsAdapter.getSelectors(state => state.ingredients)