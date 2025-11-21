import { API_BASE_URL } from "../../config/apiConfig";
import { certainUsers, editPaciente, getAllDeletedUsers, getUsers, newPaciente } from "../../domain/entities/MedicalUsers";
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
    },

    editPaciente: async(Id: string, newData: editPaciente) => {
        const response = await httpClient.put(`/api/v1/Users/${Id}`, newData);
        if(response.status === 200){
            message.success(response.data.Message);
        }else{
            message.info(response.data.Message);
        }
        return response.data.Data;
    },
    deletePaciente: async(Id: string): Promise<void>=>{
        const response= await httpClient.delete(`/api/v1/Users/${Id}`);
        if(response.status === 200){
            message.success(response.data.Message);
        }else{
            message.info(response.data.Message);
        }
        return response.data.Data;
    },

    getDeletedUsers: async():Promise<getAllDeletedUsers[]>=>{
        const response= await httpClient.get('/api/v1/Users/deletedUsers');
        return response.data;
    },

    activateUser: async(Id: string):Promise<void>=>{
        const response= await httpClient.post(`/api/v1/Users/state/${Id}`);
        if(response.status === 200){
            message.success(response.data.Message);
        }else{
            message.info(response.data.Message);
        }
        return response.data;
    },

    getUserById: async(userId: string): Promise<getUsers[]>=>{
        const response= await httpClient.get(`/api/v1/Users/userId/${userId}`);
        return response.data;
    }, 

    getCertainInformation: async(): Promise<certainUsers[]>=>{
        const query=`
           query{
            Data {
              Id,
              Name,
              PaternalSurname,
              MaternalSurname
            
            }
           }
        `;
        const response= await httpClient.post('', {query});
        return response.data.Data;
    }
}