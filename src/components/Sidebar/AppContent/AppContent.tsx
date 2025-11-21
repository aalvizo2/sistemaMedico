// AppContent.tsx
import React from "react";
import { useAuth } from "../../../context/AuthContext";
import AppRoutes from "../../../config/routes";
import Sidebar from "../Sidebar";
import Login from "../../../pages/Login/Login";
import "./AppContent.css";
import Navbar from "../Navbar/Navbar";
import { useLocation } from "react-router-dom";

const AppContent: React.FC = () => {
  const { isAuthenticated, login, logout } = useAuth();
  const location = useLocation();

  // Rutas que NO usarán Sidebar ni Navbar
  const noLayoutRoutes = ["/perfil"];

  if (!isAuthenticated || !localStorage.getItem("username")) {
    return <Login onLogin={login} />;
  }

  // Si está en /perfil → no mostrar layout
  if (noLayoutRoutes.includes(location.pathname)) {
    return <AppRoutes />;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* Navbar */}
      <div style={{ flexShrink: 0, width: "100%" }}>
        <Navbar onLogout={logout} />
      </div>

      {/* Sidebar + Contenido */}
      <div style={{ display: "flex", overflow: "hidden" }}>
        <div>
          <Sidebar />
        </div>

        <div className="content">
          <AppRoutes />
        </div>
      </div>
    </div>
  );
};

export default AppContent;
