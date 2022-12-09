const fs = require('fs');

let input = fs.readFileSync('input.txt')
    .toString()
    .split(/\r?\n/);

const getShapeScore = (myMove) => {
    if (myMove == 'X') return 1;
    if (myMove == 'Y') return 2;
    if (myMove == 'Z') return 3;
};

const getResultScore = (myMove, oppMove) => {
    const scoreBoard = {
        "XA": 3,
        "XB": 0,
        "XC": 6,

        "YA": 6, 
        "YB": 3,
        "YC": 0,

        "ZA": 0,
        "ZB": 6,
        "ZC": 3,
    }

    return scoreBoard[myMove+oppMove];
};

const getScore = (myMove, oppMove) => {
    const shapeScore = getShapeScore(myMove);
    const resultScore = getResultScore(myMove, oppMove);

    return shapeScore + resultScore;
};

let totScore = 0;
input.forEach(round => {
    const moves = round.split(" ");
    const myMove = moves[1];
    const oppMove = moves[0];

    totScore += getScore(myMove, oppMove);
});

console.log(totScore);