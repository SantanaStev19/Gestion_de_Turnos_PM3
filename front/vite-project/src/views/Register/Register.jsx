import { useContext, useState } from 'react'
import { registerFormValidates } from '../../helpers/validates'
import { useFormik } from 'formik'
import styles from './Register.module.css'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'
import { UsersContext } from '../../context/UsersContext.jsx'

const Register = () => {

    const { userRegister } = useContext(UsersContext)

    const [mostrarPassword, setMostrarPassword] = useState(false)
    const tooglePassword = () => {
        setMostrarPassword(!mostrarPassword)
    }
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            birthdate: "",
            nDni: "",
            username: "",
            password: ""
        },
        validate: registerFormValidates,
        initialErrors: {
            name: "Nombre es requerido",
            email: "Email es requerido",
            birthdate: "Cumpleaños es requerido",
            nDni: "Numero de DNI es requerido",
            username: "Numbre de usuario es requerido",
            password: "Contraseña es requerida"
        },
        onSubmit: (values) =>{
            userRegister(values)            
                .then((res)=>{
                    if(res.status === 201){
                        Swal.fire({
                            icon: 'success',
                            title: 'Registro exitoso',
                        })
                        formik.resetForm()
                    }
                })
            .catch((err) => {
                if(err.response.data.message.includes('username')){
                    Swal.fire({
                        icon: 'error',
                        title: `El nombre de usuario ${formik.values.username} ya esta registrado`,
                        text: 'Intente con otro nombre de usuario'
                    })
                }
                else if(err.response.data.details.includes('email')){
                    Swal.fire({
                        icon: 'error',
                        title: `El email ${formik.values.email} ya esta registrado`,
                        text: 'Intente con otro email'
                    })
                }
                else if(err.response.data.details.includes('nDni')){
                    Swal.fire({
                        icon: 'error',
                        title: `El DNI ${formik.values.nDni} ya esta registrado`,
                        text: 'Intente con otro email'
                    })
                }
            })
        }
    })
    return (
    <form className={styles.formContainer} onSubmit={formik.handleSubmit}>
            <h2 className={styles.formtitle}>Formulario de Registro</h2>
            <div className={styles.formGroup}>
                <label className={styles.formLabel}>Nombre</label>
                <input
                    className={styles.formInput}
                    type="text"
                    name="name"
                    placeholder="Nombre"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                />
                <label className={styles.errorLable}>{formik.errors.name ? formik.errors.name : ""}</label>
            </div>

            <div className={styles.formGroup}>
                <label className={styles.formLabel}>Email</label>
                <input
                    className={styles.formInput}
                    type="text"
                    name="email"
                    placeholder="Email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                />
                <label className={styles.errorLable}>{formik.errors.email ? formik.errors.email : ""}</label>
            </div>

            <div className={styles.formGroup}>
                <label className={styles.formLabel}>Fecha de nacimiento</label>
                <input
                    className={styles.formInput}
                    type="date"
                    name="birthdate"
                    placeholder="Fecha de nacimiento"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.birthdate}
                />
                <label className={styles.errorLable}>{formik.errors.birthdate ? formik.errors.birthdate : ""}</label>  
            </div>

            <div className={styles.formGroup}>
                <label className={styles.formLabel}>Número de DNI</label>
                <input
                    className={styles.formInput}
                    type="text"
                    name="nDni"
                    placeholder="Número de DNI"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.nDni}
                />
                <label className={styles.errorLable}>{formik.errors.nDni ? formik.errors.nDni : ""}</label>
            </div> 

            <div className={styles.formGroup}>
                <label className={styles.formLabel}>Username</label>
                <input
                    className={styles.formInput}
                    type="text"
                    name="username"
                    placeholder="Nombre de usuario"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                />
                <label className={styles.errorLable}>{formik.errors.username ? formik.errors.username : ""}</label>
            </div>

            <div className={styles.formGroup}>
                <label className={styles.formLabel}>Password</label>
                <input
                    className={styles.formInput}
                    type={mostrarPassword ? "text" : "password"}
                    name="password"
                    placeholder="Contraseña"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password} 
                    
                    
                />
                <span 
                    className={styles.tooglePasswordIcon}
                    onClick={tooglePassword}
                >
                    {mostrarPassword ? "🙈" : "👁️"}
                </span>
                
                {formik.errors.password && formik.errors.password ? (
                    <label className={styles.errorLable}>{formik.errors.password}</label>
                ) : null}
                
            </div>

            <button
                className={styles.formButton}
                type="submit"
                disabled={
                formik.errors.name ||
                formik.errors.email ||
                formik.errors.birthdate ||
                formik.errors.nDni ||
                formik.errors.username ||
                formik.errors.password 
                }
            >
                Registrar
            </button>
            <br />
            <label className={styles.formLabelregister}>
                Ya tienes una cuenta? <Link to="/login">Iniciar sesión</Link>
            </label>       
        </form>
    )

}
export default Register