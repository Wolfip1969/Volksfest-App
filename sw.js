// Bei jeder Änderung an Dateien die Versionsnummer erhöhen, damit Handys den neuen Stand laden.
const VERSION = 'volksfest-v11';
const DATEIEN = [
  './', 'index.html', 'app.js', 'manifest.webmanifest',
  'icons/icon-192.png', 'icons/icon-512.png', 'icons/svb-logo.png', 'icons/karte-anfahrt.jpg',
  'fonts/barlow-latin-500-normal.woff2', 'fonts/barlow-latin-600-normal.woff2',
  'fonts/barlow-latin-700-normal.woff2', 'fonts/montserrat-latin-900-normal.woff2'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(DATEIEN)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  // Seite und Daten (app.js): erst Netz (aktuelles Programm), ohne Netz die gespeicherte Version
  const istApp = new URL(req.url).pathname.endsWith('/app.js');
  if (req.mode === 'navigate' || istApp) {
    const key = istApp ? 'app.js' : 'index.html';
    e.respondWith(
      fetch(req).then(r => { const k = r.clone(); caches.open(VERSION).then(c => c.put(key, k)); return r; })
        .catch(() => caches.match(key))
    );
    return;
  }
  // Rest (Schriften, Bilder): erst Speicher
  e.respondWith(caches.match(req).then(hit => hit || fetch(req)));
});
