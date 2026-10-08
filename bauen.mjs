// Baut die App aus den Inhaltsdateien in inhalte/*.yml und prüft sie vorher.
// Ist etwas falsch, bricht der Bau mit einer verständlichen Meldung ab. Vercel lässt dann die alte Version online.
//   npm run bauen     prüfen und nach dist/ bauen
//   npm run pruefen   nur prüfen
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import yaml from 'js-yaml';

const NUR_PRUEFEN = process.argv.includes('--nur-pruefen');
const fehler = [];
const meld = (datei, wo, text) => fehler.push(`${datei}${wo ? ', ' + wo : ''}: ${text}`);

function lade(name) {
  const datei = `inhalte/${name}.yml`;
  try {
    // CORE_SCHEMA: Datumsangaben und Uhrzeiten bleiben Text
    return yaml.load(fs.readFileSync(datei, 'utf8'), { schema: yaml.CORE_SCHEMA }) ?? null;
  } catch (e) {
    const zeile = e.mark ? ` (Zeile ${e.mark.line + 1})` : '';
    meld(datei, '', `lässt sich nicht lesen${zeile}. Meist stimmt die Einrückung nicht oder ein Doppelpunkt im Text braucht Anführungszeichen. ${e.reason || e.message}`);
    return null;
  }
}

// Kleine Prüfhelfer
const text = (v) => v == null ? '' : String(v).trim();
const istUhrzeit = (v) => /^([01]?\d|2[0-3]):[0-5]\d$/.test(text(v));
const istDatum = (v) => /^\d{4}-\d{2}-\d{2}$/.test(text(v)) && !isNaN(new Date(text(v) + 'T00:00'));
const istUrl = (v) => /^https:\/\/\S+$/.test(text(v));
function preis(v, datei, wo) {
  if (typeof v === 'number') return v.toFixed(2).replace('.', ',');
  const p = text(v).replace(/\s*€$/, '');
  if (!/^\d+(,\d{1,2})?$/.test(p)) { meld(datei, wo, `Preis „${text(v)}“ bitte wie 5,00 schreiben`); return p; }
  return p.includes(',') ? p.replace(/,(\d)$/, ',$10') : p + ',00';
}
function liste(v, datei, wo) {
  if (v == null) return [];
  if (!Array.isArray(v)) { meld(datei, wo, 'hier wird eine Liste erwartet (Zeilen mit „- “ am Anfang)'); return []; }
  return v;
}
function pflicht(o, feld, datei, wo) {
  if (!text(o?.[feld])) meld(datei, wo, `„${feld}“ fehlt`);
  return text(o?.[feld]);
}

// ---------- fest.yml ----------
const fest = lade('fest') || {};
const F = 'inhalte/fest.yml';
if (!istDatum(fest.beginn)) meld(F, 'beginn', `„${text(fest.beginn)}“ bitte als JJJJ-MM-TT schreiben, z. B. 2027-07-09`);
if (!Number.isInteger(fest.tage) || fest.tage < 1 || fest.tage > 31) meld(F, 'tage', 'bitte eine Zahl zwischen 1 und 31');
if (typeof fest.testmodus !== 'boolean') meld(F, 'testmodus', 'bitte true oder false');
if (text(fest.reservierung) && !istUrl(fest.reservierung)) meld(F, 'reservierung', 'muss mit https:// beginnen');
if (!istUrl(fest.route)) meld(F, 'route', 'muss mit https:// beginnen');
const heimweg = fest.heimweg || {};
for (const k of ['bahn', 'brb']) if (!istUrl(heimweg[k])) meld(F, `heimweg/${k}`, 'muss mit https:// beginnen');
const tage = Number.isInteger(fest.tage) ? fest.tage : 0;
const start = istDatum(fest.beginn) ? new Date(text(fest.beginn) + 'T00:00') : null;

// ---------- programm.yml ----------
const programmRoh = lade('programm') || {};
const P = 'inhalte/programm.yml';
const PROGRAMM = {};
for (const [datum, tag] of Object.entries(programmRoh)) {
  if (!istDatum(datum)) { meld(P, datum, 'Datum bitte als "JJJJ-MM-TT" schreiben'); continue; }
  const i = start ? Math.round((new Date(datum + 'T00:00') - start) / 864e5) : -1;
  if (start && (i < 0 || i >= tage)) { meld(P, datum, 'liegt nicht innerhalb der Festtage aus fest.yml'); continue; }
  const slots = liste(tag?.punkte, P, `${datum}, punkte`).map((s, n) => {
    const wo = `${datum}, Punkt ${n + 1}${s?.titel ? ` („${s.titel}“)` : ''}`;
    const zeit = pflicht(s, 'zeit', P, wo);
    if (typeof s?.zeit === 'number') meld(P, wo, 'Uhrzeit bitte mit Doppelpunkt schreiben, z. B. 18:00');
    else if (/^\d/.test(zeit) && !istUhrzeit(zeit)) meld(P, wo, `Uhrzeit „${zeit}“ bitte wie 18:00 schreiben`);
    for (const k of ['ca', 'bis']) if (s?.[k] != null && (typeof s[k] === 'number' || !istUhrzeit(s[k]))) meld(P, wo, `„${k}“ bitte als Uhrzeit mit Doppelpunkt, z. B. 22:00`);
    if (s?.highlight != null && typeof s.highlight !== 'boolean') meld(P, wo, 'highlight bitte true oder false');
    const o = { zeit, titel: pflicht(s, 'titel', P, wo), text: text(s?.text), ort: text(s?.ort) };
    if (s?.ca != null) o.ca = text(s.ca);
    if (s?.bis != null) o.bis = text(s.bis);
    if (s?.highlight) o.highlight = true;
    return o;
  });
  PROGRAMM[i] = { motto: text(tag?.motto), slots };
}

