import styles from "./NotFound.module.css"
import { Link } from "react-router-dom"

function Notfound(){
    return(
        <div className={styles.container}>
            <h1 className={styles.title}>404</h1>
            <p className={styles.text}>La página que buscas no existe</p>
            <Link to="/" className={styles.link}>
                Volver a la página de inicio
            </Link>
        </div>
    )
}

export default Notfound