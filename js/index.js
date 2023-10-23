// Selección etapa de cultivo
let etapa = prompt("Selecciona la etapa de cultivo, ingresa 1 para Plántula, 2 para Vegetación o 3 para Floración: ");

let etapaValida = etapa === "1" || etapa === "2" || etapa === "3";

while (!etapaValida) {
    if (etapa === null) {
        alert("😮 No te vayas! queremos ayudarte con tu cultivo! 🤝🏼")
        etapa = prompt("Vamos de nuevo. Ingresa 1 para Plántula, 2 para Vegetación o 3 para Floración: ");
    } else {
        etapa = prompt("Etapa de cultivo no válida. Ingresa 1 para Plántula, 2 para Vegetación o 3 para Floración: ");

        etapaValida = etapa === "1" || etapa === "2" || etapa === "3";
    } 
}

// Ingreso valores de los parámetros
const tempAmb = parseFloat(prompt("Introduce la temperatura ambiente: "));
const humAmb = parseFloat(prompt("Introduce la humedad ambiente: "));
const humSust = parseFloat(prompt("Introduce la humedad del sustrato: "));
const phSust = parseFloat(prompt("Introduce el pH del sustrato: "));

// Comparar con rangos recomendados
function verificarParametros(etapa, tempAmb, humAmb, humSust, phSust) {
    switch (etapa) {
        case "1":
            if (tempAmb < 21 || tempAmb > 26) {
                alert("🌡 La temperatura está fuera del rango recomendado para la etapa de plántula. Se sugiere que se encuentre entre 21 y 26 grados centígrados.");
            }

            if (humAmb < 65 || humAmb > 75) {
                alert("☔ La humedad ambiente está fuera del rango recomendado para la etapa de plántula. Se sugiere que se encuentre entre 65 y 75%.");
            }

            if (humSust < 60 || humSust > 70) {
                alert("💧 La humedad del sustrato está fuera del rango recomendado para la etapa de plántula. Se sugiere que se encuentre entre 60 y 70%");
            }

            if (phSust < 5.8 || phSust > 6.2) {
                alert("⚠ El pH del sustrato está fuera del rango recomendado para la etapa de plántula. Se sugiere que se encuentre entre 5.8 y 6.2");
            }
            break;


        case "2":
            if (tempAmb < 20 || tempAmb > 25) {
                alert("🌡 La temperatura está fuera del rango recomendado para la etapa vegetativa. Se sugiere que se encuentre entre 20 y 25 grados centígrados.");
            }

            if (humAmb < 50 || humAmb > 60) {
                alert("☔ La humedad ambiente está fuera del rango recomendado para la etapa vegetativa. Se sugiere que se encuentre entre 50 y 60%.");
            }

            if (humSust < 60 || humSust > 70) {
                alert("💧 La humedad del sustrato está fuera del rango recomendado para la etapa vegetativa. Se sugiere que se encuentre entre 60 y 70%");
            }

            if (phSust < 6.0 || phSust > 6.5) {
                alert("⚠ El pH del sustrato está fuera del rango recomendado para la etapa vegetativa. Se sugiere que se encuentre entre 6 y 6.5");
            }
            break;

        case "2":
            if (tempAmb < 22 || tempAmb > 26) {
                alert("🌡 La temperatura está fuera del rango recomendado para la etapa de floración. Se sugiere que se encuentre entre 22 y 26 grados centígrados.");
            }

            if (humAmb < 40 || humAmb > 50) {
                alert("☔ La humedad ambiente está fuera del rango recomendado para la etapa de floración. Se sugiere que se encuentre entre 40 y 50%");
            }

            if (humSust < 40 || humSust > 60) {
                alert("💧 La humedad del sustrato está fuera del rango recomendado para la etapa de floración.Se sugiere que se encuentre entre 40 y 60%");
            }

            if (phSust < 6.0 || phSust > 6.5) {
                alert("⚠ El pH del sustrato está fuera del rango recomendado para la etapa de floración. Se sugiere que se encuentre entre 6.2 y 6.8");
            }
            break;
    }
}

verificarParametros(etapa, tempAmb, humAmb, humSust, phSust)
