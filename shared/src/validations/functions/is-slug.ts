const charsetRegex = /^[a-z0-9]+$/;

export const isSlug = (str: string): boolean => {
  return charsetRegex.test(str);
};
