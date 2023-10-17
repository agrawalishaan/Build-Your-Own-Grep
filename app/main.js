const createMatchSubsequence = require("../match/createMatchSubsequence");
const matchStart = require("../match/matchStart");
const matchEnd = require("../match/matchEnd");

function main() {
  const input = require("fs").readFileSync(0, "utf-8").trim();
  const pattern = process.argv[3];
  console.log(`input is: ${input}`);
  console.log(`pattern is: ${pattern}`);

  if (process.argv[2] !== "-E") {
    // -E is extended regular expressions
    console.log("Expected first argument to be '-E'");
    process.exit(1);
  }

  let result;
  if (pattern[0] !== "^" && pattern[pattern.length - 1] !== "$") {
    const matchSubsequence = createMatchSubsequence(input, pattern);
    result = matchSubsequence(0, 0);
  } else {
    let patternSubstring = pattern;
    if (pattern[0] === "^") {
      patternSubstring = patternSubstring.slice(1);
    }
    if (patternSubstring[patternSubstring.length - 1] === "$") {
      patternSubstring = patternSubstring.slice(0, -1);
    }
    result =
      (pattern[0] === "^" ? matchStart(input, patternSubstring) : true) &&
      (pattern[pattern.length - 1] === "$"
        ? matchEnd(input, patternSubstring)
        : true);
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
