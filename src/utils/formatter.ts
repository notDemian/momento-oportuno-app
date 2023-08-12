import accounting from 'accounting'

export const formatCurrency = (
  amount: number,
  minimumFractionDigits = 2,
  symbol = '$',
): string => {
  try {
    return accounting.formatMoney(amount, symbol, minimumFractionDigits)
    // eslint-disable-next-line no-empty
  } catch (error) {
    return `${symbol}00`
  }
}
