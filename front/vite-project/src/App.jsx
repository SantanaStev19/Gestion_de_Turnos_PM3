import './App.module.css'
import Navbar from './components/Navbar/Navbar'
import Home from './views/Home/Home'
import Login from './views/Login/Login'
import MisTurnos from './views/MisTurnos/MisTurnos'
import Register from './views/Register/Register'


function App() {

  return (
    <>
      <Home />
      <Navbar />
      <MisTurnos />
      <Register />  
      <Login /> 
    </>
  )
}

export default App
