const fs = require('fs');
const { dirname } = require('path');

let input = fs.readFileSync('input.txt')
    .toString()
    .split(/\r?\n/);

const sum = (prev, curr) => prev + curr;

class File {
    constructor(size, name) {
        this.size = size;
        this.name = name;
    }
}

class Directory {
    subDirectories = [];
    files = [];
    size = 0;

    constructor(name, parentDirectory, depth) {
        this.depth = depth;
        this.name = name;
        this.parentDirectory = parentDirectory;
    }

    findSubDirectory(name) {
        return this.subDirectories.find(dir => dir.name === name);
    }

    updateSize() {
        this.size = [...this.files, ...this.subDirectories]
            .map(obj => obj.size)
            .reduce(sum);
    }
}

const getFileSize = (line) => {
    return +line.split(" ")[0];
};

const getFileName = (line) => {
    return line.split(" ")[1];
};

const isFile = (line) => {
    const maybeNumber = +line.split(" ")[0];
    const isFile = !isNaN(maybeNumber);

    return isFile;
};

const root = new Directory('/', undefined, 0);

let currentDirectory = root;

for (let i = 0; i < input.length; i++) {
    const line = input[i];

    if (line.includes("$ cd")) {

        if (line.includes("/")) {
            currentDirectory = root;
        }

        else if (line.includes("..")) {
            currentDirectory = currentDirectory.parentDirectory;
        }

        else {
            const dirName = line.split("cd")[1].trim();
            const existingSubDirectory = currentDirectory.findSubDirectory(dirName);

            if (existingSubDirectory) {
                currentDirectory = existingSubDirectory;
            } else {
                const newDir = new Directory(
                    dirName,
                    currentDirectory,
                    currentDirectory.depth + 1
                );
                currentDirectory.subDirectories.push(newDir);
                currentDirectory = newDir;
            }
        }
    }

    else if (line.includes("$ ls")) {
        continue;
    }

    else if (line.includes("dir")) {
        continue;
    }

    else if (isFile(line)) {
        const newFile = new File(getFileSize(line), getFileName(line));
        currentDirectory.files.push(newFile);
    }
}

const getAllDirectories = () => {
    const result = [];

    const populate = (dir) => {
        result.push(dir);
        dir.subDirectories.forEach(subDir => populate(subDir));
    };
    populate(root);

    return result;
};


getAllDirectories()
    .sort((a, b) => b.depth - a.depth)
    .forEach(dir => {
        dir.updateSize();
    });

const resultA = getAllDirectories()
    .filter(dir => dir.size <= 100_000)
    .map(dir => dir.size)
    .reduce(sum);

console.log("Result A: ", resultA);

const rootMaxSize = 70000000 - 30000000;
const sizeToBeRemoved = root.size - rootMaxSize;

const resultB = getAllDirectories()
    .filter(dir => dir.size > sizeToBeRemoved)
    .sort((a, b) => a.size - b.size)
    [0].size;

console.log("Result B: ", resultB);