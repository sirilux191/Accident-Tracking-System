import React, { useContext } from "react";
import { Box, Heading, Button, useToast } from "@chakra-ui/react";
import { AuthContext } from "../contexts/AuthContext";

function Login() {
  const { login } = useContext(AuthContext);
  const toast = useToast();

  const handleLogin = async () => {
    try {
      await login();
      toast({
        title: "Login Successful",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Login Failed",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      maxWidth="400px"
      margin="auto"
      mt={8}
    >
      <Heading
        as="h1"
        size="xl"
        textAlign="center"
        mb={6}
      >
        Login
      </Heading>
      <Button
        onClick={handleLogin}
        colorScheme="teal"
        width="100%"
      >
        Login with Internet Identity
      </Button>
    </Box>
  );
}

export default Login;
