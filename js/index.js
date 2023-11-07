
//Calcula porcentaje de desviación
function porcentajeDesviacion(valor, min, max) {
    if (valor < min) {
        return ((min - valor) / min) * 100;
    } else if (valor > max) {
        return ((valor - max) / max) * 100;
    } else {
        return 0;
    }
}

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


//Función principal
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

// Array de usuarios y contraseñas
const usuarios = [
    { usuario: "Nico", contrasenia: "1234" },
    { usuario: "Diego", contrasenia: "2345" },
    { usuario: "Coder", contrasenia: "3456" },
];

// Función para validar el usuario
function validarUsuario() {
    const usuarioIngresado = prompt("Ingrese su nombre de usuario:");
    const contraseniaIngresada = prompt("Ingrese su contraseña:");

    const usuarioEncontrado = usuarios.find(
        (usuario) => usuario.usuario === usuarioIngresado && usuario.contrasenia === contraseniaIngresada);

    if (usuarioEncontrado) {
        alert("🍀Bienvenido " + usuarioIngresado + "!🍀");
        asistenteCultivo(); 
    } else {
        alert("Nombre de usuario y/o contraseña incorrectos. Intente nuevamente o regístrese.");
    }
}

validarUsuario();