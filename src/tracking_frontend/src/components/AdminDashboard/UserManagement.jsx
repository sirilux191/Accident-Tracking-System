import React, { useEffect, useContext } from "react";
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  useToast,
} from "@chakra-ui/react";
import { AdminContext } from "../../contexts/AdminContext";

function UserManagement() {
  const {
    pendingRegistrations,
    isLoading,
    error,
    fetchPendingRegistrations,
    approveRegistration,
  } = useContext(AdminContext);
  const toast = useToast();

  useEffect(() => {
    fetchPendingRegistrations();
  }, []);

  const handleApprove = async (userId) => {
    try {
      await approveRegistration(userId);
      toast({
        title: "User Approved",
        description: "The user has been successfully approved.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description:
          error.message || "An error occurred while approving the user.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (isLoading) {
    return <Box>Loading...</Box>;
  }

  if (error) {
    return <Box color="red.500">Error: {error}</Box>;
  }

  return (
    <Box>
      <Heading
        as="h2"
        size="lg"
        mb={4}
      >
        User Management
      </Heading>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Name</Th>
            <Th>Type</Th>
            <Th>Status</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {pendingRegistrations.map((user) => (
            <Tr key={user.id}>
              <Td>{user.id}</Td>
              <Td>{user.name}</Td>
              <Td>{user.userType}</Td>
              <Td>{user.registrationStatus}</Td>
              <Td>
                {user.registrationStatus === "Pending" && (
                  <Button
                    colorScheme="green"
                    size="sm"
                    onClick={() => handleApprove(user.id)}
                  >
                    Approve
                  </Button>
                )}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}

export default UserManagement;
