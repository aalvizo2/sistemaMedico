import { API_BASE_URL } from "../../config/apiConfig";
import { getUsers, newPaciente } from "../../domain/entities/MedicalUsers";
import createHttpClient from "./http/httpClient";
import {message} from 'antd';


const httpClient= createHttpClient(API_BASE_URL);


export const PacientesApi ={
    getPacientes: async(): Promise<getUsers[]> => {
        const response= await httpClient.get("/api/v1/Users");
        return response.data;

    },

    newPaciente: async(newData: newPaciente): Promise<newPaciente> => {
        const response= await httpClient.post("/api/v1/Users", newData);
        if(response.status === 200){
            message.success(response.data.Message);
        }else{
            message.info(response.data.Message);
        }
        return response.data;
    }
}