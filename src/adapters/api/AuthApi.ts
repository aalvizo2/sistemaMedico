import { API_BASE_URL } from "../../config/apiConfig";
import { Authenticate } from "../../domain/entities/Auth";
import createHttpClient from "./http/httpClient";



const httpClient= createHttpClient(API_BASE_URL);


export const AuthApi= {
    authenticate: async(data: Authenticate): Promise<Authenticate>=>{
        const response= await httpClient.post("/api/v1/Auth", data);
        
        return response.data;
    }
}