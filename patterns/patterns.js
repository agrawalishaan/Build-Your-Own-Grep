const constants = require("../constants/constants");
const {
  matchDigit,
  matchAlphanumeric,
  matchAndFindGroup,
  matchOneOrMore,
  matchZeroOrMore,
  matchWildCard,
  findOr,
} = require("../match/matchIndividual");

const patternsInputOnly = {
  [constants.PATTERN_DIGIT]: matchDigit,
  [constants.PATTERN_ALPHANUMERIC]: matchAlphanumeric,
  [constants.PATTERN_WILDCARD]: matchWildCard,
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
const patternsOr = {
  [constants.PATTERN_OR_OPEN]: findOr,
};

module.exports = {
  patternsInputOnly,
  patternsInputAndPattern,
  patternsRepeat,
  patternsNoRepeat,
  patternsOr,
};
