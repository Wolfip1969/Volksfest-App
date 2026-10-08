/* =========================================================
   DATEN: Hier alles ändern. Der Rest der Seite liest nur diese Werte.
   Aktuell Platzhalter, keine echten Zusagen.
   ========================================================= */
const FEST_START = new Date(2027, 6, 9);   // 9. Juli 2027
const FEST_TAGE  = 10;                      // bis 18. Juli

const PROGRAMM = {
  // TESTDATEN: Festprogramm vom Vorjahr (Fr 10.7. bis So 19.7.2026), auf 9.-18.7.2027 gelegt.
  0: { motto: "Festeinzug", slots: [
      { zeit: "18:00", titel: "Großer Festeinzug", text: "Mit der Dreder Musi, Blaskapelle Bruckmühl und der Jugendkapelle Vagen", ort: "Festplatz", highlight: true },
      { zeit: "Danach", titel: "Festabend", text: "Mit der Dreder Musi", ort: "Festzelt" } ]},
  1: { motto: "Volleyball und Stimmung", slots: [
      { zeit: "10:00", titel: "39. Volleyball-Volksfestturnier", text: "Auf der Volksfestwiese", ort: "Volksfestwiese" },
      { zeit: "16:00", titel: "Festzeltbetrieb und Bierausschank", text: "", ort: "Festzelt" },
      { zeit: "18:00", titel: "Stimmung mit der Dreder Musi", text: "", ort: "Festzelt" } ]},
  2: { motto: "Frühschoppen und Konzert", slots: [
      { zeit: "10:00", titel: "Volleyball-Volksfestturnier", text: "2. Tag", ort: "Volksfestwiese" },
      { zeit: "10:30", titel: "Peter Hainz Gedächtnis-Schafkopfturnier", text: "Bis 12:30 Uhr, Anmeldung ab 10:00 Uhr", ort: "" },
      { zeit: "10:30", titel: "Frühschoppen und Mittagessen", text: "Zu verbilligten Preisen, mit der Mangfalltaler Musi", ort: "Festzelt" },
      { zeit: "12:00", titel: "Kaffee und Kuchen", text: "An der Kaffeebar", ort: "Festzelt" },
      { zeit: "15:00", titel: "Zelt schließt", text: "Einlass ab 17:00 Uhr, nur mit Ticket", ort: "Festzelt" },
      { zeit: "19:00", titel: "Konzert: HEINO & Almklausi", text: "Präsentiert vom Stadtmarketing, Tickets bei muenchenticket.de", ort: "Festzelt", highlight: true } ]},
  3: { motto: "Traditionsabend mit Kesselfleischessen", slots: [
      { zeit: "17:00", titel: "Festzeltbetrieb und Bierausschank", text: "", ort: "Festzelt" },
      { zeit: "18:00", titel: "Stimmung und Gemütlichkeit", text: "Mit der Musikkapelle Vagen", ort: "Festzelt" },
      { zeit: "18:00", titel: "Fußballerstammtisch", text: "Mit Mannschaftsschießen an der Torwand", ort: "Festzelt" },
      { zeit: "19:00", titel: "D'Wendelstoana Schnoiza", text: "Und gemeinsamer Amboss-Polka-Plattler", ort: "Festzelt", highlight: true } ]},
  4: { motto: "Brillantfeuerwerk", slots: [
      { zeit: "17:00", titel: "Festzeltbetrieb und Bierausschank", text: "", ort: "Festzelt" },
      { zeit: "19:00", titel: "Festabend mit der Harthauser Musi", text: "", ort: "Festzelt" },
      { zeit: "Abends", titel: "Großes Brillantfeuerwerk", text: "Nach Einbruch der Dunkelheit", ort: "Festplatz", highlight: true } ]},
  5: { motto: "Senioren- und Kindernachmittag", slots: [
      { zeit: "14:00", titel: "Tag der Kinder", text: "Zu ermäßigten Preisen, bis 18:00 Uhr", ort: "Festplatz", highlight: true },
      { zeit: "14:00", titel: "Bewirtung der Bruckmühler Altbürger", text: "Zeichenausgabe ab dem 65. Lebensjahr von 13:30 bis 16:00 Uhr", ort: "Festzelt" },
      { zeit: "14:30", titel: "Kasperltheater", text: "", ort: "Festzelt" },
      { zeit: "15:00", titel: "Nachmittagsstimmung", text: "Mit der Blaskapelle Bruckmühl", ort: "Festzelt" },
      { zeit: "17:00", titel: "Mädchen- und Damenschießen", text: "An der Torwand", ort: "Festzelt" },
      { zeit: "19:00", titel: "Gemütlicher Festabend", text: "Mit der Musikkapelle Vagen", ort: "Festzelt" } ]},
  6: { motto: "Vollgas-Donnerstag mit Snoozy Beats", slots: [
      { zeit: "17:00", titel: "Festzeltbetrieb und Bierausschank", text: "", ort: "Festzelt" },
      { zeit: "19:00", titel: "Gaudi mit Snoozy Beats", text: "Die Party-Band", ort: "Festzelt", highlight: true } ]},
  7: { motto: "Tag der Betriebe und Vereine", slots: [
      { zeit: "17:00", titel: "Festzeltbetrieb und Bierausschank", text: "", ort: "Festzelt" },
      { zeit: "18:00", titel: "Mannschaftsschießen", text: "An der Torwand", ort: "Festzelt" },
      { zeit: "19:00", titel: "Festabend mit Die Karolinenfelder", text: "", ort: "Festzelt" } ]},
  8: { motto: "Boxen live", slots: [
      { zeit: "13:00", titel: "Festzeltbetrieb und Bierausschank", text: "", ort: "Festzelt" },
      { zeit: "13:30", titel: "Kornhass Volksfest Fights", text: "Boxen und Kickboxen live, bis 17:00 Uhr, im separaten Bereich", ort: "Festzelt", highlight: true },
      { zeit: "19:00", titel: "Volksfeststimmung mit Die Karolinenfelder", text: "", ort: "Festzelt" } ]},
  9: { motto: "Festendspurt", slots: [
      { zeit: "10:30", titel: "Frühschoppen", text: "", ort: "Festzelt" },
      { zeit: "11:00", titel: "Stoaheben", text: "Im Zelt", ort: "Festzelt" },
      { zeit: "12:00", titel: "Kaffee und Kuchen", text: "An der Kaffeebar", ort: "Festzelt" },
      { zeit: "18:00", titel: "Festendspurt", text: "Mit der Blaskapelle Bruckmühl", ort: "Festzelt", highlight: true },
      { zeit: "18:00", titel: "Einzel- und Mannschaftsschießen", text: "An der Torwand", ort: "Festzelt" } ]}
};

