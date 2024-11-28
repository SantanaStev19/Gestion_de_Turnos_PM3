export const loginFormValidates = (input) => {
    const errors = {}
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