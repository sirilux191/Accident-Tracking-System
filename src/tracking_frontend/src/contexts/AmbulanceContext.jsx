import React, { createContext, useState, useContext, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import {
  registerAmbulance,
  assignAmbulance,
  updateAmbulanceStatus,
  updateAmbulanceLocation,
  getAmbulance,
  checkRegistrationStatus,
  getActiveAssignment,
} from "../services/ambulanceService";

export const AmbulanceContext = createContext();

export const AmbulanceProvider = ({ children }) => {
  const { actors } = useContext(AuthContext);
  const [ambulances, setAmbulances] = useState([]);
  const [currentAmbulance, setCurrentAmbulance] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (actors) {
      fetchAmbulances();
    }
  }, [actors]);

  const fetchAmbulances = async () => {
    setIsLoading(true);
    try {
      const result = await listAmbulances(actors.ambulanceActor);
      setAmbulances(result);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  const fetchAmbulance = async (ambulanceId) => {
    setIsLoading(true);
    try {
      const result = await getAmbulance(ambulanceId, actors.ambulanceActor);
      setCurrentAmbulance(result);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  const createAmbulance = async (location) => {
    setIsLoading(true);
    try {
      const result = await registerAmbulance(location, actors.adminActor);
      setAmbulances([...ambulances, result]);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  const assignToAccident = async (ambulanceId, accidentId) => {
    setIsLoading(true);
    try {
      const result = await assignAmbulance(
        ambulanceId,
        accidentId,
        actors.ambulanceActor
      );
      setCurrentAmbulance(result);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  const updateStatus = async (ambulanceId, status) => {
    setIsLoading(true);
    try {
      const result = await updateAmbulanceStatus(
        ambulanceId,
        status,
        actors.ambulanceActor
      );
      setCurrentAmbulance(result);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  const updateLocation = async (ambulanceId, location) => {
    setIsLoading(true);
    try {
      const result = await updateAmbulanceLocation(
        ambulanceId,
        location,
        actors.ambulanceActor
      );
      setCurrentAmbulance(result);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  return (
    <AmbulanceContext.Provider
      value={{
        ambulances,
        currentAmbulance,
        isLoading,
        error,
        fetchAmbulances,
        fetchAmbulance,
        createAmbulance,
        assignToAccident,
        updateStatus,
        updateLocation,
      }}
    >
      {children}
    </AmbulanceContext.Provider>
  );
};
