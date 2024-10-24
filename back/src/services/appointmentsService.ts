import { AppointmentRegisterDTO } from "../dtos/AppointmentDTO"

export const getAppointmentService = async (): Promise<void> => {}

export const getAppointmentByIdService = async (id: string): Promise<string> => {
    return id
}

export const resgisterAppointmentService = async (appointmentsData: AppointmentRegisterDTO): Promise<AppointmentRegisterDTO> => {
    return appointmentsData
}

export const cancelStatusAppointmentService = async (id: string): Promise<string> => {
    return id
}