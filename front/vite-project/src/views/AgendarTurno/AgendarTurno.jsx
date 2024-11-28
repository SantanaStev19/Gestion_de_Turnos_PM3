import { useFormik } from "formik"
import styles from "./AgendarTurno.module.css"
import { dateTimeValidate } from "../../helpers/validates"
import { useContext } from "react"
import { UsersContext } from "../../context/UsersContext"
import Swal from "sweetalert2"

const AgendarTurno = () => {

    const { createdAppointment, user } = useContext(UsersContext)


    const formik = useFormik({
        initialValues: {
            date:"",
            time:""
        },
        initialErrors: {
            date: "la fecha es requerida",
            time: "la hora es requerida"
        },
        validate: dateTimeValidate,
        onSubmit: async (values) => {
            const valuesObject = {
                ...values,
                userId : user
            }
            try {
                await createdAppointment(valuesObject)
                Swal.fire({
                    icon: 'success',
                    title: 'turno agendado correctamente',
                })
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: `${error.response.data.message}`,
                    text: "intentalo de nuevo"
                })
            } finally {
                formik.resetForm()
            }
        }
        
        
    })
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Agendar turno</h1>
            <form className={styles.form} onSubmit={formik.handleSubmit}>
                <div className={styles.formGroup}>
                    <label htmlFor="date">Fecha</label>
                    <input
                        id="date"
                        name="date"
                        type="date"
                        min={new Date().toISOString().split("T")[0]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.date}
                        className={
                            formik.touched.date && formik.errors.date
                            ? styles.errorInput
                            : styles.input
                        } 
                    />
                    {formik.errors.date ? (
                        <>
                        <div className={styles.error}>{formik.errors.date}</div>
                        </>
                    ): null}
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="time">Hora</label>
                    <input
                        id="time"
                        name="time"
                        type="time"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.time}
                        className={
                            formik.touched.time && formik.errors.time
                            ? styles.errorInput
                            : styles.input
                        }
                        
                    />
                    {formik.errors.time ? (
                        <div className={styles.error}>{formik.errors.time}</div>
                    ): null}
                </div>

                <button type="submit" 
                className={styles.formButton}
                disabled={Object.keys(formik.errors).length > 0}
                >
                    Agendar
                </button>
                </form>
        </div>
    )
}
export default AgendarTurno