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
            alertaRango.push("🌡 La temperatura registrada de " + tempAmb + "ºC está fuera del rango recomendado para esta etapa. Se sugiere que se encuentre entre " + this.rangoTempAmb.min + "ºC y " + this.rangoTempAmb.max + "ºC.\nPorcentaje de desviación de la temperatura ambiente: " + Math.round(porcentajeDesviacionTemp) + "%");
        }

        if (humAmb < this.rangoHumAmb.min || humAmb > this.rangoHumAmb.max) {
            alertaRango.push("☔ La humedad relativa ambiente registrada de " + humAmb + "% está fuera del rango recomendado para esta etapa. Se sugiere que se encuentre entre " + this.rangoHumAmb.min + " y " + this.rangoHumAmb.max + "%.\nPorcentaje de desviación de la humedad ambiente: " + Math.round(porcentajeDesviacionHumAmb) + "%");
        }

        if (humSust < this.rangoHumSust.min || humSust > this.rangoHumSust.max) {
            alertaRango.push("💧 La humedad del sustrato registrada de " + humSust + "% está fuera del rango recomendado para esta etapa. Se sugiere que se encuentre entre " + this.rangoHumSust.min + " y " + this.rangoHumSust.max + "%.\nPorcentaje de desviación de la humedad del sustrato: " + Math.round(porcentajeDesviacionHumSust) + "%");
        }

        if (phSust < this.rangoPhSust.min || phSust > this.rangoPhSust.max) {
            alertaRango.push("⚠ El pH del sustrato registrado de " + phSust + "está fuera del el rango recomendado para esta etapa. Se sugiere que se encuentre entre " + this.rangoPhSust.min + " y " + this.rangoPhSust.max + ".\nPorcentaje de desviación del Ph: " + Math.round(porcentajeDesviacionPhSust) + "%");
        }

        return alertaRango;
    }
}

// Calcula porcentaje de desviación
function porcentajeDesviacion(valor, min, max) {
    if (valor < min) {
        return ((min - valor) / min) * 100;
    } else if (valor > max) {
        return ((valor - max) / max) * 100;
    } else {
        return 0;
    }
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
let etapaSeleccionada;

// Función para seleccionar la etapa
function seleccionarEtapa(nombreEtapa) {
    etapaSeleccionada = etapasMap[nombreEtapa];
    mostrarTarjeta();
}

// Función para mostrar la tarjeta de la etapa seleccionada
function mostrarTarjeta() {
    const cardContainer = document.querySelector(".card-verificacion#card-verificacion");
    cardContainer.style.display = etapaSeleccionada ? "block" : "none";
}

// Obtener elementos por su ID
const plantulaCard = document.querySelector("#plantula-card");
const vegetativaCard = document.querySelector("#vegetativa-card");
const floracionCard = document.querySelector("#floracion-card");

// Asignar funciones al evento onclick después de haber definido las funciones
plantulaCard.addEventListener("click", function () { seleccionarEtapa("plantula"); });
vegetativaCard.addEventListener("click", function () { seleccionarEtapa("vegetativa"); });
floracionCard.addEventListener("click", function () { seleccionarEtapa("floracion"); });

// Get the button element by its ID
const verificarParametrosBtn = document.getElementById("verificarParametrosBtn");

// Añadir evento click al botón
verificarParametrosBtn.addEventListener("click", function () {
    verificarParametros();
});

// Función para obtener los valores de los campos de entrada
function obtenerValoresEntrada() {
    const tempAmb = parseFloat(document.querySelector("#tempAmb").value);
    const humAmb = parseFloat(document.querySelector("#humAmb").value);
    const humSust = parseFloat(document.querySelector("#humSust").value);
    const phSust = parseFloat(document.querySelector("#phSust").value);

    return { tempAmb, humAmb, humSust, phSust };
}

// Función para verificar los parámetros
function verificarParametros() {
    const valoresEntrada = obtenerValoresEntrada();
    const tempAmb = valoresEntrada.tempAmb;
    const humAmb = valoresEntrada.humAmb;
    const humSust = valoresEntrada.humSust;
    const phSust = valoresEntrada.phSust;

    if (etapaSeleccionada) {
        const alertaRango = etapaSeleccionada.verificarParametros(tempAmb, humAmb, humSust, phSust);

        // Advertencias y creación de tabla con fecha para registro
        const fecha = new Date();

        if (alertaRango.length > 0) {
            alert("⛔Advertencias⛔\n\n" + alertaRango.join("\n\n"));
            console.table(fecha + "\n\n" + alertaRango.join("\n\n"));
        } else {
            alert("Buenas noticias! Todos los parámetros están dentro del rango recomendado!✔");
        }
    } else {
        alert("Selecciona una etapa antes de verificar los parámetros.");
    }
}

// Validar usuario al cargar la página
validarUsuario();
toggleTarjeta(); // Para asegurarse de que la tarjeta se oculte inicialmente

