export const addExtraFields = (fields: string[]) => {
  const parsedFields = {};

  for (const field of fields) {
    parsedFields[field] = field;
  }

  return parsedFields;
};
