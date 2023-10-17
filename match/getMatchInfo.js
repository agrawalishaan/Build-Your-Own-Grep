const {
  patternsInputOnly,
  patternsInputAndPattern,
  patternsRepeat,
  patternsNoRepeat,
} = require("../patterns/patterns");

// takes an input and pattern, determines which match function to apply, applies it, then returns [inputOffset, patternOffset] based on if it matched or not and the match type
function getMatchInfo(input, pattern) {
  for (const patternStr in patternsInputOnly) {
    console.log(`patternStr is ${patternStr}`);
    if (pattern.startsWith(patternStr)) {
      const matchFunc = patternsInputOnly[patternStr];
      const doesMatch = matchFunc(input[0]);
      if (doesMatch) {
        return [1, patternStr.length];
      }
    }
  }

  for (const patternStr in patternsInputAndPattern) {
    console.log(`patternStr is ${patternStr}`);
    if (pattern.startsWith(patternStr)) {
      const matchFunc = patternsInputAndPattern[patternStr];
      const [doesMatch, patternOffset] = matchFunc(input[0], pattern);
      if (doesMatch) {
        return [1, patternOffset];
      }
    }
  }

  for (const patternStr in patternsRepeat) {
    console.log(`patternStr is ${patternStr}`);
    if (pattern[1] === patternStr) {
      const matchFunc = patternsRepeat[patternStr];
      const doesMatch = matchFunc(input, pattern);
      if (!doesMatch) {
        return [1, 0];
      }
      return [1, 2];
    }
  }

  for (const patternStr in patternsNoRepeat) {
    console.log(`patternStr is ${patternStr}`);
    if (pattern[1] === patternStr) {
      const matchFunc = patternsNoRepeat[patternStr];
      const doesMatch = matchFunc(input, pattern);
      if (!doesMatch) {
        return [1, 0];
      }
      return [0, 2];
    }
  }

  // fallback to character matching
  if (input[0] === pattern[0]) {
    return [1, 1];
  }
  return [1, 0];
}

module.exports = getMatchInfo;
