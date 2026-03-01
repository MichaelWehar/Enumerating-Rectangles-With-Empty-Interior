function stringToArray(sequence) {
  let array = [];
  for(let i = 0; i < sequence.length; i++) {
    if(sequence[i] == '1') {
      array.push(1);
    } else {
      array.push(0);
    }
  }
  return array;
}

module.exports = { stringToArray };
