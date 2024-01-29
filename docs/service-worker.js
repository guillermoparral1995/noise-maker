/* eslint-disable no-undef */
const putInCache = async (request, response) => {
  const cache = await caches.open('v1');
  await cache.put(request, response);
};

const STATIC_FILENAMES = [
  'https://guillermoparral1995.github.io/noise-maker/images/icon-192x192.png',
  'https://guillermoparral1995.github.io/noise-maker/images/icon-512x512.png',
  'https://guillermoparral1995.github.io/noise-maker/images/screenshot-desktop.png',
  'https://guillermoparral1995.github.io/noise-maker/images/screenshot-mobile.png',
  'https://guillermoparral1995.github.io/noise-maker/manifest.json',
  'https://guillermoparral1995.github.io/noise-maker/themes/lara-light-purple/theme.css',
  'https://guillermoparral1995.github.io/noise-maker/themes/lara-dark-purple/theme.css',
  'https://guillermoparral1995.github.io/noise-maker/themes/lara-light-purple/fonts/Inter-roman.var.woff2?v=3.19',
];

const cacheFirst = async ({ request, preloadResponsePromise }) => {
  const responseFromCache = await caches.match(request);
  if (responseFromCache) {
    return responseFromCache;
  }

  const preloadResponse = await preloadResponsePromise;
  if (preloadResponse) {
    putInCache(request, preloadResponse.clone());
    return preloadResponse;
  }

  try {
    // it's safe to assume that if cache was not found, bundle was regenerated with
    // a different hash, so let's delete all hashed bundle files.
    const cacheKeys = await caches.keys();
    for (const key of cacheKeys) {
      if (!STATIC_FILENAMES.includes(key)) {
        caches.delete(key);
      }
    }

    const responseFromNetwork = await fetch(request.clone());
    putInCache(request, responseFromNetwork.clone());
    return responseFromNetwork;
  } catch (error) {
    return new Response('Network error happened', {
      status: 408,
      headers: { 'Content-Type': 'text/plain' },
    });
  }
};

const enableNavigationPreload = async () => {
  if (self.registration.navigationPreload) {
    await self.registration.navigationPreload.enable();
  }
};

self.addEventListener('activate', (event) => {
  event.waitUntil(enableNavigationPreload());
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    cacheFirst({
      request: event.request,
      preloadResponsePromise: event.preloadResponse,
    }),
  );
});
