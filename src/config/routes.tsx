import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Login from "../pages/Login/Login";
import Dashboard from "../pages/Login/Dashboard/Dashboard";
import AgregarHistorial from "../pages/Login/AgregarHistorial/AgregarHistorial";

const AppRoutes: React.FC = () => {
  const { isAuthenticated, login } = useAuth();

  return (
    <Routes>
      {/* Ruta raíz */}
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to="/dashboard" />
          ) : (
            <Login onLogin={login} />
          )
        }
      />

      {/* Ruta del Dashboard */}
      <Route
        path="/dashboard"
        element={
          isAuthenticated ? (
            <Dashboard />
          ) : (
            <Navigate to="/" />
          )
        }
      />

      <Route
         path="/nuevo"
         element={
           isAuthenticated ? (
             <AgregarHistorial />
           ) : (
             <Navigate to="/" />
           )
         }
      />
    </Routes>
  );
};

export default AppRoutes;
