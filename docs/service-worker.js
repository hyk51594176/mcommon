/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "c5c92a306d3df67fb190c03aa02ee201"
  },
  {
    "url": "assets/css/0.styles.ad2c5b9e.css",
    "revision": "fd66078c298f0dbb55eb3f593b405d9d"
  },
  {
    "url": "assets/fonts/element-icons.6f0a7632.ttf",
    "revision": "6f0a76321d30f3c8120915e57f7bd77e"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/2.810710f4.js",
    "revision": "e9c3a79e2804b2ecfad7d49dc7ba132c"
  },
  {
    "url": "assets/js/3.da935f28.js",
    "revision": "a280326c8a1cd51db3ebcc8cece1f812"
  },
  {
    "url": "assets/js/4.1b3f20b5.js",
    "revision": "9af46217657e729d96e959aaf8055706"
  },
  {
    "url": "assets/js/5.969debd4.js",
    "revision": "6ce6ac44e4dbe83921a42b416e9fe0ca"
  },
  {
    "url": "assets/js/6.c88238d7.js",
    "revision": "75f878b83eeb777bf5f6a09b51490f50"
  },
  {
    "url": "assets/js/7.ab81161d.js",
    "revision": "f458eb709270b83649059f51beac5c7b"
  },
  {
    "url": "assets/js/8.96304e23.js",
    "revision": "54a87a1101847908688b81ffc78f3a17"
  },
  {
    "url": "assets/js/9.e65ef2f2.js",
    "revision": "09d631c2ab1084167a11f251ba0c2253"
  },
  {
    "url": "assets/js/app.4044468c.js",
    "revision": "59c9d45eceed2fbf679238f98d089cf3"
  },
  {
    "url": "guide/index.html",
    "revision": "d61ac6182a3a7ee4f1752e62f0e894a0"
  },
  {
    "url": "guide/mform.html",
    "revision": "a954e2ca962b46deada1af0094dbd4d5"
  },
  {
    "url": "guide/mselect.html",
    "revision": "35b57e2e20056fab0ff7195875ae649e"
  },
  {
    "url": "guide/mtable.html",
    "revision": "9367ffee99246d5c29debb44698b5308"
  },
  {
    "url": "index.html",
    "revision": "34186f51bf75670923b25d121e8be89a"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
