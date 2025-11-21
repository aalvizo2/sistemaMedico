import createHttpClient from "./http/httpClient";
import {message} from 'antd';
import { editBloodType, getBloodType, newBloodType } from "../../domain/entities/BloodType";
import { API_BASE_URL } from "../../config/apiConfig";


const httpClient= createHttpClient(API_BASE_URL)

export const BloodTypeApi= {
    getBloodType: async(): Promise<getBloodType[]> =>{
         const response= await httpClient.get("/api/v1/BloodType");
         return response.data;
    },

    newBloodType: async(newData: newBloodType): Promise<newBloodType>=>{
        const response= await httpClient.post('/api/v1/BloodType', newData);
        if(response.status === 200){
            message.success(response.data.Message)
        }else{
            message.info(response.data.Message);
        }

        return response.data;
    },

    editBloodType: async(Id: string, newData: editBloodType): Promise<editBloodType> => {
       const response= await httpClient.put(`/api/v1/BloodType/${Id}`, newData);
       if(response.status === 200){
            message.success(response.data.Message)
        }else{
            message.info(response.data.Message);
        }
        return response.data;
    },
    
    deleteBloodType: async(Id: string): Promise<void>=>{
        const response= await httpClient.delete(`/api/v1/BloodType/${Id}`);
        if(response.status === 200){
            message.success(response.data.Message)
        }else{
            message.info(response.data.Message);
        }

        return response.data;

    }
    
}