const KATEGORIEN = {
  zelt:   { name: "Bierzelt",       farbe: "#d2332e" },
  fahr:   { name: "Fahrgeschäfte",  farbe: "#141414" },
  essen:  { name: "Essen",          farbe: "#8a8a8a" },
  buehne: { name: "Bühne",          farbe: "#8f1d19" }
};

// x,y = Position im schematischen Plan (400 x 300)
const ORTE = [
  { id: 1, kat: "zelt",   name: "Bierzelt",                 info: "Platzhalter", x: 120, y: 110 },
  { id: 2, kat: "buehne", name: "Bühne",                    info: "Platzhalter", x: 120, y: 190 },
  { id: 3, kat: "fahr",   name: "Fahrgeschäft A",           info: "Platzhalter", x: 290, y: 70 },
  { id: 4, kat: "fahr",   name: "Fahrgeschäft B",           info: "Platzhalter", x: 340, y: 140 },
  { id: 5, kat: "essen",  name: "Imbiss A",                 info: "Platzhalter", x: 260, y: 215 },
  { id: 6, kat: "essen",  name: "Imbiss B",                 info: "Platzhalter", x: 320, y: 250 }
];

// FESTZELT: nach Zeltplan 2024. Koordinaten in Plan-Einheiten (Zeltplan quer, Haupteingang unten);
// r = Fläche [x, y, Breite, Höhe], p = Punkt [x, y]. Die App dreht den Plan hochkant.
const ZELT_KAT = {
  eingang: { name: "Ein- und Ausgänge", farbe: "#2e7d32" },
  bar:     { name: "Bars",              farbe: "#d2332e" },
  essen:   { name: "Essen",             farbe: "#8a8a8a" },
  wc:      { name: "Toiletten",         farbe: "#1f6fb2" },
  mehr:    { name: "Bühne und Service", farbe: "#8f1d19" }
};
const ZELT = [
  { id: 1,  kat: "eingang", name: "Haupteingang",           info: "Gegenüber der Bühne", p: [803, 1258] },
  { id: 2,  kat: "eingang", name: "Eingang Nord-West",      info: "Hinten links, zwischen Hendl und Metzger", p: [553, 493] },
  { id: 3,  kat: "eingang", name: "Eingang Nord-Ost",       info: "Hinten rechts, neben der Schnapsbar", p: [1320, 493] },
  { id: 4,  kat: "bar",     name: "Pils- und Weißbier-Bar", info: "SVB-Handballer · rechte Zeltseite, nahe Haupteingang", r: [1632, 1007, 128, 250] },
  { id: 5,  kat: "bar",     name: "Weinbar",                info: "Rechte Zeltseite, auf Höhe der Bühne", r: [1635, 627, 127, 257] },
  { id: 6,  kat: "bar",     name: "Kaffeebar",              info: "SVB-Leichtathleten · hinten rechts", r: [1473, 493, 162, 78] },
  { id: 7,  kat: "bar",     name: "Alkoholfreie Bar",       info: "SVB-Stockschützen · hinter der Bühne, rechts neben der Kasse", r: [1128, 493, 127, 85] },
  { id: 8,  kat: "bar",     name: "Schnapsbar",             info: "Außen am Eingang Nord-Ost", r: [1383, 433, 128, 60] },
  { id: 9,  kat: "essen",   name: "Käse und Radi",          info: "SVB-Volleyballer · hinten links", r: [233, 493, 128, 80] },
  { id: 10, kat: "essen",   name: "Hendl",                  info: "Hinten links", r: [361, 493, 127, 80] },
  { id: 11, kat: "essen",   name: "Metzger",                info: "Hinter der Bühne, links", r: [616, 493, 122, 80] },
  { id: 12, kat: "wc",      name: "Toiletten",              info: "Außerhalb des Zelts, über den Ausgang Toilette", r: [1600, 240, 210, 110] },
  { id: 13, kat: "wc",      name: "Ausgang Toilette",       info: "Rechte Zeltseite hinten, durch den Raucherbereich", p: [1762, 560] },
  { id: 14, kat: "mehr",    name: "Bühne",                  info: "Mit Kränzen und SVB-Fahnen", r: [776, 677, 229, 130] },
  { id: 15, kat: "mehr",    name: "Kasse",                  info: "Bierzeichen, Kartenzahlung, Fundbüro · hinter der Bühne", r: [997, 500, 127, 95] },
  { id: 16, kat: "mehr",    name: "Raucherbereich",         info: "Außen entlang der rechten Zeltseite", r: [1762, 360, 128, 898] },
  { id: 17, kat: "eingang", name: "Notausgang West",        info: "Nur im Notfall · linke Zeltseite", p: [103, 915] },
  { id: 18, kat: "eingang", name: "Notausgang Ost",         info: "Nur im Notfall · rechte Zeltseite", p: [1762, 943] },
  { id: 19, kat: "eingang", name: "Notausgang Heufeld",     info: "Nur im Notfall · vorne rechts", p: [1420, 1258] }
];
const ZELT_FLAECHEN = [[110, 650, 465, 605], [596, 1148, 113, 107], [618, 690, 512, 388], [870, 1148, 522, 107], [1183, 650, 385, 470], [1455, 1148, 56, 107]];

