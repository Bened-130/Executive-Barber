// Service Worker for PWA

const CACHE_NAME = 'executive-barber-v1';
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/css/main.css',
    '/css/components/glassmorphism.css',
    '/css/components/navbar.css',
    '/css/components/hero.css',
    '/css/components/services.css',
    '/css/components/gallery.css',
    '/css/components/products.css',
    '/css/components/booking.css',
    '/css/components/contact.css',
    '/css/components/modal.css',
    '/css/components/toast.css',
    '/css/animations.css',
    '/css/responsive.css',
    '/js/data/services.js',
    '/js/data/gallery.js',
    '/js/data/products.js',
    '/js/utils/storage.js',
    '/js/utils/dateUtils.js',
    '/js/utils/formValidation.js',
    '/js/utils/toast.js',
    '/js/components/particles.js',
    '/js/components/navbar.js',
    '/js/components/gallery.js',
    '/js/components/products.js',
    '/js/components/booking.js',
    '/js/components/contact.js',
    '/js/theme.js',
    '/js/router.js',
    '/js/app.js',
    '/manifest.json'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Caching static assets');
                return cache.addAll(STATIC_ASSETS);
            })
            .catch(err => {
                console.error('Cache failed:', err);
            })
    );
    self.skipWaiting();
});

// Activate event - clean old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames
                    .filter(name => name !== CACHE_NAME)
                    .map(name => caches.delete(name))
            );
        })
    );
    self.clients.claim();
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', (event) => {
    // Skip non-GET requests
    if (event.request.method !== 'GET') return;

    // Skip external URLs
    const url = new URL(event.request.url);
    if (url.origin !== self.location.origin) return;

    event.respondWith(
        caches.match(event.request)
            .then(cached => {
                // Return cached version or fetch from network
                if (cached) {
                    // Update cache in background
                    fetch(event.request)
                        .then(response => {
                            caches.open(CACHE_NAME)
                                .then(cache => cache.put(event.request, response));
                        })
                        .catch(() => {});
                    
                    return cached;
                }

                return fetch(event.request)
                    .then(response => {
                        // Cache new requests
                        if (response.status === 200) {
                            const responseClone = response.clone();
                            caches.open(CACHE_NAME)
                                .then(cache => cache.put(event.request, responseClone));
                        }
                        return response;
                    })
                    .catch(() => {
                        // Return offline fallback for HTML requests
                        if (event.request.headers.get('accept').includes('text/html')) {
                            return caches.match('/index.html');
                        }
                    });
            })
    );
});

// Background sync for form submissions (if supported)
self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-forms') {
        event.waitUntil(syncFormSubmissions());
    }
});

// Push notifications (future enhancement)
self.addEventListener('push', (event) => {
    const options = {
        body: event.data.text(),
        icon: '/assets/icons/icon-192x192.png',
        badge: '/assets/icons/badge-72x72.png',
        vibrate: [100, 50, 100],
        data: {
            url: event.data.url || '/'
        }
    };

    event.waitUntil(
        self.registration.showNotification('Executive Barber Shop', options)
    );
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.openWindow(event.notification.data.url)
    );
});