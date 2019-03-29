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
    "revision": "49d10a639597646f627a57254fb6e89c"
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
    "url": "assets/js/2.763ed634.js",
    "revision": "aa898371a6f7b65c623365c86bf34914"
  },
  {
    "url": "assets/js/3.e3f476be.js",
    "revision": "55a85df746691d976158fd6a0cfdaedf"
  },
  {
    "url": "assets/js/4.a3489cbc.js",
    "revision": "9af46217657e729d96e959aaf8055706"
  },
  {
    "url": "assets/js/5.448f4ca9.js",
    "revision": "6ce6ac44e4dbe83921a42b416e9fe0ca"
  },
  {
    "url": "assets/js/6.7d436d80.js",
    "revision": "75f878b83eeb777bf5f6a09b51490f50"
  },
  {
    "url": "assets/js/7.14f8c8ae.js",
    "revision": "457f22489183cb9badf685ec740f5daa"
  },
  {
    "url": "assets/js/8.90de14ba.js",
    "revision": "54a87a1101847908688b81ffc78f3a17"
  },
  {
    "url": "assets/js/9.e65ef2f2.js",
    "revision": "09d631c2ab1084167a11f251ba0c2253"
  },
  {
    "url": "assets/js/app.80ecdadf.js",
    "revision": "a8b46178c9261be5971eb2d0d7ac8072"
  },
  {
    "url": "guide/index.html",
    "revision": "5d713aca8aef786b091d56e7137fc88a"
  },
  {
    "url": "guide/mform.html",
    "revision": "5c03481c4d31dce8de6d1a55fea5d829"
  },
  {
    "url": "guide/mselect.html",
    "revision": "fe8d3df9adda7728617ae3e7c5880504"
  },
  {
    "url": "guide/mtable.html",
    "revision": "0fbe7341510170886f5ae8d497cd141f"
  },
  {
    "url": "index.html",
    "revision": "baf85f1b7bca538614729f4d3da5bf76"
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
