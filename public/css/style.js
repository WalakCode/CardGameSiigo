// Función para mostrar la ventana emergente de error
function showErrorPopup() {
    const errorPopup = document.getElementById("errorPopup");
    errorPopup.style.display = "block";
}

// Función para ocultar la ventana emergente de error
function closeErrorPopup() {
    const errorPopup = document.getElementById("errorPopup");
    errorPopup.style.display = "none";
}

// Asociar la función showErrorPopup al evento de un botón o cualquier otro desencadenante
const showErrorButton = document.getElementById("showErrorButton");
showErrorButton.addEventListener("click", showErrorPopup);

// Asociar la función closeErrorPopup al botón "Cerrar" para cerrar la ventana emergente
const closeButton = document.getElementById("closeButton");
closeButton.addEventListener("click", closeErrorPopup);


<div id="errorPopup" class="popup">
    <p id="errorMessage">Este es un mensaje de error.</p>
    <button id="closeButton">Cerrar</button>
</div>