import React, { createContext, useState, useContext, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import {
  generateReport,
  getReport,
  listReportsForAccident,
  listReportsForPatient,
} from "../services/reportService";

export const ReportContext = createContext();

export const ReportProvider = ({ children }) => {
  const { actors } = useContext(AuthContext);
  const [reports, setReports] = useState([]);
  const [currentReport, setCurrentReport] = useState(null);
  const [accidentReports, setAccidentReports] = useState([]);
  const [patientReports, setPatientReports] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const createReport = async (reportData) => {
    setIsLoading(true);
    try {
      const result = await generateReport(reportData, actors.reportActor);
      setReports([...reports, result]);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  const fetchReport = async (reportId) => {
    setIsLoading(true);
    try {
      const result = await getReport(reportId, actors.reportActor);
      setCurrentReport(result);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  const fetchReportsForAccident = async (accidentId) => {
    setIsLoading(true);
    try {
      const result = await listReportsForAccident(
        accidentId,
        actors.reportActor
      );
      setAccidentReports(result);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  const fetchReportsForPatient = async (patientId) => {
    setIsLoading(true);
    try {
      const result = await listReportsForPatient(patientId, actors.reportActor);
      setPatientReports(result);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  return (
    <ReportContext.Provider
      value={{
        reports,
        currentReport,
        accidentReports,
        patientReports,
        isLoading,
        error,
        createReport,
        fetchReport,
        fetchReportsForAccident,
        fetchReportsForPatient,
      }}
    >
      {children}
    </ReportContext.Provider>
  );
};
