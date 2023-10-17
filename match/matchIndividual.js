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

// TODO: currently doesn't support matching with ^ or $
// matching one or more is import for the ^ operator, so we return a indices we can go up to in the input
// takes a+ as pattern
function matchOneOrMore(input, pattern) {
  const repeatChar = pattern[0];
  console.log(`must match one or more`);
  const indices = [];
  for (let i = 0; i < input.length; i++) {
    if (input[i] !== repeatChar) {
      break;
    }
    indices.push(i);
  }
  return indices.length > 0 ? true : false;
}

// TODO: currently doesn't support matching with ^ or $
function matchZeroOrMore(input, pattern) {
  const repeatChar = pattern[0];
  console.log(`must match zero or more`);
  const indices = [];
  for (let i = 0; i < input.length; i++) {
    if (input[i] !== repeatChar) {
      break;
    }
    indices.push(i);
  }
  return true; // will change once we support ^
}

function matchWildCard(char) {
  console.log(`must match wildcard`);
  return true;
}

// TODO: can make more efficient by capturing the pattern in a closure and not recreating the group each time, though closures have their own overhead
// this function is aware of non group parts of the pattern as well, so the logic for locating a group is encapsulated, takes abcd] for the pattern
function matchAndFindGroup(char, pattern) {
  console.log(`must match group`);
  // find closing ]
  let i;
  for (i = 0; i < pattern.length; i++) {
    if (pattern[i] === constants.PATTERN_GROUP_CLOSE) {
      break;
    }
  }
  if (i === pattern.length) {
    throw new Error(`No closing ${constants.PATTERN_GROUP_CLOSE} found`);
  }

  const positive = pattern[1] !== constants.PATTERN_ANCHOR_FRONT;
  let j = positive ? 1 : 2;
  const patternChars = new Set();
  for (; j < i; j++) {
    patternChars.add(pattern[j]);
    if (patternChars.has(char)) {
      if (positive) {
        return [true, i + 1];
      }
    }
  }
  if (!positive && !patternChars.has(char)) {
    return [true, i + 1];
  }
  return [false, 0];
}

// takes abc|def|ghi) for the pattern
function findOr(pattern) {
  console.log(`finding or for pattern: ${pattern}`);
  // find the )
  let i;
  for (i = 0; i < pattern.length; i++) {
    if (pattern[i] === constants.PATTERN_OR_CLOSE) {
      break;
    }
  }
  if (i === pattern.length) {
    throw new Error(`No closing ${constants.PATTERN_OR_CLOSE} found`);
  }
  const options = pattern.slice(0, i).split(constants.PATTERN_OR);
  console.log(`options are: ${options}`);
  return [options, i + 1];
}

module.exports = {
  matchChar,
  matchDigit,
  matchAlphanumeric,
  matchAndFindGroup,
  matchOneOrMore,
  matchZeroOrMore,
  matchWildCard,
  findOr,
};
