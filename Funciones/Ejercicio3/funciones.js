const botonSendRows = document.getElementById("send_filas")
const rows = document.getElementById("filasIngresadas")
var salida = document.getElementById("respuesta")

botonSendRows.onclick = function(){ 
    if(rows.value == 0){
        alert("Ingrese un número mayor a cero")
    }
    salida.innerHTML = dibujarTriangulo()
    
}
function dibujarTriangulo() {
    const numFilas = parseInt(rows.value);
    let triangulo = '';

    for (let i = 1; i <= numFilas; i++) {
        triangulo += ' '.repeat(numFilas - i) + '*'.repeat(2 * i - 1) + ' '.repeat(numFilas - i) + '\n';
    }
    return triangulo;
}