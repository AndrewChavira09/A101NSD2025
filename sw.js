
const CACHE_NAME = 'mi-cache-v1-pwa-cv';


const urlsToCache = [
    './',
    './index.html',
    './main.js',
    './manifest.json', 
    './style/style.css', 
    './imagen/yo.JPG', 
    './formulario.html', 
    './img/ACTECH Logo-16x16.png',
    './img/ACTECH Logo-32x32.png',
    './img/ACTECH Logo-64x64.png',
    './img/ACTECH Logo-96x96.png',
    './img/ACTECH Logo-128x128.png',
    './img/ACTECH Logo-192x192.png',
    './img/ACTECH Logo-256x256.png',
    './img/ACTECH Logo-384x384.png',
    './img/ACTECH Logo-512x512.png',
    './img/ACTECH Logo-1024x1024.png'
];

// Evento install
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Cache abierto, agregando archivos...');
                return cache.addAll(urlsToCache);
            })
            .catch(err => {
                console.log('Falló registro de caché', err);
            })
    );
});

// Evento activate (Sintaxis corregida)
self.addEventListener('activate', e => {
    const cacheWhiteList = [CACHE_NAME];

    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhiteList.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
        .then(() => {
            console.log('Cache limpio y SW activado');
            return self.clients.claim();
        })
    );
});

// Evento fetch (Estrategia: Cache first)
self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request)
        .then(response => {
            if (response) {
                return response;
            }
          
            return fetch(e.request);
        })
    );
});



