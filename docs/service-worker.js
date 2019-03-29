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
    "revision": "7d0947b8ca3624869ccbea8dace37d3f"
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
    "url": "assets/js/app.dfffa541.js",
    "revision": "a3753287e4d0c53b0984682e662aba75"
  },
  {
    "url": "guide/index.html",
    "revision": "ee2d56e930a12f4fa067b90ad4e4ae9d"
  },
  {
    "url": "guide/mform.html",
    "revision": "ae07f36ad869a51d55907d059c8b055e"
  },
  {
    "url": "guide/mselect.html",
    "revision": "abd93b8b9e03d87c86179c08f2e98b90"
  },
  {
    "url": "guide/mtable.html",
    "revision": "2f31e8136a793b76bcc132a441fe1e0a"
  },
  {
    "url": "index.html",
    "revision": "bcd5238c83ac5871787a354e541c3cfd"
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
