import { handleResult, handleError } from "../utils/helpers";

export const registerAmbulance = async (location, adminActor) => {
  try {
    const result = await adminActor.registerAmbulance(location);
    return handleResult(result);
  } catch (error) {
    return handleError("Error registering ambulance", error);
  }
};

export const assignAmbulance = async (
  ambulanceId,
  accidentId,
  ambulanceActor
) => {
  try {
    const result = await ambulanceActor.assignAmbulance(
      ambulanceId,
      accidentId
    );
    return handleResult(result);
  } catch (error) {
    return handleError("Error assigning ambulance", error);
  }
};

export const updateAmbulanceStatus = async (
  ambulanceId,
  status,
  ambulanceActor
) => {
  try {
    const result = await ambulanceActor.updateAmbulanceStatus(
      ambulanceId,
      status
    );
    return handleResult(result);
  } catch (error) {
    return handleError("Error updating ambulance status", error);
  }
};

export const updateAmbulanceLocation = async (
  ambulanceId,
  location,
  ambulanceActor
) => {
  try {
    const result = await ambulanceActor.updateAmbulanceLocation(
      ambulanceId,
      location
    );
    return handleResult(result);
  } catch (error) {
    return handleError("Error updating ambulance location", error);
  }
};

export const getAmbulance = async (ambulanceId, ambulanceActor) => {
  try {
    const result = await ambulanceActor.getAmbulance(ambulanceId);
    return handleResult(result);
  } catch (error) {
    return handleError("Error getting ambulance details", error);
  }
};

export const checkRegistrationStatus = async (ambulanceId, ambulanceActor) => {
  try {
    const result = await ambulanceActor.checkRegistrationStatus(ambulanceId);
    return handleResult(result);
  } catch (error) {
    return handleError("Error checking registration status", error);
  }
};

export const getActiveAssignment = async (ambulanceId, ambulanceActor) => {
  try {
    const result = await ambulanceActor.getActiveAssignment(ambulanceId);
    return handleResult(result);
  } catch (error) {
    return handleError("Error getting active assignment", error);
  }
};
