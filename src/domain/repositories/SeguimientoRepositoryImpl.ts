import { SeguimientoApi } from "../../adapters/api/Seguimiento";
import { getSeguimiento, newSeguimiento, updateSeguimiento } from "../entities/Seguimiento";


export class SeguimientoRepositoryImpl{
    async getSeguimiento(): Promise<getSeguimiento[]>{
        return await SeguimientoApi.getSeguimiento();
    }

    async getSeguimientoByPatientId(PatientId: string): Promise<getSeguimiento[]>{
        return await SeguimientoApi.getSeguimientoByPatientId(PatientId);
    }

    async newSeguimiento(newData: newSeguimiento): Promise<newSeguimiento>{
        return await SeguimientoApi.newSeguimiento(newData);
    }

    async editSeguimiento(newData: updateSeguimiento): Promise<updateSeguimiento>{
        return await SeguimientoApi.editSeguimiento(newData);
    }

    async deleteSeguimiento(Id: string): Promise<void>{
        return await SeguimientoApi.deleteSeguimiento(Id);
    }
    
    async activateSeguimiento(Id: string): Promise<void>{
        return await SeguimientoApi.activateSeguimiento(Id);
    }
}