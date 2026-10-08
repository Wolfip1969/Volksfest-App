/* =========================================================
   INHALTE stehen in inhalte/*.yml. Beim Veröffentlichen werden sie geprüft
   und als daten.js eingebunden. Hier nur Darstellung und Logik.
   ========================================================= */
const D = window.DATEN;
const [jj, mm, tt] = D.FEST_START.split('-').map(Number);
const FEST_START = new Date(jj, mm - 1, tt);
const { FEST_TAGE, TESTMODUS, RESERVIERUNG_URL, ROUTE_URL, ZEITEN, ADRESSE, LINKS, TAXI, BAHN_URL, BRB_URL,
  PROGRAMM, CATERER, LEGENDE, BARS_INTRO, BARS, INFOS, ANFAHRT, ZELT, SUCHWOERTER } = D;
const ORTE = D.ORTE.map(o => ({ ...o, x: o.r[0] + o.r[2] / 2, y: o.r[1] + o.r[3] / 2 }));
const LOGO_SRC = document.querySelector(".logo img").src;

// Kategorien und Farben der Pläne (die Einträge selbst stehen in inhalte/plaene.yml)
const KATEGORIEN = {
  zelt:    { name: "Festzelt",          farbe: "#d2332e" },
  fahr:    { name: "Fahrgeschäfte",     farbe: "#6a3fa0" },
  essen:   { name: "Essen und Süßes",   farbe: "#8a8a8a" },
  buden:   { name: "Buden",             farbe: "#c27c0e" },
  eingang: { name: "Eingänge",          farbe: "#2e7d32" },
  wc:      { name: "Toiletten",         farbe: "#1f6fb2" }
};

const ZELT_KAT = {
  eingang: { name: "Ein- und Ausgänge", farbe: "#2e7d32" },
  bar:     { name: "Bars",              farbe: "#d2332e" },
  essen:   { name: "Essen",             farbe: "#8a8a8a" },
  wc:      { name: "Toiletten",         farbe: "#1f6fb2" },
  mehr:    { name: "Bühne und Service", farbe: "#8f1d19" }
};

// Graue Flächen der Tischreihen im Zeltplan
const ZELT_FLAECHEN = [[110, 650, 465, 605], [596, 1148, 113, 107], [618, 690, 512, 388], [870, 1148, 522, 107], [1183, 650, 385, 470], [1455, 1148, 56, 107]];

const $ = s => document.querySelector(s);
const wt = ["So","Mo","Di","Mi","Do","Fr","Sa"];
const tageAb = n => new Date(FEST_START.getFullYear(), FEST_START.getMonth(), FEST_START.getDate() + n);
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

/* Countdown */
(function(){
  const heute = new Date(); heute.setHours(0,0,0,0);
  const d = Math.round((FEST_START - heute) / 864e5);
  let t;
  if (d > 1) t = `Noch ${d} Tage`;
  else if (d === 1) t = 'Morgen geht es los';
  else if (d <= 0 && d > -FEST_TAGE) t = 'Heute ist Volksfest';
  else t = 'Bis zum nächsten Jahr';
  $('#countdown').textContent = t;
})();

/* Programm */
// Uhrzeit der App; zum Testen mit ?jetzt=2027-07-13T19:30 in der Adresse überschreibbar
function jetztZeit(){
  const q = new URLSearchParams(location.search).get('jetzt');
  const d = q ? new Date(q) : new Date();
  return isNaN(d) ? new Date() : d;
}
// Ein Festtag geht bis 4 Uhr früh, die Nacht zählt noch zum Vortag
function festTag(){
  const t = new Date(jetztZeit().getTime() - 4 * 36e5);
  return Math.round((new Date(t.getFullYear(), t.getMonth(), t.getDate()) - FEST_START) / 864e5);
}
let aktTag = (function(){
  const d = festTag();
  return d >= 0 && d < FEST_TAGE ? d : 0;
})();

