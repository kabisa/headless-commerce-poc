/**
 * Function to convert string to lowercase and capitalized
 * @param value string value to convert
 */
export const capitalize = (value: string): string => {
  return value.charAt(0).toUpperCase() + value.toLowerCase().slice(1);
}
