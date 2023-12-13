const botonSendYear = document.getElementById("send_year")
const year = document.getElementById("añoIngresado")

var salidaAño = document.getElementById("respuesta_año")

botonSendYear.onclick = function(){ 
    console.log(year.value)
    if(validarBisiesto() == true){
        salidaAño.innerHTML = "El año ingresado SI es bisiesto"
    }
    else{
        salidaAño.innerHTML = "El año ingresado NO es bisiesto"
    }
}

function validarBisiesto() {
    let año = year.value
    let bisiesto = false;
    if (año % 4 == 0 && año % 100 != 0){
        bisiesto = true;
    } else if (año % 400 == 0){
        bisiesto = true;
    }
    return bisiesto;
}