function zeichneTage(){
  $('#tage').innerHTML = Array.from({length: FEST_TAGE}, (_, i) => {
    const dt = tageAb(i);
    return `<button class="tag" data-i="${i}" aria-pressed="${i === aktTag}"><span>${wt[dt.getDay()]}</span><b>${dt.getDate()}.</b></button>`;
  }).join('');
}
function zeichneProgramm(){
  const dt = tageAb(aktTag);
  const p = PROGRAMM[aktTag];
  const kopf = `<div class="tagesmotto">${wt[dt.getDay()]}, ${dt.getDate()}. Juli${p && p.motto ? ' · ' + esc(p.motto) : ''}</div>`;
  if (!p || !p.slots.length) {
    $('#tagesinhalt').innerHTML = kopf + `<div class="leer">Das Programm für diesen Tag folgt.</div>`;
    return;
  }
  $('#tagesinhalt').innerHTML = kopf + p.slots.map(s => `
    <div class="slot"><time${/\d/.test(s.zeit) ? '' : ' class="wort"'}>${esc(s.zeit)}</time>
      <div><h3>${esc(s.titel)}${s.highlight ? '<span class="marke">Highlight</span>' : ''}</h3>
      <p>${esc(s.text)}${s.ort ? ' · ' + esc(s.ort) : ''}</p></div></div>`).join('');
}
$('#tage').addEventListener('click', e => {
  const b = e.target.closest('.tag'); if (!b) return;
  aktTag = +b.dataset.i; zeichneTage(); zeichneProgramm();
});

/* Lageplan */
let filter = 'alle', gewaehlt = null;
function zeichnePlan(){
  const sichtbar = ORTE.filter(o => filter === 'alle' || o.kat === filter);
  const flaechen = `
    <path d="M86 470V89H214V470" fill="none" stroke="var(--linie)" stroke-width="24" stroke-linejoin="round"/>
    ${ORTE.map(o => `<rect x="${o.r[0]}" y="${o.r[1]}" width="${o.r[2]}" height="${o.r[3]}" rx="5" fill="${KATEGORIEN[o.kat].farbe}" fill-opacity=".16" stroke="${KATEGORIEN[o.kat].farbe}" stroke-opacity=".5"/>`).join('')}
    <text x="150" y="40" text-anchor="middle" font-size="12" font-weight="800" fill="var(--text)" font-family="sans-serif">Festzelt</text>
    <text x="150" y="114" text-anchor="middle" font-size="10" font-weight="700" fill="var(--text)" font-family="sans-serif">Biergarten</text>
    <text x="150" y="466" text-anchor="middle" font-size="10" font-weight="700" fill="var(--leise)" font-family="sans-serif">Rathausplatz</text>
    <text x="129" y="92" text-anchor="middle" font-size="8" font-weight="700" fill="var(--leise)" font-family="sans-serif">▲ Haupteingang</text>`;
  const pins = sichtbar.map(o => {
    const k = KATEGORIEN[o.kat], an = gewaehlt === o.id;
    return `<g class="pin" data-id="${o.id}" tabindex="0" role="button" aria-label="${esc(o.name)}">
      <circle cx="${o.x}" cy="${o.y}" r="${an ? 17 : 13}" fill="${k.farbe}" stroke="${an ? 'var(--blau)' : '#fff'}" stroke-width="${an ? 4 : 2}"/>
      <text x="${o.x}" y="${o.y + 4.5}" text-anchor="middle" font-size="13" font-weight="800" fill="#fff" font-family="sans-serif">${o.id}</text></g>`;
  }).join('');
  $('#plan').innerHTML = flaechen + pins;

  $('#planfilter').innerHTML = [['alle','Alle'], ...Object.entries(KATEGORIEN).map(([k,v]) => [k, v.name])]
    .map(([k,n]) => `<button class="chip" data-k="${k}" aria-pressed="${filter === k}">${n}</button>`).join('');

  $('#planliste').innerHTML = sichtbar.map(o => {
    const k = KATEGORIEN[o.kat];
    return `<li><button class="eintrag" data-id="${o.id}" ${gewaehlt === o.id ? 'aria-current="true"' : ''}>
      <span class="nr" style="background:${k.farbe}">${o.id}</span>
      <span><b>${esc(o.name)}</b><small>${esc(o.info)}</small></span></button></li>`;
  }).join('') || '<li class="leer">Keine Einträge.</li>';
}
function waehle(id){ gewaehlt = gewaehlt === id ? null : id; zeichnePlan(); }
$('#plan').addEventListener('click', e => { const g = e.target.closest('.pin'); if (g) waehle(+g.dataset.id); });
$('#plan').addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { const g = e.target.closest('.pin'); if (g) { e.preventDefault(); waehle(+g.dataset.id); } } });
$('#planliste').addEventListener('click', e => { const b = e.target.closest('.eintrag'); if (b) waehle(+b.dataset.id); });
$('#planfilter').addEventListener('click', e => { const b = e.target.closest('.chip'); if (b) { filter = b.dataset.k; gewaehlt = null; zeichnePlan(); } });

