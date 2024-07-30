import React, { useState, useContext } from "react";
import {
  Box,
  Heading,
  Input,
  Button,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { AmbulanceContext } from "../../contexts/AmbulanceContext";

function AccidentAssignment() {
  const { assignToAccident, currentAmbulance } = useContext(AmbulanceContext);
  const toast = useToast();
  const [accidentId, setAccidentId] = useState("");

  const handleAssign = async (e) => {
    e.preventDefault();
    try {
      await assignToAccident(currentAmbulance.id, accidentId);
      toast({
        title: "Ambulance Assigned",
        description:
          "The ambulance has been successfully assigned to the accident.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setAccidentId("");
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

  return (
    <Box>
      <Heading
        as="h2"
        size="lg"
        mb={4}
      >
        Accident Assignment
      </Heading>
      <form onSubmit={handleAssign}>
        <VStack
          spacing={4}
          align="stretch"
        >
          <Input
            placeholder="Accident ID"
            value={accidentId}
            onChange={(e) => setAccidentId(e.target.value)}
          />
          <Button
            type="submit"
            colorScheme="teal"
          >
            Assign to Accident
          </Button>
        </VStack>
      </form>
    </Box>
  );
}

export default AccidentAssignment;
