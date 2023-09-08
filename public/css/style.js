// mostrar la ventana
function abriError() {
    const errorlo =document.getElementById("iderror"); //agregamos la ventana del error
    errorlo.style.display = "block";
}

// ocultar la ventana
function cerrarClose() {
    const errorlo = document.getElementById("iderror"); //agregamos la ventana del error 
    errorlo.style.display = "none";
    
}

function mostrarerr() {
    const errormostra = document.getElementById("mostrar-error"); //agregamos el id del error
    errormostra .addEventListener("iniciali", abriError ) //tomamos la primera funcion 
}