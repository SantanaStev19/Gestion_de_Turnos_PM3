export const registerFormValidates = (input) => {
    const errors = {}

    if(!input.name.trim()) errors.name = "Nombre es requerido"
    else if(!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(input.name)) errors.name = "El nombre debe ser alfanumerico"

    if(!input.email.trim()) errors.email = "Email es requerido"
    else if(!/^\S+@\S+\.\S+$/.test(input.email)) errors.email = "El email debe ser valido"

    if(!input.birthdate.trim()) errors.birthdate = "Cumpleaños es requerido"
    else {
        const today = new Date()
        const birthdate = new Date(input.birthdate)
        const age = today.getFullYear() - birthdate.getFullYear()

        if(age < 18) errors.birthdate = "Debe ser mayor de 18 años"
    }

    if (!input.nDni){
        errors.nDni = "Numero de DNI es requerido"
    }else if(!/^\d+$/.test(input.nDni)){
        errors.nDni = "Numero de DNI debe ser un numero"
    }else if(input.nDni.length < 7 || input.nDni.length > 8){
        errors.nDni = "Numero de DNI debe tener 7 o 8 digitos"
    }

    if(!input.username.trim()){
        errors.username = "Numbre de usuario es requerido"
    }else if(!/^[a-zA-Z0-9]+$/.test(input.username)){
        errors.username = "El nombre de usuario debe ser alfanumerico"
    }

    if(!input.password.trim()){
        errors.password = "Contraseña es requerida"
    }else if(input.password.length < 8){
        errors.password = "La contraseña debe tener al menos 8 caracteres"
    }else if(!/[A-Z]/.test(input.password)){
        errors.password = "La contraseña debe contener al menos una letra mayuscula"
    }else if(!/[0-9]/.test(input.password)){
        errors.password = "La contraseña debe contener al menos un numero"
    }else if(!/[^A-Za-z0-9]/.test(input.password)){
        errors.password = "La contraseña debe contener al menos un caracter especial"
    }

    return errors
}

const isValidTime = (time) => {
    const [hours, minutes] = time.split(":").map(Number)
    const totalMinutes = hours * 60 + minutes
    const startTime = 8 * 60
    const endTime = 17 * 60
    return totalMinutes >= startTime && totalMinutes < endTime
}

export const dateTimeValidate = (input) => {
    const errors = {}
    const { date, time } = input

    const selectedDateTime = new Date(`${date}T${time}`)
    const now = new Date()
    const twentyFourHours = new Date(now.getTime() + 24 * 60 * 60 * 1000)

    if(!date) errors.date = "La fecha es obligatoria"
    else if(selectedDateTime < now) errors.date = "No puedes agendar citas para fechas pasadas"
    else if(selectedDateTime < twentyFourHours) errors.date = "Debes seleccionar una fecha con por lo menos 24 horas de antelacion"
    else if(selectedDateTime.getDay() === 0 || selectedDateTime.getDay() === 6) errors.date = "No se puede agendar citas los fines de semana"
    console.log(errors.date);
    if(!time) errors.time = "La hora es obligatoria"
    else if(!isValidTime(time)) errors.time = "La hora debe ser entre las 8am y las 6pm"
}
