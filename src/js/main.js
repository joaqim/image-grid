import imagesData from "../images.yml";

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
    thumbnailSize: 200,
    urlForSize: function (filename, size) {
      return `${process.env.PUBLIC_URL}/images/${size}/${filename}`;
    },
  }).enable();
})();
