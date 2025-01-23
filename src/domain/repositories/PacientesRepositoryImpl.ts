import { PacientesApi } from "../../adapters/api/PacientesApi";
import { getUsers, newPaciente } from "../entities/MedicalUsers";




export class PacientesRepositoryImpl{
    async getPacientes():Promise<getUsers[]>{
        return PacientesApi.getPacientes();
    }

    async newPaciente(data: newPaciente): Promise<newPaciente>{
        return PacientesApi.newPaciente(data);
    }
}