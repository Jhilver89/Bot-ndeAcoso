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
function startScan() {
    document.getElementById("qr-scanner").style.display = "block"; // Mostrar el contenedor del escáner

    // Asegurarnos de que el navegador pida permiso para acceder a la cámara
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
            .then(function (stream) {
                const scanner = new Instascan.Scanner({ video: document.getElementById('preview') });
                
                // Intentar iniciar el escáner QR
                scanner.addListener('scan', function(content) {
                    alert("QR escaneado: " + content);
                    // Guardar el número del QR (suponiendo que es un número de teléfono)
                    localStorage.setItem("numeroEmergencia", content);
                    alert("Número de emergencia configurado: " + content);
                    stopScan();
                });

                // Iniciar la cámara
                Instascan.Camera.getCameras().then(function(cameras) {
                    if (cameras.length > 0) {
                        scanner.start(cameras[0]); // Usar la cámara trasera por defecto
                    } else {
                        alert("No se encontraron cámaras.");
                    }
                }).catch(function(e) {
                    console.error(e);
                    alert("No se pudo acceder a la cámara.");
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
function stopScan() {
    document.getElementById("qr-scanner").style.display = "none"; // Ocultar el escáner
    document.getElementById('preview').style.display = 'none'; // Ocultar el video de la cámara
}
