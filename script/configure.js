//*************************************************************************
// App Werte
//*************************************************************************

/**
 * Die Nummer des aktiven Modells
 * @type {number}
 */
var activeModel = 0;

/**
 * Der Infotext für die Rekursiontiefe
 * @type {number}
 */
var currentRecursionDeep = 0;

/**
 * Die Einstellung zur Anzeige des Gittergerüstes
 * @type {boolean}
 */
var showLine = document.getElementById("show-line").checked;

/**
 * Der Infotext für den verwendeten Projektionstyp
 * @type {HTMLElement}
 */
var projektionsText = document.getElementById("projection_text");
projektionsText.innerText = "Projektionstyp: Orthogonal";

//*************************************************************************
// UI Handler
//*************************************************************************

/**
 * Setzt den Wert für die Anzeige des Gittermodells und startet das Neuzeichnen
 */
document.getElementById("perform-move").onchange = () => {
    showLine = document.getElementById("perform-move").checked;
    app.start();
}

/**
 * Setzt den Wert für die Anzeige des Gittermodells und startet das Neuzeichnen
 */
document.getElementById("show-line").onchange = () => {
    showLine = document.getElementById("show-line").checked;
    app.start();
}

/**
 * Zeigt die 1.Figur an
 */
document.getElementById("figure0").onclick = () => {
    activeModel = 0;
    app.start();
}