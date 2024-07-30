import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { FacilityProvider } from "./contexts/FacilityContext";
import { AmbulanceProvider } from "./contexts/AmbulanceContext";
import { PatientProvider } from "./contexts/PatientContext";
import { AccidentProvider } from "./contexts/AccidentContext";
import { ReportProvider } from "./contexts/ReportContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LandingPage from "./components/LandingPage";
import Login from "./pages/Login";
import PendingApproval from "./components/PendingApproval";
import AdminDashboard from "./pages/AdminDashboard";
import FacilityDashboard from "./pages/FacilityDashboard";
import AmbulanceDashboard from "./pages/AmbulanceDashboard";
import FacilityRegistration from "./components/AdminDashboard/FacilityRegistration";
import AmbulanceRegistration from "./components/AdminDashboard/AmbulanceRegistration";

function App() {
  return (
    <AuthProvider>
      <FacilityProvider>
        <AmbulanceProvider>
          <PatientProvider>
            <AccidentProvider>
              <ReportProvider>
                <ChakraProvider>
                  <Router>
                    <Header />
                    <Routes>
                      <Route
                        path="/"
                        element={<LandingPage />}
                      />
                      <Route
                        path="/login"
                        element={<Login />}
                      />
                      <Route
                        path="/register/facility"
                        element={<FacilityRegistration />}
                      />
                      <Route
                        path="/register/ambulance"
                        element={<AmbulanceRegistration />}
                      />
                      <Route
                        path="/pending-approval"
                        element={<PendingApproval />}
                      />
                      <Route
                        path="/admin-dashboard"
                        element={<AdminDashboard />}
                      />
                      <Route
                        path="/facility-dashboard"
                        element={<FacilityDashboard />}
                      />
                      <Route
                        path="/ambulance-dashboard"
                        element={<AmbulanceDashboard />}
                      />
                    </Routes>
                    <Footer />
                  </Router>
                </ChakraProvider>
              </ReportProvider>
            </AccidentProvider>
          </PatientProvider>
        </AmbulanceProvider>
      </FacilityProvider>
    </AuthProvider>
  );
}

export default App;
