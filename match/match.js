const constants = require("../constants/constants");

function matchDigit(char) {
  const code = char.charCodeAt(0);
  return (
    code >= constants.ALPHANUMERIC_RANGES.digitStrings[0] &&
    code <= constants.ALPHANUMERIC_RANGES.digitStrings[1]
  );
}

function matchAlphanumeric(char) {
  const code = char.charCodeAt(0);
  for (const key in constants.ALPHANUMERIC_RANGES) {
    const range = constants.ALPHANUMERIC_RANGES[key];
    if (code >= range[0] && code <= range[1]) {
      return true;
    }
  }
  return false;
}

// TODO: can make more efficient by capturing the pattern in a closure and not recreating the group each time
function matchGroup(char, group) {
  const positive = group[1] !== "^";
  let k = positive ? 1 : 2;
  const patternChars = new Set();
  for (; k < group.length - 1; k++) {
    patternChars.add(group[k]);
    if (patternChars.has(char)) {
      if (positive) {
        return true;
      }
    }
  }
  if (!positive && !patternChars.has(char)) {
    return true;
  }
  return false;
}

module.exports = { matchDigit, matchAlphanumeric, matchGroup };