const CATERER = [
  { name: "SVB Volleyballer-Brotzeiten", gruppen: [{ items: [
      ["Große Brezn", "5,00", "1"],
      ["Bierstangerl", "3,80", "3"],
      ["Pizzaschifferl", "4,40", "1, 3", "Margherita"],
      ["Portion Radi", "3,30"],
      ["Portion Käse groß", "6,90", "3", "Emmentaler 200 g"],
      ["Portion Käse klein", "3,60", "3", "Emmentaler 100 g"],
      ["Käse-Mixteller", "8,20", "3"],
      ["Obazda", "10,00", "3"] ]}],
    fuss: "1) Gluten, Weizen. 2) Roggen, Sesam, Sesamsamen. 3) Milch und Milcherzeugnisse." },

  { name: "Hainz Peter", gruppen: [{ items: [
      ["1/2 Hendl mit Semmel", "13,30"],
      ["Haxn mit Semmel", "13,30"] ]}] },

  { name: "Streini's Fischspezialitäten", gruppen: [{ items: [
      ["Steckerlfisch mit Semmel", "18,00"],
      ["Seelachs-Filet mit Kartoffelsalat", "15,50"],
      ["Backfisch mit Kartoffelsalat", "11,00", "1"],
      ["Mix-Box mit Remoulade", "11,00", "3", "Calamari, Fisch-Nuggets und Garnelen"],
      ["Calamari mit Remoulade", "10,60", "3"],
      ["Backfischsemmel", "7,80", "3"],
      ["Lachssemmel", "5,50", "4"],
      ["Fischsemmel", "5,20", "3"],
      ["Portion Kartoffelsalat", "4,00", "1"],
      ["Gemischter Salat", "8,70"],
      ["Gemischter Salat mit Calamari", "10,00"],
      ["Gemischter Salat mit Nuggets", "10,60"],
      ["Gemischter Salat mit Garnelen", "11,60"] ]}],
    fuss: "1) Geschmacksverstärker 2) E451 3) Süßungsmittel 4) Phosphat. Informationen über Zutaten, die Allergien oder Unverträglichkeiten auslösen können, gibt es auf Nachfrage am Stand." },

  { name: "Catering mit Sigl", gruppen: [
    { items: [
      ["Rollbraten mit Dunkelbiersoße, Kartoffel- und Krautsalat", "15,40", "a d e"],
      ["Leberkäs mit Kartoffelsalat", "11,00", "d e 2 3 7"],
      ["Grillfleisch mit Schmorzwiebeln und Krautsalat", "14,20", "c 4"],
      ["Schweinswürschtl mit Sauerkraut", "11,00", "e 3 7"],
      ["Schaschlikpfanne mit Semmel", "11,60", "a 2 3 8"],
      ["Schaschlikpfanne mit Pommes", "14,00", "2 3 8"],
      ["Currywurst mit Semmel", "9,60", "a 1 2 3 4 7 8"],
      ["Currywurst mit Pommes", "11,00", "1 2 3 4 7 8"],
      ["Vegane Currywurst mit Pommes", "11,60", "1 7 8"],
      ["Portion Pommes", "5,00"],
      ["Rahmschwammerl mit Semmelknödel", "11,00", "a b c d"],
      ["Bayrischer Wurstsalat mit Semmel", "11,00", "a d e l 1 2 3 4 7 8"],
      ["Kalter Braten mit Kren, Essiggurke und Breze", "11,10", "a c d 3 5 8"],
      ["Rollbratensemmel", "5,10", "a"],
      ["Leberkassemmel", "4,30", "a d e 2 3 7"] ]},
    { titel: "Für die Kids", items: [
      ["Semmelknödel mit Soße", "6,40"],
      ["1 Paar Schweinswürschtl mit Pommes", "7,20"] ]},
    { titel: "Nur am Montag", items: [
      ["Kesselfleisch mit Sauerkraut und Brot", "13,20", "a"] ]},
    { titel: "Sonntag: vergünstigter Mittagstisch", sub: "Bis 14:00 Uhr", items: [
      ["Hirschgulasch mit Spätzle", "17,60", "a b c d"],
      ["2 Weisse mit Breze", "7,20", "a d e 2 7", "Bis 12:00 Uhr"] ]}
  ]}
];

