import "antd/dist/reset.css";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import InitialPage from "./pages/InitialPage";
import HomePage from "./pages/HomePage";
import AdminHome from "./pages/AdminHome";
import HospitalAdmin from "./pages/Admin/HospitalAdmin";
import DoctorAdmin from "./pages/Admin/DoctorAdmin";
import PharmacyAdmin from "./pages/Admin/PharmacyAdmin";
import LabAdmin from "./pages/Admin/LabAdmin";
import PatientHome from "./pages/Patient/PatientHome";
import PatientAdmin from "./pages/Admin/PatientAdmin";
import PatientTreatments from "./pages/Patient/PatientTreatments";
import PatientTests from "./pages/Patient/PatientTests";
import PatientDrugs from "./pages/Patient/PatientDrugs";
import PatientReports from "./pages/Patient/PatientReports";

import * as dotenv from "dotenv";
import VirtualLabHome from "./pages/virtualLab/VirtualLabHome";
dotenv.config();

function App() {
  const isUserAuthenticated = () => {
    if (localStorage.getItem("health-user-type")) {
      return {
        type: localStorage.getItem("health-user-type"),
        id: localStorage.getItem("health-user-id"),
      };
    }
  };
  return (
    <div className="App">
      {/* Initial */}
      <Routes>
        {!isUserAuthenticated()?.type && !isUserAuthenticated()?.id ? (
          <Route path="/" element={<InitialPage />} />
        ) : isUserAuthenticated()?.type === "admin" ? (
          <Route path="*" element={<Navigate to="/admin-home" />} />
        ) : (
          <Route path="*" element={<Navigate to="/home" />} />
        )}
        {/* Admin Home */}
        {isUserAuthenticated()?.type === "admin" &&
        isUserAuthenticated()?.id ? (
          <Route path="/admin-home" element={<AdminHome />} />
        ) : (
          <Route path="*" element={<Navigate to="/" />} />
        )}
        {/* Admin Hospital */}
        {isUserAuthenticated()?.type === "admin" &&
        isUserAuthenticated()?.id ? (
          <Route path="/admin-hospital" element={<HospitalAdmin />} />
        ) : (
          <Route path="*" element={<Navigate to="/" />} />
        )}
        {isUserAuthenticated()?.type === "admin" &&
        isUserAuthenticated()?.id ? (
          <Route path="/admin-doctor" element={<DoctorAdmin />} />
        ) : (
          <Route path="*" element={<Navigate to="/" />} />
        )}
        {isUserAuthenticated()?.type === "admin" &&
        isUserAuthenticated()?.id ? (
          <Route path="/admin-pharmacy" element={<PharmacyAdmin />} />
        ) : (
          <Route path="*" element={<Navigate to="/" />} />
        )}
        {isUserAuthenticated()?.type === "admin" &&
        isUserAuthenticated()?.id ? (
          <Route path="/admin-lab" element={<LabAdmin />} />
        ) : (
          <Route path="*" element={<Navigate to="/" />} />
        )}

        {isUserAuthenticated()?.type === "admin" &&
        isUserAuthenticated()?.id ? (
          <Route path="/admin-patient" element={<PatientAdmin />} />
        ) : (
          <Route path="*" element={<Navigate to="/" />} />
        )}

        {isUserAuthenticated()?.type === "client" &&
        isUserAuthenticated()?.id ? (
          <Route path="/patient-home" element={<PatientHome />} />
        ) : (
          <Route path="*" element={<Navigate to="/" />} />
        )}

        {isUserAuthenticated()?.type === "client" &&
        isUserAuthenticated()?.id ? (
          <Route path="/patient-treatments" element={<PatientTreatments />} />
        ) : (
          <Route path="*" element={<Navigate to="/" />} />
        )}
        {isUserAuthenticated()?.type === "client" &&
        isUserAuthenticated()?.id ? (
          <Route path="/patient-tests" element={<PatientTests />} />
        ) : (
          <Route path="*" element={<Navigate to="/" />} />
        )}
        {isUserAuthenticated()?.type === "client" &&
        isUserAuthenticated()?.id ? (
          <Route path="/patient-drugs" element={<PatientDrugs />} />
        ) : (
          <Route path="*" element={<Navigate to="/" />} />
        )}
        {isUserAuthenticated()?.type === "client" &&
        isUserAuthenticated()?.id ? (
          <Route path="/patient-reports" element={<PatientReports />} />
        ) : (
          <Route path="*" element={<Navigate to="/" />} />
        )}

        {isUserAuthenticated()?.type === "client" &&
        isUserAuthenticated()?.id ? (
          <Route path="/virtuallab" element={<VirtualLabHome />} />
        ) : (
          <Route path="*" element={<Navigate to="/" />} />
        )}

        {/* Client Home */}
        {isUserAuthenticated()?.type === "client" &&
        isUserAuthenticated()?.id ? (
          <Route path="/home" element={<HomePage />} />
        ) : (
          <Route path="*" element={<Navigate to="/" />} />
        )}
      </Routes>
    </div>
  );
}

export default App;
