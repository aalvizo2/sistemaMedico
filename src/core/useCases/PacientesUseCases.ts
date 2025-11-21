import { certainUsers, editPaciente, getAllDeletedUsers, getUsers, newPaciente } from "../../domain/entities/MedicalUsers";
import { PacientesRepositoryImpl } from "../../domain/repositories/PacientesRepositoryImpl";






export class PacientesUseCases{
    constructor(private pacientesRepository: PacientesRepositoryImpl){}


    async getPacientes(): Promise<getUsers[]>{
        return this.pacientesRepository.getPacientes();
    }

    async newPaciente(data: newPaciente): Promise<newPaciente>{
        return this.pacientesRepository.newPaciente(data);
    }
    async editPaciente(Id: string, data: editPaciente): Promise<editPaciente>{
        return this.pacientesRepository.editPaciente(Id, data);
    }

    async deletePaciente(Id: string):Promise<void>{
        return this.pacientesRepository.deletePaciente(Id);
    }

    async getAllDeletedUsers():Promise<getAllDeletedUsers[]>{
        return this.pacientesRepository.getAllDeletedUsers();
    }

    async activateUser(Id: string):Promise<void>{
        return this.pacientesRepository.activateUser(Id);
    }

    async getUserById(Id: string): Promise<getUsers[]>{
        return this.pacientesRepository.getUserById(Id);
    }

    async getCertainInfo(): Promise<certainUsers[]>{
        return this.pacientesRepository.getCertainData();
    }
}