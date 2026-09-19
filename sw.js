const CACHE = 'voiceday-v8';
const PRECACHE = [
  '/voiceday/',
  '/voiceday/index.html',
  '/voiceday/manifest.json',
  '/voiceday/_expo/static/js/web/entry-434e54129ea0bdd7010e019709060de0.js',
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(PRECACHE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request).then(resp => {
      if (resp.ok && resp.type === 'basic') {
        const clone = resp.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
      }
      return resp;
    }).catch(() => e.request.mode === 'navigate' ? caches.match('/voiceday/index.html') : Response.error()))
  );
});
