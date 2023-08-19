import accounting from 'accounting'

export const formatCurrency = (
  amount: number | string,
  minimumFractionDigits = 2,
  symbol = '$',
): string => {
  try {
    const amountNumber = Number(amount)
    if (Number.isNaN(amountNumber)) {
      return `${symbol}00`
    }
    return accounting.formatMoney(amount, symbol, minimumFractionDigits)
    // eslint-disable-next-line no-empty
  } catch (error) {
    return `${symbol}00`
  }
}
