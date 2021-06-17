/**
 * Function to convert string amount to string with two decimals
 * Eg: "12.1" converts to "12.10"
 * @param amount string value to convert
 */
export const displayAmount = (amount: string): string => {
  return parseFloat(amount).toFixed(2)
}
