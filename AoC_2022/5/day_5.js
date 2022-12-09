const fs = require('fs');

let inputStack = fs.readFileSync('input_stack.txt')
    .toString()
    .split(/\r?\n/);


const noOfStacks = (inputStack[0].length + 1) / 4;

const stacks = [];
for (let i = 0; i < noOfStacks; i++) {
    stacks.push([]);
}

const parseStackRow = (row) => {
    let stack = 0;
    for (let i = 1; i < row.length; i += 4) {
        if (row.at(i) != " ") {
            stacks[stack].push(row.at(i));
        }

        stack += 1;
    }
};

inputStack.forEach(row => {
    parseStackRow(row);
});

stacks.forEach(stack => stack.reverse());

let moves = fs.readFileSync('input_moves.txt')
    .toString()
    .split(/\r?\n/)
    .map(row => {
        const split = row.split(" ");

        return {
            amount: parseInt(split[1]),
            from: parseInt(split[3]) - 1,
            to: parseInt(split[5]) - 1,
        };
    });

moves.forEach(move => {
    const { amount, from, to } = move;

    const poppedValues = [];
    for (let i = 0; i < amount; i++) {
        poppedValues.push(stacks[from].pop());
    }

    // Uncomment this to solve part 2
    // poppedValues.reverse();

    stacks[to].push(...poppedValues);
});

const result = stacks.map(stack => {
    return stack[stack.length - 1];
}).join("");

console.log("RESULT: ", result);