/**
 * Startet die Anwendung
 */
window.onload = function () {
    app.start()

    /**
     * Start der Animation
     * http://www.javascriptkit.com/javatutors/requestanimationframe.shtml
     * https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
     */
    window.requestAnimationFrame(app.rotate);
}