// BARS: Betreiber laut Berichten auf svbruckmuehl.de. Preise sind BEISPIELE, nur die Maß (12,60 €, Stand 2026) ist echt.
const BARS_INTRO = "Neben dem Festzelt betreiben die Sparten des SV Bruckmühl fünf Bars, dazu kommt die Kaffeebar. Die Getränkeliste ist noch ein Beispiel, die echten Preise für 2027 folgen.";
const BARS = [
  { name: "Ausschank im Festzelt", info: "Maxlrainer Festbier, frisch vom Fass", gruppen: [{ items: [
      ["Maß Festbier", "12,60", "", "Preis 2026"],
      ["Maß Radler", "12,60"],
      ["Maß alkoholfreies Bier", "12,60"],
      ["Maß Spezi", "9,50"],
      ["Maß Wasser", "6,00"] ]}] },

  { name: "Pils- und Weißbier-Bar", info: "SVB-Handballer · ab dem Abend", gruppen: [{ items: [
      ["Weißbier", "6,50", "", "0,5 l"],
      ["Alkoholfreies Weißbier", "6,50", "", "0,5 l"],
      ["Russ'n", "6,50", "", "Weißbier mit Zitronenlimo, 0,5 l"],
      ["Pils", "5,00", "", "0,33 l"] ]}] },

  { name: "Weinbar", info: "Ab dem Abend", gruppen: [
    { items: [
      ["Weißwein", "6,50", "", "0,2 l"],
      ["Rotwein", "6,50", "", "0,2 l"],
      ["Rosé", "6,50", "", "0,2 l"],
      ["Weinschorle", "7,00", "", "0,5 l"] ]},
    { titel: "Sekt und Spritz", items: [
      ["Glas Sekt", "5,50", "", "0,1 l"],
      ["Hugo", "8,50"],
      ["Aperol Spritz", "8,50"],
      ["Flasche Sekt", "29,00", "", "0,75 l"] ]}
  ]},

  { name: "Schnapsbar", info: "Ab dem Abend · je 2 cl", gruppen: [{ items: [
      ["Obstler", "3,50"],
      ["Williamsbirne", "4,00"],
      ["Enzian", "4,00"],
      ["Kräuterlikör", "3,50"],
      ["Haselnuss", "3,50"] ]}] },

  { name: "Cocktailbar", info: "Ab dem Abend", gruppen: [
    { items: [
      ["Caipirinha", "10,00"],
      ["Mojito", "10,00"],
      ["Gin Tonic", "10,00"],
      ["Cuba Libre", "9,00"],
      ["Wodka Energy", "9,00"] ]},
    { titel: "Ohne Alkohol", items: [
      ["Virgin Mojito", "7,00"],
      ["Ipanema", "7,00", "", "Limette, Rohrzucker, Ginger Ale"] ]}
  ]},

  { name: "Alkoholfreie Bar", info: "SVB-Stockschützen · für Autofahrer und alle anderen", gruppen: [{ items: [
      ["Spezi", "4,00", "", "0,5 l"],
      ["Limo", "4,00", "", "0,5 l"],
      ["Apfelschorle", "4,00", "", "0,5 l"],
      ["Mineralwasser", "3,50", "", "0,5 l"],
      ["Energydrink", "4,50", "", "0,25 l"] ]}] },

  { name: "Kaffeebar", info: "SVB-Leichtathleten · nachmittags", gruppen: [{ items: [
      ["Tasse Kaffee", "3,00"],
      ["Cappuccino", "3,80"],
      ["Stück Kuchen", "3,50", "", "Selbstgebacken"] ]}] }
];

