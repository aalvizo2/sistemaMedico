import { getSeguimiento, newSeguimiento, updateSeguimiento } from "../../domain/entities/Seguimiento";
import { SeguimientoRepositoryImpl } from "../../domain/repositories/SeguimientoRepositoryImpl";


export class SeguimientoUseCases{
    constructor(private seguimientoRepository: SeguimientoRepositoryImpl){}
    
    async getSeguimiento(): Promise<getSeguimiento[]>{
        return this.seguimientoRepository.getSeguimiento();
    }

    async getSeguimientoByPatientId(PatientId: string): Promise<getSeguimiento[]>{
        return this.seguimientoRepository.getSeguimientoByPatientId(PatientId);
    }

    async newSeguimiento(newData: newSeguimiento): Promise<newSeguimiento>{
        return this.seguimientoRepository.newSeguimiento(newData);
    }

    async updateSeguimiento(newData: updateSeguimiento): Promise<updateSeguimiento>{
        return this.seguimientoRepository.editSeguimiento(newData);
    }

    async deleteSeguimiento(Id: string): Promise<void>{
        return this.seguimientoRepository.deleteSeguimiento(Id);
    }

    async activateSeguimiento(Id: string): Promise<void>{
        return this.seguimientoRepository.activateSeguimiento(Id);
    }
}