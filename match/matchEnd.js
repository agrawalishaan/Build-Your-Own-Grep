const getMatchInfo = require("./getMatchInfo");

function matchEnd(input, pattern) {
  let i = input.length - 1;
  let j = pattern.length - 1;
  while (true) {
    console.log(`match start called with i=${i}, j=${j}`);
    // base cases
    // no pattern left
    if (j === -1) {
      return true;
    }
    // no input left
    if (i === -1) {
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
    i -= inputOffset;
    j -= patternOffset;
  }
}

module.exports = matchEnd;
