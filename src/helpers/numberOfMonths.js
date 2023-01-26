const numberOfMonths = ({ initial_date, final_date }) =>
  Math.round(
    (new Date(final_date) - new Date(initial_date)) / (1000 * 60 * 60 * 24) / 30
  );

module.exports = numberOfMonths;
