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

// Función para iniciar el escaneo del QR
function iniciarEscaneo() {
    document.getElementById("qr-scanner").style.display = "block"; // Mostrar el contenedor del escáner

    // Asegurarnos de que el navegador pida permiso para acceder a la cámara
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
            .then(function (stream) {
                const html5QrCode = new Html5Qrcode("reader");
                
                // Intentar iniciar el escáner QR
                html5QrCode.start(
                    { facingMode: "environment" }, // Usar la cámara trasera
                    {
                        fps: 10,    // Frecuencia de fotogramas
                        qrbox: 250  // Tamaño del área de escaneo
                    },
                    (decodedText, decodedResult) => {
                        // Aquí se maneja el código QR escaneado
                        alert("QR escaneado: " + decodedText);
                        // Guardar el número del QR (suponiendo que es un número de teléfono)
                        localStorage.setItem("numeroEmergencia", decodedText);
                        alert("Número de emergencia configurado: " + decodedText);
                        detenerEscaneo(); // Detener el escaneo después de escanear el QR
                    },
                    (errorMessage) => {
                        console.log(errorMessage); // Manejar errores
                    }
                ).catch(err => {
                    console.error("Error al iniciar el escaneo: ", err);
                    alert("Hubo un error al iniciar el escáner: " + err);
                });
            })
            .catch(function (error) {
                alert("No se puede acceder a la cámara. Verifica los permisos.");
                console.error("Error al acceder a la cámara:", error);
            });
    } else {
        alert("La cámara no está disponible en tu dispositivo.");
    }
}

// Función para detener el escaneo del QR
function detenerEscaneo() {
    document.getElementById("qr-scanner").style.display = "none"; // Ocultar el escáner
    Html5Qrcode.getCameras().then(devices => {
        devices && devices.length > 0 && html5QrCode.stop();
    }).catch(err => {
        console.log(err);
    });
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
