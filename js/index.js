// Definir la clase Etapas primero
class Etapas {
    constructor(rangoTempAmb, rangoHumAmb, rangoHumSust, rangoPhSust) {
        this.rangoTempAmb = rangoTempAmb;
        this.rangoHumAmb = rangoHumAmb;
        this.rangoHumSust = rangoHumSust;
        this.rangoPhSust = rangoPhSust;
    }

    verificarParametros(tempAmb, humAmb, humSust, phSust) {
        const alertaRango = [];
        const porcentajeDesviacionTemp = porcentajeDesviacion(tempAmb, this.rangoTempAmb.min, this.rangoTempAmb.max);
        const porcentajeDesviacionHumAmb = porcentajeDesviacion(humAmb, this.rangoHumAmb.min, this.rangoHumAmb.max);
        const porcentajeDesviacionHumSust = porcentajeDesviacion(humSust, this.rangoHumSust.min, this.rangoHumSust.max);
        const porcentajeDesviacionPhSust = porcentajeDesviacion(phSust, this.rangoPhSust.min, this.rangoPhSust.max);
        if (tempAmb < this.rangoTempAmb.min || tempAmb > this.rangoTempAmb.max) {
            alertaRango.push(`🌡 La temperatura registrada de ${tempAmb}ºC está fuera del rango recomendado para esta etapa. Se sugiere que se encuentre entre ${this.rangoTempAmb.min}ºC y ${this.rangoTempAmb.max}ºC. Porcentaje de desviación de la temperatura ambiente: ${Math.round(porcentajeDesviacionTemp)}%`);
        }
        if (humAmb < this.rangoHumAmb.min || humAmb > this.rangoHumAmb.max) {
            alertaRango.push(`☔ La humedad relativa ambiente registrada de ${humAmb}% está fuera del rango recomendado para esta etapa. Se sugiere que se encuentre entre ${this.rangoHumAmb.min} y ${this.rangoHumAmb.max}%. Porcentaje de desviación de la humedad ambiente: ${Math.round(porcentajeDesviacionHumAmb)}%`);
        }
        if (humSust < this.rangoHumSust.min || humSust > this.rangoHumSust.max) {
            alertaRango.push(`💧 La humedad del sustrato registrada de ${humSust}% está fuera del rango recomendado para esta etapa. Se sugiere que se encuentre entre ${this.rangoHumSust.min} y ${this.rangoHumSust.max}%. Porcentaje de desviación de la humedad del sustrato: ${Math.round(porcentajeDesviacionHumSust)}%`);
        }
        if (phSust < this.rangoPhSust.min || phSust > this.rangoPhSust.max) {
            alertaRango.push(`⚠ El pH del sustrato registrado de ${phSust} está fuera del el rango recomendado para esta etapa. Se sugiere que se encuentre entre ${this.rangoPhSust.min} y ${this.rangoPhSust.max}. Porcentaje de desviación del Ph: ${Math.round(porcentajeDesviacionPhSust)}%`);
        }
        return alertaRango;
    }
}

// Calcula porcentaje de desviación
const porcentajeDesviacion = (valor, min, max) => {
    if (valor < min) {
        return ((min - valor) / min) * 100;
    } else if (valor > max) {
        return ((valor - max) / max) * 100;
    } else {
        return 0;
    }
};

// Función para obtener los valores de los campos de entrada
const obtenerValoresEntrada = () => {
    const tempAmb = parseFloat(document.querySelector("#tempAmb").value);
    const humAmb = parseFloat(document.querySelector("#humAmb").value);
    const humSust = parseFloat(document.querySelector("#humSust").value);
    const phSust = parseFloat(document.querySelector("#phSust").value);
    return { tempAmb, humAmb, humSust, phSust };
};

// Función para mostrar la tarjeta de la etapa seleccionada
const mostrarTarjeta = () => {
    const cardContainer = document.querySelector(".card-verificacion#card-verificacion");
    cardContainer.style.display = etapaSeleccionada ? "block" : "none";
};

// Función para mostrar la tarjeta de desviaciones
function mostrarDesviaciones() {
    const alertaRango = JSON.parse(localStorage.getItem("alertas")) || [];
    const tarjetaExistente = document.querySelector(".card-desviaciones");
    tarjetaExistente && tarjetaExistente.remove();
    
    // Crear una nueva tarjeta con las desviaciones o alerta Swal de exito
    const tarjetaHTML = alertaRango && alertaRango.length > 0 ?
        `<div class="card-desviaciones">
      <div>
        <h2>Chequeá estos parámetros! ⚠</h2>
        <ul>
          ${alertaRango.map(desviacion => desviacion ? `<li>${desviacion}</li>` : "").join("")}
        </ul>
      </div>
    </div>` :
        mostrarSwalExito();
    // Insertar la tarjeta
    document.body.insertAdjacentHTML("beforeend", tarjetaHTML);

    // Hacer scroll suave hacia el contenedor de desviaciones
    const desviacionesContainer = document.querySelector(".card-desviaciones");
    desviacionesContainer.scrollIntoView({ behavior: "smooth" });
}

// Función para mensaje Swal exitoso 
function mostrarSwalExito() {
    Swal.fire({
        title: "Buen trabajo!",
        text: "Todos los parámetros se encuentran dentro de los valores recomendados!",
        icon: "success"
    }).then(() => {
        // Eliminar alertas del localStorage después de mostrar éxito
        localStorage.removeItem("alertas");
    });
    return "";
}

