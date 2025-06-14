import { HistorialClinicoApi } from "../../adapters/api/HistorialClinicoApi";
import { getConsulta } from "../entities/ConsultaMedica";






export class HistorialMedicoRepositoryImpl{
    async getHistorial(userId: string): Promise<getConsulta[]>{
        return HistorialClinicoApi.getHistorial(userId);
    }
}