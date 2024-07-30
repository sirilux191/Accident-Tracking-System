import React, { useState, useContext } from "react";
import {
  Box,
  Heading,
  VStack,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
import { FacilityContext } from "../../contexts/FacilityContext";

function AccidentReporting() {
  const { reportNewAccident, currentFacility } = useContext(FacilityContext);
  const toast = useToast();
  const [accidentDetails, setAccidentDetails] = useState({
    location: "",
    severity: "",
    description: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAccidentDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await reportNewAccident(currentFacility.id, accidentDetails);
      toast({
        title: "Accident Reported",
        description: "The accident has been successfully reported.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setAccidentDetails({ location: "", severity: "", description: "" });
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
        Report Accident
      </Heading>
      <form onSubmit={handleSubmit}>
        <VStack
          spacing={4}
          align="stretch"
        >
          <Input
            name="location"
            placeholder="Accident Location"
            value={accidentDetails.location}
            onChange={handleInputChange}
          />
          <Input
            name="severity"
            placeholder="Severity"
            value={accidentDetails.severity}
            onChange={handleInputChange}
          />
          <Input
            name="description"
            placeholder="Description"
            value={accidentDetails.description}
            onChange={handleInputChange}
          />
          <Button
            type="submit"
            colorScheme="blue"
          >
            Report Accident
          </Button>
        </VStack>
      </form>
    </Box>
  );
}

export default AccidentReporting;
