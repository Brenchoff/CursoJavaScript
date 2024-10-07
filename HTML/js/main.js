function bienvenidaAlumno() {
    let alumno = prompt("Bienvenid@ a Cadi Pilates, ingresá tu nombre para darte una mejor atención");
   alert("Bienvenid@ " + alumno + " comencemos!")
}

bienvenidaAlumno();

for (let i = 1; i <= 3; i++) {
    
    let usuario = prompt(" Por favor ingresá tu usuario").toLowerCase(); 

    let clave = prompt("Ingresá tu clave").toLowerCase(); 

    if (usuario === "brendagenchoff" && clave === "bren123") {
        alert("Ingresaste a la plataforma de turnos de Cadi Pilates");
        break;
    } else {
        alert("Credenciales inválidas");
        if (i === 3) {
            alert("Tu cuenta se encuentra bloqueada, por favor ponete en contacto para reactivarla");
        };
    };
};

const arrayClasesAgendadas = ["Lunes 17hs" , "Martes 18hs" , "Jueves 20hs", "Viernes 20hs"];
const arrayClasesDisponibles = ["Lunes 18hs", "Martes 20hs", "Viernes 18hs"]


let opcion;


do {
    opcion = prompt("Por favor ingresá una de las siguientes opciones: 1 para ver tus clases agendadas, 2 para cancelar una clase agendada, 3 ver horarios disponibles y recuperar una clase anterior, para salir presioná 0. Muchas gracias!");

    switch (opcion) {
        case "0":
            alert("Gracias por tu visita! Si no encontraste la opción que necesitas contactanos por Whatsapp para poder ayudarte. Muchas gracias!");
            break;
        case "1":
            if (arrayClasesAgendadas.length === 0) {
                alert("No tienes clases agendadas.");
            } else {
                alert("Estas son tus clases agendadas:\n" + arrayClasesAgendadas.join("\n"));
            }
                break;
        case "2":
            let diaHorario = prompt("Por favor, indicanos el día y el horario de la clase que necesitas cancelar:");
            let index = arrayClasesAgendadas.indexOf(diaHorario);
            if (index !== -1) {
                arrayClasesAgendadas.splice(index, 1);
                alert("La clase del " + diaHorario + " ha sido cancelada.");
            } else {
                alert("No se encontró la clase agendada para ese día y horario.");
            }
            break;
            case "3":
                if (arrayClasesDisponibles.length === 0) {
                    alert("No hay horarios disponibles");
                } else {
                    alert("Los horarios disponibles son los siguientes:\n" + arrayClasesDisponibles.join("\n"));
                    let diaHorarioAgendar = prompt("Indica el día y el horario de la clase que quieres agendar. En caso de no tener horario disponible en el que puedas asistir, por favor contactanos por whatsapp:");
    
                    
                    if (arrayClasesDisponibles.includes(diaHorarioAgendar)) {
                        arrayClasesAgendadas.push(diaHorarioAgendar); 
                        alert("Agendaste clase el " + diaHorarioAgendar);
                    } else {
                        alert("El horario que ingresaste no está disponible. Por favor, elige uno de los horarios listados.");
                    }
                }
                break;
            default:
                alert("Ingresaste una opción inválida. Ingresá por favor una correcta");
                break;
        }
    } while (opcion !== "0");


