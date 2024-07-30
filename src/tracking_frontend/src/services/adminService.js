import { handleResult, handleError } from "../utils/helpers";

export const listPendingRegistrations = async (adminActor) => {
  try {
    const result = await adminActor.listPendingRegistrations();
    return handleResult(result);
  } catch (error) {
    return handleError("Error listing pending registrations", error);
  }
};

export const approveFacility = async (facilityId, adminActor) => {
  try {
    const result = await adminActor.approveFacility(facilityId);
    return handleResult(result);
  } catch (error) {
    return handleError("Error approving facility", error);
  }
};

export const approveAmbulance = async (ambulanceId, adminActor) => {
  try {
    const result = await adminActor.approveAmbulance(ambulanceId);
    return handleResult(result);
  } catch (error) {
    return handleError("Error approving ambulance", error);
  }
};

export const getUserRole = async (adminActor) => {
  try {
    const result = await adminActor.getUserRole();
    return handleResult(result);
  } catch (error) {
    return handleError("Error getting user role", error);
  }
};

export const getSystemOverview = async (adminActor) => {
  try {
    const result = await adminActor.getSystemOverview();
    return handleResult(result);
  } catch (error) {
    return handleError("Error getting system overview", error);
  }
};
