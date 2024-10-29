import { Request, Response } from "express"
import { getUserByIdService, getUserService, loginUserService, resgisterUserService } from "../services/userService"
import { UserDTO, UserRegisterDTO, UserloginDTO } from "../dtos/userDTO"
import { User } from "../interfaces/UserInterfaces"


export const getUserController = async (req: Request, res: Response): Promise<void> => {

    try {
        const serviceResponse: UserDTO[] = await getUserService()
        res.status(200).json({
            message: "obtener el listado de todos los usuario",
            data: serviceResponse
    })
    } catch (error) {
        res.status(500).json({
        message: "hubo un error en la aplicacion",
        error: error
    })
        
    }
    
}
export const getUserByIdController = async (req: Request<{ id: string }>, res: Response): Promise<void> => {

    const { id } = req.params
    try {
        const serviceResponse: UserDTO = await getUserByIdService(id)
        res.status(200).json({
            message: "obtener el detalle de un usuario especifico",
            data: serviceResponse
        })
    } catch (error) {
        res.status(500).json({
            message: "hubo un error en la aplicacion",
            error: error
        })
        
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
        res.status(500).json({
            message: "hubo un error en la aplicacion",
            error: error
        })
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
        res.status(500).json({
            message: "hubo un error en la aplicacion",
            error: error
        })
    }
}