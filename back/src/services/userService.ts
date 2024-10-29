import { UserDTO, UserRegisterDTO, UserloginDTO } from "../dtos/userDTO"
import { User } from "../interfaces/UserInterfaces"
import { getCredentialService } from "./credentialServices"


const users: User[] = []
let id: number = 1

export const getUserService = async (): Promise<UserDTO[]>  => {
    return users.map(user => {
        return {
            id: user.id,
            name: user.name,
            email: user.email
        }
    })
}

export const getUserByIdService = async (id: string): Promise<UserDTO> => {
    const userFound = users.find( user => user.id === parseInt(id, 10))
    if(!userFound) throw new Error(`El usuario con id: ${id} no fue encontrado`)
        else return {
            id: userFound.id,
            name: userFound.name,
            email: userFound.email
        }
}

export const resgisterUserService = async (user: UserRegisterDTO): Promise<User> => {
    const idCredentialUser = await getCredentialService(user.username, user.password)
    const newUser: User = {
        id: id++,
        name: user.name,
        email: user.email,
        birthdate: new Date(user.birthdate),
        nDni: user.DNI,
        credentialsId: idCredentialUser
    }
    users.push(newUser)
    return newUser
}

export const loginUserService = async (userCredentials: UserloginDTO): Promise<UserloginDTO> => {
    return userCredentials
}