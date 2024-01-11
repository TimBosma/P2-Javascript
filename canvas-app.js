// script.js

// Wacht tot het hele document is geladen voordat de JavaScript-code wordt uitgevoerd
window.addEventListener("load", function () {
    // Haal het canvas-element op uit het HTML-document
    const canvas = document.querySelector("canvas");
    // Haal de 2D-renderingcontext van het canvas op
    const ctx = canvas.getContext("2d");

    // Stel de canvasafmetingen in om overeen te komen met de grootte van het browservenster
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    // Variabele om bij te houden of de gebruiker momenteel aan het tekenen is
    let painting = false;

    // Functie om te beginnen met tekenen wanneer de muisknop wordt ingedrukt
    function startTeken(e) {
        // Zet tekenen op true wanneer de muisknop wordt ingedrukt
        painting = true;
        console.log("Ik ben aan het tekenen");
        // Roep de tekenfunctie aan om onmiddellijk te beginnen met tekenen
        teken(e);
    }

    // Functie om te stoppen met tekenen wanneer de muisknop wordt losgelaten
    function eindigTeken() {
        // Zet tekenen op false wanneer de muisknop wordt losgelaten
        painting = false;
        // Start een nieuw pad voor het volgende tekensegment
        ctx.beginPath();
        console.log("Ik ben klaar met tekenen");
    }

    // Functie om lijnen op het canvas te tekenen terwijl de muis beweegt
    function teken(e) {
        // Controleer of de gebruiker momenteel aan het tekenen is
        if (!painting) return;

        // Stel de lijnattributen in
        ctx.lineWidth = 10;
        ctx.lineCap = "round";

        // Teken een lijn naar de huidige muispositie
        ctx.lineTo(e.clientX, e.clientY);
        // Toon de getekende lijn op het canvas
        ctx.stroke();

        // Start een nieuw pad voor het volgende tekensegment
        ctx.beginPath();
        // Ga naar de huidige muispositie om de volgende lijn te beginnen
        ctx.moveTo(e.clientX, e.clientY);
    }

    // Eventlisteners om te reageren op muisgebeurtenissen
    canvas.addEventListener("mousedown", startTeken);
    canvas.addEventListener("mouseup", eindigTeken);
    canvas.addEventListener("mousemove", teken);
});
