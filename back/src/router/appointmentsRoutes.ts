import { NextFunction, Request, Response, Router } from "express";
import { AppointmentRegisterDTO } from "../dtos/AppointmentDTO";
import appointmentControllers from "../controllers/appointmentController";
import { validateAppointmentRegisterData } from "../middlewares";

const appointmentRouter: Router = Router()

appointmentRouter.get("/", (req: Request, res: Response, next: NextFunction) => appointmentControllers.getAppointmentsController(req, res, next))

appointmentRouter.get("/:id", (req: Request<{ id: string }>, res: Response, next: NextFunction) => appointmentControllers.getAppointmentsByIdController(req, res, next))

appointmentRouter.post("/schedule", 
    (req: Request, res: Response, next: NextFunction) => validateAppointmentRegisterData(req, res, next),
    (req: Request<unknown, unknown, AppointmentRegisterDTO>, res: Response, next: NextFunction) => appointmentControllers.registerAppointmentsController(req, res, next))

appointmentRouter.put("/cancel/:id", (req: Request<{ id: string }>, res: Response, next: NextFunction) => appointmentControllers.cancelStatusAppointmentController(req, res, next))

export default appointmentRouter