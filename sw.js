// Bei jeder Änderung an Dateien die Versionsnummer erhöhen, damit Handys den neuen Stand laden.
const VERSION = 'volksfest-v2';
const DATEIEN = [
  './', 'index.html', 'manifest.webmanifest',
  'icons/icon-192.png', 'icons/icon-512.png', 'icons/svb-logo.png',
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
  // Seite: erst Netz (aktuelles Programm), ohne Netz die gespeicherte Version
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req).then(r => { const k = r.clone(); caches.open(VERSION).then(c => c.put('index.html', k)); return r; })
        .catch(() => caches.match('index.html'))
    );
    return;
  }
  // Rest (Schriften, Bilder): erst Speicher
  e.respondWith(caches.match(req).then(hit => hit || fetch(req)));
});