/* Festzelt: Lage wie im Zeltplan, Haupteingang unten */
const ZT = (x, y) => [x - 20, y - 230];
const zRect = ([x, y, w, h]) => [...ZT(x, y), w, h];
const zMitte = o => o.p ? ZT(...o.p) : (([x, y, w, h]) => [x + w / 2, y + h / 2])(zRect(o.r));
let zeltFilter = 'alle', zeltGew = null;
function zeichneZelt(){
  const sichtbar = ZELT.filter(o => zeltFilter === 'alle' || o.kat === zeltFilter);
  const rect = (r, attr) => { const [x, y, w, h] = zRect(r); return `<rect x="${x}" y="${y}" width="${w}" height="${h}" ${attr}/>`; };
  const linie = pts => 'M' + pts.map(p => ZT(...p).join(' ')).join('L');
  const grund = ZELT_FLAECHEN.map(f => rect(f, 'rx="10" fill="var(--linie)" opacity=".6"')).join('')
    + rect([103, 493, 1659, 765], 'rx="6" fill="none" stroke="var(--text)" stroke-width="6"')
    + `<path d="${linie([[1762, 560], [1840, 560], [1840, 300], [1810, 300]])}" fill="none" stroke="${ZELT_KAT.wc.farbe}" stroke-width="5" stroke-dasharray="14 10"/>`
    + ZELT.filter(o => o.r).map(o => rect(o.r, `rx="8" fill="${ZELT_KAT[o.kat].farbe}" fill-opacity=".18" stroke="${ZELT_KAT[o.kat].farbe}" stroke-width="3"`)).join('')
    + (([x, y]) => `<text x="${x}" y="${y - 72}" text-anchor="middle" font-size="58" font-weight="800" fill="var(--text)" font-family="sans-serif">Bühne</text>`)(zMitte(ZELT.find(o => o.name === 'Bühne')));
  const pins = sichtbar.map(o => {
    const k = ZELT_KAT[o.kat], an = zeltGew === o.id, [x, y] = zMitte(o);
    return `<g class="pin" data-id="${o.id}" tabindex="0" role="button" aria-label="${esc(o.name)}">
      <circle cx="${x}" cy="${y}" r="${an ? 70 : 56}" fill="${k.farbe}" stroke="${an ? 'var(--blau)' : '#fff'}" stroke-width="${an ? 12 : 7}"/>
      <text x="${x}" y="${y + 19}" text-anchor="middle" font-size="54" font-weight="800" fill="#fff" font-family="sans-serif">${o.id}</text></g>`;
  }).join('');
  $('#zelt').innerHTML = grund + pins;

  $('#zeltfilter').innerHTML = [['alle','Alle'], ...Object.entries(ZELT_KAT).map(([k,v]) => [k, v.name])]
    .map(([k,n]) => `<button class="chip" data-k="${k}" aria-pressed="${zeltFilter === k}">${n}</button>`).join('');

  $('#zeltliste').innerHTML = sichtbar.map(o => {
    const k = ZELT_KAT[o.kat];
    return `<li><button class="eintrag" data-id="${o.id}" ${zeltGew === o.id ? 'aria-current="true"' : ''}>
      <span class="nr" style="background:${k.farbe}">${o.id}</span>
      <span><b>${esc(o.name)}</b><small>${esc(o.info)}</small></span></button></li>`;
  }).join('');
}
function waehleZelt(id){ zeltGew = zeltGew === id ? null : id; zeichneZelt(); }
$('#zelt').addEventListener('click', e => { const g = e.target.closest('.pin'); if (g) waehleZelt(+g.dataset.id); });
$('#zelt').addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { const g = e.target.closest('.pin'); if (g) { e.preventDefault(); waehleZelt(+g.dataset.id); } } });
$('#zeltliste').addEventListener('click', e => { const b = e.target.closest('.eintrag'); if (b) waehleZelt(+b.dataset.id); });
$('#zeltfilter').addEventListener('click', e => { const b = e.target.closest('.chip'); if (b) { zeltFilter = b.dataset.k; zeltGew = null; zeichneZelt(); } });
zeichneZelt();

