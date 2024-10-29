
import { AppDataSource, UserModel } from "../config/data-source"
import { UserDTO, UserRegisterDTO, UserloginDTO } from "../dtos/userDTO"
import { Credential } from "../entities/credentialEntity"
import { User } from "../entities/userEntity"
import { getCredentialService } from "./credentialServices"

export const getUserService = async (): Promise<UserDTO[]>  => {  
    const users: User[] = await UserModel.find()
    return users
}

export const getUserByIdService = async (id: number): Promise<UserDTO> => {

    const userFound = await UserModel.findOne({
        where: { id },
        relations: ['credentials']
    })
    if(!userFound) throw new Error(`El usuario con id: ${id} no fue encontrado`)
        else return userFound
}

export const resgisterUserService = async (user: UserRegisterDTO): Promise<User> => {

    const result = await AppDataSource.transaction( async (entityManager) => {

        const userCredentials: Credential = await getCredentialService(entityManager, user.username, user.password)
        const newUser: User = entityManager.create( User,{
            name: user.name,
            email: user.email,
            birthdate: new Date(user.birthdate),
            nDni: user.nDni,
            credentials: userCredentials
        })
        return await entityManager.save(newUser)
    })
    return result
    
}

export const loginUserService = async (userCredentials: UserloginDTO): Promise<UserloginDTO> => {
    return userCredentials
}