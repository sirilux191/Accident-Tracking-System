import React, { useEffect, useState, useContext } from "react";
import { Box, Heading, Text, Spinner, VStack } from "@chakra-ui/react";
import { AuthContext } from "../contexts/AuthContext";
import { FacilityContext } from "../contexts/FacilityContext";
import { AmbulanceContext } from "../contexts/AmbulanceContext";

function PendingApproval() {
  const [status, setStatus] = useState("Pending");
  const [isLoading, setIsLoading] = useState(true);
  const { userRole, userId } = useContext(AuthContext);
  const { checkRegistrationStatus: checkFacilityStatus } =
    useContext(FacilityContext);
  const { checkRegistrationStatus: checkAmbulanceStatus } =
    useContext(AmbulanceContext);

  useEffect(() => {
    checkApprovalStatus();
  }, []);

  const checkApprovalStatus = async () => {
    setIsLoading(true);
    try {
      let result;
      if (userRole === "facility") {
        result = await checkFacilityStatus(userId);
      } else if (userRole === "ambulance") {
        result = await checkAmbulanceStatus(userId);
      }
      setStatus(result);
    } catch (error) {
      console.error("Error checking approval status:", error);
      setStatus("Error");
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <Box
        p={8}
        textAlign="center"
      >
        <Spinner size="xl" />
        <Text mt={4}>Checking registration status...</Text>
      </Box>
    );
  }

  return (
    <Box p={8}>
      <VStack
        spacing={4}
        align="stretch"
      >
        <Heading
          as="h2"
          size="lg"
        >
          Registration Status
        </Heading>
        {status === "Pending" ? (
          <Text fontSize="xl">
            Your registration is pending approval. Please check back later.
          </Text>
        ) : status === "Approved" ? (
          <Text
            fontSize="xl"
            color="green.500"
          >
            Your registration has been approved! You can now log in to your
            dashboard.
          </Text>
        ) : (
          <Text
            fontSize="xl"
            color="red.500"
          >
            There was an error checking your registration status. Please try
            again later.
          </Text>
        )}
      </VStack>
    </Box>
  );
}

export default PendingApproval;
