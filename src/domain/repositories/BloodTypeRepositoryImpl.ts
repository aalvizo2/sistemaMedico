import { BloodTypeApi } from "../../adapters/api/BloodTypeApi";
import { editBloodType, getBloodType, newBloodType } from "../entities/BloodType";


export class BloodTypeRepositoryImpl{
    async getBloodType(): Promise<getBloodType[]>{
        return BloodTypeApi.getBloodType();
    }

    async newBloodType(newData: newBloodType): Promise<newBloodType>{
        return BloodTypeApi.newBloodType(newData);
    }

    async editBloodType(Id: string, newData: editBloodType): Promise<editBloodType>{
        return BloodTypeApi.editBloodType(Id, newData);
    }

    async deleteBloodType(Id: string): Promise<void>{
        return BloodTypeApi.deleteBloodType(Id);
    }
}