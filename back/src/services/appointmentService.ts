
import { AppointmentRepository } from "../Repositories/appointmentsRepository"
import { AppointmentRegisterDTO } from "../dtos/AppointmentDTO"
import { Appointment } from "../entities/appointmentsEntity"
import { Status } from "../interfaces/AppointmentInterfaces"
import { CustomError } from "../utils/customError"
import { getUserByIdService } from "./userService"

export const getAppontmentService = async (): Promise<Appointment[] > => {
    const appointments = await AppointmentRepository.find()
    if (appointments.length > 0)
        return appointments
    else throw new CustomError(404,"No se encontraron citas")
}

export const getAppointmentByIdService = async (id: string): Promise<Appointment> => {
    const appointmentFound = await AppointmentRepository.findOne({
        where: {
            id: parseInt(id, 10)
        }
    })
    if(!appointmentFound) throw new CustomError(404,`La cita con id ${id} no fue encontrado`)
    else return appointmentFound
}

export const resgisterAppointmentService = async (appointmentsData: AppointmentRegisterDTO): Promise<Appointment> => {
    
    await getUserByIdService(appointmentsData.userId)
    AppointmentRepository.validateAllowAppointment(appointmentsData.date, appointmentsData.time)
    await AppointmentRepository.validateExistingAppointment(appointmentsData.userId, new Date (appointmentsData.date), appointmentsData.time)

    const newAppointment = AppointmentRepository.create({
        date: new Date(appointmentsData.date),
        time: appointmentsData.time,
        user:{
            id: appointmentsData.userId
        }
    })

    return await AppointmentRepository.save(newAppointment)
}

export const cancelStatusAppointmentService = async (id: string): Promise<Appointment> => {
    const appointmentFound = await AppointmentRepository.findOne({
        where: {
            id: parseInt(id, 10)
        }
    })
    if(!appointmentFound) throw new CustomError(404,`La cita con id ${id} no fue encontrado`)
        appointmentFound.status = Status.cancelled
    return await AppointmentRepository.save(appointmentFound)
}