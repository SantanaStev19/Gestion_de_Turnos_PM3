import { Request, Response } from "express"
import { getUserByIdService, getUserService, loginUserService, resgisterUserService } from "../services/userService"
import { UserCredentialDTO, UserDTO, UserRegisterDTO, UserloginDTO } from "../dtos/userDTO"
import { catchError } from "../utils/catchErrors"


const getUserController = async (req: Request, res: Response): Promise<void> => {
        const serviceResponse: UserDTO[] = await getUserService()
        res.status(200).json({
            message: "obtener el listado de todos los usuario",
            data: serviceResponse
    })  
}

const getUserByIdController = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    const { id } = req.params
        const serviceResponse: UserDTO = await getUserByIdService(parseInt(id,10))
        res.status(200).json(serviceResponse)
}

const resgiterUserController = async (req: Request<unknown, unknown, UserRegisterDTO>, res: Response): Promise<void> => {
        await resgisterUserService(req.body)
        res.status(201).json({
            message: "Usuario registrado con exito",
        })
}

const loginUserController = async (req: Request<unknown, unknown, UserCredentialDTO>, res: Response): Promise<void> => {
        const serviceResponse: UserloginDTO = await loginUserService(req.body)
        res.status(200).json(serviceResponse)
}
const userControllers = {
    getUserController: catchError(getUserController),
    getUserByIdController: catchError(getUserByIdController),
    resgiterUserController: catchError(resgiterUserController),
    loginUserController: catchError(loginUserController)
}

export default userControllers
