import React, { createContext, useState, useContext, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import {
  addFacility,
  getFacilityDetails,
  updateAvailableBeds,
  reportAccident,
  listFacilities,
} from "../services/facilityService";

export const FacilityContext = createContext();

export const FacilityProvider = ({ children }) => {
  const { actors } = useContext(AuthContext);
  const [facilities, setFacilities] = useState([]);
  const [currentFacility, setCurrentFacility] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (actors) {
      fetchFacilities();
    }
  }, [actors]);

  const fetchFacilities = async () => {
    setIsLoading(true);
    try {
      const result = await listFacilities(actors.facilityActor);
      setFacilities(result);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  const fetchFacilityDetails = async (facilityId) => {
    setIsLoading(true);
    try {
      const result = await getFacilityDetails(facilityId, actors.facilityActor);
      setCurrentFacility(result);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  const registerFacility = async (id, registration) => {
    setIsLoading(true);
    try {
      const result = await addFacility(id, registration, actors.facilityActor);
      setFacilities([...facilities, result]);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  const updateBeds = async (facilityId, beds) => {
    setIsLoading(true);
    try {
      const result = await updateAvailableBeds(
        facilityId,
        beds,
        actors.facilityActor
      );
      setCurrentFacility(result);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  const reportNewAccident = async (facilityId, accidentDetails) => {
    setIsLoading(true);
    try {
      await reportAccident(facilityId, accidentDetails, actors.facilityActor);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  return (
    <FacilityContext.Provider
      value={{
        facilities,
        currentFacility,
        isLoading,
        error,
        fetchFacilities,
        fetchFacilityDetails,
        registerFacility,
        updateBeds,
        reportNewAccident,
      }}
    >
      {children}
    </FacilityContext.Provider>
  );
};
