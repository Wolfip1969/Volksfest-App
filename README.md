# Volksfest Bruckmühl 2027 – Besucher-App

Statische Web-App (PWA): Programm, Lageplan, Speisekarte, Infos. Kein Build nötig, alles liegt als fertige Dateien im Ordner.

## Veröffentlichen

**Variante A: GitHub + Vercel (wie beim Reservierungssystem)**
1. Auf github.com ein neues Repository anlegen, z. B. `volksfest-app`.
2. Alle Dateien aus diesem Ordner hochladen (Add file > Upload files) und committen.
3. Auf vercel.com "Add New Project", das Repository auswählen, Framework "Other", Deploy.

**Variante B: GitHub Pages**
1. Repository wie oben anlegen und Dateien hochladen.
2. Settings > Pages > Branch `main`, Ordner `/ (root)`, Save.
3. Die Seite liegt dann unter `https://<Konto>.github.io/volksfest-app/`.

## Vor dem öffentlichen Start

- In `app.js` die Zeile `const TESTMODUS = true;` auf `false` setzen, sobald Programm und Speisekarte für 2027 echt sind. Solange sie auf `true` steht, zeigt die App einen Hinweis, dass die Daten vom Vorjahr stammen.
- Programm, Speisekarte, Lageplan, Öffnungszeiten stehen oben in `app.js` im Block "DATEN".
- Nach jeder Änderung in `sw.js` die `VERSION` erhöhen (z. B. `volksfest-v2`), damit Handys den neuen Stand laden.

## Dateien

- `index.html` Aufbau und Gestaltung der App
- `app.js` Daten (Programm, Speisekarte usw.) und Logik
- `vercel.json` Sicherheits-Header (Content-Security-Policy usw.). Die App darf nur eigene Dateien laden; neue externe Skripte, Schriften oder Bilder müssen dort freigegeben werden.
- `manifest.webmanifest`, `sw.js` Installation auf dem Home-Bildschirm und Offline-Betrieb
- `fonts/` Barlow und Montserrat lokal eingebunden (kein Google-Abruf)
- `icons/` Wappen und App-Icons

Hinweis: Montserrat Black ersetzt Gotham Black aus der CI (Gotham ist lizenzpflichtig).