/* Caterer und Bars */
const karte = (c, offen) => `
  <details class="karte" ${offen ? 'open' : ''}><summary><h3>${esc(c.name)}</h3></summary>
  <div class="menue">${c.info ? `<p class="sub">${esc(c.info)}</p>` : ''}${c.gruppen.map(g => `<div class="gruppe">
    ${g.titel ? `<h4>${esc(g.titel)}</h4>` : ''}${g.sub ? `<p class="sub">${esc(g.sub)}</p>` : ''}
    ${g.items.map(([n, p, a, z]) => `<div class="zeile"><div class="n">${esc(n)}${a ? ` <sup>${esc(a)}</sup>` : ''}${z ? `<small>${esc(z)}</small>` : ''}</div><div class="p">${esc(p)} €</div></div>`).join('')}
  </div>`).join('')}
  ${c.fuss ? `<p class="fuss">${esc(c.fuss)}</p>` : ''}</div></details>`;
$('#caterer').innerHTML = CATERER.map((c, i) => karte(c, i === 0)).join('');
$('#bars-intro').textContent = BARS_INTRO;
$('#bars').innerHTML = BARS.map((b, i) => karte(b, i === 0)).join('');
$('#legende').innerHTML = LEGENDE.map(t => `<p>${esc(t)}</p>`).join('');

/* Anfahrt */
$('#adresse').innerHTML = `<p><b>${esc(ADRESSE[0])}</b>${ADRESSE.slice(1).map(esc).join(', ')}</p><a class="knopf" href="${esc(ROUTE_URL)}" target="_blank" rel="noopener">Route planen</a>`;
$('#anfahrt').innerHTML = ANFAHRT.map(([t, x]) => `<div class="karte"><h3>${esc(t)}</h3><p>${esc(x)}</p></div>`).join('');

/* Infos */
$('#zeiten').innerHTML = ZEITEN.map(([t, z]) => `<tr><td>${esc(t)}</td><td>${esc(z)}</td></tr>`).join('');
const infoKarte = (titel, inhalt, extra = '') => `<details class="info karte"><summary><h3>${esc(titel)}</h3></summary><div class="menue ${extra}">${inhalt}</div></details>`;
const heimweg = `<a class="notruf" href="tel:112">Notruf 112</a>
  <p class="punkt"><b>Erste Hilfe</b> BRK-Rettungswagen am Haupteingang, kleinere Verletzungen an der Kasse im Festzelt.</p>
  <p class="punkt"><b>Mit dem Zug</b> Vom Bahnhof Bruckmühl fährt die BRB Richtung Holzkirchen/München und Rosenheim. Die letzten Züge findest du in der <a href="${esc(BAHN_URL)}" target="_blank" rel="noopener">Abfahrtstafel von bahn.de</a> (Bruckmühl eingeben) oder bei der <a href="${esc(BRB_URL)}" target="_blank" rel="noopener">BRB</a>.</p>
  <p class="punkt"><b>Taxi</b> ${TAXI.length ? TAXI.map(([n, t]) => `${esc(n)}: <a href="tel:${esc(t.replace(/[^0-9+]/g, ''))}">${esc(t)}</a>`).join(' · ') : 'Nummern folgen.'}</p>`;
