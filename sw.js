/* Service worker del Recetario.
   Guarda todos los archivos de la app en caché para que funcione sin internet.
   CADA VEZ QUE CAMBIES index.html (u otro archivo), subí el número de CACHE
   (por ejemplo 'recetario-v2') para que los celulares bajen la versión nueva. */
const CACHE = 'recetario-v7';
const ARCHIVOS = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png',
  './icons/favicon-48.png',
  './icons/logo-blanco.png',
  './icons/logo-rojo.png',
];

// Instalación: descarga y guarda todo. No se activa sola: la app pregunta "Actualizar".
// cache: 'reload' obliga a bajar los archivos del servidor y no de la caché del
// navegador (GitHub Pages la deja 10 minutos), así no se guarda una versión vieja.
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ARCHIVOS.map(u => new Request(u, { cache: 'reload' })))));
});

// Activación: borra cachés de versiones anteriores.
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// La app avisa cuando el usuario toca "Actualizar".
self.addEventListener('message', e => { if (e.data === 'SKIP_WAITING') self.skipWaiting(); });

// Pedidos: primero la caché (funciona offline); si no está, la red.
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  e.respondWith(
    caches.match(req, { ignoreSearch: true }).then(hit => {
      if (hit) return hit;
      return fetch(req).catch(() => {
        // Sin conexión y sin caché: si es una página, devolvemos la app.
        if (req.mode === 'navigate') return caches.match('./index.html');
        return Response.error();
      });
    })
  );
});
