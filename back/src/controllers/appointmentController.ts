import { Request, Response } from "express"
import { AppointmentRegisterDTO } from "../dtos/AppointmentDTO"
import { cancelStatusAppointmentService, getAppointmentByIdService, getAppontmentService, resgisterAppointmentService } from "../services/appointmentService"



export const getAppointmentsController = async (req: Request, res: Response): Promise<void> => {
    try {
        const serviceResponse = await getAppontmentService()
        res.status(200).json({
            message: "obtener el listado de todos los turnos de todos los usuario ",
            data: serviceResponse
        })
    } catch (error) {
        res.status(500).json({
            message: "hubo un error en la aplicacion",
            error: error
        })
    }
}
export const getAppointmentsByIdController = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    const { id } = req.params
    try {
        const serviceResponse = await getAppointmentByIdService(id)
        res.status(200).json({
            message: "obtener el detalle de un turno especifico ",
            data: serviceResponse
        })
    } catch (error) {
        res.status(500).json({
            message: "hubo un error en la aplicacion",
            error: error
        })
    }
}
export const registerAppointmentsController = async (req: Request<unknown, unknown, AppointmentRegisterDTO>, res: Response): Promise<void> => {
    
    try {
        const serviceResponse: AppointmentRegisterDTO = await resgisterAppointmentService(req.body)
        res.status(200).json({
            message: "Agregar un nuevo turno",
            data: serviceResponse
        })
    } catch (error) {
        res.status(500).json({
            message: "hubo un error en la aplicacion",
            error: error
        })
    }
}
export const cancelStatusAppointmentController = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    const { id } = req.params
    try {
        const serviceResponse = await cancelStatusAppointmentService(id)
        res.status(200).json({
            message: "cambiar el estatus de un turno a cancelled",
            data: serviceResponse
        })
    } catch (error) {
        res.status(500).json({
            message: "hubo un error en la aplicacion",
            error: error
        })
    }
}