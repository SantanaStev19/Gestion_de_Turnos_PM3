import { Request, Response, Router } from "express";
import { AppointmentRegisterDTO } from "../dtos/AppointmentDTO";
import { RegisterAppointmentsController, cancelStatusAppointmentController, getAppointmentsByIdController, getAppointmentsController } from "../controllers/appointmentController";

const appointmentRouter: Router = Router()

appointmentRouter.get("/", (req: Request, res: Response) => getAppointmentsController(req, res))

appointmentRouter.get("/:id", (req: Request<{ id: string }>, res: Response) => getAppointmentsByIdController(req, res))

appointmentRouter.post("/schedule", (req: Request<unknown, unknown, AppointmentRegisterDTO>, res: Response) => RegisterAppointmentsController(req, res))

appointmentRouter.put("/cancel/:id", (req: Request<{ id: string }>, res: Response) => cancelStatusAppointmentController(req, res))

export default appointmentRouter