$('#infos').innerHTML = infoKarte('Heimweg und Notfall', heimweg, 'heimweg') + (RESERVIERUNG_URL ? infoKarte('Tischreservierung', `<p>Reserviere deinen Tisch im Bierzelt online. Du bekommst eine Bestätigung per E-Mail. Reservierungen gelten nur bis 18:30 Uhr.</p><a class="knopf" href="${esc(RESERVIERUNG_URL)}" target="_blank" rel="noopener">Tisch reservieren</a>`) : '')
  + infoKarte('Folge uns', LINKS.map(l => `<a class="linkzeile" href="${esc(l.url)}" target="_blank" rel="noopener"><span><b>${esc(l.name)}</b><small>${esc(l.text)}</small></span></a>`).join(''))
  + INFOS.map(i => infoKarte(i.titel, i.punkte ? i.punkte.map(([l, t]) => `<p class="punkt"><b>${esc(l)}</b> ${esc(t)}</p>`).join('') : `<p>${esc(i.text)}</p>`)).join('')
  + infoKarte('Veranstalter', `<img src="${LOGO_SRC}" alt=""><div><p>SV Bruckmühl e.V.</p><p><a href="https://svbruckmuehl.de/impressum/" target="_blank" rel="noopener">Impressum</a> · <a href="https://svbruckmuehl.de/datenschutz/" target="_blank" rel="noopener">Datenschutz</a></p></div>`, 'veranstalter');
if (RESERVIERUNG_URL) { const a = $('#res-kopf'); a.href = RESERVIERUNG_URL; a.hidden = false; }

const ICONS = {
  Instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>',
  Facebook: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-1.6 19.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.3v7A10 10 0 0 0 12 2z"/></svg>',
  Webseite: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/></svg>'
};
$('#social').innerHTML = LINKS.map(l => `<a href="${esc(l.url)}" target="_blank" rel="noopener" aria-label="${esc(l.name)}">${ICONS[l.name]}</a>`).join('');

/* Tabs */
document.querySelector('nav').addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return;
  document.querySelectorAll('nav button').forEach(x => x.setAttribute('aria-selected', x === b));
  document.querySelectorAll('main section').forEach(s => s.hidden = s.id !== 'tab-' + b.dataset.tab);
  window.scrollTo(0, 0);
});

zeichneTage(); zeichneProgramm(); zeichnePlan();

if (TESTMODUS) $('#hinweis').hidden = false;
if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
  window.addEventListener('load', () => { try { navigator.serviceWorker.register('sw.js'); } catch (e) {} });
}


/* Suche */
const norm = s => String(s).toLowerCase().replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss').replace(/[^a-z0-9: ]+/g, ' ').replace(/\s+/g, ' ').trim();
const SUCHWORT_N = Object.fromEntries(Object.entries(SUCHWOERTER).map(([k, v]) => [norm(k), norm(v)]));

