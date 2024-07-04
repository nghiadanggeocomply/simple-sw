const cacheName = 'sw-v2';
const staticAssets = [
    '/js/chart.js',
    '/js/dashboard.js',
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(cacheName).then((cache) => {
            return cache.addAll(staticAssets);
        })
    );
});

self.addEventListener('fetch', (event) => {
    const request = event.request;
    const url = new URL(request.url);
    console.log('url', url)

    if (request.method != 'GET') return;
    if (!url.pathname.startsWith("/js") && !url.pathname.startsWith("/css")) return;

    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            return cachedResponse || fetch(request);
        })
    );
});

// function fetchAndUpdateCache(request) {
//     return fetch(request).then((response) => {
//         // Check if the response is valid
//         console.log('request ---', request)
//         if (!response || response.status !== 200 || response.type !== 'basic') {
//             return response;
//         }

//         // Clone the response to use it in both cache and browser
//         const shouldCache = false;
//         if(shouldCache) {
//             const responseToCache = response.clone();
    
//             caches.open(cacheName).then((cache) => {
//                 cache.put(request, responseToCache);
//             });
//         }

//         return response;
//     });
// }