import imagesData from "../images.yml";
/*
TODO: Make this work with node env PUBLIC_URL
const BASE_URL =
  process.env == "development"
    ? "http://localhost:8000"
    : "https://joaqim.xyz/image-grid";
    */

//const BASE_URL = "http://localhost:8000";
const BASE_URL = "https://joaqim.xyz/image-grid";

/* main */
(function () {
  "use strict";
  var pig = new Pig(imagesData, {
    containerId: "pig",
    classPrefix: "pig",
    figureTagName: "figure",
    spaceBetweenImages: 8,
    transitionSpeed: 500,
    primaryImageBufferHeight: 1000,
    secondaryImageBufferHeight: 300,
    thumbnailSize: 49,
    urlForSize: function (filename, size) {
      return `${BASE_URL}/images/${size}/${filename}`;
    },
  }).enable();
})();
