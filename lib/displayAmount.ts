/**
 * Function to convert string amount to string with two decimals
 * Eg: "12.1" converts to "12.10" "12 converts to 12,-"
 * @param amount string value to convert
 */
export const displayAmount = (amount: string): string => {
  let formattedAmount: number = parseFloat(amount)
  return formattedAmount % 1 === 0 ? `${formattedAmount},-` : formattedAmount.toFixed(2);
}
