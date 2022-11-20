![image](https://user-images.githubusercontent.com/32162305/150810942-99672aac-99af-47ea-849b-ba263fae0c3f.png)

---

**Graphical Visualisation Technologies**

**Dozent: Prof. Dr. Felix Gers (Berliner Hochschule für Technik)**

**Studiengang Medieninformatik Online MA, Wintersemester 2022/23**

**University of Applied Sciences Emden/Leer, Faculty of Technology, Department of Electrical Engineering and
Informatics**

---

### Einsendeaufgabe EA6 : Objekte Bewegen - fliegende Kugeln

[zur Webseite](https://gvt.ckitte.de/ea6/)

Im Rahmen der fünften Einsendeaufgabe sollen vier Kugeln interaktiv durch einen Torus fliegen. Dabei bewegen sich die Kugeln kontinuierlich auf Kreisbahnen so,
dass sie sich nie berühren. 

Entweder werden die Kugeln durch jedes Drücken der Taste k ein Stück weiter bewegen oder die Bewegung erfolgt automatisch und kann ein- und ausgeschaltet werden.

Erweiterungen: Der Torus dreht sich um eine seiner Achsen (aber nicht nur wie ein Autoreifen), ohne dass er von den Kugeln berührt wird. Beide Bewegungen werden synchron animiert.

![](assets/2022-11-19-12-35-05-image.png)

Folgende Tastenaktionen sind möglich:

1. Die Kamera kann mit den ***Pfeiltasten*** um die Szene bewegt werden
2. Die ***Tasten o, p, f*** schalten die Ansicht auf orthogonal, perspektive und frustum
3. Die ***Tasten w, s, a, d*** bewegen die Kamera nach oben, unten, rechts und links
4. Die ***Tasten z, Z (shift-z)*** zoomen in bzw. aus dem Bild heraus
5. Die ***Tasten n, N (shift-n)*** verringern bzw. vergrößern den Radius beim Kreisen der Kamera

Über den **Schieberegler** lässt sich die Rekursionstiefe für die per Rekursion erstellte Kugel steuern. Sie hat einen Wertebereich von **0 bis 5**. Eine Tiefe von 0 zeigt den initialen Seed, ein Oktaeder. Eine Tiefe von mehr als 5 würde gehen, führt jedoch zum einen zu keinen besseren Ergebnis und kann einen Browser überlasten. Das erste Bild zeigt die rekursive Kugel bei einer Rekursionstiefe von 1, das zwiete Bild die Komposition verschiedener Modelle:



![](assets/2022-11-19-13-03-35-image.png)![](assets/2022-11-19-13-05-08-image.png)



Um trotz der farbigen Vertices, wie sie für die Farbe der Fragmente notwendig sind, schwarze Linien zu erhalten, wurde vor deren Ausgabe das entsprechende Farbattribut disabled.

### Aufteilung des Codes

Im Rahmen der Bearbeitung wurde das bisherige Programmgerüst vollständig überarbeitet und folgt nun fast vollständig dem Module Pattern. Als externe Bibliothek zur Berechnung der Matrizen und Vektoren kommt [**glMatrix**](https://glmatrix.net/)  (Ordner extern) zum Einsatz.

Als Startpunkt dient das Modul **app.js**, welches mit Hilfe von **Startup.js** aktiviert wird. So gut wie alle Konfigurationen und UI Handler befinden sich in **configure.js**. Die Datei **main.css** enthält alle benötigten Klassen, um die Grafik einfach einzubinden. In der Datei **layout.css** wird das Layout der Webseite selbst festgelegt. Daneben kommt Bootstrap für die Buttons zum Einsatz.

Alle allgemeinen Module befinden sich im Ordner **Module**, alle Module, welche einen Körper definieren im Ordner **Modelle**. 

Das Modul **mod_shader** enthält die Shader Dateien und ermöglicht den Zugriff darauf. Das Modul **mod_webgl** initiert WebGL und kapselt dessen Komplexität.  Für jedes Modell wurde ein Modul angelegt, welches in der Hauptsache die Erstellung des Modells (Vertices, Linien und Dreiecke) steuert. Für das Modell einer rekursiven Kugel ist ebenso dessen gesamte Programmlogik dort vorhanden.

Die Orchestrierung der Szenen, deren Anzeige sowie ein Handler für die Auswertung der Tastatureingaben befindet sich im Hauptmodul **app.js**.