const LEGENDE = [
  "Allergene: a) glutenhaltiges Getreide b) Hühnerei c) Milch (Laktose) d) Sellerie e) Senf f) Fisch g) Krebstiere h) Schalenfrüchte i) Erdnuss j) Sesam k) Soja l) Schwefeldioxid/Sulfite m) Lupinen n) Weichtiere",
  "Zusatzstoffe bei Sigl: 1) Farbstoff 2) Konservierungsstoff 3) Antioxidationsmittel 4) Geschmacksverstärker 5) geschwefelt 6) geschwärzt 7) Phosphat 8) Süßungsmittel"
];

const ZEITEN = [
  ["Biergarten täglich", "ab 14:30"],
  ["Montag bis Donnerstag", "ab 17:00"],
  ["Freitag", "ab 17:00"],
  ["Samstag", "ab 14:00"],
  ["Sonntag", "ab 11:00"]
]; // Platzhalter

// ANFAHRT: Texte von svbruckmuehl.de/volksfest/#anfahrt
const ADRESSE = ["Volksfestplatz", "Rathausplatz", "83052 Bruckmühl"];
const ROUTE_URL = "https://www.google.com/maps/dir/?api=1&destination=47.88388,11.92074";
const ANFAHRT = [
  ["Mit der Bahn", "Mit der Bayerischen Regiobahn (BRB) kommst du bequem zum Bahnhof Bruckmühl. Von München, Holzkirchen und Rosenheim gibt es regelmäßige Verbindungen. Vom Bahnhof sind es nur wenige Gehminuten zum Festgelände."],
  ["Mit dem Auto", "Das Festgelände ist gut ausgeschildert. Rund um den Volksfestplatz gibt es Parkplätze. An den Haupttagen kostet das Parken eine kleine Gebühr, der Erlös geht an die Sparte Fußball des SV Bruckmühl."],
  ["Mit dem Fahrrad", "Fahrradstellplätze gibt es direkt am Festgelände."],
  ["Barrierefrei", "Das Festgelände ist barrierefrei zugänglich, es gibt behindertengerechte Toiletten."]
];

