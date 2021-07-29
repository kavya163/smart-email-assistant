const isLengthMoreThan = minLength => x => x.length > minLength;
const isNotEmpty = x => !!x;

export default (input, { caseSensitive = false, minLength = 2, predicates = [] } = {}) => {
  const applyPredicates = [
    isNotEmpty,
    isLengthMoreThan(minLength),
    ...predicates,
  ];

  const inputWithoutPadding = input.trim();

  return (caseSensitive ? inputWithoutPadding : inputWithoutPadding.toLowerCase())
    .split(/\s+/)
    .filter(x => applyPredicates.every(predicate => predicate(x)))
    .reduce((acc, word) => {
      const count = acc[word] || 0;

      return {
        ...acc,
        [word]: count + 1,
      };
    }, {});
};
