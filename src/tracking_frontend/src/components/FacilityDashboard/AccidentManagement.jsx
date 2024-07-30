import React, { useEffect, useContext } from "react";
import { Box, Heading, VStack, Text, Button, useToast } from "@chakra-ui/react";
import { AccidentContext } from "../../contexts/AccidentContext";

function AccidentManagement() {
  const {
    accidents,
    isLoading,
    error,
    fetchActiveAccidents,
    updateStatus,
    closeAccident,
  } = useContext(AccidentContext);
  const toast = useToast();

  useEffect(() => {
    fetchActiveAccidents();
  }, []);

  const handleUpdateStatus = async (accidentId, newStatus) => {
    try {
      await updateStatus(accidentId, newStatus);
      toast({
        title: "Status updated",
        description: "Accident status has been updated successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error updating status",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleCloseAccident = async (accidentId) => {
    try {
      await closeAccident(accidentId);
      toast({
        title: "Accident closed",
        description: "Accident has been closed successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error closing accident",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text color="red.500">{error}</Text>;
  }

  return (
    <Box>
      <Heading
        as="h2"
        size="lg"
        mb={4}
      >
        Active Accidents
      </Heading>
      <VStack
        spacing={4}
        align="stretch"
      >
        {accidents.length === 0 ? (
          <Text>No active accidents</Text>
        ) : (
          accidents.map((accident) => (
            <Box
              key={accident.id}
              p={4}
              borderWidth={1}
              borderRadius="md"
            >
              <Text>
                <strong>ID:</strong> {accident.id}
              </Text>
              <Text>
                <strong>Location:</strong> {accident.details.location.address}
              </Text>
              <Text>
                <strong>Severity:</strong> {accident.details.severity}
              </Text>
              <Text>
                <strong>Status:</strong> {accident.status}
              </Text>
              <Button
                mt={2}
                colorScheme="blue"
                onClick={() => handleUpdateStatus(accident.id, "InProgress")}
              >
                Mark In Progress
              </Button>
              <Button
                mt={2}
                ml={2}
                colorScheme="green"
                onClick={() => handleCloseAccident(accident.id)}
              >
                Close Accident
              </Button>
            </Box>
          ))
        )}
      </VStack>
    </Box>
  );
}

export default AccidentManagement;