// Creación objetos etapas con sus rangos de parámetros
const plantula = new Etapas(
    { min: 21, max: 26 },
    { min: 65, max: 75 },
    { min: 60, max: 70 },
    { min: 5.8, max: 6.2 }
);
const vegetativa = new Etapas(
    { min: 20, max: 25 },
    { min: 50, max: 60 },
    { min: 60, max: 70 },
    { min: 6.0, max: 6.5 }
);
const floracion = new Etapas(
    { min: 22, max: 26 },
    { min: 40, max: 50 },
    { min: 40, max: 60 },
    { min: 6.0, max: 6.5 }
);

// Objeto para almacenar las instancias de Etapas
const etapasMap = {
    plantula,
    vegetativa,
    floracion
};

// Variable para almacenar la etapa seleccionada
let etapaSeleccionada = null;

// Obtener elementos por su ID
const plantulaCard = document.querySelector("#plantula-card");
const vegetativaCard = document.querySelector("#vegetativa-card");
const floracionCard = document.querySelector("#floracion-card");

// Asignar funciones al evento onclick después de haber definido las funciones
plantulaCard.addEventListener("click", () => seleccionarEtapa("plantula"));
vegetativaCard.addEventListener("click", () => seleccionarEtapa("vegetativa"));
floracionCard.addEventListener("click", () => seleccionarEtapa("floracion"));

// Boton verificar parámetros
const verificarParametrosBtn = document.querySelector("#verificarParametrosBtn");
verificarParametrosBtn.addEventListener("click", () => verificarParametros());

// Función para reiniciar los campos de entrada
function limpiarCamposEntrada() {
    document.querySelector("#tempAmb").value = "";
    document.querySelector("#humAmb").value = "";
    document.querySelector("#humSust").value = "";
    document.querySelector("#phSust").value = "";
}

function seleccionarEtapa(nombreEtapa) {

    // Remover la clase "seleccionada" de todas las tarjetas
    document.querySelectorAll(".etapa-card").forEach(card => card.classList.remove("seleccionada"));

    etapaSeleccionada = etapasMap[nombreEtapa];

    // Aplica la clase "seleccionada" a la tarjeta de la etapa elegida
    document.getElementById(nombreEtapa + "-card").classList.add("seleccionada");

    mostrarTarjeta();
}

function verificarParametros() {
    const valoresEntrada = obtenerValoresEntrada();

    // Validar que se haya seleccionado una etapa
    if (!etapaSeleccionada) {
        Swal.fire({
            icon: "error",
            title: "Atención!",
            text: "Por favor, selecciona una etapa antes de verificar los parámetros."
        });
        return;
    }

    // Validar que todos los valores sean números
    if (isNaN(valoresEntrada.tempAmb) || isNaN(valoresEntrada.humAmb) || isNaN(valoresEntrada.humSust) || isNaN(valoresEntrada.phSust)) {
        Swal.fire({
            icon: "error",
            title: "Atención!",
            text: "Por favor, ingresa un número en cada casillero."
        });
        return;
    }

    // Verifica y almacena las alertas
    const alertaRango = etapaSeleccionada.verificarParametros(valoresEntrada.tempAmb, valoresEntrada.humAmb, valoresEntrada.humSust, valoresEntrada.phSust);
    // Almacenar en localStorage
    localStorage.setItem("alertas", JSON.stringify(alertaRango || []));
    // Limpiar campos de entrada
    limpiarCamposEntrada();
    // Mostrar la tarjeta de desviaciones
    mostrarDesviaciones(alertaRango);
}

// Función para verificar si la ubicación está habilitada
function isLocationEnabled() {
    return "geolocation" in navigator;
}

const temperaturaLocal = document.querySelector("#temperatura");
const ubicacionLocal = document.querySelector("#ubicacion");
const obtenerClimaBtn = document.querySelector("#obtenerClimaBtn");

// Agregar un evento de clic al botón para obtener información del clima
obtenerClimaBtn.addEventListener("click", () => {
    obtenerUbicacion();
});

// Llama a la función para obtener ubicación al cargar la página
obtenerUbicacion();

// Función para obtener ubicación automáticamente usando la API de geolocalización del navegador
function obtenerUbicacion() {
    navigator.geolocation.getCurrentPosition(
        position => {
            const latitud = position.coords.latitude;
            const longitud = position.coords.longitude;
            // Obtener datos del tiempo usando las coordenadas
            obtenerDatosDelTiempo(latitud, longitud);
        },
        error => {
            mostrarToast("Error al obtener la ubicación. Por favor, verifica tener la ubicación de tu navegador habilitada e intenta nuevamente.");
        }
    );
}

// Función para mostrar la información del clima en el área lateral
function mostrarDatosDelTiempo(datos) {
    temperaturaLocal.textContent = `Temperatura: ${datos.current.temp_c}°C`;
    ubicacionLocal.textContent = `Ubicación: ${datos.location.name}, ${datos.location.country}`;
}

// Función para obtener datos del tiempo usando las coordenadas
async function obtenerDatosDelTiempo(latitud, longitud) {
    const apiKey = 'fbcbaee28emsh9e5feb94eea783fp15a2c6jsn911be4a20af1';
    const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${latitud}%2C${longitud}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
    };
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        mostrarDatosDelTiempo(result);
    } catch (error) {
        mostrarToast("Error al obtener los datos del tiempo. Por favor, intenta nuevamente en unos minutos.");
    }
}

// Función para mostrar Toast
function mostrarToast(mensaje) {
    Toastify({
        text: mensaje,
        gravity: "top",
        position: "left",
        style: {
            background: "linear-gradient(to right, #D35400, #fc0303)",
            width: "300px",
        }
    }).showToast();
}