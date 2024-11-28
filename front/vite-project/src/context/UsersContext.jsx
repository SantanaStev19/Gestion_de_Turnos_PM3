/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";
import axios from "axios"

export const UsersContext = createContext({
    user: "",
    userAppointments: [],
    userRegister: async () => {},
    userLogin: async () => {},
    createdAppointment: async () => {},
    getUserAppointments: async () => {},
    logout:  () => {},
    cancelUserAppointment: async () => {}
})

export const UsersProvider = ({ children}) => {

    const [user, setUser] = useState(localStorage.getItem("user_id") || false)
    const [userAppointments, setUserAppointments] = useState([])

    const userRegister = async (userData) => {
        return await axios.post("http://localhost:3000/users/register", userData)
    }

    const userLogin = async (loginUser) => {
        const res = await axios.post("http://localhost:3000/users/login", loginUser)
        localStorage.setItem("user_id", res.data.user.id)
        setUser(res.data.user.id)
        return res
    }

    const logout = async () => {
        localStorage.removeItem("user")
        setUser(false)
        setUserAppointments([])
    }

    const createdAppointment = async (values) => {
       await axios.post("http://localhost:3000/appointments/schedule", values)
    }

    const getUserAppointments = async (userId) => {
        const { data } = await axios.get(`http://localhost:3000/users/${userId}`)
        setUserAppointments(data.appointments)
    }

    const cancelUserAppointment = async (appointmentsId) => {
        await axios.put(`http://localhost:3000/appointments/cancel/${appointmentsId}`)
        // userAppointments.map((appointment) => appointment.id === appointmentsId ? {...appointment, status : "Canceled" }: appointment)
        // setUserAppointments(userAppointments)
    }

    const value = {
        user,
        userAppointments,
        userRegister,
        userLogin,
        logout,
        createdAppointment,
        getUserAppointments,
        cancelUserAppointment
    }

    return (
        <UsersContext.Provider value={ value }>
            { children }
        </UsersContext.Provider>
    )
}

