import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AppLayout from "./pages/AppLayout";
import Welcome from "./pages/Welcome";
import UploadDesign from "./pages/UploadDesign";
import Reports from "./pages/Reports";
import Project from "./pages/Project";
import MWO from "./pages/MWO";
import OSPODN from "./pages/OSPODN";
import OHAccessories from "./pages/OHAccessories";
import FTTHDetails from "./pages/FTTHDetails";
import Verification from "./pages/Verification";
import Help from "./pages/Help";
import Settings from "./pages/Settings";

function Page({ title }) {
  return (
    <div className="module-page">
      <h1>{title}</h1>
      <p>This module is ready for development.</p>
      <div className="module-card">
        <h2>{title} Workspace</h2>
        <p>Feature controls, forms, tables and exports will appear here.</p>
      </div>
    </div>
  );
}

function App() {
  const isLoggedIn = localStorage.getItem("genex-login") === "true";

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/app"
          element={isLoggedIn ? <AppLayout /> : <Navigate to="/" />}
        >
          <Route index element={<Welcome />} />
          <Route path="project" element={<Project />} />
          <Route path="upload" element={<UploadDesign />} />
          <Route path="mwo" element={<MWO />} />
          <Route path="osp-odn" element={<OSPODN />} />
          <Route path="oh-accessories" element={<OHAccessories />} />
          <Route path="ftth-details" element={<FTTHDetails />} />
          <Route path="verification" element={<Verification />} />
          <Route path="reports" element={<Reports />} />
          <Route path="help" element={<Help />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;