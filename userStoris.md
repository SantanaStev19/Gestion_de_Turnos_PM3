# User Stories

**1. Autenticación de usuarios:**   
- El usuario, necesita registrarse o iniciar sesión en la plataforma para poder reservar un turno.
- **Criterios de aceptación:**  
    - El usuario tiene que registrarse con correo y contraseña.
    - El sistema debe autenticar al usuario mediante el correo y la contaseña.
    - El usuario no puede reservar turno sin estar autenticado.

**2. Reserva de turno:**   
- Al momento de que el usuario sea **autenticado**, quiero poder agendar un turno en una fecha y hora
específicas dentro del horario de atención (8am-5pm), para poder ser atendido en el banco. 
- **Criterios de aceptación:**  
    - El usuario solo puede seleccionar horarios entre 8am y 5pm, excluyendo fines de semana.
    - Si intenta agendar un turno fuera de esos días u horas, se mostrará un mensaje de error. 

**3. Visualización de turnos reservados:**
- Al momento de que el usuario sea **autenticado**, quiero ver un listado de mis turnos reservados, para poder gestionar mis citas.
- **Criterios de aceptación:**
    - El usuario debe poder ver una lista de turnos futuros y pasados.
    - Cada turno debe mostrar la fecha, hora y la opción de cancelarlo si aún es posible.

**4. Cancelación de turno:**
- Al momento de que el usuario sea **autenticado**, quiero poder cancelar mi turno hasta un día antes de la fecha reservada, para liberar el espacio si no puedo asistir.
- **Criterios de aceptación:**
    - El usuario debe poder cancelar un turno hasta el día anterior a la cita.
    - No podrá cancelar el turno el mismo día de la cita.
    - Al cancelar, el turno desaparece de la lista de turnos futuros.

**5. Restricción de agendamiento para fines de semana:**
- Al momento de que el usuario sea **autenticado**, quiero que los días de fin de semana no estén disponibles para
agendar turnos, para que solo pueda reservar en días hábiles.
- **Criterios de aceptación:**
    - Los sábados y domingos no deben aparecer como opciones en el calendario de reserva.
