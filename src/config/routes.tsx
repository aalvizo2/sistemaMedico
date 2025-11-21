import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Login from "../pages/Login/Login";
import Dashboard from "../pages/Login/Dashboard/Dashboard";
import AgregarHistorial from "../pages/Login/AgregarHistorial/AgregarHistorial";
import EditarPaciente from "../pages/EditarPaciente/Editar";
import Papeleria from "../pages/PapeleriaReciclaje/Papeleria";
import BloodType from "../pages/BloodType/BloodType";
import Seguimiento from "../pages/Seguimiento/Seguimiento";
import Notas from "../pages/Notas/Notas";
import Perfil from "../pages/Perfil/Perfil";

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

      <Route 
         path="/editar"
         element={
          isAuthenticated ? (
            <EditarPaciente />
          ) : (
            <Navigate to="/" />
          )
         }
      />

      <Route 
         path="/eliminar"
         element={
          isAuthenticated ? (
            <Papeleria />
          ) : (
            <Navigate to="/" />
          )
         } 
      />
      <Route 
        path="tipo-sangre"
        element={
          isAuthenticated? (
            <BloodType />
          ): (
            <Navigate to="/" />
          )
        }
      
      />

      <Route 
        path="seguimiento"
        element={
          isAuthenticated? (
            <Seguimiento />
          ): (
            <Navigate to="/" />
          )
        }
      
      />
      <Route 
        path="notas"
        element={
          isAuthenticated? (
            <Notas />
          ): (
            <Navigate to="/" />
          )
        }
      
      />

      <Route 
        path="perfil"
        element={<Perfil />}
      />
    </Routes>
  );
};

export default AppRoutes;
