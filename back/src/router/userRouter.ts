import { NextFunction, Request, Response, Router } from "express";
import userControllers from "../controllers/userControllers";
import { UserCredentialDTO, UserRegisterDTO} from "../dtos/userDTO";
import { validateUserRegisterData } from "../middlewares";

const userRouter: Router = Router()

userRouter.get("/", (req: Request, res: Response, next: NextFunction) => userControllers.getUserController(req, res, next))

userRouter.get("/:id", (req: Request<{ id: string }>, res: Response, next: NextFunction) => userControllers.getUserByIdController(req, res, next))

userRouter.post("/register",
    (req: Request, res: Response, next: NextFunction) => validateUserRegisterData(req, res, next), 
    (req: Request< unknown, unknown, UserRegisterDTO >, res: Response, next: NextFunction) => userControllers.resgiterUserController(req, res, next))

userRouter.post("/login", (req: Request<unknown, unknown, UserCredentialDTO>, res: Response, next: NextFunction) => userControllers.loginUserController(req, res, next))

export default userRouter