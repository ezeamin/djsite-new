/**
 * Usage with template literals. To call the function, do not use parentheses.
 * @param strings
 * @param values
 * @returns {string}
 */
export const removeLineBreaks = (
  strings: TemplateStringsArray,
  ...values: unknown[]
): string => {
  let result = '';

  for (let i = 0; i < strings.length; i += 1) {
    result += strings[i];
    if (i < values.length) {
      result += values[i];
    }
  }

  // Remove line breaks and extra spaces
  result = result.replace(/\s+/g, ' ');

  return result;
};
