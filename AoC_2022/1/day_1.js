const fs = require('fs');

let splitByElf = fs.readFileSync('input.txt')
    .toString()
    .split(/\r?\n\r?\n/);

const sortedByCalories = splitByElf.map(elfData => {
    const numbers = elfData
        .split(/\r?\n/)
        .map(strNumber => parseInt(strNumber, 10));
    
    const sum = numbers.reduce((prev, curr) => prev + curr, 0);
    return sum;
}).sort((a, b) => b - a);

console.log("First: ", sortedByCalories[0]);
console.log("Second: ", sortedByCalories[0] + sortedByCalories[1] + sortedByCalories[2]);
