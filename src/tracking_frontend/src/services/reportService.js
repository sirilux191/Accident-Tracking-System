import { handleResult, handleError } from "../utils/helpers";

export const generateReport = async (report, reportActor) => {
  try {
    const result = await reportActor.generateReport(report);
    return handleResult(result);
  } catch (error) {
    return handleError("Error generating report", error);
  }
};

export const getReport = async (reportId, reportActor) => {
  try {
    const result = await reportActor.getReport(reportId);
    return handleResult(result);
  } catch (error) {
    return handleError("Error getting report", error);
  }
};

export const listReportsForAccident = async (accidentId, reportActor) => {
  try {
    const result = await reportActor.listReportsForAccident(accidentId);
    return handleResult(result);
  } catch (error) {
    return handleError("Error listing reports for accident", error);
  }
};

export const listReportsForPatient = async (patientId, reportActor) => {
  try {
    const result = await reportActor.listReportsForPatient(patientId);
    return handleResult(result);
  } catch (error) {
    return handleError("Error listing reports for patient", error);
  }
};
