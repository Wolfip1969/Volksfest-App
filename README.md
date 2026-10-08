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

## Aktuelle Meldungen während des Fests

Kurzfristige Hinweise (z. B. "Festzelt voll", "Feuerwerk verschoben") stehen in `meldungen.json`. Die App lädt die Datei beim Öffnen und alle 5 Minuten neu. Leer lassen heißt: kein Banner.

```json
[
  { "text": "Festzelt voll, im Biergarten gibt es noch Plätze.", "wichtig": true, "bis": "2027-07-10T23:00" }
]
```

- `wichtig: true` zeigt die Meldung rot, sonst weiß mit rotem Rand.
- `ab` / `bis` (optional) blenden die Meldung erst ab bzw. nur bis zu diesem Zeitpunkt ein.

## Programm testen

Mit `?jetzt=2027-07-13T19:30` hinter der Adresse tut die App so, als wäre es dieser Zeitpunkt. So lassen sich "Läuft gerade / Als Nächstes" und die Meldungen vorab prüfen.

## Dateien

- `index.html` Aufbau und Gestaltung der App
- `app.js` Daten (Programm, Speisekarte, Taxi-Nummern usw.) und Logik
- `meldungen.json` aktuelle Hinweise während des Fests
- `vercel.json` Sicherheits-Header (Content-Security-Policy usw.). Die App darf nur eigene Dateien laden; neue externe Skripte, Schriften oder Bilder müssen dort freigegeben werden.
- `manifest.webmanifest`, `sw.js` Installation auf dem Home-Bildschirm und Offline-Betrieb
- `fonts/` Barlow und Montserrat lokal eingebunden (kein Google-Abruf)
- `icons/` Wappen und App-Icons

Hinweis: Montserrat Black ersetzt Gotham Black aus der CI (Gotham ist lizenzpflichtig).
