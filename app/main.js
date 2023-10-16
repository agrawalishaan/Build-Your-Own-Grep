const PATTERN_DIGIT = "\\d";
const PATTERN_ALPHANUMERIC = "\\w";

const ASCII_RANGES = {
  digitStrings: [48, 57],
  alphaLower: [97, 122],
  alphaUpper: [65, 90],
};

function getCharCode(char) {
  if (char.length !== 1) {
    throw new Error(`Expected char to be length 1, got ${char}`);
  }
  return char.charCodeAt(0);
}

function matchPattern(inputLine, pattern) {
  console.log(`inputLine: ${inputLine}, pattern: ${pattern}`);

  if (pattern === PATTERN_DIGIT) {
    console.log("matching a digit");
    for (const char of inputLine) {
      const code = getCharCode(char);
      console.log(`char code: ${code}`);
      if (
        code >= ASCII_RANGES.digitStrings[0] &&
        code <= ASCII_RANGES.digitStrings[1]
      ) {
        return true;
      }
    }
    return false;
  } else if (pattern === PATTERN_ALPHANUMERIC) {
    for (const char of inputLine) {
      const code = getCharCode(char);
      if (
        (code >= ASCII_RANGES.digitStrings[0] &&
          code <= ASCII_RANGES.digitStrings[1]) ||
        (code >= ASCII_RANGES.alphaLower[0] &&
          code <= ASCII_RANGES.alphaLower[1]) ||
        (code >= ASCII_RANGES.alphaUpper[0] &&
          code <= ASCII_RANGES.alphaUpper[1])
      ) {
        return true;
      }
    }
    return false;
  }
  // match a single char
  else if (pattern.length === 1) {
    console.log(`matching a char ${pattern}`);
    return inputLine.includes(pattern);
  } else {
    throw new Error(`Unhandled pattern ${pattern}`);
  }
}

function main() {
  const pattern = process.argv[3];
  const inputLine = require("fs").readFileSync(0, "utf-8").trim();

  if (process.argv[2] !== "-E") {
    // -E is extended regular expressions
    console.log("Expected first argument to be '-E'");
    process.exit(1);
  }

  if (matchPattern(inputLine, pattern)) {
    console.log("match found");
    process.exit(0);
  } else {
    console.log("no match found");
    process.exit(1);
  }
}

main();
