function readMatrix(filename) {
    let rows = 0;
    let cols = 0;
    let matrix = [];
    let fs = require('fs');
    try {
        const data = fs.readFileSync(filename, 'utf8');
        if (data) {
            let lines = data.split("\n");
            let first = lines[0].split(" ");
            rows = parseInt(first[0]);
            cols = parseInt(first[1]);
            if (first.length !== 2 || isNaN(rows) || isNaN(cols)) {
                console.error("Error: incorrect row/col info");
                return [0, 0, []];
            }
            for (let i = 0; i < rows; i++) {
                let currArray = [];
                let curr = lines[i + 1].split(" ");
                for (let j = 0; j < cols; j++) {
                    let temp = parseInt(curr[j]);
                    if (isNaN(temp)) {
                        console.error("Error: incorrect matrix entry");
                        return [0, 0, []];
                    }
                    currArray.push(temp);
                }
                matrix.push(currArray);
            }
        }
    } catch (e) {
        console.error(e);
    }
    return [rows, cols, matrix];
}

module.exports = { readMatrix };
