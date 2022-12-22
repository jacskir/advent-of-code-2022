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

const input = loadFile("./input.txt");

const splitCals = [];
let cals = [];
for (const cal of input.split("\n")) {
  if (cal === "") {
    splitCals.push(cals);
    cals = [];
  } else {
    cals.push(cal);
  }
}

let reducedCals = [];
splitCals.forEach((cals) => {
  reducedCals.push(cals.reduce((total, num) => total + Number(num), 0));
});

// part 1
console.log(Math.max(...reducedCals));

// part 2
console.log(
  reducedCals
    .sort((a, b) => a - b)
    .slice(-3)
    .reduce((total, num) => total + num)
);
