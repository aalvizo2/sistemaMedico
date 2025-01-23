import { Authenticate } from "../../domain/entities/Auth";
import { AuthRepositoryImpl } from "../../domain/repositories/AuthRepositoryImpl";




export class AuthUseCases{
    constructor(private authRepository: AuthRepositoryImpl){}

    async Authenticate(data: Authenticate): Promise<Authenticate>{
        return this.authRepository.Auth(data);
    }
}