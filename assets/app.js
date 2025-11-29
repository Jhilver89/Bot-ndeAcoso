// Función para iniciar el escaneo del QR
function iniciarEscaneo() {
    document.getElementById("qr-scanner").style.display = "block"; // Mostrar el contenedor del escáner

    // Asegurarnos de que el navegador pida permiso para acceder a la cámara
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
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
            });
    } else {
        alert("La cámara no está disponible en tu dispositivo.");
    }
}
