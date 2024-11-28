import styles from './App.module.css'
import Navbar from './components/Navbar/Navbar'
import Home from './views/Home/Home'
import Login from './views/Login/Login'
import MisTurnos from './views/MisTurnos/MisTurnos'
import Register from './views/Register/Register'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import Notfound from './components/NotFound/NotFound'
import { UsersContext } from './context/UsersContext'
import AgendarTurno from './views/AgendarTurno/AgendarTurno'


function App() {

  const [isNotFound, setIsNotFound] = useState(false)
  const { user } = useContext(UsersContext)

  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const validateRoute = ["/", "/misturnos", "/login", "/register", "/agendarturno"]
    if(!validateRoute.includes(location.pathname)) setIsNotFound(true)
    else setIsNotFound(false)

    if(!user && location.pathname !== "/login" && location.pathname !== "/register"){
      navigate("/login")
    }  
    if(user && (location.pathname === "/login" || location.pathname === "/register")){
      navigate("/")
    }

  },[user, navigate, location.pathname])

  return (
    <>
    {
      !user ? (
        <main className={styles.main}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
      ) : (
        <>
          {!isNotFound && (
              <header>
                <Navbar />
              </header>
            )}
          
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/misturnos" element={<MisTurnos />} />
              <Route path="/agendarturno" element={<AgendarTurno />} />
              <Route path="*" element={<Notfound />} />
            </Routes>
          </main>
        
        </>
      )
      
    }
    </>
  )
}

export default App
