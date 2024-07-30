import React, { useState, useContext } from "react";
import {
  Box,
  Heading,
  VStack,
  Input,
  Button,
  useToast,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { FacilityContext } from "../../contexts/FacilityContext";

function FacilityRegistration() {
  const { registerFacility } = useContext(FacilityContext);
  const toast = useToast();

  const [facilityData, setFacilityData] = useState({
    name: "",
    location: { address: "", latitude: "", longitude: "" },
    services: "",
    capacity: "",
    contactInfo: { phoneNumber: "", email: "" },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFacilityData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setFacilityData((prevData) => ({
      ...prevData,
      location: {
        ...prevData.location,
        [name]: value,
      },
    }));
  };

  const handleContactInfoChange = (e) => {
    const { name, value } = e.target;
    setFacilityData((prevData) => ({
      ...prevData,
      contactInfo: {
        ...prevData.contactInfo,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerFacility({
        ...facilityData,
        services: facilityData.services.split(",").map((s) => s.trim()),
        capacity: parseInt(facilityData.capacity, 10),
      });
      toast({
        title: "Facility Registered",
        description: "Your facility has been successfully registered.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      // Reset form
      setFacilityData({
        name: "",
        location: { address: "", latitude: "", longitude: "" },
        services: "",
        capacity: "",
        contactInfo: { phoneNumber: "", email: "" },
      });
    } catch (error) {
      toast({
        title: "Registration Failed",
        description:
          error.message || "An error occurred while registering the facility.",
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
        Facility Registration
      </Heading>
      <form onSubmit={handleSubmit}>
        <VStack
          spacing={4}
          align="stretch"
        >
          <FormControl>
            <FormLabel>Facility Name</FormLabel>
            <Input
              name="name"
              value={facilityData.name}
              onChange={handleInputChange}
              placeholder="Facility Name"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Address</FormLabel>
            <Input
              name="address"
              value={facilityData.location.address}
              onChange={handleLocationChange}
              placeholder="Address"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Latitude</FormLabel>
            <Input
              name="latitude"
              value={facilityData.location.latitude}
              onChange={handleLocationChange}
              placeholder="Latitude"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Longitude</FormLabel>
            <Input
              name="longitude"
              value={facilityData.location.longitude}
              onChange={handleLocationChange}
              placeholder="Longitude"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Services (comma-separated)</FormLabel>
            <Input
              name="services"
              value={facilityData.services}
              onChange={handleInputChange}
              placeholder="Services (comma-separated)"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Capacity</FormLabel>
            <Input
              name="capacity"
              type="number"
              value={facilityData.capacity}
              onChange={handleInputChange}
              placeholder="Capacity"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Phone Number</FormLabel>
            <Input
              name="phoneNumber"
              value={facilityData.contactInfo.phoneNumber}
              onChange={handleContactInfoChange}
              placeholder="Phone Number"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              type="email"
              value={facilityData.contactInfo.email}
              onChange={handleContactInfoChange}
              placeholder="Email"
            />
          </FormControl>
          <Button
            type="submit"
            colorScheme="blue"
          >
            Register Facility
          </Button>
        </VStack>
      </form>
    </Box>
  );
}

export default FacilityRegistration;
