import React, { createContext, useState, useContext, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import {
  createPatientRecord,
  updatePatientStatus,
  getPatientRecord,
  transferPatient,
} from "../services/patientService";

export const PatientContext = createContext();

export const PatientProvider = ({ children }) => {
  const { actors } = useContext(AuthContext);
  const [patients, setPatients] = useState([]);
  const [currentPatient, setCurrentPatient] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPatientRecord = async (patientId) => {
    setIsLoading(true);
    try {
      const result = await getPatientRecord(patientId, actors.patientActor);
      setCurrentPatient(result);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  const addPatientRecord = async (patientData) => {
    setIsLoading(true);
    try {
      const result = await createPatientRecord(
        patientData,
        actors.patientActor
      );
      setPatients([...patients, result]);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  const updatePatientStatusThunk = async (patientId, status) => {
    setIsLoading(true);
    try {
      const result = await updatePatientStatus(
        patientId,
        status,
        actors.patientActor
      );
      setCurrentPatient(result);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  const transferPatientThunk = async (patientId, newFacilityId) => {
    setIsLoading(true);
    try {
      const result = await transferPatient(
        patientId,
        newFacilityId,
        actors.patientActor
      );
      setCurrentPatient(result);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  return (
    <PatientContext.Provider
      value={{
        patients,
        currentPatient,
        isLoading,
        error,
        fetchPatientRecord,
        addPatientRecord,
        updatePatientStatusThunk,
        transferPatientThunk,
      }}
    >
      {children}
    </PatientContext.Provider>
  );
};
