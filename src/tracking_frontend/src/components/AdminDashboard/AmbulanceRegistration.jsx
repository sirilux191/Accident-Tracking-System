import React, { useState, useContext } from "react";
import {
  Box,
  Heading,
  VStack,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
import { AmbulanceContext } from "../../contexts/AmbulanceContext";

function AmbulanceRegistration() {
  const { createAmbulance } = useContext(AmbulanceContext);
  const toast = useToast();

  const [location, setLocation] = useState({
    latitude: "",
    longitude: "",
    address: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createAmbulance(location);
      toast({
        title: "Ambulance Registered",
        description: "Your ambulance has been successfully registered.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      // Reset form
      setLocation({ latitude: "", longitude: "", address: "" });
    } catch (error) {
      toast({
        title: "Registration Failed",
        description:
          error.message || "An error occurred while registering the ambulance.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box>
      <Heading
        as="h4"
        size="md"
        mb={4}
      >
        Ambulance Registration
      </Heading>
      <form onSubmit={handleSubmit}>
        <VStack
          spacing={4}
          align="stretch"
        >
          <Input
            placeholder="Latitude"
            value={location.latitude}
            onChange={(e) =>
              setLocation({ ...location, latitude: e.target.value })
            }
          />
          <Input
            placeholder="Longitude"
            value={location.longitude}
            onChange={(e) =>
              setLocation({ ...location, longitude: e.target.value })
            }
          />
          <Input
            placeholder="Address"
            value={location.address}
            onChange={(e) =>
              setLocation({ ...location, address: e.target.value })
            }
          />
          <Button
            type="submit"
            colorScheme="green"
          >
            Register Ambulance
          </Button>
        </VStack>
      </form>
    </Box>
  );
}

export default AmbulanceRegistration;
