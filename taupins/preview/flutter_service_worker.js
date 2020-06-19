'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "3ce91abb0c29d4e9530029d29c38c7d3",
"assets/assets/icon/icon_fg.png": "aad6d686eee48fa9b4c8ea49f102ac65",
"assets/assets/subjects/ENG.png": "dbe2a92916ce6096a61815af4d50795c",
"assets/assets/subjects/ESP.png": "a915cd510ef203e682a2a797b7c86d62",
"assets/assets/subjects/FRA.png": "2c47e582c8fd36024fa84d2ff97df18d",
"assets/assets/subjects/MAT.png": "53d150ff1d40cc90265fc8b4ecbd5b99",
"assets/assets/subjects/PHY.png": "bc736d3a32b3b6c645b14bc5a34a86b7",
"assets/assets/subjects/SII.png": "7b91ab13fabcd4ad201d252bdcbf7194",
"assets/FontManifest.json": "c37ebaaefbfc6533ddc817afcbd5934e",
"assets/fonts/EB_Garamond/EBGaramond-Bold.ttf": "b3de46e55b5671676cf45ef0931461ab",
"assets/fonts/EB_Garamond/EBGaramond-BoldItalic.ttf": "af7bafed851bb0c4d800c81aabcaedb5",
"assets/fonts/EB_Garamond/EBGaramond-ExtraBold.ttf": "d884e890fe033b764a907860c8b667e3",
"assets/fonts/EB_Garamond/EBGaramond-ExtraBoldItalic.ttf": "4923794e63c2d012aa6b29f6f8a4e02f",
"assets/fonts/EB_Garamond/EBGaramond-Italic.ttf": "35871f202ae85c1e39a245a97e04c6f6",
"assets/fonts/EB_Garamond/EBGaramond-Medium.ttf": "b0fe8336bcb8ee889168c9759bf8d1a1",
"assets/fonts/EB_Garamond/EBGaramond-MediumItalic.ttf": "6978c1663daf3bcfffbb8a325fae0efc",
"assets/fonts/EB_Garamond/EBGaramond-Regular.ttf": "eb4bef27e37a592582839dfdfc3d465c",
"assets/fonts/EB_Garamond/EBGaramond-SemiBold.ttf": "055a0e9e6930d2f9188038796513f1a8",
"assets/fonts/EB_Garamond/EBGaramond-SemiBoldItalic.ttf": "8f7a07c9bfc9b6fdff3ae0965607955c",
"assets/fonts/Libre_Caslon_Text/LibreCaslonText-Bold.ttf": "b9462ddd3cb9448b34e190be392236b4",
"assets/fonts/Libre_Caslon_Text/LibreCaslonText-Italic.ttf": "72b6e852066c6ebca6ce505136578338",
"assets/fonts/Libre_Caslon_Text/LibreCaslonText-Regular.ttf": "3f33597fef4c1d48ce4c2dda94df79b8",
"assets/fonts/MaterialIcons-Regular.ttf": "56d3ffdef7a25659eab6a68a3fbfaf16",
"assets/fonts/Montserrat/Montserrat-Light.ttf": "409c7f79a42e56c785f50ed37535f0be",
"assets/fonts/Oswald/Oswald-Light.ttf": "085414edc3320d73947fc4467e94b790",
"assets/NOTICES": "d90fc35d6bc01bbf4b6fd43c837f5f4e",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "115e937bb829a890521f72d2e664b632",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"index.html": "a67feb7addb34595e0b7df3dbb60d908",
"/": "a67feb7addb34595e0b7df3dbb60d908",
"main.dart.js": "ba72d69c758f3ddc0ceeba272a5ce91e",
"manifest.json": "64c138c95f244cf1501b62ddfdb164f8"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/LICENSE",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      // Provide a no-cache param to ensure the latest version is downloaded.
      return cache.addAll(CORE.map((value) => new Request(value, {'cache': 'no-cache'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');

      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }

      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#')) {
    key = '/';
  }
  // If the URL is not the the RESOURCE list, skip the cache.
  if (!RESOURCES[key]) {
    return event.respondWith(fetch(event.request));
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache. Ensure the resources are not cached
        // by the browser for longer than the service worker expects.
        var modifiedRequest = new Request(event.request, {'cache': 'no-cache'});
        return response || fetch(modifiedRequest).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.message == 'skipWaiting') {
    return self.skipWaiting();
  }

  if (event.message = 'downloadOffline') {
    downloadOffline();
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey in Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.add(resourceKey);
    }
  }
  return Cache.addAll(resources);
}
