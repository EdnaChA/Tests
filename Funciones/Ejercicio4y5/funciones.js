const botonSendFile = document.getElementById("send_archivo")
const botonSendFileAlpha = document.getElementById("send_alpha")
const botonDeleteFile = document.getElementById("clear_archivo")

botonSendFile.onclick = function(){
    const archivoSeleccionado = document.getElementById('archivo').files[0];
    if (archivoSeleccionado == null) {
        alert("Por favor seleccione un archivo.");
        return;
    }
    const lector = new FileReader();
    lector.onload = function(evento) {
        const contenido = evento.target.result;
        // Dividir por espacios en blanco
        const palabras = contenido.split(/\s+/); 
        // Unir palabras con saltos de línea
        const resultadoFinal = palabras.join('\n'); 

        // Crear un nuevo archivo Blob
        const nuevoArchivo = new Blob([resultadoFinal], { type: 'text/plain' });
        // Crear una URL para el archivo Blob
        const urlArchivo = URL.createObjectURL(nuevoArchivo);
        // Crear un enlace para descargar el archivo
        const enlaceDescarga = document.createElement('a');
        enlaceDescarga.href = urlArchivo;
        enlaceDescarga.download = 'resultado_palabras.txt';
        enlaceDescarga.click();

        // Liberar la URL del objeto Blob
        URL.revokeObjectURL(urlArchivo);
    }

    lector.readAsText(archivoSeleccionado);
}
botonSendFileAlpha.onclick = function(){
    const archivoSeleccionado = document.getElementById('archivo').files[0];
    if (archivoSeleccionado == null) {
        alert("Por favor seleccione un archivo.");
        return;
    }
    const lector = new FileReader();
    lector.onload = function(evento) {
        const contenido = evento.target.result;
        // Dividir por espacios en blanco
        const palabras = contenido.split(/\s+/);
        // Ordenar alfabéticamente las palabras sin tener en cuenta MAYUS o MINUS
        palabras.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
        // Unir palabras con saltos de línea
        const resultadoFinal = palabras.join('\n'); 

        // Crear un nuevo archivo Blob
        const nuevoArchivo = new Blob([resultadoFinal], { type: 'text/plain' });
        // Crear una URL para el archivo Blob
        const urlArchivo = URL.createObjectURL(nuevoArchivo);
        // Crear un enlace para descargar el archivo
        const enlaceDescarga = document.createElement('a');
        enlaceDescarga.href = urlArchivo;
        enlaceDescarga.download = 'palabras_alfabeticamente.txt';
        enlaceDescarga.click();

        // Liberar la URL del objeto Blob
        URL.revokeObjectURL(urlArchivo);
    }

    lector.readAsText(archivoSeleccionado);
}