import { AuthApi } from "../../adapters/api/AuthApi";
import { Authenticate } from "../entities/Auth";


export class AuthRepositoryImpl{
    async Auth(data: Authenticate): Promise<Authenticate>{
        return AuthApi.authenticate(data);
    }
}