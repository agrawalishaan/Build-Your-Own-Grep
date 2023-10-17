const constants = require("../constants/constants");

// matches an individual character in our input to a pattern or concept, returns [doesMatch, patternOffset]

function matchChar(inputChar, patternChar) {
  console.log(`must match char`);
  return inputChar === patternChar;
}

function matchDigit(char) {
  console.log(`must match digit`);
  const code = char.charCodeAt(0);
  return (
    code >= constants.ALPHANUMERIC_RANGES.digitStrings[0] &&
    code <= constants.ALPHANUMERIC_RANGES.digitStrings[1]
  );
}

function matchAlphanumeric(char) {
  console.log(`must match alphanumeric`);
  const code = char.charCodeAt(0);
  for (const key in constants.ALPHANUMERIC_RANGES) {
    const range = constants.ALPHANUMERIC_RANGES[key];
    if (code >= range[0] && code <= range[1]) {
      return true;
    }
  }
  return false;
}

// TODO: can make more efficient by capturing the pattern in a closure and not recreating the group each time, though closures have their own overhead
// this function is aware of non group parts of the pattern as well, so the logic for locating a group is encapsulated
function matchAndFindGroup(char, pattern) {
  console.log(`must match group`);
  // find closing ]
  let l;
  for (l = 0; l < pattern.length; l++) {
    if (pattern[l] === "]") {
      break;
    }
  }
  if (l === pattern.length) {
    throw new Error("No closing ] found");
  }

  const positive = pattern[1] !== "^";
  let k = positive ? 1 : 2;
  const patternChars = new Set();
  for (; k < l; k++) {
    patternChars.add(pattern[k]);
    if (patternChars.has(char)) {
      if (positive) {
        return [true, l + 1];
      }
    }
  }
  if (!positive && !patternChars.has(char)) {
    return [true, l + 1];
  }
  return [false, 0];
}

module.exports = {
  matchChar,
  matchDigit,
  matchAlphanumeric,
  matchAndFindGroup,
};