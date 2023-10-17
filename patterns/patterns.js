const constants = require("../constants/constants");
const {
  matchDigit,
  matchAlphanumeric,
  matchAndFindGroup,
} = require("../match/matchIndividual");

const patternsInputOnly = {
  [constants.PATTERN_DIGIT]: matchDigit,
  [constants.PATTERN_ALPHANUMERIC]: matchAlphanumeric,
};

const patternsInputAndPattern = {
  [constants.PATTERN_GROUP]: matchAndFindGroup,
};

module.exports = { patternsInputOnly, patternsInputAndPattern };