function suchIndex(){
  const idx = [];
  const add = (titel, wo, text, ziel, stich = '') => idx.push({ titel, wo, text, ziel, t: norm(titel), h: norm([titel, wo, text, stich].join(' ')) });
  for (let i = 0; i < FEST_TAGE; i++) {
    const p = PROGRAMM[i]; if (!p) continue;
    const d = tageAb(i), tag = `${wt[d.getDay()]}, ${d.getDate()}. Juli`;
    p.slots.forEach((s, j) => add(s.titel, `Programm · ${tag} · ${s.zeit}`, [s.text, s.ort].filter(Boolean).join(' · '), { tab: 'programm', tag: i, n: j }, p.motto));
  }
  ORTE.forEach(o => add(o.name, `Lageplan · ${KATEGORIEN[o.kat].name}`, o.info === 'Platzhalter' ? '' : o.info, { tab: 'plan', ort: o.id }));
  const zeltStich = { wc: 'toilette klo', eingang: 'eingang ausgang', mehr: '' };
  ZELT.forEach(o => add(o.name, `Lageplan · Festzelt · ${ZELT_KAT[o.kat].name}`, o.info, { tab: 'plan', zelt: o.id }, zeltStich[o.kat] || ''));
  add(ADRESSE.join(', '), 'Lageplan · Anfahrt', 'Route planen', { tab: 'plan', el: '#adresse' }, 'adresse navi route');
  ANFAHRT.forEach(([t, x], k) => add(t, 'Lageplan · Anfahrt', x, { tab: 'plan', el: `#anfahrt > .karte:nth-child(${k + 1})` }, 'anfahrt'));
  [['#caterer', CATERER, 'Essen'], ['#bars', BARS, 'Bars und Getränke']].forEach(([box, liste, bereich]) =>
    liste.forEach((c, k) => {
      add(c.name, bereich, c.info || '', { tab: 'essen', karte: `${box} > details:nth-child(${k + 1})` });
      let z = 0;
      c.gruppen.forEach(g => g.items.forEach(([n, pr, , zus]) => add(n, `${bereich} · ${c.name}`, [zus, pr + ' €'].filter(Boolean).join(' · '),
        { tab: 'essen', karte: `${box} > details:nth-child(${k + 1})`, zeile: z++ }, g.titel)));
    }));
  ZEITEN.forEach(([t, z], k) => add(`${t}: ${z}`, 'Infos · Öffnungszeiten', '', { tab: 'infos', el: `#zeiten tr:nth-child(${k + 1})` }, 'öffnungszeiten'));
  const infoKarten = [...document.querySelectorAll('#infos > details')];
  const titelZuKarte = t => infoKarten.findIndex(d => d.querySelector('h3').textContent === t);
  if (RESERVIERUNG_URL) add('Tischreservierung', 'Infos', 'Tisch im Bierzelt online reservieren', { tab: 'infos', karte: `#infos > details:nth-child(${titelZuKarte('Tischreservierung') + 1})` }, 'reservieren');
  add('Heimweg und Notfall', 'Infos', 'Notruf 112, Zug, Taxi', { tab: 'infos', karte: `#infos > details:nth-child(${titelZuKarte('Heimweg und Notfall') + 1})` }, 'notruf 112 notfall taxi zug heimfahrt heimweg letzter zug');
  INFOS.forEach(i => {
    const sel = `#infos > details:nth-child(${titelZuKarte(i.titel) + 1})`;
    if (i.punkte) i.punkte.forEach(([l, t], k) => add(l, `Infos · ${i.titel}`, t, { tab: 'infos', karte: sel, punkt: k }));
    else add(i.titel, 'Infos', i.text, { tab: 'infos', karte: sel });
  });
  return idx;
}

function suche(q){
  const woerter = norm(q).split(' ').filter(Boolean);
  if (!woerter.length) return [];
  // Ganze Eingabe als Ersatzwort (z. B. "liegen lassen"), sonst Wort für Wort
  const ganz = SUCHWORT_N[woerter.join(' ')];
  const gruppen = ganz ? [[woerter.join(' '), ganz]] : woerter.map(w => [w, SUCHWORT_N[w]].filter(Boolean));
  // Kurze Wörter (unter 4 Zeichen, z. B. "ec") nur am Wortanfang, längere auch mitten im Wort ("bier" in "Weißbier")
  const passt = (text, a) => a.length < 4 ? (' ' + text).includes(' ' + a) : text.includes(a);
  return INDEX.map(e => {
    let punkte = 0;
    for (const alts of gruppen) {
      const imTitel = alts.some(a => passt(e.t, a)), drin = imTitel || alts.some(a => passt(e.h, a));
      if (!drin) return null;
      punkte += imTitel ? (alts.some(a => e.t.startsWith(a)) ? 3 : 2) : 1;
    }
    return { e, punkte };
  }).filter(Boolean).sort((x, y) => y.punkte - x.punkte).slice(0, 40).map(x => x.e);
}

let INDEX = [];
const VORSCHLAEGE = ['Fundbüro', 'Feuerwerk', 'Erste Hilfe', 'Toiletten', 'Parken', 'Weißbier', 'Alkoholfrei', 'Kartenzahlung'];
const sucheBox = $('#suche'), suchfeld = $('#suchfeld');
let trefferJetzt = [];

