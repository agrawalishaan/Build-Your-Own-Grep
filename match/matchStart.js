const getMatchInfo = require("./getMatchInfo");

function matchStart(input, pattern) {
  let i = 0;
  let j = 0;
  while (true) {
    console.log(`match start called with i=${i}, j=${j}`);
    // base cases
    if (j === input.length) {
      return true;
    }
    if (i === pattern.length) {
      return false;
    }
    const [inputOffset, patternOffset] = getMatchInfo(
      input.slice(i),
      pattern.slice(j)
    );
    // any single fail should fail the entire thing
    if (patternOffset === 0) {
      return false;
    }
    i += inputOffset;
    j += patternOffset;
  }
}

module.exports = matchStart;
