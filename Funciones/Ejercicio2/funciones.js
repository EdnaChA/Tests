const botonSendNumber = document.getElementById("send_number")
const number = document.getElementById("numeroIngresado")

var salidaFibonacci = document.getElementById("respuesta_fibonacci")

botonSendNumber.onclick = function(){ 
    console.log(number.value)
    salidaFibonacci.innerHTML = fibonacci()
}
function fibonacci() {
    let n = number.value;
    let lista = [0, 1];
    if (n == 0) {
        alert("Ingrese un número mayor a cero.")
        return " "
    }
    for (let i = 2; i < n; i++) {
        lista.push(lista[i - 1] + lista[i - 2]);
    }
    return lista;
}
