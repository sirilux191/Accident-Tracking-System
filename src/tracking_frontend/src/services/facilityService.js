import { handleResult, handleError } from "../utils/helpers";

export const addFacility = async (id, registration, facilityActor) => {
  try {
    const result = await facilityActor.addFacility(id, registration);
    return handleResult(result);
  } catch (error) {
    return handleError("Error adding facility", error);
  }
};

export const getFacilityDetails = async (facilityId, facilityActor) => {
  try {
    const result = await facilityActor.getFacilityDetails(facilityId);
    return handleResult(result);
  } catch (error) {
    return handleError("Error fetching facility details", error);
  }
};

export const updateAvailableBeds = async (facilityId, beds, facilityActor) => {
  try {
    const result = await facilityActor.updateAvailableBeds(facilityId, beds);
    return handleResult(result);
  } catch (error) {
    return handleError("Error updating available beds", error);
  }
};

export const reportAccident = async (
  facilityId,
  accidentDetails,
  facilityActor
) => {
  try {
    const result = await facilityActor.reportAccident(
      facilityId,
      accidentDetails
    );
    return handleResult(result);
  } catch (error) {
    return handleError("Error reporting accident", error);
  }
};

export const listFacilities = async (facilityActor) => {
  try {
    const result = await facilityActor.listFacilities();
    return handleResult(result);
  } catch (error) {
    return handleError("Error listing facilities", error);
  }
};

export const updateFacilityServices = async (
  facilityId,
  services,
  facilityActor
) => {
  try {
    const result = await facilityActor.updateFacilityServices(
      facilityId,
      services
    );
    return handleResult(result);
  } catch (error) {
    return handleError("Error updating facility services", error);
  }
};

export const requestAdditionalResources = async (
  facilityId,
  resourceType,
  quantity,
  facilityActor
) => {
  try {
    const result = await facilityActor.requestAdditionalResources(
      facilityId,
      resourceType,
      quantity
    );
    return handleResult(result);
  } catch (error) {
    return handleError("Error requesting additional resources", error);
  }
};

export const updatePatientCount = async (facilityId, change, facilityActor) => {
  try {
    const result = await facilityActor.updatePatientCount(facilityId, change);
    return handleResult(result);
  } catch (error) {
    return handleError("Error updating patient count", error);
  }
};

export const checkRegistrationStatus = async (facilityId, facilityActor) => {
  try {
    const result = await facilityActor.checkRegistrationStatus(facilityId);
    return handleResult(result);
  } catch (error) {
    return handleError("Error checking registration status", error);
  }
};

export const getActiveCases = async (facilityActor) => {
  try {
    const result = await facilityActor.getActiveCases();
    return handleResult(result);
  } catch (error) {
    return handleError("Error getting active cases", error);
  }
};
