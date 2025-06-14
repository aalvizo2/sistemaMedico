import { API_BASE_URL } from "../../config/apiConfig";
import { getConsulta } from "../../domain/entities/ConsultaMedica";
import createHttpClient from "./http/httpClient";




const httpClient= createHttpClient(API_BASE_URL);


export const HistorialClinicoApi={
    getHistorial: async(userId: string):Promise<getConsulta[]> => {
        const response= await httpClient.get(`/api/v1/MedicalConsult/${userId}`);
        return response.data.Data;
    }
}