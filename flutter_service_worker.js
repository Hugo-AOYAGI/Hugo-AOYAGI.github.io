'use strict';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "ca11687652ccf69df405a5d430350bc5",
"assets/assets/subjects/ENG.png": "dbe2a92916ce6096a61815af4d50795c",
"assets/assets/subjects/ESP.png": "a915cd510ef203e682a2a797b7c86d62",
"assets/assets/subjects/FRA.png": "2c47e582c8fd36024fa84d2ff97df18d",
"assets/assets/subjects/MAT.png": "53d150ff1d40cc90265fc8b4ecbd5b99",
"assets/assets/subjects/PHY.png": "bc736d3a32b3b6c645b14bc5a34a86b7",
"assets/assets/subjects/SII.png": "7b91ab13fabcd4ad201d252bdcbf7194",
"assets/FontManifest.json": "b3fa95701c246266e8342ea6d932eed9",
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
"assets/fonts/Montserrat/Montserrat-Black.ttf": "27e3649bab7c62fa21b8837c4842e40e",
"assets/fonts/Montserrat/Montserrat-BlackItalic.ttf": "d9b6ba595b059fc5d48e8f52c30f73b3",
"assets/fonts/Montserrat/Montserrat-Bold.ttf": "ade91f473255991f410f61857696434b",
"assets/fonts/Montserrat/Montserrat-BoldItalic.ttf": "1b38414956c666bd1df78fe5b9c84756",
"assets/fonts/Montserrat/Montserrat-ExtraBold.ttf": "19ba7aa52a78c3896558ac1c0a5fb4c7",
"assets/fonts/Montserrat/Montserrat-ExtraBoldItalic.ttf": "52a50ca037f2f96fa567404dc3c5bdfb",
"assets/fonts/Montserrat/Montserrat-ExtraLight.ttf": "570a244cacd3d78b8c75ac5dd622f537",
"assets/fonts/Montserrat/Montserrat-ExtraLightItalic.ttf": "1170df5548b7e238df5fa14b6f1a753e",
"assets/fonts/Montserrat/Montserrat-Italic.ttf": "a7063e0c0f0cb546ad45e9e24b27bd3b",
"assets/fonts/Montserrat/Montserrat-Light.ttf": "409c7f79a42e56c785f50ed37535f0be",
"assets/fonts/Montserrat/Montserrat-LightItalic.ttf": "01c4560c9c15069b6700ce7ad2e49a9c",
"assets/fonts/Montserrat/Montserrat-Medium.ttf": "c8b6e083af3f94009801989c3739425e",
"assets/fonts/Montserrat/Montserrat-MediumItalic.ttf": "40a74702035bf9ef19053c84ce9a58b9",
"assets/fonts/Montserrat/Montserrat-Regular.ttf": "ee6539921d713482b8ccd4d0d23961bb",
"assets/fonts/Montserrat/Montserrat-SemiBold.ttf": "c641dbee1d75892e4d88bdc31560c91b",
"assets/fonts/Montserrat/Montserrat-SemiBoldItalic.ttf": "83c1ec1f1db9a6416791f7d9d29536f2",
"assets/fonts/Montserrat/Montserrat-Thin.ttf": "43dd5b7a3d277362d5e801e5353e3a01",
"assets/fonts/Montserrat/Montserrat-ThinItalic.ttf": "3c2b290f95cd5b33c3ead2911064a2ab",
"assets/fonts/Oswald/Oswald-Bold.ttf": "d038c0b02104103a209a27fcb5dae9c8",
"assets/fonts/Oswald/Oswald-ExtraLight.ttf": "0303f9a51f8bfe41d2779e6258518d37",
"assets/fonts/Oswald/Oswald-Light.ttf": "085414edc3320d73947fc4467e94b790",
"assets/fonts/Oswald/Oswald-Medium.ttf": "c76a8d044f123462ba5c08ea47b56e21",
"assets/fonts/Oswald/Oswald-Regular.ttf": "077e87c6c30f988a8cd225faa83daf18",
"assets/fonts/Oswald/Oswald-SemiBold.ttf": "8006072867e7ef090e9668d76dfb0f85",
"assets/LICENSE": "cacf629ce84c4a2ad0d6f20d6975204a",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "115e937bb829a890521f72d2e664b632",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"index.html": "a67feb7addb34595e0b7df3dbb60d908",
"/": "a67feb7addb34595e0b7df3dbb60d908",
"main.dart.js": "30596736abbe3a20b8b9958c492601d6",
"manifest.json": "64c138c95f244cf1501b62ddfdb164f8"
};

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheName) {
      return caches.delete(cacheName);
    }).then(function (_) {
      return caches.open(CACHE_NAME);
    }).then(function (cache) {
      return cache.addAll(Object.keys(RESOURCES));
    })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
