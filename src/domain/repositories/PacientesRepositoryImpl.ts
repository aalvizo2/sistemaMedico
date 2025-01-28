import { PacientesApi } from "../../adapters/api/PacientesApi";
import { editPaciente, getAllDeletedUsers, getUsers, newPaciente } from "../entities/MedicalUsers";




export class PacientesRepositoryImpl{
    async getPacientes():Promise<getUsers[]>{
        return PacientesApi.getPacientes();
    }

    async newPaciente(data: newPaciente): Promise<newPaciente>{
        return PacientesApi.newPaciente(data);
    }

    async editPaciente(Id: string, data: editPaciente): Promise<editPaciente>{
        return PacientesApi.editPaciente(Id, data);
    }

    async deletePaciente(Id: string): Promise<void>{
        return PacientesApi.deletePaciente(Id);
    }

    async getAllDeletedUsers():Promise<getAllDeletedUsers[]>{
        return PacientesApi.getDeletedUsers();
    }

    async activateUser(Id: string):Promise<void>{
        return PacientesApi.activateUser(Id);
    }

    async getUserById(Id: string):Promise<getUsers[]>{
        return PacientesApi.getUserById(Id)
    }
}