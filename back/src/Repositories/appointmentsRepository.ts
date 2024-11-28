import { AppDataSource } from "../config/data-source";
import { Appointment } from "../entities/appointmentsEntity";


export const AppointmentRepository = AppDataSource.getRepository(Appointment).extend({

    validateAllowAppointment: function(date: Date, time: string): void {
        const [hours, minutes] = time.split(":").map(Number)
        const appointmentDate = new Date(date)
        appointmentDate.setHours(hours, minutes, 0)
        const today = new Date()
    
        // CITAS PARA FECHAS PASADAS
        const appointmentDateArg = new Date(appointmentDate.getTime() - 5 * 60 * 60 * 1000)
        const nowInArg = new Date(new Date().getTime() - 5 * 60 * 60 * 1000)
        if(appointmentDateArg < nowInArg) throw new Error(`No se pueden agendar citas para fechas pasadas`)
    
        // CITAS CON MENOS DE 24 HORAS
        const diffMiliseconds = today.getTime() - appointmentDate.getTime()
        const diffInHours = diffMiliseconds / (1000 * 60 * 60)
        if(diffInHours > 24) throw new Error(`Las citas deben agendarse con al menos 24 horas de antelación`)
    
        // CITAS PARA LOS FINES DE SEMANA
        const dayOnWeek = appointmentDate.getUTCDay()
        if(dayOnWeek === 5 || dayOnWeek === 6) throw new Error(`No se puede agendar citas los fines de semana`)
    
        // CITAS DENTRO DEL USO HORARIO 08:00 - 18:00
        if(hours < 8 || hours > 17) throw new Error(`Las citas deben agendarse entre las 8am y las 6pm`)
    },

    validateExistingAppointment: async function(userId: number, date: Date, time: string): Promise<void> {
        const appointmentFound = await this.findOne({
            where:{
                user:{
                    id: userId
                },
                date: date,
                time: time
            }
        })
        if(appointmentFound) throw new Error(`El usuario no puede tener dos citas el mismo dia y a la misma hora`)
    }
    
})