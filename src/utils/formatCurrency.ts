/** Remove non-number characters.
   Convert string to number, divide it by 100.
   Format it with 2 decimal places and replaces '.' to ',' .
   Find groups of 3 digits that are followed by another group of 3 digits,
   ensuring that they are inserted among the thousands.
   Ex.: "100010" -> "1.000,10"
   @param {string} price
   @returns {string} price
   @example
   const formattedPrice = formatCurrency('1.300,50'); Returns: 1.300,50
    */
export function formatCurrency(price: string) {
  let value = price

  value = value.replace(/\D/g, '')

  if (value) {
    value = (parseInt(value, 10) / 100)
      .toFixed(2)
      .replace('.', ',')
      .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  }

  return value
}

/** Converts a money value to cents 
 * @param {string} price
 * @returns {number} price in cents
 * @example
 * const priceInCents = convertRealToCents('1.300,50'); Returns: 130050 cents
*/
export function convertRealToCents(price: string) {
  const numericPrice = parseFloat(price.replace('.', '').replace(',', '.'))
  const priceInCents = Math.round(numericPrice * 100)
  return priceInCents
}

const CURRENCY_FORMATTER = new Intl.NumberFormat('pt-BR', {
  currency:'BRL',
  style: 'currency',
  minimumFractionDigits: 0,
})


/**Receive valor in cents, convert it to a string formatted to BRL (Real) currency
 * @param {number} number
 * @returns {string} formated price
 * @example
 * const price = formatCurrencyReal(1000); returns R$ 1000,00
*/
export function formatCurrencyReal(number: number) {
  return CURRENCY_FORMATTER.format(number / 100)
}