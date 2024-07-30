import React, { createContext, useState, useEffect } from "react";
import { AuthClient } from "@dfinity/auth-client";
import { HttpAgent } from "@dfinity/agent";
import { createActor as createAdminActor } from "../../../declarations/adminCanister";
import { createActor as createFacilityActor } from "../../../declarations/facilityCanister";
import { createActor as createReportActor } from "../../../declarations/reportCanister";
import { createActor as createAmbulanceActor } from "../../../declarations/ambulanceCanister";
import { createActor as createPatientActor } from "../../../declarations/patientCanister";
import { createActor as createAccidentActor } from "../../../declarations/accidentCanister";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [actors, setActors] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const initializeActors = async () => {
    try {
      const authClient = await AuthClient.create();
      if (await authClient.isAuthenticated()) {
        const identity = authClient.getIdentity();
        const agent = new HttpAgent({ identity });

        if (process.env.DFX_NETWORK !== "ic") {
          await agent.fetchRootKey().catch(console.error);
        }

        const adminActor = createAdminActor(
          process.env.CANISTER_ID_ADMINCANISTER,
          { agent }
        );
        const facilityActor = createFacilityActor(
          process.env.CANISTER_ID_FACILITYCANISTER,
          { agent }
        );
        const reportActor = createReportActor(
          process.env.CANISTER_ID_REPORTCANISTER,
          { agent }
        );
        const ambulanceActor = createAmbulanceActor(
          process.env.CANISTER_ID_AMBULANCECANISTER,
          { agent }
        );
        const patientActor = createPatientActor(
          process.env.CANISTER_ID_PATIENTCANISTER,
          { agent }
        );
        const accidentActor = createAccidentActor(
          process.env.CANISTER_ID_ACCIDENTCANISTER,
          { agent }
        );

        setActors({
          adminActor,
          facilityActor,
          reportActor,
          ambulanceActor,
          patientActor,
          accidentActor,
        });
        setIsAuthenticated(true);
        setIsLoading(false);
      } else {
        throw new Error("Not authenticated");
      }
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    initializeActors();
  }, []);

  const login = async () => {
    const authClient = await AuthClient.create();
    await new Promise((resolve) => {
      authClient.login({
        identityProvider: process.env.II_URL,
        onSuccess: resolve,
      });
    });
    await initializeActors();
  };

  const logout = async () => {
    const authClient = await AuthClient.create();
    await authClient.logout();
    setIsAuthenticated(false);
    setUserRole(null);
    setActors(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userRole,
        actors,
        isLoading,
        error,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
