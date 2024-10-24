export interface UserRegisterDTO {
    name: string,
    DNI: number,
    email: string,
    password: string,
}

export interface UserloginDTO {
    email: string,
    password: string,
}