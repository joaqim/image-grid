//import "@vendors/pig.js";
//import "@styles/style.scss";
import imagesData from "@root/images.yml";
window.onload = function () {};
console.log(document.getElementById("pig"));
window.onload = function () {
  console.log({ imagesData });
  new Pig(imagesData, {
    containerId: "pig",
    classPrefix: "pig",
    figureTagName: "figure",
    spaceBetweenImages: 8,
    transitionSpeed: 500,
    primaryImageBufferHeight: 1000,
    secondaryImageBufferHeight: 300,
    thumbnailSize: 500,
    urlForSize: function (filename, size) {
      return `${process.env.PUBLIC_URL}/images/${size}/${filename}`;
    },
  }).enable();
};