function zeigeTreffer(){
  const q = suchfeld.value;
  $('#vorschlaege').hidden = !!q.trim();
  trefferJetzt = suche(q);
  $('#treffer').innerHTML = !q.trim() ? '' : trefferJetzt.length
    ? trefferJetzt.map((e, i) => `<li><button data-i="${i}"><span class="wo">${esc(e.wo)}</span><b>${esc(e.titel)}</b>${e.text ? `<small>${esc(e.text)}</small>` : ''}</button></li>`).join('')
    : `<li class="nix">Nichts gefunden. Versuch es mit einem anderen Wort.</li>`;
}

function sucheAuf(){
  INDEX = suchIndex();
  sucheBox.hidden = false;
  document.body.style.overflow = 'hidden';
  history.pushState({ suche: 1 }, '');
  suchfeld.focus();
  zeigeTreffer();
}
function sucheSchliessen(){ sucheBox.hidden = true; document.body.style.overflow = ''; }
function sucheZu(){ const zurueck = history.state && history.state.suche; sucheSchliessen(); if (zurueck) history.back(); }

function springe(z){
  document.querySelector(`nav [data-tab="${z.tab}"]`).click();
  let el;
  if (z.tab === 'programm') { aktTag = z.tag; zeichneTage(); zeichneProgramm(); el = document.querySelectorAll('#tagesinhalt .slot')[z.n]; }
  else if (z.zelt) { zeltFilter = 'alle'; zeltGew = null; waehleZelt(z.zelt); el = document.querySelector(`#zeltliste .eintrag[data-id="${z.zelt}"]`); }
  else if (z.ort) { filter = 'alle'; gewaehlt = null; waehle(z.ort); el = document.querySelector(`#planliste .eintrag[data-id="${z.ort}"]`); }
  else if (z.karte) {
    const d = document.querySelector(z.karte); d.open = true;
    el = z.zeile != null ? d.querySelectorAll('.zeile')[z.zeile] : z.punkt != null ? d.querySelectorAll('.punkt')[z.punkt] : d;
  }
  else el = document.querySelector(z.el);
  if (!el) return;
  // Zugeklappte Abschnitte (z. B. Festzelt im Lageplan) öffnen, damit der Treffer sichtbar ist
  for (let d = el.closest('details'); d; d = d.parentElement.closest('details')) d.open = true;
  el.scrollIntoView({ block: 'center' });
  el.classList.remove('aufblitzen'); void el.offsetWidth; el.classList.add('aufblitzen');
}

try { history.scrollRestoration = 'manual'; } catch (e) {}
$('#suche-auf').addEventListener('click', sucheAuf);
$('#suche-zu').addEventListener('click', sucheZu);
suchfeld.addEventListener('input', zeigeTreffer);
suchfeld.addEventListener('keydown', e => { if (e.key === 'Enter') { suchfeld.blur(); } });
sucheBox.addEventListener('keydown', e => { if (e.key === 'Escape') sucheZu(); });
window.addEventListener('popstate', () => { if (!sucheBox.hidden) sucheSchliessen(); });
$('#vorschlaege').innerHTML = VORSCHLAEGE.map(v => `<button class="chip">${esc(v)}</button>`).join('');
$('#vorschlaege').addEventListener('click', e => { const b = e.target.closest('.chip'); if (b) { suchfeld.value = b.textContent; zeigeTreffer(); } });
$('#treffer').addEventListener('click', e => {
  const b = e.target.closest('button[data-i]'); if (!b) return;
  const z = trefferJetzt[+b.dataset.i].ziel;
  sucheZu();
  setTimeout(() => springe(z), 50);
});


