import React from "react";
import { Table, Thead, Tbody, Tr, Th, Box } from "@chakra-ui/react";

const IngredientTable = ({ children }) => {
  return (
    <Box overflowX = "auto">
      <Table size="sm">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Quantity</Th>
            <Th>Update Quantity</Th>
            <Th>Delete</Th>
          </Tr>
        </Thead>
        <Tbody>{children}</Tbody>
      </Table>
    </Box>
  );
};

export default IngredientTable;