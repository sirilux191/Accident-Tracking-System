import React, { useEffect, useContext } from "react";
import { Box, Heading, VStack, Text } from "@chakra-ui/react";
import { AmbulanceContext } from "../contexts/AmbulanceContext";
import AmbulanceStatus from "../components/AmbulanceDashboard/AmbulanceStatus";
import AccidentAssignment from "../components/AmbulanceDashboard/AccidentAssignment";

function AmbulanceDashboard() {
  const { currentAmbulance, isLoading, error, fetchAmbulance } =
    useContext(AmbulanceContext);
  const { userId } = useContext(AuthContext);

  useEffect(() => {
    if (userId) {
      fetchAmbulance(userId);
    }
  }, [userId]);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text color="red.500">{error}</Text>;
  }

  if (!currentAmbulance) {
    return <Text>No ambulance data available</Text>;
  }

  return (
    <Box p={8}>
      <Heading
        as="h1"
        size="xl"
        mb={6}
      >
        Ambulance Dashboard
      </Heading>
      <VStack
        spacing={8}
        align="stretch"
      >
        <AmbulanceStatus
          status={currentAmbulance.status}
          location={currentAmbulance.currentLocation}
        />
        {currentAmbulance.status === "Available" && <AccidentAssignment />}
      </VStack>
    </Box>
  );
}

export default AmbulanceDashboard;
