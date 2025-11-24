function enviarAyuda() {
    const numero = "1234567890"; // <-- PON AQUÍ EL NÚMERO DE EMERGENCIA
    const mensaje = encodeURIComponent("Necesito ayuda. Me siento en peligro en un autobús.");
    const url = `https://wa.me/${numero}?text=${mensaje}`;

    window.open(url, "_blank");
}