// ---------- speisen.yml / bars.yml ----------
function anbieter(roh, datei, schluessel) {
  return liste(roh, datei, '').map((c, k) => {
    const wo = `Eintrag ${k + 1}${c?.name ? ` („${c.name}“)` : ''}`;
    const name = pflicht(c, 'name', datei, wo);
    const gruppenRoh = c?.gruppen ? liste(c.gruppen, datei, `${wo}, gruppen`) : [{ [schluessel]: c?.[schluessel] ?? c?.gerichte ?? c?.getraenke }];
    const gruppen = gruppenRoh.map((g, gi) => {
      const gwo = `${wo}${g?.titel ? `, „${g.titel}“` : ''}`;
      const items = liste(g?.[schluessel] ?? g?.gerichte ?? g?.getraenke, datei, gwo).map((it, n) => {
        const iwo = `${gwo}, Zeile ${n + 1}${it?.name ? ` („${it.name}“)` : ''}`;
        const zeile = [pflicht(it, 'name', datei, iwo), preis(it?.preis, datei, iwo)];
        if (it?.preis == null) meld(datei, iwo, '„preis“ fehlt');
        const a = text(it?.allergene), z = text(it?.zusatz);
        if (a || z) zeile.push(a);
        if (z) zeile.push(z);
        return zeile;
      });
      if (!items.length) meld(datei, gwo, `keine ${schluessel === 'gerichte' ? 'Gerichte' : 'Getränke'} eingetragen`);
      const o = { items };
      if (text(g?.titel)) o.titel = text(g.titel);
      if (text(g?.hinweis)) o.sub = text(g.hinweis);
      return o;
    });
    const o = { name, gruppen };
    if (text(c?.info)) o.info = text(c.info);
    if (text(c?.fussnote)) o.fuss = text(c.fussnote);
    return o;
  });
}
const speisen = lade('speisen') || {};
const CATERER = anbieter(speisen.caterer, 'inhalte/speisen.yml', 'gerichte');
const LEGENDE = liste(speisen.legende, 'inhalte/speisen.yml', 'legende').map(text);
const bars = lade('bars') || {};
const BARS = anbieter(bars.bars, 'inhalte/bars.yml', 'getraenke');

// ---------- infos.yml ----------
const infos = lade('infos') || {};
const I = 'inhalte/infos.yml';
const INFOS = liste(infos.infos, I, 'infos').map((i, k) => {
  const wo = `Karte ${k + 1}${i?.titel ? ` („${i.titel}“)` : ''}`;
  const titel = pflicht(i, 'titel', I, wo);
  if (i?.punkte) return { titel, punkte: liste(i.punkte, I, wo).map((p, n) => [pflicht(p, 'titel', I, `${wo}, Punkt ${n + 1}`), pflicht(p, 'text', I, `${wo}, Punkt ${n + 1}`)]) };
  return { titel, text: pflicht(i, 'text', I, wo) };
});
const ANFAHRT = liste(infos.anfahrt, I, 'anfahrt').map((a, k) => [pflicht(a, 'titel', I, `Anfahrt ${k + 1}`), pflicht(a, 'text', I, `Anfahrt ${k + 1}`)]);

// ---------- plaene.yml ----------
const plaene = lade('plaene') || {};
const PL = 'inhalte/plaene.yml';
function planEintraege(roh, bereich, arten, mitPunkt) {
  const nrn = new Set();
  return liste(roh, PL, bereich).map((o, k) => {
    const wo = `${bereich}, Eintrag ${k + 1}${o?.name ? ` („${o.name}“)` : ''}`;
    if (!Number.isInteger(o?.nr)) meld(PL, wo, '„nr“ muss eine Zahl sein');
    else if (nrn.has(o.nr)) meld(PL, wo, `die Nummer ${o.nr} gibt es doppelt`);
    nrn.add(o?.nr);
    if (!arten.includes(o?.art)) meld(PL, wo, `„art“ muss eines davon sein: ${arten.join(', ')}`);
    const zahlen = (v, n) => Array.isArray(v) && v.length === n && v.every(Number.isFinite);
    const e = { id: o?.nr, kat: o?.art, name: pflicht(o, 'name', PL, wo), info: text(o?.info) };
    if (zahlen(o?.flaeche, 4)) e.r = o.flaeche;
    else if (mitPunkt && zahlen(o?.punkt, 2)) e.p = o.punkt;
    else meld(PL, wo, mitPunkt ? '„flaeche“ [x, y, Breite, Höhe] oder „punkt“ [x, y] fehlt' : '„flaeche“ [x, y, Breite, Höhe] fehlt');
    return e;
  });
}
const ORTE = planEintraege(plaene.festplatz, 'festplatz', ['zelt', 'fahr', 'essen', 'buden', 'eingang', 'wc'], false);
const ZELT = planEintraege(plaene.festzelt, 'festzelt', ['eingang', 'bar', 'essen', 'wc', 'mehr'], true);

