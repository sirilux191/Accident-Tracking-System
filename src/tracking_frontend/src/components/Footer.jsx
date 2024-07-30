import React from "react";
import { Box, Text } from "@chakra-ui/react";

function Footer() {
  return (
    <Box
      as="footer"
      bg="teal.500"
      color="white"
      py={4}
      textAlign="center"
    >
      <Text>
        &copy; {new Date().getFullYear()} Emergency Response System. All rights
        reserved.
      </Text>
    </Box>
  );
}

export default Footer;
