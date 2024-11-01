const arrayClasesAgendadas = [];
const arrayClasesDisponibles = ["Lunes 17hs", "Lunes 18hs", "Martes 18hs", "Martes 20hs", "Jueves 20hs", "Viernes 18hs", "Viernes 20hs"];
const AbonosMensuales = [
    { id: 1, nombre: "4 clases mensuales", precio: 35000, cantidad: 4 },
    { id: 2, nombre: "8 clases mensuales", precio: 50000, cantidad: 8 },
    { id: 3, nombre: "12 clases mensuales", precio: 75000, cantidad: 12 },
    { id: 4, nombre: "Clases privadas", precio: 30000, cantidad: 1 }
];


let CarritoAbonosMensuales = JSON.parse(localStorage.getItem("CarritoAbonosMensuales")) || [];
let ClasesAgendadas = JSON.parse(localStorage.getItem("ClasesAgendadas")) || [];






function mostrarMenu() {
    const menuContainer = document.getElementById("menuContainer");
    menuContainer.innerHTML = '';


    const buttonComprarAbono = document.createElement("button");
    buttonComprarAbono.innerText = "Comprar abono mensual";
    buttonComprarAbono.onclick = mostrarAbonos;


    const buttonVerAbonos = document.createElement("button");
    buttonVerAbonos.innerText = "Ver abono comprado";
    buttonVerAbonos.onclick = verCarritoAbonosMensuales;


    const buttonAgendarClase = document.createElement("button");
    buttonAgendarClase.innerText = "Ver horarios disponibles y agendar una clase";
    buttonAgendarClase.onclick = mostrarAgenda;


    const buttonVerClasesAgendadas = document.createElement("button");
    buttonVerClasesAgendadas.innerText = "Ver clases agendadas";
    buttonVerClasesAgendadas.onclick = verClasesAgendadas;


    const buttonCancelarClase = document.createElement("button");
    buttonCancelarClase.innerText = "Cancelar una clase agendada";
    buttonCancelarClase.onclick = verClasesAgendadas;


    const buttonConfirmarCompra = document.createElement("button");
    buttonConfirmarCompra.innerText = "Confirmar compra de abono";
    buttonConfirmarCompra.onclick = confirmarCompra;




    menuContainer.appendChild(buttonComprarAbono);
    menuContainer.appendChild(buttonVerAbonos);
    menuContainer.appendChild(buttonAgendarClase);
    menuContainer.appendChild(buttonVerClasesAgendadas);
    menuContainer.appendChild(buttonCancelarClase);
    menuContainer.appendChild(buttonConfirmarCompra);
}
function mostrarAbonos() {
    const menuContainer = document.getElementById("menuContainer");
    menuContainer.innerHTML = '';


    AbonosMensuales.forEach(abono => {
        const button = document.createElement("button");
        button.innerText = `${abono.nombre} ($${abono.precio})`;
        button.onclick = () => seleccionarAbono(abono);
        menuContainer.appendChild(button);
    });


   
    const buttonMenu = document.createElement("button");
    buttonMenu.innerText = "Volver al Menú";
    buttonMenu.onclick = mostrarMenu;
    menuContainer.appendChild(buttonMenu);
    buttonMenu.addEventListener('mouseover', () => {
        buttonMenu.style.transform = 'scale(1.2)';
        buttonMenu.style.backgroundColor = 'antiquewhite';
    });


    buttonMenu.addEventListener('mouseout', () => {
        buttonMenu.style.transform = 'scale(1)';
        buttonMenu.style.backgroundColor = '';
    });
}


function seleccionarAbono(abono) {
    CarritoAbonosMensuales.push(abono);
    localStorage.setItem("CarritoAbonosMensuales", JSON.stringify(CarritoAbonosMensuales));
    alert(`Elegiste el abono: ${abono.nombre}`);
    mostrarAgenda();
}


function mostrarAgenda() {
    const menuContainer = document.getElementById("menuContainer");
    menuContainer.innerHTML = '';


    arrayClasesDisponibles.forEach(horario => {
        const button = document.createElement("button");
        button.innerText = `Agendar clase el ${horario}`;
        button.onclick = () => agendarClase(horario);
        menuContainer.appendChild(button);
    });


   
    const buttonMenu = document.createElement("button");
    buttonMenu.innerText = "Volver al Menú";
    buttonMenu.onclick = mostrarMenu;
    menuContainer.appendChild(buttonMenu);
    buttonMenu.addEventListener('mouseover', () => {
        buttonMenu.style.transform = 'scale(1.2)';
        buttonMenu.style.backgroundColor = 'antiquewhite';
    });


    buttonMenu.addEventListener('mouseout', () => {
        buttonMenu.style.transform = 'scale(1)';
        buttonMenu.style.backgroundColor = '';
    });
}


