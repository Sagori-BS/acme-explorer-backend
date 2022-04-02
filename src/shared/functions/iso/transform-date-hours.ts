/**
 * A utility function that returns the from and to date, transformed into their hour boundaries
 *
 * @param {string} from <- It is an ISOString
 *
 * @param {string} to <- It is an ISOString
 *
 * @returns {ITransformDateHours} {newFrom, newTo} <- the dates in their hour boundaries
 */
export const transformDateHoursIntoTheirBoundaries = (
  from: string,
  to: string
) => {
  const newFrom = from.split('T')[0] + 'T00:00:00.000z';
  const newTo = to.split('T')[0] + 'T23:59:59.999z';

  return { newFrom, newTo };
};
