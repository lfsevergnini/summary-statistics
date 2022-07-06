const SummaryStatistics = {
  /**
   * Return min, max and mean for a list of numbers.
   * @param {Array} numbers
   * @returns Object
   */
  getSummaryStatistics: (numbers) => {
    let min = Number.POSITIVE_INFINITY;
    let max = Number.NEGATIVE_INFINITY;
    let sum = 0;
    let mean = 0;

    numbers.forEach((n) => {
      sum += n;

      if (n < min) min = n;
      if (n > max) max = n;
    });

    mean = sum / numbers.length;

    return {
      min,
      max,
      mean,
    };
  },
};

module.exports = SummaryStatistics;
