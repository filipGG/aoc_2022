const fs = require('fs');

let input = fs.readFileSync('input.txt')
    .toString()
    .split(/\r?\n/);


const getPriority = (char) => {
    const lowerCaseChars = "abcdefghijklmnopqrstuvwxyz";
    const chars = lowerCaseChars + lowerCaseChars.toUpperCase();

    return chars.indexOf(char) + 1;
};

let result = [];

input.forEach(rugsack => {

    const firstCompartment = rugsack.slice(0, rugsack.length / 2).split("");
    const secondCompartment = rugsack.slice(rugsack.length / 2).split("");

    for (let i = 0; i < firstCompartment.length; i++) {
        const char = firstCompartment[i];

        const found = secondCompartment.find(o => o == char);
        if (found) {
            const prio = getPriority(found);
            result.push(prio);
            break;
        }
    }
});

console.log("First: ", result.reduce((prev, curr) => prev + curr));

const hasChar = (arr, char) => arr.indexOf(char) !== -1;

// Takes arrays
const findBadge = (a, b, c) => {
    for (let i = 0; i < a.length; i++) {
        const searchChar = a[i];

        if (hasChar(b, searchChar) && hasChar(c, searchChar)) {
            return searchChar;
        }
    }
};

result = [];
for (let i = 0; i < input.length; i+=3) {
    const a = input[i].split("");
    const b = input[i+1].split("");
    const c = input[i+2].split("");

    const badge = findBadge(a,b,c);

    result.push(getPriority(badge));
}

console.log("Second: ", result.reduce((prev, curr) => prev + curr));