/* Jetzt läuft / Als Nächstes */
const minuten = z => { const m = /^(\d{1,2}):(\d{2})$/.exec(z); return m ? +m[1] * 60 + +m[2] : null; };
const dauer = d => d < 60 ? `in ${d} Min.` : `in ${Math.floor(d / 60)} Std.${d % 60 ? ` ${d % 60} Min.` : ''}`;
function zeichneJetzt(){
  const box = $('#jetzt'), tag = festTag();
  if (tag < 0 || tag >= FEST_TAGE) { box.hidden = true; return; }
  const n = jetztZeit(), jetzt = (n.getHours() < 4 ? n.getHours() + 24 : n.getHours()) * 60 + n.getMinutes();
  const slots = (PROGRAMM[tag] || { slots: [] }).slots;
  // Beginn jedes Punkts in Minuten (Nacht nach 24 Uhr weitergezählt), Wort-Zeiten über ca bzw. "Danach"
  const nacht = m => m != null && m < 4 * 60 ? m + 24 * 60 : m;
  const start = [];
  slots.forEach((s, j) => start.push(nacht(minuten(s.zeit) ?? minuten(s.ca || '')) ?? (j ? start[j - 1] + 60 : null)));
  let lauf = -1, naechst = -1;
  slots.forEach((s, j) => {
    if (start[j] == null) return;
    if (start[j] <= jetzt && !(s.bis && nacht(minuten(s.bis)) <= jetzt)) lauf = j;
    if (start[j] > jetzt && naechst < 0) naechst = j;
  });
  const zeile = (label, s, wann, ziel) => `<button data-tag="${ziel[0]}" data-n="${ziel[1]}"><span class="label">${label}</span><b>${esc(s.titel)}</b><small>${esc([wann, s.ort].filter(Boolean).join(' · '))}</small></button>`;
  let html = '';
  const wann = (s, j, seit) => minuten(s.zeit) != null ? (seit ? `seit ${s.zeit}` : s.zeit) : s.ca ? `${s.zeit}, ca. ${s.ca}` : s.zeit;
  if (lauf >= 0) html += zeile('Läuft gerade', slots[lauf], wann(slots[lauf], lauf, true), [tag, lauf]);
  if (naechst >= 0) {
    html += zeile(lauf < 0 && naechst === 0 ? 'Heute' : 'Als Nächstes', slots[naechst], `${wann(slots[naechst], naechst)} · ${dauer(start[naechst] - jetzt)}`, [tag, naechst]);
  } else if (tag + 1 < FEST_TAGE && PROGRAMM[tag + 1] && PROGRAMM[tag + 1].slots.length) {
    const s = PROGRAMM[tag + 1].slots[0], d = tageAb(tag + 1);
    html += zeile('Morgen', s, `${wt[d.getDay()]}, ${s.zeit}`, [tag + 1, 0]);
  }
  if (n.getHours() >= 21 || n.getHours() < 4) html += `<button data-heimweg="1"><span class="label">Heimweg</span><b>Letzte Züge, Taxi, Notruf</b></button>`;
  box.innerHTML = html;
  box.hidden = !html;
}
$('#jetzt').addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return;
  if (b.dataset.heimweg) springe({ tab: 'infos', karte: `#infos > details:nth-child(1)` });
  else springe({ tab: 'programm', tag: +b.dataset.tag, n: +b.dataset.n });
});
zeichneJetzt();
setInterval(zeichneJetzt, 60000);

/* Aktuelle Meldungen aus meldungen.json (ohne Neuveröffentlichung der App änderbar) */
async function ladeMeldungen(){
  try {
    const r = await fetch('meldungen.json', { cache: 'no-store' });
    if (!r.ok) return;
    const jetzt = jetztZeit();
    const aktiv = (await r.json()).filter(m => m && m.text && (!m.ab || new Date(m.ab) <= jetzt) && (!m.bis || new Date(m.bis) > jetzt));
    $('#meldungen').innerHTML = aktiv.map(m => `<p class="meldung${m.wichtig ? ' wichtig' : ''}">${esc(m.text)}</p>`).join('');
    $('#meldungen').hidden = !aktiv.length;
  } catch (e) {}
}
ladeMeldungen();
setInterval(ladeMeldungen, 5 * 60000);
document.addEventListener('visibilitychange', () => { if (!document.hidden) { ladeMeldungen(); zeichneJetzt(); } });
