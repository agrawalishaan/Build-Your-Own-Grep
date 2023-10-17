const constants = require("../constants/constants");
const {
  matchDigit,
  matchAlphanumeric,
  matchAndFindGroup,
  matchOneOrMore,
  matchZeroOrMore,
} = require("../match/matchIndividual");

const patternsInputOnly = {
  [constants.PATTERN_DIGIT]: matchDigit,
  [constants.PATTERN_ALPHANUMERIC]: matchAlphanumeric,
};

const patternsInputAndPattern = {
  [constants.PATTERN_GROUP]: matchAndFindGroup,
};
const patternsRepeat = {
  [constants.PATTERN_REPEAT]: matchOneOrMore,
};
const patternsNoRepeat = {
  [constants.PATTERN_ZERO_OR_MORE]: matchZeroOrMore,
};

module.exports = {
  patternsInputOnly,
  patternsInputAndPattern,
  patternsRepeat,
  patternsNoRepeat,
};
