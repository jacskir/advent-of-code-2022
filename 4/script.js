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

function fullyContains(pair) {
  return (
    (pair[0][0] >= pair[1][0] && pair[0][1] <= pair[1][1]) ||
    (pair[1][0] >= pair[0][0] && pair[1][1] <= pair[0][1])
  );
}

function overlaps(pair) {
  return (
    (pair[0][0] >= pair[1][0] && pair[0][0] <= pair[1][1]) ||
    (pair[0][1] >= pair[1][0] && pair[0][1] <= pair[1][1]) ||
    (pair[1][0] >= pair[0][0] && pair[1][0] <= pair[0][1]) ||
    (pair[1][1] >= pair[0][0] && pair[1][1] <= pair[0][1])
  );
}

let pairs = loadFile("./input.txt").split("\n");

let sum = 0;

pairs = pairs.map((pair) =>
  pair.split(",").map((elf) => elf.split("-").map((assmnt) => Number(assmnt)))
);

for (const pair of pairs) {
  if (fullyContains(pair)) sum += 1;
  // if (overlaps(pair)) sum += 1;
}
console.log("sum", sum);
