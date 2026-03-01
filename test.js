// This file is for testing string and matrix functions
// Reading matrices
const reader = require("./helpers/matrix_reader.js");
let matrix1 = reader.readMatrix("matrices/1.txt");
let matrix2 = reader.readMatrix("matrices/2.txt");
let matrix3 = reader.readMatrix("matrices/3.txt");
let matrix4 = reader.readMatrix("matrices/4.txt");
let matrix5 = reader.readMatrix("matrices/5.txt");
let matrix6 = reader.readMatrix("matrices/6.txt");
let matrix7 = reader.readMatrix("matrices/7.txt");
console.log(matrix1);
console.log();
// Getting intervals
const converter = require("./helpers/string_to_array.js");
const algs = require("./algorithm.js");
function testIntervals(sequence) {
  let input = converter.stringToArray(sequence);
  let output = algs.getIntervals(input.length, input)
  console.log("Input: " + JSON.stringify(input));
  console.log("Output: " + JSON.stringify(output));
  console.log();
}
// Test cases
testIntervals("0001110001010100001111110001100");
testIntervals("");
testIntervals("11111");
testIntervals("010101");
testIntervals("00000");
testIntervals("000111");
testIntervals("001");
testIntervals("1");
testIntervals("10");
testIntervals("0");
// Test two by two's algorithm
function testTwoByTwo(m) {
  return algs.getTwoByTwoRectangles(m[0], m[1], m[2]);
}
// Test cases
console.log(testTwoByTwo(matrix1));
console.log(testTwoByTwo(matrix2));
// Test alg
function testAlg(m) {
  return algs.getEmptyRectangles(m[0], m[1], m[2]);
}
// Test cases
console.log(testAlg(matrix1));
console.log(testAlg(matrix2));
