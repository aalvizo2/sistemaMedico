import { getUsers, newPaciente } from "../../domain/entities/MedicalUsers";
import { PacientesRepositoryImpl } from "../../domain/repositories/PacientesRepositoryImpl";






export class PacientesUseCases{
    constructor(private pacientesRepository: PacientesRepositoryImpl){}


    async getPacientes(): Promise<getUsers[]>{
        return this.pacientesRepository.getPacientes();
    }

    async newPaciente(data: newPaciente): Promise<newPaciente>{
        return this.pacientesRepository.newPaciente(data);
    }
}