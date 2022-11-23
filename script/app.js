/**
 * Das Hauptmodul der Anwendung. Es steuert die Ausgabe der Modelle sowie deren Erzeugung und
 * ermöglciht eine Interaktion
 * @type {{start: start}}
 */
var app = (function () {
    /**
     * Eine Kollektion der aktuell auszugebenden Modelle
     * @type {*[]}
     */
    let models = [];

    /**
     * Zeitspanne zwischen Animation in Millisekunde
     * @type {number}
     */
    let animationRate = 500;

    /**
     * Definiert eine virtuelle Kamera
     * @type {{eye: number[], distance: number, lrtb: number, vMatrix: mat4, center: number[], projectionType: string, up: number[], fovy: number, pMatrix: mat4, zAngle: number}}
     */
    let camera = {
        // Initial position of the camera.
        eye: [0, 1, 4],
        // Point to look at.
        center: [0.1, -.5, -2],
        // Roll and pitch of the camera.
        up: [0, 1, 0],
        // Opening angle given in radian.
        // radian = degree*2*PI/360.
        fovy: 60.0 * Math.PI / 180,
        // Camera near plane dimensions:
        // value for left right top bottom in projection.
        lrtb: 3.0,
        // View matrix.
        vMatrix: glMatrix.mat4.create(),
        // Projection matrix.
        pMatrix: glMatrix.mat4.create(),
        // Projection types: ortho, perspective, frustum.
        projectionType: "ortho",
        // Angle to Z-Axis for camera when orbiting the center
        // given in radian.
        zAngle: 0,
        yAngle: 0,
        // Distance in XZ-Plane from center when orbiting.
        distance: 14,
    };

    /**
     * Handelt die berücksichtigten Tastatureingaben aus und führt die notwendige Änderungen
     * aus
     */
    document.addEventListener('keydown', (event) => {
        const keyName = event.key;
        event.preventDefault();
        var deltaRotate = Math.PI / 36;
        var deltaTranslate = 0.05;

        if (keyName === 'Control') {
            // do not alert when only Control key is pressed.
            return;
        }

        switch (keyName) {
            case "ArrowUp": // ==> nach oben über die Szene
                //camera.zAngle += Math.PI / 36;
                camera.yAngle += deltaRotate;
                //camera.eye
                render();
                break;
            case "ArrowDown": // ==> nach unten über die Szene
                //camera.zAngle -= Math.PI / 36;
                camera.yAngle += deltaRotate;
                render();
                break;
            case "ArrowLeft": // ==> links um die Szene
                camera.zAngle += deltaRotate;
                render();
                break;
            case "ArrowRight": // ==> Rechts um die Szene
                camera.zAngle -= deltaRotate;
                render();
                break;

            case "o": // +y
                camera.projectionType = "ortho";
                projektionsText.innerText = "Projektionstyp: Orthogonal";
                render();
                break;
            case "p": // +y
                camera.projectionType = "perspective";
                projektionsText.innerText = "Projektionstyp: Perspektivisch";
                render();
                break;
            case "f": // +y
                camera.projectionType = "frustum";
                projektionsText.innerText = "Projektionstyp: Frustum";
                render();
                break;

            case "s": // +y
                camera.center[1] = camera.center[1] - 0.5;
                render();
                break;
            case "w": // -y
                camera.center[1] = camera.center[1] + 0.5;
                render();
                break;
            case "d": // -x
                camera.center[0] = camera.center[0] + 0.5;
                render();
                break;
            case "a": // x
                camera.center[0] = camera.center[0] - 0.5;
                render();
                break;
            case "Z":
                switch (camera.projectionType) {
                    case("ortho"):
                        camera.lrtb += 0.1;
                        render();
                        break;
                    case("frustum"):
                        camera.lrtb += 0.1;
                        render();
                        break;
                    case("perspective"):
                        camera.fovy += 5 * Math.PI / 180;
                        render();
                        break;
                }
                break;
            case "z":
                switch (camera.projectionType) {
                    case("ortho"):
                        camera.lrtb -= 0.1;
                        render();
                        break;
                    case("frustum"):
                        camera.lrtb -= 0.1;
                        render();
                        break;
                    case("perspective"):
                        camera.fovy -= 5 * Math.PI / 180;
                        render();
                        break;
                }
                break;
            case "n": // n ==> Radius kleiner
                camera.distance++;
                render();
                break;
            case "N": // shift-n ==> Radius größer
                camera.distance--;
                render();
                break;
        }

    }, false);

    /**
     * Startet die Initiierung des Moduls
     */
    function start() {
        init();
    }

    /**
     * Führ die notwendigen Initialisierungsschritt aus
     */
    function init() {
        models = [];

        WebGlInstance.webGL.create();
        camera.aspect = WebGlInstance.webGL.gl.viewportWidth / WebGlInstance.webGL.gl.viewportHeight;

        initModels();
        render();
    }

    /**
     * Definiert Szenen, in dem es auf Basis des Paramters activeModel (configure.js) ein oder mehr Modelle erzeugt und
     * zur Kollektion models hinhzufügt.
     */
    function initModels() {
        if (activeModel === 0) {/*
            createModel(
                "modSphere",
                [0, 0, 0], [0, 0, 0], [0.3, 0.3, 0.3],
                Math.PI / 1200, Math.PI / 640.0,
                [40.0, -20.0, 0.0], [500.0, 500.0], Math.PI / 1200,
                false, false);

            createModel(
                "modSphere",
                [0, 0, 0], [0, 0, 0], [0.3, 0.3, 0.3],
                Math.PI / 1200, Math.PI / 640.0,
                [40.0, -20.0, 0.0], [500.0, 500.0], Math.PI / 1200,
                false, false);

            createModel(
                "modSphere",
                [-1.4, 0, 0], [0, 1, 0], [0.2, 0.2, 0.2],
                Math.PI / 2.5, Math.PI / 640.0,
                [-3.0, -3.0, -3.0], [150.0, 550.0], Math.PI / 200,
                true, false);

            createModel(
                "modSphere",
                [1, 0.5, 0], [1, 1, 0], [0.4, 0.4, 0.4],
                Math.PI / 1200, Math.PI / 640.0,
                [4.0, 0.1, 0.1], [440.0, 500.0], Math.PI / 300,
                true, false)

            createModel(
                "modTorus",
                [0, 0, 0], [1, -1, 0], [1, 1, 1],
                0, Math.PI / 1000.0,
                [0.0, 0.0, 0.0], [0.0, 0.0], 0.0,
                false, true)*/

            createModel(
                "modSphere",
                [0, 0, 0], [0, 0, 0], [0.3, 0.3, 0.3],
                Math.PI / 640.0,
                [500.0, 500.0,0.0], [40.0, -20.0, 0.0], , Math.PI / 1200,
                false, false);

            createModel(
                "modSphere",
                [0, 0, 0], [0, 0, 0], [0.3, 0.3, 0.3],
                Math.PI / 1200, Math.PI / 640.0,
                [40.0, -20.0, 0.0], [500.0, 500.0], Math.PI / 1200,
                false, false);

            createModel(
                "modSphere",
                [-1.4, 0, 0], [0, 1, 0], [0.2, 0.2, 0.2],
                Math.PI / 2.5, Math.PI / 640.0,
                [-3.0, -3.0, -3.0], [150.0, 550.0], Math.PI / 200,
                true, false);

            createModel(
                "modSphere",
                [1, 0.5, 0], [1, 1, 0], [0.4, 0.4, 0.4],
                Math.PI / 1200, Math.PI / 640.0,
                [4.0, 0.1, 0.1], [440.0, 500.0], Math.PI / 300,
                true, false)

            createModel(
                "modTorus",
                [0, 0, 0], [1, -1, 0], [1, 1, 1],
                0, Math.PI / 1000.0,
                [0.0, 0.0, 0.0], [0.0, 0.0], 0.0,
                false, true)
        }
    }

    /**
     * Steuert die Erzeugung eines Modells indem es für das geforderte Modell alle notwendigen
     * Initiierungen vornimmt (iniDataAndBuffer sowie iniTransformations). Das fertige Modell
     * wird in die Kollektion models eingefügt.
     * @param modelName Der Modelname
     * @param translate Die Translation (3D Vektor)
     * @param rotate Die Rotation (3D Vektor)
     * @param scale Die Skalierung (3D Vektor)
     */
    function createModel(modelName, translate, rotate, scale, rotateDegree, rotateCenter, rotateRadius, rotateSpeed, turning, animated) {
        let model = {};

        initDataAndBuffers(model, modelName);
        initTransformations(model, translate, rotate, scale, rotateIni, rotateSpeed, orbitCenter, orbitRadius, orbitSpeed, animated, rotated);

        models.push(model);
    }
    /*
    function createModel(modelName, translate, rotate, scale, rotateIni, rotateSpeed, orbitCenter, orbitRadius, orbitSpeed, animated, rotated) {
        let model = {};

        initDataAndBuffers(model, modelName);
        initTransformations(model, translate, rotate, scale, rotateIni, rotateSpeed, orbitCenter, orbitRadius, orbitSpeed, animated, rotated);

        models.push(model);
    }*/

    /**
     * Initiiert die Daten und Buffer. Hierbei definiert der Modellname ein Modell anhand seiner Klasse. Dies Modell
     * wird aus den verfügbaren Modellen erzeugt und dessen Vorgaben in das übergebenen Modell übergeben.
     * @param model Das zu initiierende Modell
     * @param modelName Das aus eienm Modul erzeugte Modell (Verzeichnis Modelle)
     */
    function initDataAndBuffers(model, modelName) {
        this[modelName]['createModellVertex'].apply(model);

        // Buffer für die Punkte erzeugen und laden
        model.vbo = WebGlInstance.webGL.gl.createBuffer();
        WebGlInstance.webGL.gl.bindBuffer(WebGlInstance.webGL.gl.ARRAY_BUFFER, model.vbo);
        WebGlInstance.webGL.gl.bufferData(WebGlInstance.webGL.gl.ARRAY_BUFFER, new Float32Array(model.vertices), WebGlInstance.webGL.gl.STATIC_DRAW);

        // Buffer für die Indizes erzeugen und laden
        model.ibo = WebGlInstance.webGL.gl.createBuffer();
        WebGlInstance.webGL.gl.bindBuffer(WebGlInstance.webGL.gl.ELEMENT_ARRAY_BUFFER, model.ibo);
        WebGlInstance.webGL.gl.bufferData(WebGlInstance.webGL.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(model.verticesIndexTriangle), WebGlInstance.webGL.gl.STATIC_DRAW);
        model.ibo.numerOfEmements = model.verticesIndexTriangle.length;

        // posAttrib erzeugen und verwenden
        aPosition = WebGlInstance.webGL.gl.getAttribLocation(WebGlInstance.webGL.program, 'aPosition');
        WebGlInstance.webGL.gl.enableVertexAttribArray(aPosition);

        aNormal = WebGlInstance.webGL.gl.getAttribLocation(WebGlInstance.webGL.program, 'aNormal');
        WebGlInstance.webGL.gl.enableVertexAttribArray(aNormal);

        aColor = WebGlInstance.webGL.gl.getAttribLocation(WebGlInstance.webGL.program, 'aColor');
        WebGlInstance.webGL.gl.enableVertexAttribArray(aColor);

        // Zeiger erzeugen und konfigurieren
        WebGlInstance.webGL.gl.vertexAttribPointer(aPosition, 3, WebGlInstance.webGL.gl.FLOAT, false, 10 * 4, 0);
        WebGlInstance.webGL.gl.vertexAttribPointer(aColor, 4, WebGlInstance.webGL.gl.FLOAT, false, 10 * 4, 3 * 4);
        WebGlInstance.webGL.gl.vertexAttribPointer(aNormal, 3, WebGlInstance.webGL.gl.FLOAT, false, 10 * 4, 7 * 4);
    }

    /**
     * Fügt dem übertgebenen Modell Eigenschaften für Translate, Rotate und Scale Vector sowie für Model, View
     * Scale Matrix hinzufügen
     * @param model Das Modell
     * @param translate Wert für Verschiebung
     * @param rotate Wert für die Rotation
     * @param scale Wert für die Skalierung
     */
    function initTransformations(model, translate, rotate, scale, rotateIni, rotateSpeed, orbitCenter, orbitRadius, orbitSpeed, animated, rotated) {
        model.translate = translate;

        model.rotate = rotate;
        model.rotateIni = rotateIni;
        model.rotateSpeed = rotateSpeed;

        model.scale = scale;

        model.orbitCenter = orbitCenter;
        model.orbitRadius = orbitRadius;
        model.orbitSpeed = orbitSpeed;

        model.animated = animated;
        model.rotated = rotated;

        model.degreeAlt = 0.0;
        model.xAlt = 0.0;
        model.yAlt = 0.0;

        model.modelMatrix = glMatrix.mat4.create();
        model.viewMatrix = glMatrix.mat4.create();
        model.scaleMatrix = glMatrix.mat4.create();
    }

    /**
     * Konfiguriert und setzt die Matrizen für Model, View und Projektion und Triggert die
     * Ausgabe der aktuellen Modelle einer Szene
     */
    function render() {
        // Löschen der alten Ausgabe
        WebGlInstance.webGL.gl.clear(WebGlInstance.webGL.gl.COLOR_BUFFER_BIT | WebGlInstance.webGL.gl.DEPTH_BUFFER_BIT);

        // konfiguriert und setzt die globale Projektionsmatrix der Kamera (Projection Matrix)
        setCameraProjectionMatrix();

        // konfiguriert und setzt die globale Viewmatrix der Kamera (View Matrix)
        setCameraViewMatrix();

        // Alle Modelle durchlaufen, Eigenschaften für Rotation, Scale und Translation für das
        // jeweils aktuelle Modell aktualisieren und das Modell ausgeben
        for (var i = 0; i < models.length; i++) {
            // Erstellt und setzt die Model Matrix für das aktuelle Modell nach den aktuell eingestellten Werten
            setModelTransformationForModel(models[i]);
            // Ausgabe des Modells
            drawModel(models[i]);
        }
    }

    /**
     * Legt und setzt die Projektion Matrix nach dem gewählten Projektionstyp fest
     */
    function setCameraProjectionMatrix() {
        let v = camera.lrtb;

        // Erstellt die Projektionsmatrix auf Basis des in projectionType eingestellten Wertes
        switch (camera.projectionType) {
            case("ortho"):
                glMatrix.mat4.ortho(camera.pMatrix, -v, v, -v, v, -10, 100);
                break;
            case("frustum"):
                glMatrix.mat4.frustum(camera.pMatrix, -v / 2, v / 2, -v / 2, v / 2, 1, 100);
                break;
            case("perspective"):
                glMatrix.mat4.perspective(camera.pMatrix, camera.fovy, camera.aspect, 1, 100);
                break;
        }

        WebGlInstance.webGL.gl.uniformMatrix4fv(WebGlInstance.webGL.program.projectionMatrix, false, camera.pMatrix);
    }

    /**
     * Legt und setzt die View Matrix fest
     */
    function setCameraViewMatrix() {
        // Calculate x,z position/eye of camera orbiting the center.
        var x = 0, z = 2;

        camera.eye[x] = camera.center[x];
        camera.eye[z] = camera.center[z];
        camera.eye[x] += camera.distance * Math.sin(camera.zAngle);
        camera.eye[z] += camera.distance * Math.cos(camera.zAngle);

        camera.eye[1] = camera.center[z];
        camera.eye[1] += camera.distance * Math.sin(camera.yAngle);

        glMatrix.mat4.identity(camera.vMatrix);
        glMatrix.mat4.lookAt(camera.vMatrix, camera.eye, camera.center, camera.up);

        WebGlInstance.webGL.gl.uniformMatrix4fv(WebGlInstance.webGL.program.viewMatrix, false, camera.vMatrix);
    }

    /**
     * Erstellt und setzt die Model Matrix für das übergebene Modell
     * @param model Das Model
     */
    function setModelTransformationForModel(model) {
        let mMatrix = model.modelMatrix;

        glMatrix.mat4.identity(mMatrix);

        // Scale
        glMatrix.mat4.scale(mMatrix, mMatrix, model.scale);

        // Rotate
        if (model.rotated) {
            model.rotateIni += model.rotateSpeed;
            glMatrix.mat4.rotate(mMatrix, mMatrix, model.rotateIni, model.rotate);
        } else if (animateScene) { // einmaliges Drehen um die in rotate definierte Achse
            glMatrix.mat4.rotate(mMatrix, mMatrix, model.rotateIni, model.rotate);
        }

        // Translate.
        //glMatrix.mat4.translate(mMatrix, mMatrix, model.translate);

        /*
                    w += dw;

            let x = r * Math.cos(w) + 40;
            let y = r * Math.sin(w) - 20;
            let xx = x - xalt;
            let yy = y - yalt;

            glMatrix.mat4.translate(mMatrix, mMatrix, [xx, yy, 0]);
            xalt = x;
            yalt = y;
         */

        if (model.animated) {
            glMatrix.mat4.translate(mMatrix, mMatrix, model.translate);

            model.degreeAlt += model.orbitSpeed;

            let x = model.orbitRadius[0] * Math.cos(model.degreeAlt) - model.orbitCenter[0];
            let y = model.orbitRadius[1] * Math.sin(model.degreeAlt) - model.orbitCenter[1];

            let newX = x - model.xAlt;
            let newY = y - model.yAlt;

            glMatrix.mat4.translate(mMatrix, mMatrix, [newX + model.orbitCenter[0], newY + model.orbitCenter[1], 0.0]);

            model.xAlt = x;
            model.yAlt = y;
        } else {
            glMatrix.mat4.translate(mMatrix, mMatrix, model.translate);
        }

        WebGlInstance.webGL.gl.uniformMatrix4fv(WebGlInstance.webGL.program.modelMatrix, false, mMatrix);
    }

    /**
     * Gibt das übergebene Modell aus
     * @param model Das Model
     */
    function drawModel(model) {
        WebGlInstance.webGL.gl.enableVertexAttribArray(aColor);

        // Knotendaten verfügbar machen und binden
        WebGlInstance.webGL.gl.bufferData(WebGlInstance.webGL.gl.ARRAY_BUFFER, new Float32Array(model.vertices), WebGlInstance.webGL.gl.STATIC_DRAW);
        // Indexarray für die Linien binden und ausgeben
        WebGlInstance.webGL.gl.bufferData(WebGlInstance.webGL.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(model.verticesIndexTriangle), WebGlInstance.webGL.gl.STATIC_DRAW);

        model.ibo.numerOfEmements = model.verticesIndexTriangle.length;

        WebGlInstance.webGL.gl.drawElements(WebGlInstance.webGL.gl.TRIANGLES, model.ibo.numerOfEmements, WebGlInstance.webGL.gl.UNSIGNED_SHORT, 0);
        if (showLine) {
            WebGlInstance.webGL.gl.bufferData(WebGlInstance.webGL.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(model.verticesIndexLine), WebGlInstance.webGL.gl.STATIC_DRAW);

            model.ibo.numerOfEmements = model.verticesIndexLine.length;

            // Ausgabe
            WebGlInstance.webGL.gl.disableVertexAttribArray(aColor);
            WebGlInstance.webGL.gl.drawElements(WebGlInstance.webGL.gl.LINES, model.ibo.numerOfEmements, WebGlInstance.webGL.gl.UNSIGNED_SHORT, 0);
        }
    }

    /**
     * Neuer Animationsschritt
     */
    function rotate() {
        if (models.length > 0) {
            render();
            //setInterval(rotate, animationRate);

            if (animateScene) {
                window.requestAnimationFrame(rotate);
            }
        }
    }

    /**
     * Die offengelegte API
     */
    return {
        start: start,
        rotate: rotate
    }
}());