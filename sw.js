"use strict";

const CACHE_NAME = "AnZhiYuThemeCache";
const VERSION_URL = "https://id.v3/";
const LOCAL_HOST = "zhuyz.cloud";

self.addEventListener("install", event => {
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(clients.claim());
});

const shouldCache = url => {
  if (url.hostname === LOCAL_HOST && url.pathname.match(/\/|\.(js|html|css|woff2?|ttf|cur|png|jpe?g|svg|webp|gif|ico)$/)) return true;
  return ["cdn.cbd.int", "cdn.staticfile.org", "npm.elemecdn.com"].includes(url.hostname) && url.pathname.match(/\.(js|css|woff2?|ttf|cur)$/);
};

self.addEventListener("fetch", event => {
  const request = event.request;
  if (request.method !== "GET" || !request.url.startsWith("http")) return;

  const url = new URL(request.url);
  if (!shouldCache(url)) return;

  const cacheKey = url.href.endsWith("/index.html") ? url.href.slice(0, -10) : url.href;
  event.respondWith(
    caches.match(cacheKey).then(cached => {
      if (cached) return cached;
      return fetch(request).then(response => {
        if (response && response.ok) {
          const cloned = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(cacheKey, cloned));
        }
        return response;
      });
    })
  );
});

self.addEventListener("message", event => {
  if (event.data !== "update") return;
  event.source && event.source.postMessage({ type: "update", new: { global: "1", local: "1" }, list: null });
});

