// This function will take in a binary matrix (rows, cols, 2D array)
// and output an array of subrectangles (x, y, rows, cols) that
// have 1's on the borders and 0's on the inside.
function getEmptyRectangles(rows, cols, matrix) {
  let output = [];
  let i = 0;
  // Each interval has the form (left, right)
  let prevIntervals = [];
  // Each staple has the form (left, right, top)
  let staples = [];
  // Loop where we go through each row
  while(i < rows) {
    let array = matrix[i];
    let intervals = getIntervals(cols, array);
    let nextStaplesNew = [];
    let nextStaplesOld = [];
    if(i != 0) {
      // Closing staples
      let iIndex = 0; // interval index
      let sIndex = 0; // staple index
      while(iIndex < intervals.length && sIndex < staples.length) {
        let interval = intervals[iIndex];
        let staple = staples[sIndex];
        if(staple[0] < interval[0]) {
          sIndex++;
        } else if(interval[1] < staple[1]) {
          iIndex++;
        } else if(interval[0] <= staple[0] && staple[1] <= interval[1]) {
          let x = staple[0];
          let y = staple[2];
          let tempRows = i - y + 1;
          let tempCols = staple[1] - staple[0] + 1;
          output.push([x, y, tempRows, tempCols]);
          sIndex++;
        }
      }
      // Continuing staples
      iIndex = 0; // interval index
      sIndex = 0; // staple index
      while(iIndex < intervals.length && sIndex < staples.length) {
        let interval = intervals[iIndex];
        let staple = staples[sIndex];
        if(staple[0] == interval[1]) {
          if(iIndex + 1 < intervals.length) {
            iIndex++;
            interval = intervals[iIndex];
            if(staple[1] == interval[0]) {
              nextStaplesOld.push(staple);
              sIndex++;
            }
          } else {
            break;
          }
        } else if(staple[0] < interval[1]) {
          sIndex++;
        } else if(staple[0] > interval[1]) {
          iIndex++;
        }
      }
    }
    // New staples
    pIndex = 0; // previous interval index
    cIndex = 0; // current interval index
    while(cIndex < intervals.length && pIndex < prevIntervals.length) {
      let pInterval = prevIntervals[pIndex];
      let cInterval = intervals[cIndex];
      if(pInterval[0] <= cInterval[1] && cInterval[1] <= pInterval[1]) {
        if(cIndex + 1 < intervals.length) {
          let left = cInterval[1];
          cIndex++;
          cInterval = intervals[cIndex];
          let right = cInterval[0];
          if(right - left > 1 && right <= pInterval[1]) {
            let staple = [left, right, i - 1];
            nextStaplesNew.push(staple);
          }
        } else {
          break;
        }
      } else if(cInterval[1] < pInterval[0]) {
        cIndex++;
      } else if(pInterval[0] < cInterval[1]) {
        pIndex++;
      }
    }
    // Prepare for next row
    prevIntervals = intervals;
    staples = mergeStaples(nextStaplesOld, nextStaplesNew);
    i++;
    // console.log("Intervals: " + JSON.stringify(intervals));
    // console.log("Staples: " + JSON.stringify(staples));
    // console.log();
  }
  return output;
}

// Merge two ordered lists of staples together
function mergeStaples(list1, list2) {
  let output = [];
  let i = 0;
  let j = 0;
  while(i < list1.length && j < list2.length) {
    if(list1[i][0] < list2[j][0]) {
      output.push(list1[i]);
      i++;
    } else {
      output.push(list2[j]);
      j++;
    }
  }
  if(i < list1.length) {
    while(i < list1.length) {
      output.push(list1[i]);
      i++;
    }
  } else {
    while(j < list2.length) {
      output.push(list2[j]);
      j++;
    }
  }
  return output;
}

// This function will find all two by two matrices of all 1's
function getTwoByTwoRectangles(rows, cols, matrix) {
  let output = [];
  for(let i = 0; i < rows - 1; i++) {
    for(let j = 0; j < cols - 1; j++) {
      if(matrix[i][j] == 1 && matrix[i + 1][j] == 1 && matrix[i][j + 1] == 1 && matrix[i + 1][j + 1] == 1) {
        output.push([j, i, 2, 2]);
      }
    }
  }
  return output;
}

// This function will take in a binary array (length, array) and
// output an array of intervals (left, right) representing blocks
// of 1's within the array.
function getIntervals(length, array) {
  let intervals = [];
  let left = -1;
  for(let i = 0; i < length; i++) {
      if(left == -1 && array[i] == 1) {
        left = i;
      } else if(left != -1 && array[i] == 0) {
        intervals.push([left, i - 1]);
        left = -1;
      }
  }
  if(left != -1) {
    intervals.push([left, length - 1]);
  }
  return intervals;
}

module.exports = { getIntervals, getTwoByTwoRectangles, getEmptyRectangles };
