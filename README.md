# Volksfest Bruckmühl 2027 – Besucher-App

Web-App (PWA) mit Programm, Lageplan, Speisekarte und Infos. Live unter https://volksfest-bruckmuehl-app.vercel.app

## Inhalte selbst ändern

Alle Texte, Uhrzeiten und Preise stehen im Ordner `inhalte/`, eine Datei pro Bereich:

| Datei | Inhalt |
|---|---|
| `meldungen.yml` | aktuelle Hinweise oben in der App („Festzelt voll“) |
| `programm.yml` | Programm aller Festtage |
| `speisen.yml` | Speisekarte der Caterer, Allergene |
| `bars.yml` | Bars und Getränke |
| `infos.yml` | Infos-Tab und Anfahrt |
| `fest.yml` | Festtage, Testmodus, Öffnungszeiten, Links, Taxi-Nummern |
| `plaene.yml` | Namen und Texte im Lageplan und Zeltplan |
| `suchwoerter.yml` | Ersatzwörter für die Suche |

Oben in jeder Datei steht, wie sie aufgebaut ist.

**So geht's auf dem iPhone (GitHub-App) oder am Rechner (github.com):**
1. Repository `Wolfip1969/Volksfest-App` öffnen, dann den Ordner `inhalte` und die Datei, z. B. `programm.yml`.
2. Auf den Stift tippen („Edit“) und den Text ändern.
3. „Commit changes“ tippen. Meist ist die Änderung nach unter einer Minute live, manchmal dauert es bis zu drei Minuten.

**Sicherheitsnetz:** Vor jeder Veröffentlichung werden die Dateien geprüft. Ist etwas falsch (z. B. Uhrzeit „18.00“ statt 18:00, ein Preis „sechs“, ein fehlender Titel oder eine verrutschte Einrückung), geht die Änderung nicht online, und die bisherige Version bleibt stehen. In GitHub erscheint am Commit dann ein rotes ✗. Ein Tipp darauf zeigt die Fehlermeldung mit Datei und Stelle.

**Worauf achten:**
- Die Einrückung (Leerzeichen am Zeilenanfang) gehört zum Aufbau. Neue Einträge am besten durch Kopieren eines vorhandenen anlegen.
- Enthält ein Text einen Doppelpunkt mit Leerzeichen dahinter, den ganzen Text in Anführungszeichen setzen: `text: "Achtung: Zelt voll"`
- Uhrzeiten mit Doppelpunkt (18:00), Preise mit Komma (5,00), Datumsangaben als "2027-07-09".

## Vor dem öffentlichen Start

- In `inhalte/fest.yml` `testmodus: false` setzen, sobald Programm und Speisekarte für 2027 echt sind. Solange er auf `true` steht, zeigt die App den Hinweis „Testversion“.

## Programm testen

Mit `?jetzt=2027-07-13T19:30` hinter der Adresse tut die App so, als wäre es dieser Zeitpunkt. So lassen sich „Läuft gerade / Als Nächstes“ und Meldungen mit `ab`/`bis` vorab prüfen.

## Technik

- `bauen.mjs` prüft `inhalte/*.yml` und baut die App nach `dist/`: Es erzeugt `daten.js` und `meldungen.json` und setzt die Version im Service Worker automatisch, damit Handys jeden neuen Stand laden. Vercel führt das bei jedem Push aus (`npm run bauen`). Nur prüfen: `npm run pruefen`.
- `index.html` Aufbau und Gestaltung, `app.js` Darstellung und Logik (Inhalte kommen aus `daten.js`)
- `vercel.json` Bau-Einstellungen und Sicherheits-Header (Content-Security-Policy usw.). Die App darf nur eigene Dateien laden. Neue externe Skripte, Schriften oder Bilder müssen dort freigegeben werden.
- `manifest.webmanifest`, `sw.js` Installation auf dem Home-Bildschirm und Offline-Betrieb
- `fonts/` Barlow und Montserrat lokal eingebunden (kein Google-Abruf), `icons/` Logos, App-Icons, Kartenbild

Hinweis: Montserrat Black ersetzt Gotham Black aus der CI (Gotham ist lizenzpflichtig).
