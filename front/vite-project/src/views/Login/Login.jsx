import axios from "axios";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import { loginFormValidates } from "../../helpers/loginValidates";
import styles from "./Login.module.css";
import { useState } from "react";

function Login() {

    const [mostrarPassword, setMostrarPassword] = useState(false)
    const tooglePassword = () => {
        setMostrarPassword(!mostrarPassword)
    }
    const formik = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        initialErrors: {
            username: "Nombre de usuario es requerido",
            password: "Contraseña es requerida"
        },
        validate: loginFormValidates,
        onSubmit: (values) => {
            axios
                .post("http://localhost:3000/users/login", values)
                .then((res) => {
                    if (res.status === 200) 
                        Swal.fire({
                            icon: "success",
                            title: "Inicio de sesión exitoso",
                        });
                })
                .catch((err) => {
                    if (err.response.data.message){
                        Swal.fire({
                            icon: `error`,
                            title: `${err.response.data.message}`,
                            text: "Inténtelo de nuevo",
                        
                        })
                    }else if(err.response.data.code === 400){
                        Swal.fire({
                            icon: "error",
                            title: `${err.response.data.message}`,
                            text: "Inténtelo de nuevo",
                        })
                    }
                });
        }
    });

    return (
        <form className={styles.formContainer} onSubmit={formik.handleSubmit}>
            <h2 className={styles.formtitle}>Inicio de Sesión</h2>
            <div className={styles.formGroup}>
                <label className={styles.formLabel}>Nombre de usuario:</label>
                <input
                    className={styles.formInput}
                    type="text"
                    name="username"
                    placeholder="Nombre de usuario"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                />
                {formik.errors.username ? (
                    <label className={styles.errorLable}>{formik.errors.username}</label>
                ) : null}
            </div>

            <div className={styles.formGroup}>
                <label className={styles.formLabel}>Contraseña:</label>
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
                {formik.errors.password ? (
                    <label className={styles.errorLable}>{formik.errors.password}</label>
                ) : null}
            </div>

            <button
                className={styles.formButton}
                type="submit"
                disabled={
                    !!formik.errors.username || !!formik.errors.password
                }
            >
                Iniciar Sesión
            </button>
        </form>
    );
}


export default Login;
