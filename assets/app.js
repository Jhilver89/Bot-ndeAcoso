// Función para configurar el número de ayuda
function configurarNumero() {
    const numeroUsuario = prompt("Introduce tu número de emergencia (con el código de país, ej. +51963973004):");
    if (numeroUsuario) {
        localStorage.setItem("numeroEmergencia", numeroUsuario); // Guardar el número en el almacenamiento local
    }
}

// Función para enviar la solicitud de ayuda con el número configurado
function enviarAyuda() {
    const numero = localStorage.getItem("numeroEmergencia"); // Obtener el número configurado por el usuario
    if (!numero) {
        alert("Por favor, configura un número de emergencia primero.");
        return;
    }
    
    const mensaje = encodeURIComponent("Necesito ayuda. Me siento en peligro en un autobús.");
    const url = `https://wa.me/${numero}?text=${mensaje}`;

    window.open(url, "_blank");
}

// Llamada para configurar el número (esto se podría hacer con un botón)
document.addEventListener("DOMContentLoaded", () => {
    if (!localStorage.getItem("numeroEmergencia")) {
        // Si no se ha configurado un número, permitir configurarlo automáticamente
        if (confirm("¿Quieres configurar un número de emergencia?")) {
            configurarNumero();
        }
    }
});
