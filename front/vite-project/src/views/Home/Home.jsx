import { Link } from "react-router-dom"
import Styles from "./Home.module.css"

const Home =() => {

    return (
        <div className={Styles.view}>
            <h1 className={Styles.title}>Bienvenid@s</h1>
            <p className={Styles.subtitle}>Aqui puedes agendar tu turno</p>
            <button className={Styles.button}>
                <Link to="/agendarturno" 
                >
                Agendar
                </Link>
            </button>
    </div>
    )
}

export default Home