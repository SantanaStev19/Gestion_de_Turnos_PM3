import { AppointmentRegisterDTO } from "../dtos/AppointmentDTO"
import { Appointment, Status } from "../interfaces/AppointmentInterfaces"
import { getUserByIdService } from "./userService"

const appointmentList: Appointment[] = []
let id: number = 1

export const getAppontmentService = async (): Promise<Appointment[]> => {
    return appointmentList
}

export const getAppointmentByIdService = async (id: string): Promise<Appointment> => {
    const appointmentFound = appointmentList.find(appointment => appointment.id === parseInt(id, 10))
    if(!appointmentFound) throw new Error(`La cita con el id ${id} no fue encontrada`)
    else return appointmentFound
}

export const resgisterAppointmentService = async (appointmentsData: AppointmentRegisterDTO): Promise<AppointmentRegisterDTO> => {
    
    const userFound = await getUserByIdService(appointmentsData.userId)
    if(!userFound) throw new Error(`El usuario con id: ${appointmentsData.userId} no existe`)

    const newAppointment: Appointment = {
        id: id++,
        date: new Date(appointmentsData.date),
        time: appointmentsData.time,
        status: Status.active,
        userId: appointmentsData.userId
    }

    appointmentList.push(newAppointment)
    return newAppointment
}

export const cancelStatusAppointmentService = async (id: string): Promise<Appointment> => {
    const appointmentFound = appointmentList.find(appointment => appointment.id === parseInt(id, 10))
    if(!appointmentFound) throw new Error(`La cita con el id ${id} no fue encontrada`)
    appointmentFound.status = Status.cancelled
    return appointmentFound
}