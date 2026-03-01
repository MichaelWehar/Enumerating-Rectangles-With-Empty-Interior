// Libaries
const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');
const algs = require("./algorithm.js");
// Set up canvas
var width = 410;
var height = 410;
var canvas = createCanvas(width, height);
var c = canvas.getContext('2d');
// Filenames
var infilename = "1";
var outfilename = infilename + "_edit";
// Params
var randomColor = true;
// Load image
loadImage(__dirname + "/images/" + infilename + ".png").then((image) => {
  // console.log(JSON.stringify(image));
  c.drawImage(image, 0, 0);
  let matrix = canvasToMatrix(c);
  // console.log(matrix);
  let results = algs.getEmptyRectangles(height, width, matrix);
  // console.log(results.length);
  for(let i = 0; i < results.length; i++) {
    let rect = results[i];
    let x = rect[0];
    let y = rect[1];
    let rows = rect[3];
    let cols = rect[2];
    if(randomColor) {
      let r = Math.floor(256 * Math.random());
      let g = Math.floor(256 * Math.random());
      let b = Math.floor(256 * Math.random());
      c.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
    } else {
      c.fillStyle = "rgb(0,0,0)";
    }
    c.fillRect(x, y, rows, cols);
  }
  saveImage(outfilename, canvas);
});
// Helpers
function getValues(obj, x, y) {
  let index = 4 * (x + y * width);
  return [obj.data[index], obj.data[index + 1], obj.data[index + 2], obj.data[index + 3]];
}
function canvasToMatrix(ctx) {
  let data = ctx.getImageData(0, 0, width, height);
  let matrix = [];
  for(let y = 0; y < height; y++) {
    matrix.push([]);
    for(let x = 0; x < width; x++) {
      let values = getValues(data, x, y);
      if(values[0] == 255 && values[1] == 255 && values[2] == 255 && values[3] == 255) {
        matrix[y].push(0);
      } else {
        matrix[y].push(1);
      }
    }
  }
  return matrix;
}
function saveImage(filename, canvas) {
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(__dirname + "/images/" + outfilename + ".png", buffer);
}
