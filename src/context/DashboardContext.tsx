import React, { createContext, useContext, useState, ReactNode } from "react";
import { PacientesRepositoryImpl } from "../domain/repositories/PacientesRepositoryImpl";
import { PacientesUseCases } from "../core/useCases/PacientesUseCases";
import { getUsers } from "../domain/entities/MedicalUsers";


const pacienteRepository = new PacientesRepositoryImpl();
const pacientesUseCases = new PacientesUseCases(pacienteRepository);

interface PacienteContextProps {
  paciente: getUsers | null;
  setPaciente: (paciente: getUsers | null) => void;
  fetchPaciente: (id: string) => Promise<void>;
}

const PacienteContext = createContext<PacienteContextProps | undefined>(
  undefined
);

export const PacienteProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [paciente, setPaciente] = useState<getUsers | null>(null);

  const fetchPaciente = async (id: string) => {
    try {
      const result = await pacientesUseCases.getUserById(id);
      //@ts-expect-error
      setPaciente(result);
    } catch (error) {
      console.error("Error al obtener paciente:", error);
      setPaciente(null);
    }
  };

  return (
    <PacienteContext.Provider value={{ paciente, setPaciente, fetchPaciente }}>
      {children}
    </PacienteContext.Provider>
  );
};

export const usePacienteContext = () => {
  const context = useContext(PacienteContext);
  if (!context) {
    throw new Error(
      "usePacienteContext debe ser usado dentro de un PacienteProvider"
    );
  }
  return context;
};
