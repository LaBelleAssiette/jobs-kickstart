import React from "react";
import { useDispatch } from "react-redux";
import {IconButton, Button, useToast, Modal, ModalContent, ModalHeader, ModalFooter, useDisclosure} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

import { deleteIngredient } from "./ingredientsSlice";

const DeleteIngredient = ({ ingredient }) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();

  const handleDelete = async (id) => {
    try {
      const resultAction = await dispatch(deleteIngredient(id));
      if (resultAction.payload === id) return;
      else {
        toast({position: "top", duration: 3000, status: "error", title: "Failed to delete ingredient"});
      }
    } catch(e) {
      toast({position: "top", duration: 3000, status: "error", title: "Failed to delete ingredient : " + e.message});
    }
  };

  return (
    <>
      <IconButton
        icon={<DeleteIcon/>}
        onClick={onOpen}
        bg="none"
        color="red"
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>
                    Are you sure to delete {ingredient.name} ?
          </ModalHeader>
          <ModalFooter>
            <Button colorScheme="green"  mr='2'onClick={onClose}>No</Button>
            <Button colorScheme="red"  onClick={() => handleDelete(ingredient._id)}>Yes</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteIngredient;