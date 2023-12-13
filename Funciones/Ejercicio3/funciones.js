const botonSendRows = document.getElementById("send_filas")
const rows = document.getElementById("filasIngresadas")

var salida = document.getElementById("respuesta")

botonSendRows.onclick = function(){ 
    console.log(rows.value)
    salida.innerHTML = dibujarTriangulo()
    
}
function dibujarTriangulo() {
    const numFilas = parseInt(rows.value);
    let triangulo = '';
    for (let i = 1; i <= numFilas; i++) {
        triangulo += ' '.repeat(numFilas - i) + '*'.repeat(2 * i - 1) + '\n';
    }
    return triangulo;
}