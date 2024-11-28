
import { userRepository } from "../Repositories/userRespository"
import { AppDataSource } from "../config/data-source"
import { UserCredentialDTO, UserDTO, UserRegisterDTO, UserloginDTO } from "../dtos/userDTO"
import { Credential } from "../entities/credentialEntity"
import { User } from "../entities/userEntity"
import { CustomError } from "../utils/customError"
import { checkUserCredentials, getCredentialService } from "./credentialServices"

export const getUserService = async (): Promise<UserDTO[]>  => {  
    const users: User[] = await userRepository.find()
    return users
}

export const getUserByIdService = async (id: number): Promise<UserDTO> => {

    const userFound = await userRepository.findOne({
        where: { id },
        relations: ["appointments"]
    })
    if(!userFound) throw new CustomError(404, `El usuario con id: ${id} no fue encontrado`)
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

export const loginUserService = async (userCredentials: UserCredentialDTO): Promise<UserloginDTO> => {
    const credentialId: number | undefined = await checkUserCredentials(userCredentials.username, userCredentials.password)
    const userFound: User | null = await userRepository.findOne(
        {where:
            {
                credentials:{
                    id: credentialId
                }
            }
        })
    return{
        login: true,
        user: {
            ...userFound 
        }
        
    }
}