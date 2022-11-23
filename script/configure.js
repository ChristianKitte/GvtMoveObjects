//*************************************************************************
// App Werte
//*************************************************************************

/**
 * Die Nummer des aktiven Modells
 * @type {number}
 */
var activeModel = 0;

/**
 * Die Einstellung zur Anzeige des Gittergerüstes
 * @type {boolean}
 */
var showLine = document.getElementById("show-line").checked;

/**
 * Die Einstellung zur Ausführung der Animation
 * @type {boolean}
 */
var animateScene = document.getElementById("animate-scene").checked;

/**
 * Der Infotext für den verwendeten Projektionstyp
 * @type {HTMLElement}
 */
var projektionsText = document.getElementById("projection_text");
projektionsText.innerText = "Projektionstyp: Orthogonal";

//*************************************************************************
// 3th Party
//*************************************************************************

window.requestAnimationFrame = window.requestAnimationFrame
    || window.mozRequestAnimationFrame
    || window.msRequestAnimationFrame
    || function (f) {
        return setTimeout(f, 1000 / 60)
    } // simulate calling code 60

window.cancelAnimationFrame = window.cancelAnimationFrame
    || window.mozCancelAnimationFrame
    || function (requestID) {
        clearTimeout(requestID)
    } //fall back

//*************************************************************************
// UI Handler
//*************************************************************************

/**
 * Setzt den Wert für die Anzeige des Gittermodells und startet das Neuzeichnen
 */
document.getElementById("show-line").onchange = () => {
    showLine = document.getElementById("show-line").checked;
}

/**
 * Setzt den Wert für die Ausführung der Animation
 */
document.getElementById("animate-scene").onchange = () => {
    animateScene = document.getElementById("animate-scene").checked;

    if (animateScene) {
        window.requestAnimationFrame(app.rotate);
    } else {
        window.cancelAnimationFrame(app.rotate);
    }
}