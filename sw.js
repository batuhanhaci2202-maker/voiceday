const CACHE_NAME = 'voiceday-v3';
const BASE = '/voiceday/';
self.addEventListener('install', (e) => { e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll([BASE, BASE+'index.html']))); self.skipWaiting(); });
self.addEventListener('activate', (e) => { e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x !== CACHE_NAME).map(x => caches.delete(x))))); self.clients.claim(); });
self.addEventListener('fetch', (e) => { if (e.request.url.includes('api.anthropic.com')) return; e.respondWith(fetch(e.request).then(r => { if (r.ok) { const c = r.clone(); caches.open(CACHE_NAME).then(ca => ca.put(e.request, c)); } return r; }).catch(() => caches.match(e.request).then(c => c || caches.match(BASE+'index.html')))); });