// SUCHE: Alltagswörter, die auf Begriffe in der App umgeleitet werden. Links das, was Besucher tippen, rechts was in der App steht.
const SUCHWOERTER = {
  "fundsache": "fundbüro", "fundsachen": "fundbüro", "verloren": "fundbüro", "vergessen": "fundbüro", "liegen lassen": "fundbüro", "geldbeutel": "fundbüro", "handy": "fundbüro", "schlüssel": "fundbüro",
  "klo": "toilette", "wc": "toilette", "toilette": "toilette", "toiletten": "toilette",
  "sanitäter": "erste hilfe", "verletzt": "erste hilfe", "arzt": "erste hilfe", "notfall": "erste hilfe", "brk": "erste hilfe", "pflaster": "erste hilfe",
  "parken": "mit dem auto", "parkplatz": "mit dem auto", "parkgebühr": "mit dem auto",
  "zug": "bahn", "bahnhof": "bahn", "brb": "bahn",
  "rad": "fahrrad", "radl": "fahrrad",
  "rollstuhl": "barrierefrei", "rollator": "barrierefrei",
  "ec": "kartenzahlung", "karte zahlen": "kartenzahlung", "girocard": "kartenzahlung", "bargeld": "bezahlen", "zahlen": "bezahlen", "bon": "bierzeichen", "bons": "bierzeichen", "marken": "bierzeichen",
  "tisch": "reservier", "platz reservieren": "reservier",
  "geöffnet": "öffnungszeiten", "offen": "öffnungszeiten", "wann auf": "öffnungszeiten", "uhrzeit": "öffnungszeiten",
  "ohne alkohol": "alkoholfrei", "autofahrer": "alkoholfrei", "softdrink": "alkoholfrei",
  "kinder": "kids", "kind": "kids",
  "musik": "musi", "band": "musi", "kapelle": "musi",
  "vegetarisch": "vegan", "veggie": "vegan",
  "adresse": "volksfestplatz", "anfahrt": "anfahrt", "navi": "route"
};

const INFOS = [
  { titel: "Bezahlen und Bierzeichen", punkte: [
    ["Bierzeichen", "Gibt es an der Volksfestkasse. Mindestabnahme: 10 Stück."],
    ["Kartenzahlung", "Bierzeichen kannst du am Kassenhäuschen im Festzelt mit Karte bezahlen. Es steht seitlich rechts hinter der Bühne."] ]},
  { titel: "Fundbüro und Erste Hilfe", punkte: [
    ["Fundbüro", "Im Festzelt am Kassenhäuschen seitlich hinter der Bühne."],
    ["Erste Hilfe", "Am Haupteingang steht ein BRK-Rettungswagen, dazu unterstützt der First Responder Bruckmühl. Bei kleineren Verletzungen hilft das Kassenhäuschen im Festzelt."] ]},
  { titel: "Maxlrainer Festbier", text: "Das Festbier kommt von der Schlossbrauerei Maxlrain, die seit 1636 braut. Das Brauwasser stammt aus Quellen bei Adlfurt in der Gemeinde Bruckmühl. Mit jeder Maß unterstützt du das ehrenamtlich organisierte Volksfest und die Kinder- und Jugendarbeit des SV Bruckmühl." }
];
/* TESTMODUS: auf false setzen, sobald Programm und Speisekarte für 2027 echt sind */
const TESTMODUS = true;
const LOGO_SRC = document.querySelector(".logo img").src;
const LINKS = [
  { name: "Instagram", text: "@volksfest.bruckmuehl", url: "https://www.instagram.com/volksfest.bruckmuehl/" },
  { name: "Facebook", text: "Volksfest Bruckmühl", url: "https://www.facebook.com/share/1JwfhBW4DR/" },
  { name: "Webseite", text: "svbruckmuehl.de/volksfest", url: "https://svbruckmuehl.de/volksfest/" }
];
const RESERVIERUNG_URL = "https://volksfest-bruckmuehl-reservierung.vercel.app/";

