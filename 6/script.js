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

function hasDuplicateStrings(list) {
  for (let i = 0; i < list.length; i++) {
    if (list.indexOf(list[i]) !== i) {
      return true; // duplicate string found
    }
  }
  return false; // no duplicate strings found
}

let input = loadFile("./input.txt");
console.log(input);

const marker = [];
for (const [i, char] of [...input].entries()) {
  marker.push(char);

  if (marker.length === 15) {
    marker.shift();
    if (!hasDuplicateStrings(marker)) {
      console.log(i + 1);
      break;
    }
  }
}
