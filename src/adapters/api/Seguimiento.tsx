import createHttpClient from "./http/httpClient";
import { API_BASE_URL } from "../../config/apiConfig";
import { getSeguimiento, newSeguimiento, updateSeguimiento } from "../../domain/entities/Seguimiento";
import { message } from "antd";

const httpClient = createHttpClient(API_BASE_URL);

export const SeguimientoApi= {
    getSeguimiento: async(): Promise<getSeguimiento[]> => {
        const response= await httpClient.get('/api/v1/Seguimiento');
        return response.data.Data;
    },

    newSeguimiento: async(newData: newSeguimiento): Promise<getSeguimiento> =>{
        const response= await httpClient.post('/api/v1/Seguimiento', newData);
        if(response.status === 200){
            message.success(response.data.Message);
        }else{
            message.info(response.data.Message);
        }
        return response.data.Data;
    },

    editSeguimiento: async(newData: updateSeguimiento): Promise<updateSeguimiento> => {
        const response= await httpClient.put(`/api/v1/Seguimiento/${newData.Id}`, newData);
        if(response.status === 200){
            message.success(response.data.Message);
        }else{
            message.info(response.data.Message);
        }
        return response.data.Data;
    },

    deleteSeguimiento: async(Id: string): Promise<void> => {
        const response= await httpClient.delete(`/api/v1/Seguimiento/${Id}`);
        if(response.status === 200){
            message.success(response.data.Message);
        }else{
            message.info(response.data.Message);
        }
        return response.data.Data;
    },

    activateSeguimiento: async(Id: string): Promise<void> => {
        const response= await httpClient.post(`/api/v1/Seguimiento/activate/${Id}`);
        if(response.status === 200){
            message.success(response.data.Message);
        }else{
            message.info(response.data.Message);
        }
    },

    getSeguimientoByPatientId: async(PatientId: string): Promise<getSeguimiento[]> => {
        const response= await httpClient.get(`/api/v1/Seguimiento/${PatientId}`);
        return response.data.Data;
    }
}        
    