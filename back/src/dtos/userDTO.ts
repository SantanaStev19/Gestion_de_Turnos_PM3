export interface UserRegisterDTO {
    name: string,
    nDni: number,
    email: string,
    username: string,
    password: string,
    birthdate: Date
}

export interface UserCredentialDTO {
    username: string,
    password: string,
}

export interface UserloginDTO{
    login: boolean,
    user: UserDataLoginDTO
}

interface UserDataLoginDTO{
    id?: number
    name?: string,
    nDni?: number,
    email?: string,
    birthdate?: Date
}

export interface UserDTO {
    id: number
    name: string
    email: string
}