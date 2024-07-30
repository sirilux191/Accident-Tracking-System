import React, { useEffect, useContext } from "react";
import { Box, Heading, Text, VStack, Spinner } from "@chakra-ui/react";
import { AdminContext } from "../../contexts/AdminContext";

function SystemOverview() {
  const { systemOverview, isLoading, error, fetchSystemOverview } =
    useContext(AdminContext);

  useEffect(() => {
    fetchSystemOverview();
  }, []);

  if (isLoading) {
    return <Spinner />;
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
        System Overview
      </Heading>
      <VStack
        spacing={4}
        align="stretch"
      >
        <Text>
          <strong>Total Facilities:</strong> {systemOverview.totalFacilities}
        </Text>
        <Text>
          <strong>Total Ambulances:</strong> {systemOverview.totalAmbulances}
        </Text>
        <Text>
          <strong>Active Accidents:</strong> {systemOverview.activeAccidents}
        </Text>
        <Text>
          <strong>Total Patients:</strong> {systemOverview.totalPatients}
        </Text>
      </VStack>
    </Box>
  );
}

export default SystemOverview;
