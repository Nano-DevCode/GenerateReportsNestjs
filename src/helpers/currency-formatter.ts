export class CurrencyFormater {
  static formatCurrency(value: number) {
    return new Intl.NumberFormat('en-Us', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  }
}