// ---------- suchwoerter.yml ----------
const SUCHWOERTER = {};
for (const [k, v] of Object.entries(lade('suchwoerter') || {})) {
  if (!text(v)) meld('inhalte/suchwoerter.yml', k, 'rechts fehlt das Wort, auf das umgeleitet wird');
  else SUCHWOERTER[text(k)] = text(v);
}

// ---------- meldungen.yml ----------
const M = 'inhalte/meldungen.yml';
const MELDUNGEN = liste(lade('meldungen'), M, '').map((m, k) => {
  const wo = `Meldung ${k + 1}`;
  if (typeof m === 'string') { meld(M, wo, `bitte ohne eckige Klammern und mit "- text:" davor schreiben, also:  - text: ${m}`); return { text: m }; }
  const o = { text: pflicht(m, 'text', M, wo) };
  if (m?.wichtig) o.wichtig = true;
  for (const f of ['ab', 'bis']) {
    if (m?.[f] == null) continue;
    const d = text(m[f]).replace(' ', 'T');
    if (!/^\d{4}-\d{2}-\d{2}T\d{1,2}:\d{2}$/.test(d) || isNaN(new Date(d))) meld(M, wo, `„${f}“ bitte wie "2027-07-10 23:00" schreiben`);
    o[f] = d;
  }
  return o;
});

// ---------- Ergebnis ----------
if (fehler.length) {
  console.error(`\n✗ ${fehler.length} Fehler in den Inhaltsdateien, nichts wurde veröffentlicht:\n`);
  for (const f of fehler) console.error('  • ' + f);
  console.error('');
  process.exit(1);
}
console.log('✓ Inhaltsdateien sind in Ordnung.');
if (NUR_PRUEFEN) process.exit(0);

const DATEN = {
  FEST_START: text(fest.beginn), FEST_TAGE: tage, TESTMODUS: fest.testmodus,
  RESERVIERUNG_URL: text(fest.reservierung), ROUTE_URL: text(fest.route),
  ZEITEN: liste(fest.oeffnungszeiten, F, 'oeffnungszeiten').map(z => [text(z?.wann), text(z?.zeit)]),
  ADRESSE: liste(fest.adresse, F, 'adresse').map(text),
  LINKS: liste(fest.links, F, 'links').map(l => ({ name: text(l?.name), text: text(l?.text), url: text(l?.url) })),
  TAXI: liste(heimweg.taxi, F, 'heimweg/taxi').map(t => [text(t?.name), text(t?.telefon)]),
  BAHN_URL: text(heimweg.bahn), BRB_URL: text(heimweg.brb),
  PROGRAMM, CATERER, LEGENDE, BARS_INTRO: text(bars.einleitung), BARS, INFOS, ANFAHRT, ORTE, ZELT, SUCHWOERTER
};

// Statische Dateien nach dist/ kopieren, daten.js und meldungen.json erzeugen
fs.rmSync('dist', { recursive: true, force: true });
fs.mkdirSync('dist');
for (const f of ['index.html', 'app.js', 'manifest.webmanifest']) fs.copyFileSync(f, path.join('dist', f));
for (const d of ['icons', 'fonts']) fs.cpSync(d, path.join('dist', d), { recursive: true });
fs.writeFileSync('dist/daten.js', '// Automatisch aus inhalte/*.yml erzeugt, nicht von Hand ändern.\nwindow.DATEN = ' + JSON.stringify(DATEN) + ';\n');
fs.writeFileSync('dist/meldungen.json', JSON.stringify(MELDUNGEN) + '\n');

// Service-Worker-Version aus dem Inhalt aller Dateien, damit Handys jeden neuen Stand laden
const hash = crypto.createHash('sha1');
const alle = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap(e => e.isDirectory() ? alle(path.join(d, e.name)) : [path.join(d, e.name)]);
for (const f of alle('dist').sort()) if (!f.endsWith('meldungen.json')) hash.update(f).update(fs.readFileSync(f));
const version = 'volksfest-' + hash.digest('hex').slice(0, 10);
fs.writeFileSync('dist/sw.js', fs.readFileSync('sw.js', 'utf8').replace(/const VERSION = '[^']*';/, `const VERSION = '${version}';`));
console.log(`✓ App gebaut (${version}).`);
