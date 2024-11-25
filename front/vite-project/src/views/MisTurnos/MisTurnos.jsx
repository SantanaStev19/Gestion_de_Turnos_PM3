import { useState } from "react"
import myAppointments from "../../helpers/myAppointmens"
import Turno from "../../components/Turno/Turno"
import Styles from "./MisTurnos.module.css"

function MisTurnos(){

    const [turnos, setTurnos] = useState(myAppointments)
    return(
        <div className={Styles.contenedor}>
            <div className={Styles.contenedor1}>
                <h1>Mis Turnos</h1>
                <div className={Styles.contenedorturnos}>
                    {turnos.length > 0 ? turnos.map(turnos => {
                        return(
                            <Turno
                                key={turnos.id}
                                id={turnos.id}
                                date={turnos.date}
                                time={turnos.time}
                                status={turnos.status}
                            />
                        )
                    }) : <p>No hay turnos</p>}
                </div>
            </div>
        </div>
        
        
    )
}

export default MisTurnos