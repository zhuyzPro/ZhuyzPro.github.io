"use strict";

document.addEventListener("DOMContentLoaded", function () {
  if (!navigator.serviceWorker || !navigator.serviceWorker.controller) return;

  const updateKey = "updated";
  const clearCacheNotice = () => {
    caches.keys().then(keys => {
      const cacheName = "AnZhiYuThemeCache";
      if (keys.includes(cacheName)) caches.delete(cacheName);
    });
  };

  if (sessionStorage.getItem(updateKey)) {
    clearCacheNotice();
    sessionStorage.removeItem(updateKey);
    return;
  }

  navigator.serviceWorker.controller.postMessage("update");
  navigator.serviceWorker.addEventListener("message", function (event) {
    const data = event.data || {};
    sessionStorage.setItem(updateKey, data.type || "update");
    if (data.list && data.list.some(url => /\.(js|css)$/.test(url))) location.reload();
    else sessionStorage.removeItem(updateKey);
  });
});

