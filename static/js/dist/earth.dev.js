"use strict";

window.addEventListener('load', function () {
  var script = document.createElement("script");
  script.src = "earth.js";
  script.setAttribute("nonce", "EyxxwJW/0TTktacz"); // 添加 nonce 属性

  document.body.appendChild(script);
});
window.addEventListener("earthjsload", function () {
  new Earth("bgearth", {
    location: {
      lat: 30,
      lng: -10
    },
    light: 'none',
    autoRotate: true,
    autoRotateDelay: 0,
    autoRotateStart: 1500,
    mapLandColor: '#0d130e',
    mapSeaColor: 'RGBA(13,19,14,0.25)',
    mapBorderColor: '#AAA',
    mapBorderWidth: 0.25,
    transparent: true,
    zoom: 1.2,
    quality: 4,
    draggable: false
  });
});
//# sourceMappingURL=earth.dev.js.map
