import { Request, Response } from "express"
import { getUserByIdService, getUserService, loginUserService, resgisterUserService } from "../services/userService"
import { UserDTO, UserRegisterDTO, UserloginDTO } from "../dtos/userDTO"
import { User } from "../entities/userEntity"
import { handleErrorResponse } from "./appointmentController"

export const getUserController = async (req: Request, res: Response): Promise<void> => {

    try {
        const serviceResponse: UserDTO[] = await getUserService()
        res.status(200).json({
            message: "obtener el listado de todos los usuario",
            data: serviceResponse
    })
    } catch (error) {
        handleErrorResponse(error, res, "error al obtener todos los usuarios")
    }
        
    }
export const getUserByIdController = async (req: Request<{ id: string }>, res: Response): Promise<void> => {

    const { id } = req.params
    try {
        const serviceResponse: UserDTO = await getUserByIdService(parseInt(id,10))
        res.status(200).json({
            message: "obtener el detalle de un usuario especifico",
            data: serviceResponse
        })
    } catch (error) {
        handleErrorResponse(error, res, "error al obtener el usuario por id")
        
    }

}
export const resgiterUserController = async (req: Request<unknown, unknown, UserRegisterDTO>, res: Response): Promise<void> => {
    try {
        const serviceResponse: User = await resgisterUserService(req.body)
        res.status(201).json({
            message: "registro de un nuevo usuario",
            data: serviceResponse
        })
    } catch (error) {
        handleErrorResponse(error, res, "error al registrar un nuevo usuario")
    }
}
export const loginUserController = async (req: Request<unknown, unknown, UserloginDTO>, res: Response): Promise<void> => {

    try {
        const serviceResponse: UserloginDTO = await loginUserService(req.body)
        res.status(201).json({
            message: "login del usuario a la aplicacion",
            data: serviceResponse
        })
    } catch (error) {
        handleErrorResponse(error, res, "error al loguear un usuario")
    }
}