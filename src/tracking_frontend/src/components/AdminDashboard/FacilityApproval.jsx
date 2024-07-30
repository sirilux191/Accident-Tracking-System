import React, { useEffect, useContext } from "react";
import { Box, Heading, Button, Text, VStack, Spinner } from "@chakra-ui/react";
import { AdminContext } from "../../contexts/AdminContext";

function FacilityApproval() {
  const {
    pendingRegistrations,
    isLoading,
    error,
    fetchPendingRegistrations,
    approveRegistration,
  } = useContext(AdminContext);

  useEffect(() => {
    fetchPendingRegistrations();
  }, []);

  const handleApprove = (facilityId) => {
    approveRegistration(facilityId);
  };

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
        Facility Approval
      </Heading>
      <VStack
        spacing={4}
        align="stretch"
      >
        {pendingRegistrations.map((facility) => (
          <Box
            key={facility.id}
            p={4}
            borderWidth="1px"
            borderRadius="lg"
          >
            <Text>
              <strong>Name:</strong> {facility.name}
            </Text>
            <Text>
              <strong>Location:</strong> {facility.location.address}
            </Text>
            <Text>
              <strong>Services:</strong> {facility.services.join(", ")}
            </Text>
            <Text>
              <strong>Capacity:</strong> {facility.capacity}
            </Text>
            <Button
              colorScheme="teal"
              mt={2}
              onClick={() => handleApprove(facility.id)}
            >
              Approve
            </Button>
          </Box>
        ))}
      </VStack>
    </Box>
  );
}

export default FacilityApproval;
