import { Request, Response } from "express"
import { AppointmentRegisterDTO } from "../dtos/AppointmentDTO"
import { cancelStatusAppointmentService, getAppointmentByIdService, getAppontmentService, resgisterAppointmentService } from "../services/appointmentService"
import { Appointment } from "../entities/appointmentsEntity"
import { catchError } from "../utils/catchErrors"

const getAppointmentsController = async (req: Request, res: Response): Promise<void> => {
        const serviceResponse = await getAppontmentService()
        res.status(200).json({
            message: "obtener el listado de todos los turnos de todos los usuario ",
            data: serviceResponse
        })    
}

const getAppointmentsByIdController = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    const { id } = req.params
        const serviceResponse = await getAppointmentByIdService(id)
        res.status(200).json({
            message: "obtener el detalle de un turno especifico "+ id,
            data: serviceResponse
        })
}

const registerAppointmentsController = async (req: Request<unknown, unknown, AppointmentRegisterDTO>, res: Response): Promise<void> => {
        const serviceResponse: Appointment = await resgisterAppointmentService(req.body)
        res.status(201).json({
            message: "Cita agregada con exito",
            data: serviceResponse
        })
}

const cancelStatusAppointmentController = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    const { id } = req.params
        const serviceResponse = await cancelStatusAppointmentService(id)
        res.status(200).json({
            message: "cita cancelada con exito",
            data: serviceResponse.status
        })
}

const appointmentControllers = {
    getAppointmentsController: catchError(getAppointmentsController),
    getAppointmentsByIdController: catchError(getAppointmentsByIdController),
    registerAppointmentsController: catchError(registerAppointmentsController),
    cancelStatusAppointmentController: catchError(cancelStatusAppointmentController)
}

export default appointmentControllers