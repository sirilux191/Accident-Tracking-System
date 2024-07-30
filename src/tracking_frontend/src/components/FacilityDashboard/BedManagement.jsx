import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Heading,
  VStack,
  Input,
  Button,
  Text,
  useToast,
} from "@chakra-ui/react";
import { FacilityContext } from "../../contexts/FacilityContext";

function BedManagement() {
  const { currentFacility, updateBeds, fetchFacilityDetails } =
    useContext(FacilityContext);
  const toast = useToast();
  const [newAvailableBeds, setNewAvailableBeds] = useState(0);

  useEffect(() => {
    if (currentFacility) {
      setNewAvailableBeds(currentFacility.availableBeds);
    } else {
      fetchFacilityDetails();
    }
  }, [currentFacility]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateBeds(currentFacility.id, newAvailableBeds);
      toast({
        title: "Bed Capacity Updated",
        description: "The bed capacity has been successfully updated.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  if (!currentFacility) {
    return <Text>Loading...</Text>;
  }

  return (
    <Box>
      <Heading
        as="h2"
        size="lg"
        mb={4}
      >
        Bed Management
      </Heading>
      <VStack
        spacing={4}
        align="stretch"
      >
        <Text>Total Capacity: {currentFacility.capacity}</Text>
        <Text>Current Available Beds: {currentFacility.availableBeds}</Text>
        <form onSubmit={handleSubmit}>
          <VStack
            spacing={4}
            align="stretch"
          >
            <Input
              type="number"
              value={newAvailableBeds}
              onChange={(e) => setNewAvailableBeds(Number(e.target.value))}
              max={currentFacility.capacity}
              min={0}
            />
            <Button
              type="submit"
              colorScheme="blue"
            >
              Update Available Beds
            </Button>
          </VStack>
        </form>
      </VStack>
    </Box>
  );
}

export default BedManagement;
