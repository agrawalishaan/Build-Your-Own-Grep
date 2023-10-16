const print = require("../util/printer");

const PATTERN_DIGIT = "\\d";
const PATTERN_ALPHANUMERIC = "\\w";

// const ASCII_RANGES = {
//   digitStrings: [48, 57],
//   alphaLower: [97, 122],
//   alphaUpper: [65, 90],
//   underscore: [95, 95],
// };

const ALPHANUMERIC_RANGES = {
  digitStrings: [48, 57],
  alphaLower: [97, 122],
  alphaUpper: [65, 90],
  underscore: [95, 95],
};

print();

function matchDigit(char) {
  const code = char.charCodeAt(0);
  return (
    code >= ALPHANUMERIC_RANGES.digitStrings[0] &&
    code <= ALPHANUMERIC_RANGES.digitStrings[1]
  );
}

function matchAlphanumeric(char) {
  const code = char.charCodeAt(0);
  for (const key in ALPHANUMERIC_RANGES) {
    const range = ALPHANUMERIC_RANGES[key];
    if (code >= range[0] && code <= range[1]) {
      return true;
    }
  }
  return false;
}

function main() {
  const input = require("fs").readFileSync(0, "utf-8").trim();
  const pattern = process.argv[3];
  console.log(`input is: ${input}`);
  console.log(`pattern is: ${pattern}`);

  const memo = new Array(input.length)
    .fill()
    .map(() => new Array(pattern.length).fill(null));

  // capture the input and pattern in a closure
  function match(i, j) {
    // base case, no pattern left to match
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

    // match a digit
    if (pattern.slice(j, j + 2) === PATTERN_DIGIT) {
      result = matchDigit(input[i]) ? match(i + 1, j + 2) : match(i + 1, j);
    }

    // match alphanumeric
    else if (pattern.slice(j, j + 2) === PATTERN_ALPHANUMERIC) {
      result = matchAlphanumeric(input[i])
        ? match(i + 1, j + 2)
        : match(i + 1, j);
    }

    // TODO: add caching for locating the matching ]
    // match a positive or negative character group
    else if (pattern[i] === "[") {
      const positive = pattern[i + 1] !== "^";
      let k = positive ? i + 1 : i + 2;
      let matchFound = false;
      console.log(`positive: ${positive}`);
      console.log(`k: ${k}`);
      for (; k < pattern.length; k++) {
        if (pattern[k] === "]") {
          break;
        }
        if (pattern[k] === input[i]) {
          console.log(`match found!`);
          matchFound = true;
          // no break as we need the bracket index
        }
      }
      if (k === pattern.length) {
        throw new Error("No closing ] found");
      }
      if (matchFound) {
        console.log(
          `entering the match found subproblem since we were positive, i: ${
            i + 1
          }, j: ${k + 1}`
        );
        result = positive ? match(i + 1, k + 1) : match(i + 1, j);
      } else {
        result = positive ? match(i + 1, j) : match(i + 1, k + 1);
      }
    }

    // match a single char
    else {
      result = input[i] === pattern[j] ? match(i + 1, j + 1) : match(i + 1, j);
    }

    memo[i][j] = result;
    return result;
  }

  if (process.argv[2] !== "-E") {
    // -E is extended regular expressions
    console.log("Expected first argument to be '-E'");
    process.exit(1);
  }
  if (match(0, 0)) {
    console.log("match found");
    process.exit(0);
  } else {
    console.log("no match found");
    process.exit(1);
  }
}

main();
