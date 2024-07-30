import { handleResult, handleError } from "../utils/helpers";

export const createAccidentReport = async (details, accidentActor) => {
  try {
    const result = await accidentActor.createAccidentReport(details);
    return handleResult(result);
  } catch (error) {
    return handleError("Error creating accident report", error);
  }
};

export const updateAccidentStatus = async (
  accidentId,
  status,
  accidentActor
) => {
  try {
    const result = await accidentActor.updateAccidentStatus(accidentId, status);
    return handleResult(result);
  } catch (error) {
    return handleError("Error updating accident status", error);
  }
};

export const assignPatientToAccident = async (
  accidentId,
  patientId,
  accidentActor
) => {
  try {
    const result = await accidentActor.assignPatientToAccident(
      accidentId,
      patientId
    );
    return handleResult(result);
  } catch (error) {
    return handleError("Error assigning patient to accident", error);
  }
};

export const getAccidentReport = async (accidentId, accidentActor) => {
  try {
    const result = await accidentActor.getAccidentReport(accidentId);
    return handleResult(result);
  } catch (error) {
    return handleError("Error getting accident report", error);
  }
};

export const closeAccidentCase = async (accidentId, accidentActor) => {
  try {
    const result = await accidentActor.closeAccidentCase(accidentId);
    return handleResult(result);
  } catch (error) {
    return handleError("Error closing accident case", error);
  }
};

export const reassignAmbulance = async (
  accidentId,
  newAmbulanceId,
  accidentActor
) => {
  try {
    const result = await accidentActor.reassignAmbulance(
      accidentId,
      newAmbulanceId
    );
    return handleResult(result);
  } catch (error) {
    return handleError("Error reassigning ambulance", error);
  }
};
