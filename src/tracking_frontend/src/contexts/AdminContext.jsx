import React, { createContext, useState, useContext, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import {
  listPendingRegistrations,
  approveFacility,
  approveAmbulance,
  getUserRole,
  getSystemOverview,
} from "../services/adminService";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const { actors } = useContext(AuthContext);
  const [pendingRegistrations, setPendingRegistrations] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const [systemOverview, setSystemOverview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (actors) {
      fetchUserRole();
      fetchSystemOverview();
      fetchPendingRegistrations();
    }
  }, [actors]);

  const fetchPendingRegistrations = async () => {
    setIsLoading(true);
    try {
      const result = await listPendingRegistrations(actors.adminActor);
      setPendingRegistrations(result);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  const fetchUserRole = async () => {
    setIsLoading(true);
    try {
      const result = await getUserRole(actors.adminActor);
      setUserRole(result);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  const fetchSystemOverview = async () => {
    setIsLoading(true);
    try {
      const result = await getSystemOverview(actors.adminActor);
      setSystemOverview(result);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  const approveFacilityRegistration = async (facilityId) => {
    setIsLoading(true);
    try {
      const result = await approveFacility(facilityId, actors.adminActor);
      setPendingRegistrations((prev) =>
        prev.filter((registration) => registration.id !== facilityId)
      );
      return result;
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  const approveAmbulanceRegistration = async (ambulanceId) => {
    setIsLoading(true);
    try {
      const result = await approveAmbulance(ambulanceId, actors.adminActor);
      setPendingRegistrations((prev) =>
        prev.filter((registration) => registration.id !== ambulanceId)
      );
      return result;
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  return (
    <AdminContext.Provider
      value={{
        pendingRegistrations,
        userRole,
        systemOverview,
        isLoading,
        error,
        fetchPendingRegistrations,
        fetchUserRole,
        fetchSystemOverview,
        approveFacilityRegistration,
        approveAmbulanceRegistration,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
