import React, { useEffect, useState, useContext } from "react";
import { Box, Heading, VStack, Text, Button, useToast } from "@chakra-ui/react";
import { PatientContext } from "../../contexts/PatientContext";

function PatientManagement() {
  const {
    currentPatient,
    isLoading,
    error,
    fetchPatientRecord,
    updatePatientStatusThunk,
    transferPatientThunk,
  } = useContext(PatientContext);
  const toast = useToast();
  const [patientId, setPatientId] = useState("");

  useEffect(() => {
    if (patientId) {
      fetchPatientRecord(patientId);
    }
  }, [patientId]);

  const handleStatusUpdate = async (newStatus) => {
    try {
      await updatePatientStatusThunk(patientId, newStatus);
      toast({
        title: "Status Updated",
        description: "Patient status has been successfully updated.",
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

  const handleTransfer = async (newFacilityId) => {
    try {
      await transferPatientThunk(patientId, newFacilityId);
      toast({
        title: "Patient Transferred",
        description: "Patient has been successfully transferred.",
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
        Patient Management
      </Heading>
      <VStack
        spacing={4}
        align="stretch"
      >
        {currentPatient ? (
          <>
            <Text>
              <strong>Patient ID:</strong> {currentPatient.id}
            </Text>
            <Text>
              <strong>Name:</strong> {currentPatient.name}
            </Text>
            <Text>
              <strong>Status:</strong> {currentPatient.status}
            </Text>
            <Button
              onClick={() => handleStatusUpdate("Stable")}
              colorScheme="green"
            >
              Mark as Stable
            </Button>
            <Button
              onClick={() => handleStatusUpdate("Critical")}
              colorScheme="red"
            >
              Mark as Critical
            </Button>
            <Button
              onClick={() => handleTransfer("newFacilityId")}
              colorScheme="blue"
            >
              Transfer Patient
            </Button>
          </>
        ) : (
          <Text>No patient selected</Text>
        )}
      </VStack>
    </Box>
  );
}

export default PatientManagement;
