import React, { useState, useContext } from "react";
import { Box, Heading, Text, Button, VStack, useToast } from "@chakra-ui/react";
import { AmbulanceContext } from "../../contexts/AmbulanceContext";

function AmbulanceStatus({ status, location }) {
  const { updateStatus, updateLocation } = useContext(AmbulanceContext);
  const toast = useToast();
  const [newStatus, setNewStatus] = useState(status);

  const handleStatusUpdate = async () => {
    try {
      await updateStatus(newStatus);
      toast({
        title: "Status Updated",
        description: `Ambulance status updated to ${newStatus}`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleLocationUpdate = async () => {
    // In a real app, you'd get the current location from a GPS service
    const newLocation = {
      latitude: 0,
      longitude: 0,
      address: "Updated Address",
    };
    try {
      await updateLocation(newLocation);
      toast({
        title: "Location Updated",
        description: "Ambulance location has been updated",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box>
      <Heading
        as="h2"
        size="lg"
        mb={4}
      >
        Ambulance Status
      </Heading>
      <VStack
        spacing={4}
        align="stretch"
      >
        <Text>
          <strong>Current Status:</strong> {status}
        </Text>
        <Text>
          <strong>Current Location:</strong> {location.address}
        </Text>
        <Button
          onClick={handleStatusUpdate}
          colorScheme="blue"
        >
          Update Status
        </Button>
        <Button
          onClick={handleLocationUpdate}
          colorScheme="green"
        >
          Update Location
        </Button>
      </VStack>
    </Box>
  );
}

export default AmbulanceStatus;
