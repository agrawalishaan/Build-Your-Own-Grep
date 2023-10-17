const getMatchInfo = require("./getMatchInfo");

// capture the input and pattern in a closure
function createMatchSubsequence(input, pattern) {
  const memo = new Array(input.length)
    .fill()
    .map(() => new Array(pattern.length).fill(null));

  return function matchSubsequence(i, j) {
    console.log(`match called with i=${i}, j=${j}`);
    // base cases, no pattern left to match
    if (j === pattern.length) {
      return true;
    }
    // base case, no valid input left
    if (i === input.length) {
      return false;
    }

    // caching
    if (memo[i][j] !== null) {
      return memo[i][j];
    }

    // instead of slicing each time, it would be better to handle by reference using string pointers, since I'm at a high level abstraction and didn't want to convert to an array, I just reconstructed strings. This worsens the complexity but is better for encapsulation and learning.
    const [inputOffset, patternOffset] = getMatchInfo(
      input.slice(i),
      pattern.slice(j)
    );
    const result = matchSubsequence(i + inputOffset, j + patternOffset);
    memo[i][j] = result;
    return result;
  };
}

module.exports = createMatchSubsequence;
