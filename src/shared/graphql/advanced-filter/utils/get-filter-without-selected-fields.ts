export const getFilterWithoutFields = <T>(
  filter: Record<keyof T, any>,
  fieldsToExclude: [keyof T]
) => {
  const formattedFilters = {};

  if (!filter) {
    return formattedFilters;
  }

  const filterKeys = Object.keys(filter);

  const filterKeysSet = new Set(filterKeys);

  fieldsToExclude.forEach(field => {
    filterKeysSet.delete(field.toString());
  });

  filterKeysSet.forEach(key => {
    formattedFilters[key] = filter[key];
  });

  return formattedFilters;
};
