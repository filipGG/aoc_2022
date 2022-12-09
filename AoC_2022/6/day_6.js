const fs = require('fs');

let inputString = fs.readFileSync('input.txt')
    .toString();

const hasDuplicates = (stringSorted) => {
    for (let i = 0; i < stringSorted.length - 1; i++) {
        if (stringSorted[i] == stringSorted[i + 1]) {
            return false;
        }
    }

    return true;
}

for (let i = 0; i < inputString.length - 4; i++) {
    const start = i;
    const end = i + 4;

    const current = inputString
        .substring(start, end)
        .split("")
        .sort();

    if (hasDuplicates(current)) {
        console.log("RESULT A: ", end);
        break;
    }
}


for (let i = 0; i < inputString.length - 14; i++) {
    const start = i;
    const end = i + 14;

    const current = inputString
        .substring(start, end)
        .split("")
        .sort();

    if (hasDuplicates(current)) {
        console.log("RESULT B: ", end);
        break;
    }
}