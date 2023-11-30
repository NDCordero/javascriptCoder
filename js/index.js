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

    const tarjetaExistente = document.querySelector(".tarjeta");
    if (tarjetaExistente) {
        tarjetaExistente.remove();
    }

    // Crear una nueva tarjeta con las desviaciones o el mensaje de buenos resultados
    const tarjetaHTML = alertaRango.length > 0 ?
        `<div class="tarjeta">
            <div class="contenido-tarjeta">
                <h2>Chequeá estos parámetros! ⚠</h2>
                <ul>
                    ${alertaRango.map(desviacion => `<li>${desviacion}</li>`).join("")}
                </ul>
            </div>
        </div>` :
        `<div class="tarjeta">
            <div class="contenido-tarjeta">
                <p>Buenas noticias! Todos los parámetros están dentro del rango recomendado! ✔</p>
            </div>
        </div>`;

    // Insertar la tarjeta
    document.body.insertAdjacentHTML("beforeend", tarjetaHTML);
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

function seleccionarEtapa(nombreEtapa) {
    etapaSeleccionada = etapasMap[nombreEtapa];
    mostrarTarjeta();
}

function verificarParametros() {
    const valoresEntrada = obtenerValoresEntrada();

    // Validar que se haya seleccionado una etapa
    if (!etapaSeleccionada) {
        mostrarTarjetaMensaje("Por favor, selecciona una etapa antes de verificar los parámetros.");
        return;
    }

    // Validar que todos los valores sean números
    if (isNaN(valoresEntrada.tempAmb) || isNaN(valoresEntrada.humAmb) || isNaN(valoresEntrada.humSust) || isNaN(valoresEntrada.phSust)) {
        mostrarTarjetaMensaje("Por favor, ingresa un número en cada casillero.");
        return;
    }

    // Verifica y almacena las alertas
    const alertaRango = etapaSeleccionada.verificarParametros(valoresEntrada.tempAmb, valoresEntrada.humAmb, valoresEntrada.humSust, valoresEntrada.phSust);

    // Almacenar en localStorage
    localStorage.setItem("alertas", JSON.stringify(alertaRango));

    // Mostrar la tarjeta de desviaciones
    mostrarDesviaciones(alertaRango);
}


function mostrarTarjetaMensaje(mensaje) {
    const tarjetaExistente = document.querySelector(".tarjeta");
    if (tarjetaExistente) {
        tarjetaExistente.remove();
    }

    // Crear una nueva tarjeta
    const tarjetaHTML = `<div class="tarjeta">
                            <div class="contenido-tarjeta">
                            <p>${mensaje}</p></div>
                        </div>`;

    // Mostrar la tarjeta
    document.body.insertAdjacentHTML("beforeend", tarjetaHTML);
}
