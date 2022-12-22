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

const rounds = loadFile("./input.txt").split("\n");
for (let [i, round] of rounds.entries()) {
  rounds[i] = round.split(" ");
}

// part 1
let score = 0;
for (const [opp, me] of rounds) {
  if (me === "X") {
    score += 1;
    if (opp === "A") score += 3;
    if (opp === "B") score += 0;
    if (opp === "C") score += 6;
  } else if (me === "Y") {
    score += 2;
    if (opp === "A") score += 6;
    if (opp === "B") score += 3;
    if (opp === "C") score += 0;
  } else if (me === "Z") {
    score += 3;
    if (opp === "A") score += 0;
    if (opp === "B") score += 6;
    if (opp === "C") score += 3;
  }
}
console.log(score);

// part 2
let score2 = 0;
for (const [opp, me] of rounds) {
  if (me === "X") {
    score2 += 0;
    if (opp === "A") score2 += 3;
    if (opp === "B") score2 += 1;
    if (opp === "C") score2 += 2;
  } else if (me === "Y") {
    score2 += 3;
    if (opp === "A") score2 += 1;
    if (opp === "B") score2 += 2;
    if (opp === "C") score2 += 3;
  } else if (me === "Z") {
    score2 += 6;
    if (opp === "A") score2 += 2;
    if (opp === "B") score2 += 3;
    if (opp === "C") score2 += 1;
  }
}
console.log(score2);
