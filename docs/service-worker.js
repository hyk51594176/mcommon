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
    "revision": "3f472095baae13aeea5c1a82631d097d"
  },
  {
    "url": "assets/css/0.styles.7651ae03.css",
    "revision": "62a1eeec751fe33b6b13f6552090ff15"
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
    "url": "assets/js/3.d9d99e57.js",
    "revision": "f3fc0f0d2312ae1ba1505d0f1e7b5510"
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
    "url": "assets/js/7.429eb56f.js",
    "revision": "14703f09daa53165145438c8ab6a8722"
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
    "url": "assets/js/app.8966ef50.js",
    "revision": "21d0646d8e44d0c070e10b1381eeaf58"
  },
  {
    "url": "guide/index.html",
    "revision": "5cef4345308ef26dbc9f395bd94f3d3e"
  },
  {
    "url": "guide/mform.html",
    "revision": "6c91e8edf971b1a7bade6e37e5ee69df"
  },
  {
    "url": "guide/mselect.html",
    "revision": "4758542263e70dea52f3a0f48406dc84"
  },
  {
    "url": "guide/mtable.html",
    "revision": "4fea0fe00f30640eb8faf3dd7b2da397"
  },
  {
    "url": "index.html",
    "revision": "9d39ecd1d73db55c12eeaad16f1173d5"
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
