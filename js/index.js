
class Etapas {
    constructor(rangoTempAmb, rangoHumAmb, rangoHumSust, rangoPhSust) {
        this.rangoTempAmb = rangoTempAmb;
        this.rangoHumAmb = rangoHumAmb;
        this.rangoHumSust = rangoHumSust;
        this.rangoPhSust = rangoPhSust;
    }

    verificarParametros(tempAmb, humAmb, humSust, phSust) {
        if (
            tempAmb < this.rangoTempAmb.min || tempAmb > this.rangoTempAmb.max
        ) {
            alert("🌡 La temperatura está fuera del rango recomendado para esta etapa. Se sugiere que se encuentre entre " + this.rangoTempAmb.min + " y " + this.rangoTempAmb.max + " grados centígrados.");
        }

        if (
            humAmb < this.rangoHumAmb.min || humAmb > this.rangoHumAmb.max
        ) {
            alert("☔ La humedad ambiente está fuera del rango recomendado para esta etapa. Se sugiere que se encuentre entre " + this.rangoHumAmb.min + " y " + this.rangoHumAmb.max + "%.");
        }

        if (
            humSust < this.rangoHumSust.min || humSust > this.rangoHumSust.max
        ) {
            alert("💧 La humedad del sustrato está fuera del rango recomendado para esta etapa. Se sugiere que se encuentre entre " + this.rangoHumSust.min + " y " + this.rangoHumSust.max + "%.");
        }

        if (
            phSust < this.rangoPhSust.min || phSust > this.rangoPhSust.max
        ) {
            alert("⚠ El pH del sustrato está fuera del rango recomendado para esta etapa. Se sugiere que se encuentre entre " + this.rangoPhSust.min + " y " + this.rangoPhSust.max);
        }
    }


}

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

function asistenteCultivo() {
    let etapa = prompt("Selecciona la etapa de cultivo, ingresa 1 para Plántula, 2 para Vegetación o 3 para Floración: ");

    let etapaValida = etapa === "1" || etapa === "2" || etapa === "3";

    while (!etapaValida) {
        if (etapa === null) {
            alert("😮 No te vayas, queremos ayudarte con tu cultivo! 🤝🏼");
            etapa = prompt("Vamos de nuevo. Ingresa 1 para Plántula, 2 para Vegetación o 3 para Floración: ");
            etapaValida = etapa === "1" || etapa === "2" || etapa === "3";
        } else {
            etapa = prompt("Etapa de cultivo no válida. Ingresa 1 para Plántula, 2 para Vegetación o 3 para Floración: ");
            etapaValida = etapa === "1" || etapa === "2" || etapa === "3";
        }
    }

    const tempAmb = parseFloat(prompt("Introduce la temperatura ambiente (en ºC): "));
    const humAmb = parseFloat(prompt("Introduce la humedad ambiente (% humedad relativa): "));
    const humSust = parseFloat(prompt("Introduce la humedad del sustrato: "));
    const phSust = parseFloat(prompt("Introduce el pH del sustrato: "));

    switch (etapa) {
        case "1":
            plantula.verificarParametros(tempAmb, humAmb, humSust, phSust);
            break;
        case "2":
            vegetativa.verificarParametros(tempAmb, humAmb, humSust, phSust);
            break;
        case "3":
            floracion.verificarParametros(tempAmb, humAmb, humSust, phSust);
            break;
    }
}

// Llamada a la función para iniciar el asistente de cultivo
asistenteCultivo();

