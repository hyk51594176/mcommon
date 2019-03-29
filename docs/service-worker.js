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
    "revision": "29a32f9d63ea53f8d3da6ae8a6e34f68"
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
    "url": "assets/js/3.002795d5.js",
    "revision": "e893610329fe349b042b9d8929780fdb"
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
    "url": "assets/js/app.43692178.js",
    "revision": "d1d6a754ba626e830f166a411b675e2c"
  },
  {
    "url": "guide/index.html",
    "revision": "b5b49d319e17bc4b99c21a38bf775f06"
  },
  {
    "url": "guide/mform.html",
    "revision": "da91c1619ddf06a72eedd989d2c9afff"
  },
  {
    "url": "guide/mselect.html",
    "revision": "d37a5ab5b22888d3a187a36d20bb744f"
  },
  {
    "url": "guide/mtable.html",
    "revision": "43df4d9ecaef57fb56275a0cd9699d17"
  },
  {
    "url": "index.html",
    "revision": "cd59691f23cefdbee4d3d0d4bebf4d06"
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
