const PATTERN_DIGIT = "\\d";
const PATTERN_ALPHANUMERIC = "\\w";
const PATTERN_GROUP = "[";

const ALPHANUMERIC_RANGES = {
  digitStrings: [48, 57],
  alphaLower: [97, 122],
  alphaUpper: [65, 90],
  underscore: [95, 95],
};

module.exports = {
  PATTERN_DIGIT,
  PATTERN_ALPHANUMERIC,
  PATTERN_GROUP,
  ALPHANUMERIC_RANGES,
};
