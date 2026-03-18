const CACHE_NAME = 'santhosh-portfolio-v20250714b';
const urlsToCache = [
  './',
  './index.html',
  './styles.css',
  './script.js',
  './config.js',
  './linkedin-posts.js',
  './youtube-videos.js',
  './articles.html',
  './videos.html',
  './Photo.avif',
  './Photo.webp',
  './Portfolio.pdf',
  './certificates.html',
  './404.html',
  './vendor/fontawesome/css/all.min.css',
  './vendor/emailjs/email.min.js',
  './vendor/fonts/inter.css'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Network-first for API calls
  if (url.hostname.includes('googleapis.com') || url.hostname.includes('youtube.com')) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // Cache-first for same-origin static assets
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(event.request)
        .then(cached => cached || fetch(event.request).then(response => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          return response;
        }))
    );
  }
});
