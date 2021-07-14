import React from "react";
import { Box } from "@chakra-ui/react";

const Header = () => {

  return (
    <>
      <Box bg="tomato" boxShadow="md" height={["8vh", "15vh"]} w='100vw' color="white" d="flex" alignItems="center" justifyContent="center" mb='2'>
        <h1>🔪Ingredients Manager🔪 </h1>
      </Box>
    </>
  );
};

export default Header;