/* ========================================================= */

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
let aktTag = (function(){
  const heute = new Date(); heute.setHours(0,0,0,0);
  const d = Math.round((heute - FEST_START) / 864e5);
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
    <rect x="8" y="8" width="384" height="284" rx="14" fill="none" stroke="var(--linie)" stroke-width="2" stroke-dasharray="6 6"/>
    <rect x="50" y="70" width="150" height="80" rx="8" fill="${KATEGORIEN.zelt.farbe}" opacity=".12"/>
    <rect x="50" y="165" width="150" height="55" rx="8" fill="${KATEGORIEN.buehne.farbe}" opacity=".12"/>
    <rect x="240" y="40" width="130" height="130" rx="8" fill="${KATEGORIEN.fahr.farbe}" opacity=".12"/>
    <rect x="230" y="190" width="140" height="80" rx="8" fill="${KATEGORIEN.essen.farbe}" opacity=".12"/>
    <path d="M30 280h50" stroke="var(--leise)" stroke-width="3"/>
    <text x="85" y="284" font-size="11" fill="var(--leise)" font-family="sans-serif">Eingang (Platzhalter)</text>`;
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
      <span><b>${esc(o.name)}</b><small>${k.name} · ${esc(o.info)}</small></span></button></li>`;
  }).join('') || '<li class="leer">Keine Einträge.</li>';
}
function waehle(id){ gewaehlt = gewaehlt === id ? null : id; zeichnePlan(); }
$('#plan').addEventListener('click', e => { const g = e.target.closest('.pin'); if (g) waehle(+g.dataset.id); });
$('#plan').addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { const g = e.target.closest('.pin'); if (g) { e.preventDefault(); waehle(+g.dataset.id); } } });
$('#planliste').addEventListener('click', e => { const b = e.target.closest('.eintrag'); if (b) waehle(+b.dataset.id); });
$('#planfilter').addEventListener('click', e => { const b = e.target.closest('.chip'); if (b) { filter = b.dataset.k; gewaehlt = null; zeichnePlan(); } });

/* Festzelt: Plan quer gezeichnet, im Uhrzeigersinn hochkant gedreht */
const ZT = (x, y) => [1300 - y, x - 20];
const zRect = ([x, y, w, h]) => { const [nx, ny] = ZT(x, y + h); return [nx, ny, h, w]; };
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
    + (([x, y]) => `<text x="${x}" y="${y - 50}" text-anchor="middle" font-size="40" font-weight="800" fill="var(--text)" font-family="sans-serif">Bühne</text>`)(zMitte(ZELT.find(o => o.name === 'Bühne')));
  const pins = sichtbar.map(o => {
    const k = ZELT_KAT[o.kat], an = zeltGew === o.id, [x, y] = zMitte(o);
    return `<g class="pin" data-id="${o.id}" tabindex="0" role="button" aria-label="${esc(o.name)}">
      <circle cx="${x}" cy="${y}" r="${an ? 48 : 36}" fill="${k.farbe}" stroke="${an ? 'var(--blau)' : '#fff'}" stroke-width="${an ? 10 : 5}"/>
      <text x="${x}" y="${y + 13}" text-anchor="middle" font-size="36" font-weight="800" fill="#fff" font-family="sans-serif">${o.id}</text></g>`;
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
$('#infos').innerHTML = (RESERVIERUNG_URL ? infoKarte('Tischreservierung', `<p>Reserviere deinen Tisch im Bierzelt online. Du bekommst eine Bestätigung per E-Mail. Reservierungen gelten nur bis 18:30 Uhr.</p><a class="knopf" href="${esc(RESERVIERUNG_URL)}" target="_blank" rel="noopener">Tisch reservieren</a>`) : '')
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
