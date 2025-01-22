import React from "react";
import { useAuth } from "../../../context/AuthContext";
import AppRoutes from "../../../config/routes";
import Sidebar from "../Sidebar";
import Login from "../../../pages/Login/Login";
import './AppContent.css';
import Navbar from "../Navbar/Navbar";

const AppContent: React.FC = () => {
  const { isAuthenticated, login, logout } = useAuth();

  if (!isAuthenticated || !localStorage.getItem("username")) {
    console.log("isAuthenticated:", isAuthenticated);
    console.log("username in localStorage:", localStorage.getItem("username"));
    // Diseño de pantalla completa para el login
    return (
      
        <Login onLogin={login} />
      
    );
  }else{
    console.log("isAuthenticated:", isAuthenticated);
    console.log("username in localStorage:", localStorage.getItem("username"));
      // Diseño con Sidebar cuando el usuario está autenticado
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
    {/* Navbar en la parte superior */}
    <div style={{ flexShrink: 0, width: '100%'}}>
      <Navbar onLogout={logout} />
    </div>
  
    {/* Contenedor principal con Sidebar y Contenido */}
    <div style={{ display: "flex", overflow: "hidden" }}>
      
      <div>
        <Sidebar />
      </div>
  
      {/* Contenido principal */}
      <div
        className="content"
      >
        <AppRoutes />
      </div>
    </div>
  </div>
  
  );
  }


};

export default AppContent;
