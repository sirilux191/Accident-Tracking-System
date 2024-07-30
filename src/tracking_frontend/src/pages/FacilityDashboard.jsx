import React, { useEffect, useContext } from "react";
import { Box, Heading, VStack, Text } from "@chakra-ui/react";
import { FacilityContext } from "../contexts/FacilityContext";
import BedManagement from "../components/FacilityDashboard/BedManagement";
import PatientManagement from "../components/FacilityDashboard/PatientManagement";
import AccidentReporting from "../components/FacilityDashboard/AccidentReporting";

function FacilityDashboard() {
  const { currentFacility, isLoading, error, fetchFacilityDetails } =
    useContext(FacilityContext);
  const { userId } = useContext(AuthContext);

  useEffect(() => {
    if (userId) {
      fetchFacilityDetails(userId);
    }
  }, [userId]);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text color="red.500">{error}</Text>;
  }

  if (!currentFacility) {
    return <Text>No facility data available</Text>;
  }

  return (
    <Box p={8}>
      <Heading
        as="h1"
        size="xl"
        mb={6}
      >
        Facility Dashboard
      </Heading>
      <VStack
        spacing={8}
        align="stretch"
      >
        <BedManagement
          availableBeds={currentFacility.availableBeds}
          capacity={currentFacility.capacity}
        />
        <PatientManagement />
        <AccidentReporting />
      </VStack>
    </Box>
  );
}

export default FacilityDashboard;
