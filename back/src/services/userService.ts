// const users =[
//     {
//         name: "Steven",
//         user: "Steven_19"
//     },
//     {
//         name: "andres",
//         user: "rojas"
//     },
//     {
//         name: "adrian",
//         user: "adr.23"
//     },
//     {
//         name: "fabio",
//         user: "flacoAzul"
//     }
// ]

import { UserRegisterDTO, UserloginDTO } from "../dtos/userDTO"

export const getUserService = async (): Promise<void>  => {}

export const getUserByIdService = async (id: string): Promise<string> => {
    return id
}

export const resgisterUserService = async (user: UserRegisterDTO): Promise<UserRegisterDTO> => {
    return user
}

export const loginUserService = async (userCredentials: UserloginDTO): Promise<UserloginDTO> => {
    return userCredentials
}