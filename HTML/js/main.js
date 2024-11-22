const arrayClasesAgendadas = [];
const arrayClasesDisponibles = ["Lunes 17hs", "Lunes 18hs", "Martes 18hs", "Martes 20hs", "Jueves 20hs", "Viernes 18hs", "Viernes 20hs"];
let abonosMensuales = [];

let carritoAbonosMensuales = JSON.parse(localStorage.getItem("carritoAbonosMensuales")) || [];
let clasesAgendadas = JSON.parse(localStorage.getItem("clasesAgendadas")) || [];

function mostrarMenu() {
    const menuContainer = document.getElementById("menuContainer");
    menuContainer.innerHTML = '';

 
    const buttonComprarAbono = document.createElement("button");  
    buttonComprarAbono.innerText = "Comprar abono mensual";
    buttonComprarAbono.onclick = cargarAbonos;

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

function cargarAbonos() {
    const menuContainer = document.getElementById("menuContainer");
    menuContainer.innerHTML = '';

    fetch('data.json')  
        .then(response => response.json())  
        .then(data => {
            abonosMensuales = data;  
            mostrarAbonos();  

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
        })
    })
        .catch(error => {
            console.error('Error al cargar los abonos:', error);
            Swal.fire("Hubo un problema al cargar los abonos. Intenta más tarde.");
        });

        
}

function mostrarAbonos() {
    const menuContainer = document.getElementById("menuContainer");
    menuContainer.innerHTML = '';

    abonosMensuales.forEach(abono => {
        const button = document.createElement("button");
        button.innerText = `${abono.nombre} ($${abono.precio})`;
        button.onclick = () => seleccionarAbono(abono);
        menuContainer.appendChild(button);
    });
}

function seleccionarAbono(abono) {
    carritoAbonosMensuales.push(abono);
    localStorage.setItem("carritoAbonosMensuales", JSON.stringify(carritoAbonosMensuales));
    Swal.fire(`Elegiste el abono: ${abono.nombre}`);

   
    mostrarAgenda();
}

function mostrarAgenda() {
    const menuContainer = document.getElementById("menuContainer");
    menuContainer.innerHTML = '';
    const loadingMessage = document.createElement("div");
    loadingMessage.innerText = "Cargando días y horarios disponibles...";
    menuContainer.appendChild(loadingMessage);

    const loader = document.createElement("div");
    loader.classList.add("loader");
    menuContainer.appendChild(loader);

    setTimeout(() => {
        loadingMessage.remove();
        loader.remove();

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
    }, 1500);  
}

function agendarClase(horario) {
    if (carritoAbonosMensuales.length === 0) {
        Swal.fire({
            title: "Para agendar una nueva clase por favor comprá un abono mensual. Muchas gracias",
            icon: "warning",
            
        });
        return;
    }
    if (clasesAgendadas.includes(horario)) {
        Swal.fire({
            title: "Ya tienes una clase agendada para este horario.",
            icon: "warning"
          });
        
    } else {
        clasesAgendadas.push(horario);
        localStorage.setItem("clasesAgendadas", JSON.stringify(clasesAgendadas)); 
        Swal.fire({
            position: "top-center",
            icon: "success",
            title: `Clase agendada el ${horario}`,
            showConfirmButton: false,
            timer: 1500
          });
        
    }
}

function verCarritoAbonosMensuales() {
    const menuContainer = document.getElementById("menuContainer");
    menuContainer.innerHTML = '';

    if (carritoAbonosMensuales.length === 0) {
        Swal.fire({
            title: "No tienes abonos comprados.",
            icon: "warning"
        });
        mostrarMenu();
        return;
    }


    carritoAbonosMensuales.forEach((abono) => {
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

    const loadingMessage = document.createElement("div");
    loadingMessage.innerText = "Cargando clases agendadas...";
    menuContainer.appendChild(loadingMessage);

    const loader = document.createElement("div");
    loader.classList.add("loader");
    menuContainer.appendChild(loader);

    setTimeout(() => {
        loadingMessage.remove();
        loader.remove();

        if (clasesAgendadas.length === 0) {
            
            Swal.fire({
                title: "No tienes clases agendadas.",
                text: "¿Quieres agendar una nueva clase?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: 'Ir a agendar',
                cancelButtonText: 'Volver al menú',
            }).then((result) => {
                if (result.isConfirmed) {
                    
                    mostrarAgenda();
                } else {
                   
                    mostrarMenu();
                }
            });
            return; 
        }
        clasesAgendadas.forEach((clase, index) => {
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
    }, 1500);  
}

function cancelarClase(index) {
    clasesAgendadas.splice(index, 1);
    localStorage.setItem("clasesAgendadas", JSON.stringify(clasesAgendadas));  
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
      });
      swalWithBootstrapButtons.fire({
        title: "¿Confirmas la cancelación de la clase?",
        text: "La clase cancelada queda a disponibilidad de otros alumnos, no aseguramos la disponibilidad",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si, confirmo",
        cancelButtonText: "No! no quiero cancelar",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire({
            title: "Cancelada!",
            text: "Tu clase fue cancelada",
            icon: "success",

        }).then(() => {
            verClasesAgendadas();
          });
        } else if (
          
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Tu clase sigue agendada!",
            icon: "error"
          });
        }
      });
    
   
}

function confirmarCompra() {
    if (carritoAbonosMensuales.length === 0) {
        Swal.fire("Para confirmar una compra, por favor agrega un abono al carrito.");
        return;
    }


    Swal.fire({
        title: "¿Confirmas la compra?",
        text: "Si, confirmo la compra del abono seleccionado",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.isConfirmed) {
            mostrarPago();
        }
    });
}
function mostrarPago() {
    const menuContainer = document.getElementById("menuContainer");
    menuContainer.innerHTML = '';

    let detalles = "Abonos Comprados:\n";
    carritoAbonosMensuales.forEach(abono => {
        detalles += `${abono.nombre} ($${abono.precio})\n`;
    });

    const detallesPago = document.createElement("div");
    detallesPago.innerText = detalles;

    const finalizarPago = document.createElement("button");
    finalizarPago.innerText = "Finalizar Pago";
    finalizarPago.style.cursor = "pointer"; 
    finalizarPago.onclick = function() {
        Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Pago completado. ¡Gracias!",
            showConfirmButton: false,
            timer: 1500
          });
        
        carritoAbonosMensuales = []; 
        localStorage.removeItem("carritoAbonosMensuales"); 
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
