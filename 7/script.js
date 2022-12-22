function loadFile(filePath) {
  var result = null;
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", filePath, false);
  xmlhttp.send();
  if (xmlhttp.status == 200) {
    result = xmlhttp.responseText;
  }
  return result;
}

let input = loadFile("./input.txt").split("\n");
console.log(input);

class Directory {
  constructor(dirName) {
    this.dirName = dirName;
    this.dirSize = 0;
    this.dirs = [];
    this.files = [];
  }
}

const rootDir = new Directory("/");

const filePath = {
  path: [],
  addFile(fileSize, fileName) {
    // this.getCurrentDir().dirSize += fileSize;
    this.getCurrentDir().files.push({ fileSize, fileName });
  },
  addDir(dirName) {
    this.getCurrentDir().dirs.push(new Directory(dirName));
  },
  getCurrentDir() {
    return this.path[this.path.length - 1];
  },
  goForward(dir) {
    this.path.push(
      this.getCurrentDir().dirs.find((obj) => obj.dirName === dir)
    );
  },
  goBack() {
    this.path.pop();
  },
  goStart() {
    this.path = [rootDir];
  },
};

for (const line of input) {
  console.log(line);
  console.log(filePath);
  if (line.startsWith("$")) {
    const [_, command, param] = line.split(" ");

    if (command === "cd") {
      if (param === "/") {
        filePath.goStart();
      } else if (param === "..") {
        filePath.goBack();
      } else {
        filePath.goForward(param);
      }
    }
  } else {
    const [i, j] = line.split(" ");
    if (i === "dir") {
      filePath.addDir(j);
    } else {
      filePath.addFile(Number(i), j);
    }
  }
}

function calcDirSizes(node) {
  for (const dir of node.dirs) calcDirSizes(dir);
  for (const file of node.files) node.dirSize += file.fileSize;
  for (const dir of node.dirs) node.dirSize += dir.dirSize;
}
calcDirSizes(rootDir);

let dirs = [];
function getDirsMaxSize(node, size) {
  if (node.dirSize <= size) dirs.push(node);
  for (const dir of node.dirs) getDirsMaxSize(dir, size);
}
getDirsMaxSize(rootDir, 100000);

console.log(dirs.map((dir) => dir.dirSize).reduce((sum, size) => sum + size));

// part 2
const requiredSpace = 30000000 - (70000000 - rootDir.dirSize);

let dirs2 = [];
function getDirsMinSize(node, size) {
  if (node.dirSize >= size) dirs2.push(node);
  for (const dir of node.dirs) getDirsMinSize(dir, size);
}
getDirsMinSize(rootDir, requiredSpace);

console.log(Math.min(...dirs2.map((dir) => dir.dirSize)));
