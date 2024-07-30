import React, { createContext, useState, useContext, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import {
  createAccidentReport,
  updateAccidentStatus,
  assignPatientToAccident,
  getAccidentReport,
  closeAccidentCase,
  reassignAmbulance,
} from "../services/accidentService";

export const AccidentContext = createContext();

export const AccidentProvider = ({ children }) => {
  const { actors } = useContext(AuthContext);
  const [accidents, setAccidents] = useState([]);
  const [currentAccident, setCurrentAccident] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAccidentReport = async (accidentId) => {
    setIsLoading(true);
    try {
      const result = await getAccidentReport(accidentId, actors.accidentActor);
      setCurrentAccident(result);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  const reportAccident = async (accidentDetails) => {
    setIsLoading(true);
    try {
      const result = await createAccidentReport(
        accidentDetails,
        actors.accidentActor
      );
      setAccidents([...accidents, result]);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  const updateStatus = async (accidentId, status) => {
    setIsLoading(true);
    try {
      const result = await updateAccidentStatus(
        accidentId,
        status,
        actors.accidentActor
      );
      setCurrentAccident(result);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  const assignPatient = async (accidentId, patientId) => {
    setIsLoading(true);
    try {
      const result = await assignPatientToAccident(
        accidentId,
        patientId,
        actors.accidentActor
      );
      setCurrentAccident(result);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  const closeAccident = async (accidentId) => {
    setIsLoading(true);
    try {
      const result = await closeAccidentCase(accidentId, actors.accidentActor);
      setCurrentAccident(result);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  const reassignAmbulanceToAccident = async (accidentId, newAmbulanceId) => {
    setIsLoading(true);
    try {
      const result = await reassignAmbulance(
        accidentId,
        newAmbulanceId,
        actors.accidentActor
      );
      setCurrentAccident(result);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  return (
    <AccidentContext.Provider
      value={{
        accidents,
        currentAccident,
        isLoading,
        error,
        fetchAccidentReport,
        reportAccident,
        updateStatus,
        assignPatient,
        closeAccident,
        reassignAmbulanceToAccident,
      }}
    >
      {children}
    </AccidentContext.Provider>
  );
};
