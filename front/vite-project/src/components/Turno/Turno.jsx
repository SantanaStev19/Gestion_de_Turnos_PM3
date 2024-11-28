/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useContext } from "react"
import Styles from "./Turno.module.css"
import { UsersContext } from "../../context/UsersContext"
import Swal from "sweetalert2"

function Turno({ id, date, time, status }){

    const { cancelUserAppointment } = useContext(UsersContext)

    const handleCancel = () => {
        try {
            cancelUserAppointment(id)
            Swal.fire({
                icon: 'warning',
                color: "red",
                title: 'turno cancelado correctamente',
            })
                
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'error al cancelar turno'
            })
            
            
        }

    }
    
    return (
        <div className={Styles.appointmentCard}>
            <div className={Styles.appointmentheader}></div>
                <h3>Turno #{id}</h3>
                <span className={status === 'active' ? Styles.active : Styles.inactive}>{status}</span>
            <div/>
            <div className={Styles.appointmentDatails}>
                <p><strong>Fecha:</strong> {date}</p>
                <p><strong>Hora:</strong> {time}</p>
            </div>
            <button 
                className={`${Styles.cancelButton} ${status === "cancelled" ? Styles.desable:""}`}
                onClick={handleCancel}
                disabled={status === "cancelled"}
            >        
            Cancelar turno</button>
        </div>
    )

}

export default Turno