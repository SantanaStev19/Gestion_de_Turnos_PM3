/* eslint-disable react/prop-types */
import Styles from "./Turno.module.css"

function Turno({ id, date, time, status }){
    
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
        </div>
    )

}

export default Turno