import { Link, useNavigate } from "react-router-dom"
import styles from "./Navbar.module.css"
import Swal from "sweetalert2"
import { useContext } from "react"
import { UsersContext } from "../../context/UsersContext"

function Navbar(){

    const navigate = useNavigate()
    const { logout } = useContext(UsersContext)
 
    const handelLogout = () => {
        logout()
        Swal.fire({
            icon: "warning",
            title: "Sesion cerrada correctamente",
        })
        navigate("/login")
    }

    return (
        <div className={styles.navbarContaijner}>
            <nav className={styles.navbar}>
                <li className={styles.navbarLi}>
                    <Link 
                        to="/"
                        className={`${styles.link} ${location.pathname === "/" ? styles.active : ""}`}
                        > 
                        Home 
                    </Link>
                </li>
                <li className={styles.navbarLi}>
                    <Link 
                        to="/misturnos"
                        className={`${styles.link} ${location.pathname === "/misturnos" ? styles.active : ""}`}
                    >
                        Mis Turnos
                    </Link>
                </li>
                <li className={styles.navbarLi}>
                    <Link 
                        to="/agendarturno"
                        className={`${styles.link} ${location.pathname === "/agendarturno" ? styles.active : ""}`}
                    >
                        Agendar turno
                    </Link>
                </li>
                <li className={styles.navbarLi}>
                    <Link 
                        to="/login"
                        className={`${styles.link}`}
                        onClick={handelLogout}
                    >
                        Cerrar sesión
                    </Link>
                </li>
            </nav>
        </div>
    )
}

export default Navbar   