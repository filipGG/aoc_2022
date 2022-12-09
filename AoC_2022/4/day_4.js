const fs = require('fs');

let input = fs.readFileSync('input.txt')
    .toString()
    .split(/\r?\n/);

const parseRange = (rangeStr) => {
    const range = rangeStr.split("-");
    return {
        from: parseInt(range[0]),
        to: parseInt(range[1]),
    };
};

const aContainsB = (a, b) => {
    return a.from <= b.from && a.to >= b.to;
};

const firstResult = input.map(line => {
    const ranges = line.split(",");

    const a = parseRange(ranges[0]);
    const b = parseRange(ranges[1]);

    if (aContainsB(a, b) || aContainsB(b, a)) {
        return 1;
    }

    return 0;
});

console.log("First: ", firstResult.reduce((prev, curr) => prev + curr));

const overlaps = (a, b) => {
    return a.to >= b.from && a.from <= b.to;
};

const secondResult = input.map(line => {
    const ranges = line.split(",");

    const a = parseRange(ranges[0]);
    const b = parseRange(ranges[1]);

    if (overlaps(a, b)) {
        return 1;
    }

    return 0;
});

console.log("Second: ", secondResult.reduce((prev, curr) => prev + curr));