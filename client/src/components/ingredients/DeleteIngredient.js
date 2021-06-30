import React from 'react'
import { useDispatch } from 'react-redux'
import {IconButton, useToast } from "@chakra-ui/react"
import { DeleteIcon } from '@chakra-ui/icons'

import { deleteIngredient } from './ingredientsSlice'

const DeleteIngredient = ({ ingredient }) => {
    const toast = useToast()
    const dispatch = useDispatch()

    const handleDelete = async (id) => {
        try {
            const resultAction = await dispatch(deleteIngredient(id))
            if (resultAction.payload === id) return
            else {
                toast({position: "top", duration: 3000, status: "error", title: "Failed to delete ingredient"})
            }
        } catch(e) {
            toast({position: "top", duration: 3000, status: "error", title: "Failed to delete ingredient : " + e.message})
        } 
    }

    return (
        <IconButton 
            icon={<DeleteIcon/>} 
            onClick={() => handleDelete(ingredient._id)} 
            bg="none" 
            color="red"
        />
    )
}

export default DeleteIngredient