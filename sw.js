const CACHE = 'voiceday-v6';
const PRECACHE = ['/voiceday/', '/voiceday/index.html', '/voiceday/_expo/static/js/web/entry-8c020149e836094177767c4a0153e11a.js'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(PRECACHE)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => { e.respondWith(caches.match(e.request).then(r => r || fetch(e.request).then(resp => { if (resp.ok && e.request.method === 'GET') { const clone = resp.clone(); caches.open(CACHE).then(c => c.put(e.request, clone)); } return resp; }).catch(() => caches.match('/voiceday/index.html')))); });
