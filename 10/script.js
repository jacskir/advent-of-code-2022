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

let instructions = loadFile("./input.txt")
  .split("\n")
  .map((instruction) => (instruction = instruction.split(" ")));

let register = 1;
let cycle = 1;
const signalStrengths = [];
let pixels = "";

for (const [instruction, value] of instructions) {
  let requiredCycles = instruction === "noop" ? 1 : 2;

  while (requiredCycles > 0) {
    let crtPosition = cycle % 40;

    if ((cycle - 20) % 40 === 0) signalStrengths.push(register * cycle);

    if (crtPosition - 1 >= register - 1 && crtPosition - 1 <= register + 1)
      pixels += "#";
    else pixels += ".";

    if (crtPosition === 0) pixels += "\n";

    if (instruction === "addx" && requiredCycles === 1) {
      register += Number(value);
    }
    cycle++;
    requiredCycles--;
  }
}

console.log(signalStrengths.slice(0, 6).reduce((a, b) => a + b, 0));
console.log(pixels);
