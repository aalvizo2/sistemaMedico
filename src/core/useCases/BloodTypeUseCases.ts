import { editBloodType, getBloodType, newBloodType } from "../../domain/entities/BloodType";
import { BloodTypeRepositoryImpl } from "../../domain/repositories/BloodTypeRepositoryImpl";



export class BloodTypeUseCases{
    constructor(private bloodTypeRepository: BloodTypeRepositoryImpl){}

    async getBloodType(): Promise<getBloodType[]>{
        return this.bloodTypeRepository.getBloodType();
    }

    async newBloodType(newData: newBloodType): Promise<newBloodType>{
        return this.bloodTypeRepository.newBloodType(newData);
    }

    async editBloodType(Id: string, newData: editBloodType): Promise<editBloodType>{
        return this.bloodTypeRepository.editBloodType(Id, newData);
    }

    async deleteBloodType(Id: string): Promise<void>{
        return this.bloodTypeRepository.deleteBloodType(Id);
    }
}