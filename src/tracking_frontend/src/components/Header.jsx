import React, { useContext } from "react";
import { Box, Flex, Button, Heading, Spacer } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

function Header() {
  const { isAuthenticated, userRole, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <Box
      bg="teal.500"
      px={4}
      py={3}
    >
      <Flex alignItems="center">
        <Heading
          as="h1"
          size="lg"
          color="white"
        >
          Emergency Response System
        </Heading>
        <Spacer />
        {isAuthenticated ? (
          <>
            <Button
              colorScheme="teal"
              variant="outline"
              mr={3}
              onClick={() => navigate(`/${userRole}Dashboard`)}
            >
              Dashboard
            </Button>
            <Button
              colorScheme="teal"
              variant="outline"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </>
        ) : (
          <Button
            colorScheme="teal"
            variant="outline"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        )}
      </Flex>
    </Box>
  );
}

export default Header;
