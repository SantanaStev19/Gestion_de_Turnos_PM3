import { useContext, useEffect, } from "react"
import Turno from "../../components/Turno/Turno"
import Styles from "./MisTurnos.module.css"

import { UsersContext } from "../../context/UsersContext"

function MisTurnos(){

    const { userAppointments, getUserAppointments, user } = useContext(UsersContext)

    useEffect(() => {
        getUserAppointments(user)      
    }, [user, getUserAppointments])

    return(
        <div className={Styles.contenedor}>
            <div className={Styles.contenedor1}>
                <h1>Mis Turnos</h1>
                <div className={Styles.contenedorturnos}>
                    {userAppointments.length > 0 ? userAppointments.map(turnos => {
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