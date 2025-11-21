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
  setLoading: (loading: boolean)=> void;
  loading: boolean;
  refreshPacientes: () => void;
  pacientes: getUsers[] | null;
  setPacientes: (pacientes: getUsers[]) => void;
}

const PacienteContext = createContext<PacienteContextProps | undefined>(
  undefined
);

export const PacienteProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [paciente, setPaciente] = useState<getUsers | null>(null);
  const [loading, setLoading] = useState(false);
  const [pacientes, setPacientes]= useState<getUsers[]>([]);

  const fetchPaciente = async (id: string) => {
    setLoading(true);
    const delay= (ms: number) => new Promise(resolve=> setTimeout(resolve, ms));
    try {
      await delay(3000)
      const result = await pacientesUseCases.getUserById(id);
      //@ts-expect-error
      setPaciente(result);
    } catch (error) {
      console.error("Error al obtener paciente:", error);
      setPaciente(null);
    }finally{
      setLoading(false)
    }
  };

  const refreshPacientes= async() => {
    setLoading(true);
    const delay= (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
    try{
       await delay(1000);
       const response= await pacientesUseCases.getPacientes();
       setPacientes(response);
    }catch(error){
        console.error('Error al refrescar los pacientes', error);
    }finally{
      setLoading(false);
    }
  }

  return (
    <PacienteContext.Provider value={{ paciente, setPaciente, fetchPaciente, loading, setLoading, refreshPacientes, pacientes, setPacientes }}>
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
