import { handleResult, handleError } from "../utils/helpers";

export const createPatientRecord = async (record, patientActor) => {
  try {
    const result = await patientActor.createPatientRecord(record);
    return handleResult(result);
  } catch (error) {
    return handleError("Error creating patient record", error);
  }
};

export const updatePatientStatus = async (patientId, status, patientActor) => {
  try {
    const result = await patientActor.updatePatientStatus(patientId, status);
    return handleResult(result);
  } catch (error) {
    return handleError("Error updating patient status", error);
  }
};

export const updatePatientFacility = async (
  patientId,
  newFacilityId,
  patientActor
) => {
  try {
    const result = await patientActor.updatePatientFacility(
      patientId,
      newFacilityId
    );
    return handleResult(result);
  } catch (error) {
    return handleError("Error updating patient facility", error);
  }
};

export const getPatientRecord = async (patientId, patientActor) => {
  try {
    const result = await patientActor.getPatientRecord(patientId);
    return handleResult(result);
  } catch (error) {
    return handleError("Error getting patient record", error);
  }
};

export const transferPatient = async (
  patientId,
  newFacilityId,
  patientActor
) => {
  try {
    const result = await patientActor.transferPatient(patientId, newFacilityId);
    return handleResult(result);
  } catch (error) {
    return handleError("Error transferring patient", error);
  }
};
