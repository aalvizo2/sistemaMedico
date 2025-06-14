import { getConsulta } from "../../domain/entities/ConsultaMedica";
import { HistorialMedicoRepositoryImpl } from "../../domain/repositories/HistorialClinicoRepositoryImpl";




export class HistorialClinicoUseCases{
    constructor(private historialRepository: HistorialMedicoRepositoryImpl){}


    async getHistorial(userId: string): Promise<getConsulta[]>{
        return this.historialRepository.getHistorial(userId);
    }
}