import { Request, Response, Router } from "express";
import { getUserByIdController, getUserController, loginUserController, resgiterUserController } from "../controllers/userControllers";
import { UserRegisterDTO, UserloginDTO } from "../dtos/userDTO";

const userRouter: Router = Router()

userRouter.get("/", (req: Request, res: Response) => getUserController(req, res))

userRouter.get("/:id", (req: Request<{ id: string }>, res: Response) => getUserByIdController(req, res))

userRouter.post("/register", (req: Request<unknown, unknown, UserRegisterDTO>, res: Response) => resgiterUserController(req, res))

userRouter.post("/login", (req: Request<unknown, unknown, UserloginDTO>, res: Response) => loginUserController(req, res))

export default userRouter