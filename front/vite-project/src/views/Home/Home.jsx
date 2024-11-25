import Navbar from "../../components/Navbar/Navbar";
import Styles from "./Home.module.css"

function Home(){

    return (
        <div className={Styles.view}>
            <h1 className={Styles.title}>Bienvenido a la gestión de turnos</h1>
            <Navbar className={Styles.navbar} />
</div>

    )
    
}

export default Home