function agendarClase(horario) {
    if (CarritoAbonosMensuales.length === 0) {
        alert("Para agendar una nueva clase por favor comprá un abono mensual. Muchas gracias");
        return;
    }
    if (ClasesAgendadas.includes(horario)) {
        alert("Ya tienes una clase agendada para este horario.");
    } else {
        ClasesAgendadas.push(horario);
        localStorage.setItem("ClasesAgendadas", JSON.stringify(ClasesAgendadas));
        alert(`Clase agendada el ${horario}`);
    }
}


function verCarritoAbonosMensuales() {
    const menuContainer = document.getElementById("menuContainer");
    menuContainer.innerHTML = '';


    if (CarritoAbonosMensuales.length === 0) {
        alert("No tienes abonos comprados.");
        mostrarMenu();
        return;
    }


    CarritoAbonosMensuales.forEach((abono) => {
        const button = document.createElement("button");
        button.innerText = `${abono.nombre} ($${abono.precio})`;
        menuContainer.appendChild(button);
    });


   
    const buttonMenu = document.createElement("button");
    buttonMenu.innerText = "Volver al Menú";
    buttonMenu.onclick = mostrarMenu;
    menuContainer.appendChild(buttonMenu);
    buttonMenu.addEventListener('mouseover', () => {
        buttonMenu.style.transform = 'scale(1.2)';
        buttonMenu.style.backgroundColor = 'antiquewhite';
    });


    buttonMenu.addEventListener('mouseout', () => {
        buttonMenu.style.transform = 'scale(1)';
        buttonMenu.style.backgroundColor = '';
    });
}


function verClasesAgendadas() {
    const menuContainer = document.getElementById("menuContainer");
    menuContainer.innerHTML = '';


    if (ClasesAgendadas.length === 0) {
        alert("No tienes clases agendadas.");
        mostrarMenu();
        return;
    }


    ClasesAgendadas.forEach((clase, index) => {
        const button = document.createElement("button");
        button.innerText = `Clase agendada: ${clase}`;
        button.onclick = () => cancelarClase(index);
        menuContainer.appendChild(button);
    });


   
    const buttonMenu = document.createElement("button");
    buttonMenu.innerText = "Volver al Menú";
    buttonMenu.onclick = mostrarMenu;
    menuContainer.appendChild(buttonMenu);
    buttonMenu.addEventListener('mouseover', () => {
        buttonMenu.style.transform = 'scale(1.2)';
        buttonMenu.style.backgroundColor = 'antiquewhite';
    });


    buttonMenu.addEventListener('mouseout', () => {
        buttonMenu.style.transform = 'scale(1)';
        buttonMenu.style.backgroundColor = '';
    });
}


function cancelarClase(index) {
    ClasesAgendadas.splice(index, 1);
    localStorage.setItem("ClasesAgendadas", JSON.stringify(ClasesAgendadas));
    alert("Clase cancelada.");
    verClasesAgendadas();
}


function confirmarCompra() {
    if (CarritoAbonosMensuales.length === 0) {
        alert("No tienes abonos para comprar.");
        return;
    }


    let mensaje = "¿Confirmar la compra de los siguientes abonos?\n";
    CarritoAbonosMensuales.forEach(abono => {
        mensaje += `${abono.nombre} ($${abono.precio})\n`;
    });
    mensaje += "Recuerda que puedes agendar o modificar tus clases desde la plataforma.";


    if (confirm(mensaje)) {
        mostrarPago(); 
    }
}


function mostrarPago() {
    const menuContainer = document.getElementById("menuContainer");
    menuContainer.innerHTML = ''; 


    let detalles = "Abonos Comprados:\n";
    CarritoAbonosMensuales.forEach(abono => {
        detalles += `${abono.nombre} ($${abono.precio})\n`;
    });


    
    const detallesPago = document.createElement("div");
    detallesPago.innerText = detalles;


    const finalizarPago = document.createElement("button");
    finalizarPago.innerText = "Finalizar Pago";
    finalizarPago.style.cursor = "pointer"; 
    finalizarPago.onclick = function() {
        alert("Pago completado. ¡Gracias!");
        CarritoAbonosMensuales = []; 
        localStorage.removeItem("CarritoAbonosMensuales"); 
        mostrarMenu(); 
    };


    const volverAlMenu = document.createElement("button");
    volverAlMenu.innerText = "Volver al Menú";
    volverAlMenu.style.cursor = "pointer"; 
    volverAlMenu.onclick = mostrarMenu;


    volverAlMenu.addEventListener('mouseover', () => {
        volverAlMenu.style.transform = 'scale(1.2)';
        volverAlMenu.style.backgroundColor = 'antiquewhite';
    });


    volverAlMenu.addEventListener('mouseout', () => {
        volverAlMenu.style.transform = 'scale(1)';
        volverAlMenu.style.backgroundColor = '';
    });
   
    menuContainer.appendChild(detallesPago);
    menuContainer.appendChild(finalizarPago);
    menuContainer.appendChild(volverAlMenu);
}
document.addEventListener("DOMContentLoaded", mostrarMenu);
