//Creacion clase para las distintas etapas
class Etapas {
    constructor(rangoTempAmb, rangoHumAmb, rangoHumSust, rangoPhSust) {
        this.rangoTempAmb = rangoTempAmb;
        this.rangoHumAmb = rangoHumAmb;
        this.rangoHumSust = rangoHumSust;
        this.rangoPhSust = rangoPhSust;
    }

    // Compara con rangos recomendados según la etapa
    verificarParametros(tempAmb, humAmb, humSust, phSust) {
        const alertaRango = [];
        

        if (tempAmb < this.rangoTempAmb.min || tempAmb > this.rangoTempAmb.max) {
            alertaRango.push("🌡 La temperatura registrada de " + tempAmb + "ºC está fuera del rango recomendado para esta etapa. Se sugiere que se encuentre entre " + this.rangoTempAmb.min + "ºC y " + this.rangoTempAmb.max + "ºC.");
        }

        if (humAmb < this.rangoHumAmb.min || humAmb > this.rangoHumAmb.max) {
            alertaRango.push("☔ La humedad relativa ambiente registrada de " + humAmb + "% está fuera del rango recomendado para esta etapa. Se sugiere que se encuentre entre " + this.rangoHumAmb.min + " y " + this.rangoHumAmb.max + "%.");
        }

        if (humSust < this.rangoHumSust.min || humSust > this.rangoHumSust.max) {
            alertaRango.push("💧 La humedad del sustrato registrada de " + humSust + "% está fuera del rango recomendado para esta etapa. Se sugiere que se encuentre entre " + this.rangoHumSust.min + " y " + this.rangoHumSust.max + "%.");
        }

        if (phSust < this.rangoPhSust.min || phSust > this.rangoPhSust.max) {
            alertaRango.push("⚠ El pH del sustrato registrado de " + phSust + "está fuera del el rango recomendado para esta etapa. Se sugiere que se encuentre entre " + this.rangoPhSust.min + " y " + this.rangoPhSust.max);
        }
        
        return alertaRango;
    }
}

//Creación objetos etapas con sus rangos de parámetros
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
    let etapa = prompt("BIENVENIDX A TU ASISTENTE DE CULTIVO\n\nSelecciona la etapa de cultivo. Ingresa:\n1. 🌱Plántula\n2. 🌳Vegetativa\n3. 💐Floración ");
    let etapaValida = etapa === "1" || etapa === "2" || etapa === "3";
    let advertencias = [];

    while (!etapaValida) {
        if (etapa === null) {
            alert("😮 Lamentamos que quieras irte, te esperamos de regreso! 🤝🏼");
            return
        } else {
            etapa = prompt("⛔Etapa de cultivo no válida. Intenta nuevamente!\n\n1. 🌱Plántula\n2. 🌳Vegetativa\n3. 💐Floración ");
            etapaValida = etapa === "1" || etapa === "2" || etapa === "3";
        }
    }

    // Ingreso valores de los parámetros
    const tempAmb = parseFloat(prompt("Introduce la temperatura ambiente en ºC: "));
    const humAmb = parseFloat(prompt("Introduce la humedad relativa ambiente en %: "));
    const humSust = parseFloat(prompt("Introduce la humedad del sustrato en %: "));
    const phSust = parseFloat(prompt("Introduce el pH del sustrato: "));


    switch (etapa) {
        case "1":
            advertencias = plantula.verificarParametros(tempAmb, humAmb, humSust, phSust);
            break;
        case "2":
            advertencias = vegetativa.verificarParametros(tempAmb, humAmb, humSust, phSust);
            break;
        case "3":
            advertencias = floracion.verificarParametros(tempAmb, humAmb, humSust, phSust);
            break;
    }


    //Advertencias y creación de tabla con fecha para registro
    const fecha = new Date()

    if (advertencias.length > 0) {
        alert("⛔Advertencias⛔\n\n" + advertencias.join("\n\n"));
        console.table(fecha + "\n\n" + advertencias.join("\n\n"))
    } else {
        alert("Buenas noticias! Todos los parámetros están dentro del rango recomendado!✔");
    }
}

// Llamada a la función principal
//asistenteCultivo();