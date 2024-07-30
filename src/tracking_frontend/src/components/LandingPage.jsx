import React from "react";
import { Box, Heading, VStack, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <Box>
      <Heading>Emergency Response System</Heading>
      <VStack spacing={4}>
        <Button
          as={Link}
          to="/login"
        >
          Login
        </Button>
        <Button
          as={Link}
          to="/register/facility"
        >
          Register as Facility
        </Button>
        <Button
          as={Link}
          to="/register/ambulance"
        >
          Register as Ambulance
        </Button>
        <Button
          as={Link}
          to="/admin/login"
        >
          Admin Login
        </Button>
      </VStack>
    </Box>
  );
}

export default LandingPage;
