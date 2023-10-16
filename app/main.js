const { matchDigit, matchAlphanumeric, matchGroup } = require("../match/match");
const constants = require("../constants/constants");

function main() {
  const input = require("fs").readFileSync(0, "utf-8").trim();
  const pattern = process.argv[3];
  console.log(`input is: ${input}`);
  console.log(`pattern is: ${pattern}`);

  const memo = new Array(input.length)
    .fill()
    .map(() => new Array(pattern.length).fill(null));

  // capture the input and pattern in a closure
  function match(i, j, mustMatchStart) {
    console.log(
      `match called with i=${i}, j=${j}, mustMatchStart=${mustMatchStart}`
    );
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

    let result;

    // ******************** MATCHES ********************

    // match a digit
    if (pattern.slice(j, j + 2) === constants.PATTERN_DIGIT) {
      console.log(`must match digit`);
      const doesMatch = matchDigit(input[i]);
      if (mustMatchStart) {
        if (doesMatch) {
          result = match(i + 1, j + 2, true);
        } else {
          result = false;
        }
      } else {
        result = doesMatch ? match(i + 1, j + 2) : match(i + 1, j);
      }
    }

    // match alphanumeric
    else if (pattern.slice(j, j + 2) === constants.PATTERN_ALPHANUMERIC) {
      console.log(`must match alphanumeric`);
      const doesMatch = matchAlphanumeric(input[i]);
      if (mustMatchStart) {
        if (doesMatch) {
          result = match(i + 1, j + 2, true);
        } else {
          result = false;
        }
      } else {
        result = doesMatch ? match(i + 1, j + 2) : match(i + 1, j);
      }
    }

    // match group
    else if (pattern[i] === "[") {
      console.log(`must match group`);
      // find group
      // TODO: can cache the location of right bracket, but honestly array dereference might be slower than naive searching each time, given the small size of the pattern
      let k;
      for (k = i + 1; k < pattern.length; k++) {
        if (pattern[k] === "]") {
          break;
        }
      }
      if (k === pattern.length) {
        throw new Error("No closing ] found");
      }
      group = pattern.slice(i, k + 1);
      const doesMatch = matchGroup(input[i], group);
      if (mustMatchStart) {
        if (doesMatch) {
          result = match(i + 1, k + 1, true);
        } else {
          result = false;
        }
      } else {
        result = doesMatch ? match(i + 1, k + 1) : match(i + 1, j);
      }
    }

    // match a single char
    else {
      console.log(`must match char`);
      const doesMatch = input[i] === pattern[j];
      console.log(`char does match: ${doesMatch}`);
      if (mustMatchStart) {
        if (doesMatch) {
          result = match(i + 1, j + 1, true);
        } else {
          result = false;
        }
      } else {
        result = doesMatch ? match(i + 1, j + 1) : match(i + 1, j);
      }
    }

    memo[i][j] = result;
    return result;
  }

  if (process.argv[2] !== "-E") {
    // -E is extended regular expressions
    console.log("Expected first argument to be '-E'");
    process.exit(1);
  }

  let result;
  if (pattern[0] === "^") {
    result = match(0, 1, true);
  } else {
    result = match(0, 0, false);
  }

  if (result) {
    console.log("match found");
    process.exit(0);
  } else {
    console.log("no match found");
    process.exit(1);
  }
}

main();
